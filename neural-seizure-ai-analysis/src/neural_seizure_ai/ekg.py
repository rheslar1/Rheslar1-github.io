from __future__ import annotations

import math
import random
import time
from dataclasses import asdict, dataclass
from pathlib import Path
from statistics import fmean


@dataclass(frozen=True)
class BeagleBoneEkgConfig:
    sensor_model: str = "AD8232 Single-Lead Heart Rate Monitor"
    analog_channel: int = 0
    iio_device_path: Path = Path("/sys/bus/iio/devices/iio:device0")
    sampling_rate_hz: int = 250
    reference_voltage_mv: float = 1800.0
    adc_resolution_counts: int = 4095
    input_divider_ratio: float = 1.0
    frontend_gain: float = 1.0
    lead_off_low_mv: float = 50.0
    lead_off_high_mv: float = 1750.0
    lead_off_positive_path: Path | None = None
    lead_off_negative_path: Path | None = None

    @property
    def raw_path(self) -> Path:
        return self.iio_device_path / f"in_voltage{self.analog_channel}_raw"

    @property
    def scale_path(self) -> Path:
        return self.iio_device_path / f"in_voltage{self.analog_channel}_scale"


@dataclass(frozen=True)
class EkgSample:
    timestamp_seconds: float
    millivolts: float
    raw_count: int | None = None
    lead_off: bool = False
    source: str = "synthetic"


@dataclass(frozen=True)
class EkgFeatureWindow:
    start_seconds: float
    end_seconds: float
    sample_count: int
    mean_mv: float
    peak_to_peak_mv: float
    heart_rate_bpm: float
    rr_std_ms: float
    rmssd_ms: float
    peak_count: int
    lead_off_fraction: float
    signal_quality: float
    autonomic_stress: float

    def to_dict(self) -> dict[str, float | int]:
        return asdict(self)


class BeagleBoneIioAnalogReader:
    """Reads BeagleBone Black ADC values through Linux IIO sysfs files."""

    def __init__(self, config: BeagleBoneEkgConfig):
        self.config = config

    def read_raw_count(self) -> int:
        try:
            return int(self.config.raw_path.read_text(encoding="utf-8").strip())
        except FileNotFoundError as exc:
            raise FileNotFoundError(
                f"BeagleBone ADC raw path not found: {self.config.raw_path}. "
                "Enable the ADC overlay/IIO driver and confirm the AIN channel."
            ) from exc

    def read_millivolts(self) -> tuple[int, float]:
        raw_count = self.read_raw_count()
        scale_mv = self._read_scale_mv()
        millivolts = raw_count * scale_mv * self.config.input_divider_ratio / max(self.config.frontend_gain, 1e-9)
        return raw_count, millivolts

    def read_lead_off(self) -> bool:
        return _read_gpio_asserted(self.config.lead_off_positive_path) or _read_gpio_asserted(self.config.lead_off_negative_path)

    def _read_scale_mv(self) -> float:
        if self.config.scale_path.exists():
            try:
                return float(self.config.scale_path.read_text(encoding="utf-8").strip())
            except ValueError:
                pass
        return self.config.reference_voltage_mv / self.config.adc_resolution_counts


class BeagleBoneEkgSensor:
    """Captures ADC-connected EKG/ECG samples from a BeagleBone Black."""

    def __init__(self, config: BeagleBoneEkgConfig, reader: BeagleBoneIioAnalogReader | None = None):
        self.config = config
        self.reader = reader or BeagleBoneIioAnalogReader(config)

    def capture(self, duration_seconds: float) -> list[EkgSample]:
        sample_count = max(1, int(duration_seconds * self.config.sampling_rate_hz))
        interval_seconds = 1.0 / self.config.sampling_rate_hz
        start = time.monotonic()
        samples: list[EkgSample] = []

        for index in range(sample_count):
            raw_count, millivolts = self.reader.read_millivolts()
            timestamp = index * interval_seconds
            lead_off = (
                millivolts <= self.config.lead_off_low_mv
                or millivolts >= self.config.lead_off_high_mv
                or self.reader.read_lead_off()
            )
            samples.append(
                EkgSample(
                    timestamp_seconds=timestamp,
                    millivolts=millivolts,
                    raw_count=raw_count,
                    lead_off=lead_off,
                    source="beaglebone-iio",
                )
            )
            next_time = start + (index + 1) * interval_seconds
            sleep_seconds = next_time - time.monotonic()
            if sleep_seconds > 0:
                time.sleep(sleep_seconds)

        return samples


class SyntheticEkgGenerator:
    """Creates deterministic EKG-like context for tests and non-hardware demos."""

    def __init__(
        self,
        duration_seconds: float,
        sampling_rate_hz: int = 250,
        preictal_start_seconds: float = 55.0,
        ictal_start_seconds: float = 75.0,
        seed: int = 42,
    ):
        self.duration_seconds = duration_seconds
        self.sampling_rate_hz = sampling_rate_hz
        self.preictal_start_seconds = preictal_start_seconds
        self.ictal_start_seconds = ictal_start_seconds
        self.rng = random.Random(seed)

    def generate(self) -> list[EkgSample]:
        sample_count = int(self.duration_seconds * self.sampling_rate_hz)
        samples: list[EkgSample] = []
        phase = 0.0
        previous_timestamp = 0.0

        for index in range(sample_count):
            timestamp = index / self.sampling_rate_hz
            ramp = self._autonomic_ramp(timestamp)
            heart_rate_bpm = 72.0 + 18.0 * ramp + 4.0 * math.sin(2.0 * math.pi * 0.03 * timestamp)
            beat_hz = heart_rate_bpm / 60.0
            phase = (phase + beat_hz * (timestamp - previous_timestamp)) % 1.0
            previous_timestamp = timestamp

            baseline = 820.0 + 12.0 * math.sin(2.0 * math.pi * 0.22 * timestamp)
            p_wave = 24.0 * _gaussian_phase(phase, 0.18, 0.035)
            qrs = 290.0 * _gaussian_phase(phase, 0.03, 0.012) - 55.0 * _gaussian_phase(phase, 0.0, 0.018)
            t_wave = 72.0 * _gaussian_phase(phase, 0.34, 0.055)
            noise = self.rng.gauss(0.0, 4.5)
            millivolts = baseline + p_wave + qrs + t_wave + noise
            samples.append(EkgSample(timestamp, millivolts, raw_count=None, lead_off=False, source="synthetic-ekg"))

        return samples

    def _autonomic_ramp(self, timestamp_seconds: float) -> float:
        if timestamp_seconds < self.preictal_start_seconds:
            return 0.0
        span = max(1.0, self.ictal_start_seconds - self.preictal_start_seconds)
        return min(1.0, (timestamp_seconds - self.preictal_start_seconds) / span)


def extract_ekg_feature_windows(
    samples: list[EkgSample],
    windows: list[tuple[float, float]],
) -> list[EkgFeatureWindow]:
    return [_extract_window(samples, start, end) for start, end in windows]


def _extract_window(samples: list[EkgSample], start_seconds: float, end_seconds: float) -> EkgFeatureWindow:
    window_samples = [sample for sample in samples if start_seconds <= sample.timestamp_seconds <= end_seconds]
    if not window_samples:
        return EkgFeatureWindow(start_seconds, end_seconds, 0, 0.0, 0.0, 0.0, 0.0, 0.0, 0, 1.0, 0.0, 0.0)

    values = [sample.millivolts for sample in window_samples]
    peak_indices = _detect_r_peaks(values)
    peak_times = [window_samples[index].timestamp_seconds for index in peak_indices]
    rr_intervals_ms = [(peak_times[index] - peak_times[index - 1]) * 1000.0 for index in range(1, len(peak_times))]
    heart_rate_bpm = 60000.0 / fmean(rr_intervals_ms) if rr_intervals_ms else 0.0
    rr_std_ms = _std(rr_intervals_ms)
    rmssd_ms = _rmssd(rr_intervals_ms)
    lead_off_fraction = sum(1 for sample in window_samples if sample.lead_off) / len(window_samples)
    peak_to_peak_mv = max(values) - min(values)
    signal_quality = _signal_quality(peak_to_peak_mv, lead_off_fraction, len(peak_indices), end_seconds - start_seconds)
    autonomic_stress = _autonomic_stress(heart_rate_bpm, rmssd_ms, signal_quality)

    return EkgFeatureWindow(
        start_seconds=start_seconds,
        end_seconds=end_seconds,
        sample_count=len(window_samples),
        mean_mv=fmean(values),
        peak_to_peak_mv=peak_to_peak_mv,
        heart_rate_bpm=heart_rate_bpm,
        rr_std_ms=rr_std_ms,
        rmssd_ms=rmssd_ms,
        peak_count=len(peak_indices),
        lead_off_fraction=lead_off_fraction,
        signal_quality=signal_quality,
        autonomic_stress=autonomic_stress,
    )


def _detect_r_peaks(values: list[float]) -> list[int]:
    if len(values) < 3:
        return []
    mean = fmean(values)
    peak_to_peak = max(values) - min(values)
    threshold = mean + 0.45 * peak_to_peak
    refractory_samples = max(1, len(values) // 8)
    peaks: list[int] = []
    last_peak = -refractory_samples

    for index in range(1, len(values) - 1):
        if index - last_peak < refractory_samples:
            continue
        value = values[index]
        if value > threshold and value >= values[index - 1] and value >= values[index + 1]:
            peaks.append(index)
            last_peak = index
    return peaks


def _signal_quality(peak_to_peak_mv: float, lead_off_fraction: float, peak_count: int, window_seconds: float) -> float:
    amplitude_score = _cap(peak_to_peak_mv / 250.0)
    lead_score = 1.0 - _cap(lead_off_fraction)
    rate_score = _cap(peak_count / max(window_seconds * 0.75, 1.0))
    return _cap(0.45 * amplitude_score + 0.35 * lead_score + 0.20 * rate_score)


def _autonomic_stress(heart_rate_bpm: float, rmssd_ms: float, signal_quality: float) -> float:
    if signal_quality < 0.35:
        return 0.0
    hr_component = _cap((heart_rate_bpm - 78.0) / 35.0)
    hrv_component = _cap((80.0 - rmssd_ms) / 80.0) if rmssd_ms else 0.25
    return _cap(0.65 * hr_component + 0.35 * hrv_component)


def _std(values: list[float]) -> float:
    if len(values) < 2:
        return 0.0
    mean = fmean(values)
    return (sum((value - mean) ** 2 for value in values) / (len(values) - 1)) ** 0.5


def _rmssd(values: list[float]) -> float:
    if len(values) < 2:
        return 0.0
    differences = [values[index] - values[index - 1] for index in range(1, len(values))]
    return (fmean(value * value for value in differences)) ** 0.5


def _gaussian_phase(phase: float, center: float, width: float) -> float:
    wrapped = min(abs(phase - center), abs(phase - center + 1.0), abs(phase - center - 1.0))
    return math.exp(-(wrapped * wrapped) / (2.0 * width * width))


def _cap(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))


def _read_gpio_asserted(path: Path | None) -> bool:
    if path is None:
        return False
    try:
        return path.read_text(encoding="utf-8").strip() == "1"
    except FileNotFoundError:
        return False
