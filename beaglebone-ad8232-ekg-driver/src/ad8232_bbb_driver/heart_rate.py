from __future__ import annotations

from dataclasses import dataclass
from statistics import fmean

from .filters import moving_average, remove_baseline
from .iio import Ad8232Sample


@dataclass(frozen=True)
class HeartRateReport:
    sample_count: int
    peak_count: int
    heart_rate_bpm: float
    rr_std_ms: float
    rmssd_ms: float
    lead_off_fraction: float
    signal_quality: float


def analyze(samples: list[Ad8232Sample], sample_rate_hz: int) -> HeartRateReport:
    if not samples:
        return HeartRateReport(0, 0, 0.0, 0.0, 0.0, 1.0, 0.0)
    values = [sample.millivolts for sample in samples]
    filtered = moving_average(remove_baseline(values, max(3, sample_rate_hz // 2)), max(3, sample_rate_hz // 40))
    peaks = detect_r_peaks(filtered, sample_rate_hz)
    peak_times = [samples[index].timestamp_seconds for index in peaks]
    rr_ms = [(peak_times[index] - peak_times[index - 1]) * 1000.0 for index in range(1, len(peak_times))]
    heart_rate = 60000.0 / fmean(rr_ms) if rr_ms else 0.0
    lead_off_fraction = sum(1 for sample in samples if sample.lead_off) / len(samples)
    quality = _quality(values, len(peaks), len(samples) / sample_rate_hz, lead_off_fraction)
    return HeartRateReport(
        sample_count=len(samples),
        peak_count=len(peaks),
        heart_rate_bpm=heart_rate,
        rr_std_ms=_std(rr_ms),
        rmssd_ms=_rmssd(rr_ms),
        lead_off_fraction=lead_off_fraction,
        signal_quality=quality,
    )


def detect_r_peaks(values: list[float], sample_rate_hz: int) -> list[int]:
    if len(values) < 3:
        return []
    threshold = max(values) * 0.55
    refractory = max(1, int(sample_rate_hz * 0.25))
    peaks: list[int] = []
    last = -refractory
    for index in range(1, len(values) - 1):
        if index - last < refractory:
            continue
        if values[index] > threshold and values[index] >= values[index - 1] and values[index] >= values[index + 1]:
            peaks.append(index)
            last = index
    return peaks


def _quality(values: list[float], peak_count: int, duration_seconds: float, lead_off_fraction: float) -> float:
    peak_to_peak = max(values) - min(values) if values else 0.0
    amplitude = min(1.0, peak_to_peak / 250.0)
    rate = min(1.0, peak_count / max(duration_seconds * 0.7, 1.0))
    lead = 1.0 - min(1.0, lead_off_fraction)
    return max(0.0, min(1.0, 0.45 * amplitude + 0.25 * rate + 0.30 * lead))


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

