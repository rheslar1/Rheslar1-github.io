from __future__ import annotations

from statistics import fmean


def remove_baseline(values: list[float], width: int) -> list[float]:
    if not values:
        return []
    radius = max(1, width // 2)
    output = []
    for index, value in enumerate(values):
        start = max(0, index - radius)
        end = min(len(values), index + radius + 1)
        output.append(value - fmean(values[start:end]))
    return output


def moving_average(values: list[float], width: int) -> list[float]:
    if not values:
        return []
    radius = max(1, width // 2)
    return [fmean(values[max(0, index - radius): min(len(values), index + radius + 1)]) for index in range(len(values))]

