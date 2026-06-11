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
    wavelet_detail_energy: float
    wavelet_entropy: float
    sample_entropy: float
    katz_fractal_dimension: float
    higuchi_fractal_dimension: float
    mean_abs_connectivity: float
    max_abs_connectivity: float
    connectivity_spread: float
    spatial_concentration: float
    channel_energy_iqr: float

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
        wavelet_details = [_haar_detail_energies(channel, levels=4) for channel in channels]
        wavelet_detail_energy = fmean(sum(levels[-2:]) for levels in wavelet_details) if wavelet_details else 0.0
        wavelet_entropy = fmean(_normalized_entropy(levels) for levels in wavelet_details) if wavelet_details else 0.0
        entropy_values = [_sample_entropy(channel) for channel in channels]
        katz_values = [_katz_fractal_dimension(channel) for channel in channels]
        higuchi_values = [_higuchi_fractal_dimension(channel) for channel in channels]
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
            wavelet_detail_energy=wavelet_detail_energy,
            wavelet_entropy=wavelet_entropy,
            sample_entropy=fmean(entropy_values),
            katz_fractal_dimension=fmean(katz_values),
            higuchi_fractal_dimension=fmean(higuchi_values),
            mean_abs_connectivity=fmean(abs_connectivity),
            max_abs_connectivity=max(abs_connectivity),
            connectivity_spread=max(abs_connectivity) - min(abs_connectivity),
            spatial_concentration=max(energies) / total_energy,
            channel_energy_iqr=_iqr(energies),
        )


def feature_vector(features: WindowFeatures) -> list[float]:
    return [
        _cap(features.avg_energy / 3.0),
        _cap(features.avg_line_length / 6.0),
        _cap(features.zero_crossing_rate / 0.45),
        _cap(features.hfo_to_beta / 1.5),
        _cap(features.hfo_to_total / 0.45),
        _cap(features.pac_proxy / 0.55),
        _cap(features.wavelet_detail_energy / 1.8),
        _cap(features.wavelet_entropy / 0.95),
        _cap(features.sample_entropy / 1.8),
        _cap((features.katz_fractal_dimension - 1.0) / 2.0),
        _cap((features.higuchi_fractal_dimension - 1.0) / 1.2),
        _cap(features.mean_abs_connectivity / 0.75),
        _cap(features.connectivity_spread / 0.65),
        _cap(features.spatial_concentration / 0.55),
        _cap(features.channel_energy_iqr / 1.1),
    ]


def feature_names() -> list[str]:
    return [
        "avg_energy",
        "avg_line_length",
        "zero_crossing_rate",
        "hfo_to_beta",
        "hfo_to_total",
        "pac_proxy",
        "wavelet_detail_energy",
        "wavelet_entropy",
        "sample_entropy",
        "katz_fractal_dimension",
        "higuchi_fractal_dimension",
        "mean_abs_connectivity",
        "connectivity_spread",
        "spatial_concentration",
        "channel_energy_iqr",
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


def _haar_detail_energies(values: list[float], levels: int = 4) -> list[float]:
    current = _downsample(values, max_points=512)
    energies: list[float] = []
    for _ in range(levels):
        if len(current) < 2:
            energies.append(0.0)
            continue
        if len(current) % 2:
            current = current[:-1]
        approximation = []
        detail = []
        scale = 2.0 ** 0.5
        for index in range(0, len(current), 2):
            left = current[index]
            right = current[index + 1]
            approximation.append((left + right) / scale)
            detail.append((left - right) / scale)
        energies.append(_energy(detail))
        current = approximation
    return energies


def _sample_entropy(values: list[float], embedding: int = 2, tolerance_scale: float = 0.2) -> float:
    series = _downsample(values, max_points=96)
    if len(series) <= embedding + 2:
        return 0.0
    mean = fmean(series)
    std = (fmean((value - mean) ** 2 for value in series) ** 0.5) or 1e-9
    tolerance = tolerance_scale * std
    count_m = _template_match_count(series, embedding, tolerance)
    count_m1 = _template_match_count(series, embedding + 1, tolerance)
    if count_m == 0 or count_m1 == 0:
        return 0.0
    return max(0.0, -math.log(count_m1 / count_m))


def _template_match_count(series: list[float], embedding: int, tolerance: float) -> int:
    count = 0
    limit = len(series) - embedding
    for left in range(limit):
        for right in range(left + 1, limit):
            if all(abs(series[left + offset] - series[right + offset]) <= tolerance for offset in range(embedding)):
                count += 1
    return count


def _katz_fractal_dimension(values: list[float]) -> float:
    series = _downsample(values, max_points=192)
    if len(series) < 3:
        return 1.0
    distances = [abs(series[index] - series[index - 1]) for index in range(1, len(series))]
    path_length = sum(distances) + 1e-9
    diameter = max(abs(value - series[0]) for value in series) + 1e-9
    n = len(series)
    denominator = math.log10(diameter / path_length) + math.log10(n)
    return math.log10(n) / denominator if denominator else 1.0


def _higuchi_fractal_dimension(values: list[float], kmax: int = 6) -> float:
    series = _downsample(values, max_points=192)
    if len(series) < kmax + 2:
        return 1.0
    x_values = []
    y_values = []
    for k in range(1, kmax + 1):
        lengths = []
        for m in range(k):
            indices = list(range(m, len(series), k))
            if len(indices) < 2:
                continue
            total = sum(abs(series[indices[i]] - series[indices[i - 1]]) for i in range(1, len(indices)))
            normalizer = (len(series) - 1) / (len(indices) * k)
            lengths.append((total * normalizer) / k)
        if lengths:
            x_values.append(math.log(1.0 / k))
            y_values.append(math.log(fmean(lengths) + 1e-9))
    if len(x_values) < 2:
        return 1.0
    x_mean = fmean(x_values)
    y_mean = fmean(y_values)
    denominator = sum((value - x_mean) ** 2 for value in x_values)
    if denominator == 0.0:
        return 1.0
    slope = sum((x - x_mean) * (y - y_mean) for x, y in zip(x_values, y_values)) / denominator
    return max(1.0, min(2.5, slope))


def _normalized_entropy(values: list[float]) -> float:
    total = sum(abs(value) for value in values) + 1e-9
    probabilities = [abs(value) / total for value in values if abs(value) > 0.0]
    if len(probabilities) <= 1:
        return 0.0
    entropy = -sum(probability * math.log(probability) for probability in probabilities)
    return entropy / math.log(len(probabilities))


def _iqr(values: list[float]) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    return _percentile(ordered, 0.75) - _percentile(ordered, 0.25)


def _percentile(ordered_values: list[float], fraction: float) -> float:
    if len(ordered_values) == 1:
        return ordered_values[0]
    position = fraction * (len(ordered_values) - 1)
    lower = int(math.floor(position))
    upper = int(math.ceil(position))
    if lower == upper:
        return ordered_values[lower]
    blend = position - lower
    return ordered_values[lower] * (1.0 - blend) + ordered_values[upper] * blend


def _downsample(values: list[float], max_points: int) -> list[float]:
    if len(values) <= max_points:
        return list(values)
    step = len(values) / max_points
    return [values[int(index * step)] for index in range(max_points)]


def _cap(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))
