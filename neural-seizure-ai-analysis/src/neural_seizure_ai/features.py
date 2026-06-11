from __future__ import annotations

import math
from dataclasses import asdict, dataclass
from itertools import combinations
from statistics import fmean

from .config import BrainState
from .preprocessing import SignalWindow


BANDS_HZ: dict[str, tuple[float, float]] = {
    "delta": (1.0, 4.0),
    "theta": (4.0, 8.0),
    "alpha": (8.0, 13.0),
    "beta": (13.0, 30.0),
    "gamma": (30.0, 70.0),
    "hfo": (80.0, 120.0),
}


@dataclass(frozen=True)
class WindowFeatures:
    start_seconds: float
    end_seconds: float
    label: BrainState
    avg_energy: float
    avg_line_length: float
    zero_crossing_rate: float
    delta_power: float
    theta_power: float
    alpha_power: float
    beta_power: float
    gamma_power: float
    hfo_power: float
    hfo_to_beta: float
    hfo_to_total: float
    pac_proxy: float
    mean_abs_connectivity: float
    max_abs_connectivity: float
    spatial_concentration: float

    def to_dict(self) -> dict[str, float | str]:
        data = asdict(self)
        data["label"] = self.label.value
        return data


class FeatureExtractor:
    def __init__(self, sampling_rate_hz: int):
        self.sampling_rate_hz = sampling_rate_hz

    def extract(self, window: SignalWindow) -> WindowFeatures:
        channels = _transpose([sample.values_uv for sample in window.samples])
        energies = [_energy(channel) for channel in channels]
        line_lengths = [_line_length(channel) for channel in channels]
        zero_crossings = [_zero_crossing_rate(channel) for channel in channels]
        band_powers = {band: fmean(_band_power(channel, self.sampling_rate_hz, low, high) for channel in channels)
                       for band, (low, high) in BANDS_HZ.items()}

        total_power = sum(band_powers.values()) + 1e-9
        connectivity_values = [_pearson(left, right) for left, right in combinations(channels, 2)]
        abs_connectivity = [abs(value) for value in connectivity_values] or [0.0]
        pac_values = [_pac_proxy(channel) for channel in channels]
        total_energy = sum(energies) + 1e-9

        return WindowFeatures(
            start_seconds=window.start_seconds,
            end_seconds=window.end_seconds,
            label=window.label,
            avg_energy=fmean(energies),
            avg_line_length=fmean(line_lengths),
            zero_crossing_rate=fmean(zero_crossings),
            delta_power=band_powers["delta"],
            theta_power=band_powers["theta"],
            alpha_power=band_powers["alpha"],
            beta_power=band_powers["beta"],
            gamma_power=band_powers["gamma"],
            hfo_power=band_powers["hfo"],
            hfo_to_beta=band_powers["hfo"] / (band_powers["beta"] + 1e-9),
            hfo_to_total=band_powers["hfo"] / total_power,
            pac_proxy=fmean(pac_values),
            mean_abs_connectivity=fmean(abs_connectivity),
            max_abs_connectivity=max(abs_connectivity),
            spatial_concentration=max(energies) / total_energy,
        )


def feature_vector(features: WindowFeatures) -> list[float]:
    return [
        _cap(features.avg_energy / 3.0),
        _cap(features.avg_line_length / 6.0),
        _cap(features.zero_crossing_rate / 0.45),
        _cap(features.hfo_to_beta / 1.5),
        _cap(features.hfo_to_total / 0.45),
        _cap(features.pac_proxy / 0.55),
        _cap(features.mean_abs_connectivity / 0.75),
        _cap(features.spatial_concentration / 0.55),
    ]


def feature_names() -> list[str]:
    return [
        "avg_energy",
        "avg_line_length",
        "zero_crossing_rate",
        "hfo_to_beta",
        "hfo_to_total",
        "pac_proxy",
        "mean_abs_connectivity",
        "spatial_concentration",
    ]


def _transpose(rows: list[tuple[float, ...]]) -> list[list[float]]:
    if not rows:
        return []
    return [[row[column] for row in rows] for column in range(len(rows[0]))]


def _energy(values: list[float]) -> float:
    return fmean(value * value for value in values)


def _line_length(values: list[float]) -> float:
    if len(values) < 2:
        return 0.0
    return sum(abs(values[index] - values[index - 1]) for index in range(1, len(values))) / (len(values) - 1)


def _zero_crossing_rate(values: list[float]) -> float:
    if len(values) < 2:
        return 0.0
    crossings = sum(1 for index in range(1, len(values)) if (values[index - 1] <= 0.0 < values[index]) or (values[index - 1] >= 0.0 > values[index]))
    return crossings / (len(values) - 1)


def _band_power(values: list[float], sampling_rate_hz: int, low_hz: float, high_hz: float) -> float:
    nyquist = sampling_rate_hz / 2.0
    high = min(high_hz, nyquist - 1.0)
    if high <= low_hz:
        return 0.0
    points = 5
    frequencies = [low_hz + (high - low_hz) * index / (points - 1) for index in range(points)]
    return fmean(_goertzel_power(values, sampling_rate_hz, frequency) for frequency in frequencies)


def _goertzel_power(values: list[float], sampling_rate_hz: int, target_hz: float) -> float:
    if not values:
        return 0.0
    normalized = target_hz / sampling_rate_hz
    coefficient = 2.0 * math.cos(2.0 * math.pi * normalized)
    previous = 0.0
    previous2 = 0.0
    for value in values:
        current = value + coefficient * previous - previous2
        previous2 = previous
        previous = current
    power = previous2 * previous2 + previous * previous - coefficient * previous * previous2
    return power / (len(values) ** 2)


def _pearson(left: list[float], right: list[float]) -> float:
    left_mean = fmean(left)
    right_mean = fmean(right)
    numerator = sum((a - left_mean) * (b - right_mean) for a, b in zip(left, right))
    left_scale = sum((a - left_mean) ** 2 for a in left) ** 0.5
    right_scale = sum((b - right_mean) ** 2 for b in right) ** 0.5
    denominator = left_scale * right_scale
    return numerator / denominator if denominator else 0.0


def _pac_proxy(values: list[float]) -> float:
    if len(values) < 8:
        return 0.0
    slow = _moving_average(values, 15)
    fast_envelope = [abs(value - baseline) for value, baseline in zip(values, slow)]
    return abs(_pearson([abs(value) for value in slow], fast_envelope))


def _moving_average(values: list[float], width: int) -> list[float]:
    radius = max(1, width // 2)
    output = []
    for index in range(len(values)):
        start = max(0, index - radius)
        end = min(len(values), index + radius + 1)
        output.append(fmean(values[start:end]))
    return output


def _cap(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))

