from __future__ import annotations

import math
import random
from dataclasses import dataclass

from .config import Ad8232Config


@dataclass(frozen=True)
class Ad8232Sample:
    timestamp_seconds: float
    raw_count: int
    millivolts: float
    lead_off: bool
    source: str


class BeagleBoneIioReader:
    def __init__(self, config: Ad8232Config):
        self.config = config

    def read(self, timestamp_seconds: float) -> Ad8232Sample:
        raw = int(self.config.raw_path.read_text(encoding="utf-8").strip())
        scale = self._scale_mv()
        millivolts = raw * scale * self.config.input_divider_ratio
        return Ad8232Sample(
            timestamp_seconds=timestamp_seconds,
            raw_count=raw,
            millivolts=millivolts,
            lead_off=self._lead_off(),
            source="beaglebone-iio",
        )

    def _scale_mv(self) -> float:
        if self.config.scale_path.exists():
            return float(self.config.scale_path.read_text(encoding="utf-8").strip())
        return self.config.reference_voltage_mv / self.config.adc_counts

    def _lead_off(self) -> bool:
        return _gpio_asserted(self.config.lead_off_plus_path) or _gpio_asserted(self.config.lead_off_minus_path)


class SimulatedAd8232Reader:
    def __init__(self, config: Ad8232Config, seed: int = 42):
        self.config = config
        self.rng = random.Random(seed)
        self.phase = 0.0
        self.previous_timestamp = 0.0

    def read(self, timestamp_seconds: float) -> Ad8232Sample:
        dt = max(0.0, timestamp_seconds - self.previous_timestamp)
        self.previous_timestamp = timestamp_seconds
        heart_rate_bpm = 74.0 + 5.0 * math.sin(2.0 * math.pi * 0.025 * timestamp_seconds)
        self.phase = (self.phase + (heart_rate_bpm / 60.0) * dt) % 1.0
        baseline = 900.0 + 10.0 * math.sin(2.0 * math.pi * 0.18 * timestamp_seconds)
        qrs = 310.0 * _gaussian_phase(self.phase, 0.03, 0.012)
        p_wave = 24.0 * _gaussian_phase(self.phase, 0.18, 0.035)
        t_wave = 78.0 * _gaussian_phase(self.phase, 0.34, 0.055)
        millivolts = baseline + qrs + p_wave + t_wave + self.rng.gauss(0.0, 4.0)
        raw = int(millivolts / max(self.config.reference_voltage_mv / self.config.adc_counts, 1e-9) / self.config.input_divider_ratio)
        return Ad8232Sample(timestamp_seconds, raw, millivolts, False, "simulated-ad8232")


def _gpio_asserted(path) -> bool:
    if path is None:
        return False
    try:
        return path.read_text(encoding="utf-8").strip() == "1"
    except FileNotFoundError:
        return False


def _gaussian_phase(phase: float, center: float, width: float) -> float:
    wrapped = min(abs(phase - center), abs(phase - center + 1.0), abs(phase - center - 1.0))
    return math.exp(-(wrapped * wrapped) / (2.0 * width * width))

