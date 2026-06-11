from __future__ import annotations

from pathlib import Path

from .config import SimulationConfig
from .ekg import SyntheticEkgGenerator
from .features import WindowFeatures
from .pipeline import DemoResult
from .signals import SyntheticNeuralSignalGenerator


def write_plot_evidence(config: SimulationConfig, result: DemoResult, output_dir: Path) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    neural_samples = SyntheticNeuralSignalGenerator(config).generate()
    ekg_samples = SyntheticEkgGenerator(
        duration_seconds=config.duration_seconds,
        preictal_start_seconds=config.preictal_start_seconds,
        ictal_start_seconds=config.ictal_start_seconds,
        seed=config.seed,
    ).generate()

    trace_path = output_dir / "synthetic-neural-ekg-traces.svg"
    feature_path = output_dir / "feature-trajectories.svg"
    trace_path.write_text(_trace_svg(neural_samples, ekg_samples, config), encoding="utf-8")
    feature_path.write_text(_feature_svg(result.feature_rows), encoding="utf-8")
    return [trace_path, feature_path]


def _trace_svg(neural_samples, ekg_samples, config: SimulationConfig) -> str:
    width = 1120
    height = 520
    margin = 64
    sample_stride = max(1, len(neural_samples) // 950)
    neural_points = [
        (sample.timestamp_seconds, sample.values_uv[0])
        for sample in neural_samples[::sample_stride]
        if sample.timestamp_seconds <= min(config.duration_seconds, 90.0)
    ]
    ekg_stride = max(1, len(ekg_samples) // 950)
    ekg_points = [
        (sample.timestamp_seconds, sample.millivolts)
        for sample in ekg_samples[::ekg_stride]
        if sample.timestamp_seconds <= min(config.duration_seconds, 90.0)
    ]
    x_max = min(config.duration_seconds, 90.0)
    neural_polyline = _polyline(neural_points, margin, 70, width - margin, 210, 0.0, x_max)
    ekg_polyline = _polyline(ekg_points, margin, 290, width - margin, 445, 0.0, x_max)
    preictal_x = _scale(config.preictal_start_seconds, 0.0, x_max, margin, width - margin)
    ictal_x = _scale(config.ictal_start_seconds, 0.0, x_max, margin, width - margin)

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Synthetic neural and BeagleBone EKG traces">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="{margin}" y="38" font-family="Arial" font-size="24" fill="#0f172a">Synthetic Neural Trace + BeagleBone EKG Context</text>
  <text x="{margin}" y="62" font-family="Arial" font-size="13" fill="#475569">Research simulation only: EKG is auxiliary autonomic context, not a neural replacement.</text>
  <line x1="{preictal_x:.1f}" y1="74" x2="{preictal_x:.1f}" y2="455" stroke="#f59e0b" stroke-width="2" stroke-dasharray="7 6"/>
  <line x1="{ictal_x:.1f}" y1="74" x2="{ictal_x:.1f}" y2="455" stroke="#dc2626" stroke-width="2" stroke-dasharray="7 6"/>
  <text x="{preictal_x + 6:.1f}" y="92" font-family="Arial" font-size="12" fill="#92400e">pre-ictal cues begin</text>
  <text x="{ictal_x + 6:.1f}" y="112" font-family="Arial" font-size="12" fill="#991b1b">ictal onset marker</text>
  <text x="{margin}" y="94" font-family="Arial" font-size="15" fill="#0f172a">Neural channel 0 (normalized synthetic signal)</text>
  <polyline points="{neural_polyline}" fill="none" stroke="#075fc6" stroke-width="2"/>
  <text x="{margin}" y="278" font-family="Arial" font-size="15" fill="#0f172a">BeagleBone EKG / ECG AIN context (mV)</text>
  <polyline points="{ekg_polyline}" fill="none" stroke="#0f766e" stroke-width="2"/>
  <line x1="{margin}" y1="470" x2="{width - margin}" y2="470" stroke="#cbd5e1"/>
  <text x="{margin}" y="495" font-family="Arial" font-size="12" fill="#64748b">0s</text>
  <text x="{width - margin - 40}" y="495" font-family="Arial" font-size="12" fill="#64748b">{x_max:.0f}s</text>
</svg>
"""


def _feature_svg(features: list[WindowFeatures]) -> str:
    width = 1120
    height = 660
    margin = 64
    x_max = max((row.end_seconds for row in features), default=1.0)
    series = {
        "HFO / total": ([row.hfo_to_total for row in features], "#075fc6", 170),
        "PAC proxy": ([row.pac_proxy for row in features], "#7c3aed", 295),
        "Connectivity": ([row.mean_abs_connectivity for row in features], "#0f766e", 420),
        "Energy": ([min(row.avg_energy / 3.0, 1.0) for row in features], "#dc2626", 545),
    }
    lines = []
    labels = []
    for label, (values, color, baseline) in series.items():
        points = [(row.start_seconds, value) for row, value in zip(features, values)]
        lines.append(f'<polyline points="{_polyline(points, margin, baseline + 70, width - margin, baseline - 70, 0.0, x_max, 0.0, 1.0)}" fill="none" stroke="{color}" stroke-width="2"/>')
        labels.append(f'<text x="{margin}" y="{baseline - 82}" font-family="Arial" font-size="14" fill="{color}">{label}</text>')
        lines.append(f'<line x1="{margin}" y1="{baseline}" x2="{width - margin}" y2="{baseline}" stroke="#e2e8f0"/>')

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Predictive AI feature trajectories">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="{margin}" y="38" font-family="Arial" font-size="24" fill="#0f172a">Synthetic Pre-Ictal Feature Trajectories</text>
  <text x="{margin}" y="62" font-family="Arial" font-size="13" fill="#475569">Feature curves used by the teacher ensemble and distilled edge student.</text>
  {''.join(labels)}
  {''.join(lines)}
  <line x1="{margin}" y1="620" x2="{width - margin}" y2="620" stroke="#cbd5e1"/>
  <text x="{margin}" y="642" font-family="Arial" font-size="12" fill="#64748b">window time</text>
</svg>
"""


def _polyline(
    points: list[tuple[float, float]],
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    xmin: float,
    xmax: float,
    ymin: float | None = None,
    ymax: float | None = None,
) -> str:
    if not points:
        return ""
    values = [value for _, value in points]
    low = min(values) if ymin is None else ymin
    high = max(values) if ymax is None else ymax
    if high == low:
        high = low + 1.0
    return " ".join(
        f"{_scale(timestamp, xmin, xmax, x1, x2):.1f},{_scale(value, low, high, y1, y2):.1f}"
        for timestamp, value in points
    )


def _scale(value: float, old_min: float, old_max: float, new_min: float, new_max: float) -> float:
    if old_max == old_min:
        return new_min
    ratio = (value - old_min) / (old_max - old_min)
    return new_min + ratio * (new_max - new_min)
