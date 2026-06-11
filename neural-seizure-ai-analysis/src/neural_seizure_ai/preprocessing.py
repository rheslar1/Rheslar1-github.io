from __future__ import annotations

from dataclasses import dataclass
from statistics import fmean

from .config import BrainState
from .signals import SignalSample


@dataclass(frozen=True)
class SignalWindow:
    start_seconds: float
    end_seconds: float
    label: BrainState
    samples: tuple[SignalSample, ...]


def preprocess_samples(samples: list[SignalSample], baseline_window_samples: int) -> list[SignalSample]:
    if not samples:
        return []

    channels = len(samples[0].values_uv)
    columns = [[sample.values_uv[channel] for sample in samples] for channel in range(channels)]
    normalized_columns = [_zscore(_remove_baseline(column, baseline_window_samples)) for column in columns]

    processed: list[SignalSample] = []
    for index, sample in enumerate(samples):
        processed.append(
            SignalSample(
                timestamp_seconds=sample.timestamp_seconds,
                values_uv=tuple(normalized_columns[channel][index] for channel in range(channels)),
                state=sample.state,
            )
        )
    return processed


def window_samples(
    samples: list[SignalSample],
    sampling_rate_hz: int,
    window_seconds: float,
    stride_seconds: float,
) -> list[SignalWindow]:
    window_size = max(1, int(window_seconds * sampling_rate_hz))
    stride = max(1, int(stride_seconds * sampling_rate_hz))
    windows: list[SignalWindow] = []

    for start_index in range(0, max(0, len(samples) - window_size + 1), stride):
        chunk = tuple(samples[start_index : start_index + window_size])
        label = _window_label(chunk)
        windows.append(
            SignalWindow(
                start_seconds=chunk[0].timestamp_seconds,
                end_seconds=chunk[-1].timestamp_seconds,
                label=label,
                samples=chunk,
            )
        )
    return windows


def _window_label(samples: tuple[SignalSample, ...]) -> BrainState:
    counts = {state: 0 for state in BrainState}
    for sample in samples:
        counts[sample.state] += 1
    if counts[BrainState.ICTAL] > 0:
        return BrainState.ICTAL
    if counts[BrainState.PREICTAL] >= max(1, len(samples) // 3):
        return BrainState.PREICTAL
    return BrainState.INTERICTAL


def _remove_baseline(values: list[float], window_size: int) -> list[float]:
    if window_size <= 1:
        mean = fmean(values)
        return [value - mean for value in values]

    half_window = max(1, window_size // 2)
    adjusted = []
    for index, value in enumerate(values):
        start = max(0, index - half_window)
        end = min(len(values), index + half_window + 1)
        adjusted.append(value - fmean(values[start:end]))
    return adjusted


def _zscore(values: list[float]) -> list[float]:
    mean = fmean(values)
    variance = fmean((value - mean) ** 2 for value in values)
    scale = variance**0.5 or 1.0
    return [(value - mean) / scale for value in values]

