from __future__ import annotations

from dataclasses import asdict, dataclass

from .features import WindowFeatures


@dataclass(frozen=True)
class ImageRepresentation:
    name: str
    x_axis: str
    y_axis: str
    x_labels: list[str]
    y_labels: list[str]
    pixels: list[list[float]]
    provenance: str

    def to_dict(self) -> dict[str, object]:
        return asdict(self)


def build_time_frequency_image(features: list[WindowFeatures], max_windows: int = 48) -> ImageRepresentation:
    selected = _select_windows(features, max_windows)
    bands = [
        ("delta", [row.delta_power for row in selected]),
        ("theta", [row.theta_power for row in selected]),
        ("alpha", [row.alpha_power for row in selected]),
        ("beta", [row.beta_power for row in selected]),
        ("gamma", [row.gamma_power for row in selected]),
        ("hfo", [row.hfo_power for row in selected]),
    ]
    matrix = [_normalize(values) for _, values in bands]
    return ImageRepresentation(
        name="time_frequency_bandpower_image",
        x_axis="window_start_seconds",
        y_axis="frequency_band",
        x_labels=[f"{row.start_seconds:.0f}" for row in selected],
        y_labels=[name for name, _ in bands],
        pixels=matrix,
        provenance=(
            "Generated from synthetic WindowFeatures as a dependency-free image-style "
            "EEG representation for CNN/pretrained-model design review."
        ),
    )


def build_connectivity_image(features: list[WindowFeatures], max_windows: int = 48) -> ImageRepresentation:
    selected = _select_windows(features, max_windows)
    rows = [
        ("mean_abs_connectivity", [row.mean_abs_connectivity for row in selected]),
        ("max_abs_connectivity", [row.max_abs_connectivity for row in selected]),
        ("connectivity_spread", [row.connectivity_spread for row in selected]),
        ("spatial_concentration", [row.spatial_concentration for row in selected]),
        ("channel_energy_iqr", [row.channel_energy_iqr for row in selected]),
    ]
    return ImageRepresentation(
        name="connectivity_channel_image",
        x_axis="window_start_seconds",
        y_axis="graph_channel_feature",
        x_labels=[f"{row.start_seconds:.0f}" for row in selected],
        y_labels=[name for name, _ in rows],
        pixels=[_normalize(values) for _, values in rows],
        provenance="Generated from synthetic graph/channel features for GNN and channel-selection design review.",
    )


def _select_windows(features: list[WindowFeatures], max_windows: int) -> list[WindowFeatures]:
    if len(features) <= max_windows:
        return list(features)
    step = len(features) / max_windows
    return [features[int(index * step)] for index in range(max_windows)]


def _normalize(values: list[float]) -> list[float]:
    if not values:
        return []
    low = min(values)
    high = max(values)
    if high == low:
        return [0.0 for _ in values]
    return [(value - low) / (high - low) for value in values]
