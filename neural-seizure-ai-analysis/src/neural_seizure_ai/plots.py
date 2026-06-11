from __future__ import annotations

from pathlib import Path

from .config import SimulationConfig
from .ekg import SyntheticEkgGenerator
from .features import WindowFeatures
from .pipeline import DemoResult
from .representations import ImageRepresentation, build_time_frequency_image
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
    risk_path = output_dir / "risk-warning-timeline.svg"
    algorithm_path = output_dir / "algorithm-coverage-map.svg"
    image_path = output_dir / "time-frequency-image-map.svg"
    trace_path.write_text(_trace_svg(neural_samples, ekg_samples, config), encoding="utf-8")
    feature_path.write_text(_feature_svg(result.feature_rows), encoding="utf-8")
    risk_path.write_text(_risk_svg(result, config), encoding="utf-8")
    algorithm_path.write_text(_algorithm_svg(), encoding="utf-8")
    image_path.write_text(_image_representation_svg(build_time_frequency_image(result.feature_rows)), encoding="utf-8")
    return [trace_path, feature_path, risk_path, algorithm_path, image_path]


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


def _risk_svg(result: DemoResult, config: SimulationConfig) -> str:
    width = 1120
    height = 520
    margin = 64
    x_max = max((row.end_seconds for row in result.feature_rows), default=max(1.0, config.duration_seconds))
    teacher = [(row.start_seconds, prediction.probability) for row, prediction in zip(result.feature_rows, result.teacher_predictions)]
    student = [(row.start_seconds, prediction.probability) for row, prediction in zip(result.feature_rows, result.student_predictions)]
    fused = [(row.start_seconds, prediction.probability) for row, prediction in zip(result.feature_rows, result.fused_predictions)]
    teacher_line = _polyline(teacher, margin, 390, width - margin, 105, 0.0, x_max, 0.0, 1.0)
    student_line = _polyline(student, margin, 390, width - margin, 105, 0.0, x_max, 0.0, 1.0)
    fused_line = _polyline(fused, margin, 390, width - margin, 105, 0.0, x_max, 0.0, 1.0)
    threshold_y = _scale(result.distillation.decision_threshold, 0.0, 1.0, 390, 105)
    preictal_x = _scale(config.preictal_start_seconds, 0.0, x_max, margin, width - margin)
    ictal_x = _scale(config.ictal_start_seconds, 0.0, x_max, margin, width - margin)
    warning_markers = []
    for event in result.post_processing.events:
        x = _scale(event.start_seconds, 0.0, x_max, margin, width - margin)
        color = "#16a34a" if event.actionable else "#f59e0b"
        warning_markers.append(f'<circle cx="{x:.1f}" cy="{threshold_y:.1f}" r="7" fill="{color}" stroke="#0f172a" stroke-width="1"/>')

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="Seizure risk warning timeline">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="{margin}" y="38" font-family="Arial" font-size="24" fill="#0f172a">Seizure Risk Timeline With SPH/SOH Post-Processing</text>
  <text x="{margin}" y="62" font-family="Arial" font-size="13" fill="#475569">Teacher, distilled student, EKG-fused risk, hysteresis threshold, and warning events.</text>
  <line x1="{margin}" y1="{threshold_y:.1f}" x2="{width - margin}" y2="{threshold_y:.1f}" stroke="#64748b" stroke-width="2" stroke-dasharray="8 6"/>
  <text x="{width - margin - 150}" y="{threshold_y - 8:.1f}" font-family="Arial" font-size="12" fill="#334155">student threshold {result.distillation.decision_threshold:.2f}</text>
  <line x1="{preictal_x:.1f}" y1="88" x2="{preictal_x:.1f}" y2="410" stroke="#f59e0b" stroke-width="2" stroke-dasharray="7 6"/>
  <line x1="{ictal_x:.1f}" y1="88" x2="{ictal_x:.1f}" y2="410" stroke="#dc2626" stroke-width="2" stroke-dasharray="7 6"/>
  <text x="{preictal_x + 6:.1f}" y="100" font-family="Arial" font-size="12" fill="#92400e">pre-ictal</text>
  <text x="{ictal_x + 6:.1f}" y="118" font-family="Arial" font-size="12" fill="#991b1b">ictal onset</text>
  <polyline points="{teacher_line}" fill="none" stroke="#7c3aed" stroke-width="2"/>
  <polyline points="{student_line}" fill="none" stroke="#075fc6" stroke-width="2"/>
  <polyline points="{fused_line}" fill="none" stroke="#0f766e" stroke-width="2"/>
  {''.join(warning_markers)}
  <text x="{margin}" y="438" font-family="Arial" font-size="13" fill="#7c3aed">teacher ensemble</text>
  <text x="{margin + 150}" y="438" font-family="Arial" font-size="13" fill="#075fc6">distilled student</text>
  <text x="{margin + 300}" y="438" font-family="Arial" font-size="13" fill="#0f766e">student + EKG context</text>
  <text x="{margin}" y="468" font-family="Arial" font-size="13" fill="#334155">Warnings: {result.post_processing.warning_count}; actionable: {result.post_processing.actionable_warning_count}; false: {result.post_processing.false_warning_count}; best lead: {result.post_processing.best_lead_time_seconds}</text>
  <line x1="{margin}" y1="488" x2="{width - margin}" y2="488" stroke="#cbd5e1"/>
  <text x="{margin}" y="510" font-family="Arial" font-size="12" fill="#64748b">0s</text>
  <text x="{width - margin - 40}" y="510" font-family="Arial" font-size="12" fill="#64748b">{x_max:.0f}s</text>
</svg>
"""


def _algorithm_svg() -> str:
    width = 1120
    height = 720
    margin = 58
    rows = [
        ("EEG acquisition", "EEG/ECoG/iEEG/microarray synthetic profiles", "#2563eb"),
        ("Preprocessing", "baseline removal, normalization, windowing", "#0f766e"),
        ("Time-frequency", "bandpower, HFO, Haar wavelet detail energy", "#7c3aed"),
        ("Nonlinear statistics", "sample entropy, wavelet entropy, Katz/Higuchi FD", "#dc2626"),
        ("Connectivity", "Pearson channel graph, spread, spatial concentration", "#ea580c"),
        ("Deep model proxies", "CNN, LSTM, transformer, GNN teacher heuristics", "#0891b2"),
        ("Distillation", "logistic edge student + C export", "#4d7c0f"),
        ("Post-processing", "EMA hysteresis, SPH, SOH, false-warning control", "#9333ea"),
        ("Multimodal context", "BeagleBone AD8232 EKG/ECG auxiliary fusion", "#0f766e"),
        ("Safety/XAI", "feature contribution evidence and research-only gates", "#334155"),
    ]
    cards = []
    for index, (title, detail, color) in enumerate(rows):
        y = 96 + index * 58
        cards.append(
            f'<rect x="{margin}" y="{y}" width="{width - 2 * margin}" height="44" rx="6" fill="#ffffff" stroke="#cbd5e1"/>'
            f'<rect x="{margin}" y="{y}" width="8" height="44" rx="4" fill="{color}"/>'
            f'<text x="{margin + 24}" y="{y + 18}" font-family="Arial" font-size="15" font-weight="700" fill="#0f172a">{title}</text>'
            f'<text x="{margin + 280}" y="{y + 18}" font-family="Arial" font-size="13" fill="#475569">{detail}</text>'
        )

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="IEEE review algorithm coverage map">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="{margin}" y="40" font-family="Arial" font-size="24" fill="#0f172a">IEEE 11031450 / EEG Review Algorithm Coverage Map</text>
  <text x="{margin}" y="64" font-family="Arial" font-size="13" fill="#475569">Dependency-free implementation coverage for the Predictive AI Neural Seizure Analysis project.</text>
  {''.join(cards)}
  <text x="{margin}" y="690" font-family="Arial" font-size="12" fill="#64748b">Research simulation only. Not for diagnosis, monitoring, treatment, or autonomous intervention.</text>
</svg>
"""


def _image_representation_svg(image: ImageRepresentation) -> str:
    width = 1120
    height = 560
    margin = 72
    grid_width = width - 2 * margin
    grid_height = 330
    rows = len(image.pixels)
    cols = max((len(row) for row in image.pixels), default=1)
    cell_width = grid_width / max(cols, 1)
    cell_height = grid_height / max(rows, 1)
    cells = []
    for row_index, row in enumerate(image.pixels):
        for col_index, value in enumerate(row):
            x = margin + col_index * cell_width
            y = 120 + row_index * cell_height
            cells.append(
                f'<rect x="{x:.1f}" y="{y:.1f}" width="{cell_width + 0.3:.1f}" height="{cell_height + 0.3:.1f}" fill="{_heat_color(value)}"/>'
            )
    labels = []
    for row_index, label in enumerate(image.y_labels):
        y = 120 + row_index * cell_height + cell_height / 2.0 + 4
        labels.append(f'<text x="18" y="{y:.1f}" font-family="Arial" font-size="12" fill="#334155">{label}</text>')
    for index in range(0, len(image.x_labels), max(1, len(image.x_labels) // 8 or 1)):
        x = margin + index * cell_width
        labels.append(f'<text x="{x:.1f}" y="478" font-family="Arial" font-size="11" fill="#64748b">{image.x_labels[index]}s</text>')

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="EEG image representation heatmap">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="{margin}" y="40" font-family="Arial" font-size="24" fill="#0f172a">Image-Based EEG Representation</text>
  <text x="{margin}" y="64" font-family="Arial" font-size="13" fill="#475569">{image.name}: bandpower windows converted into a CNN/pretrained-model style heatmap.</text>
  <rect x="{margin}" y="120" width="{grid_width}" height="{grid_height}" fill="#ffffff" stroke="#cbd5e1"/>
  {''.join(cells)}
  {''.join(labels)}
  <text x="{margin}" y="520" font-family="Arial" font-size="12" fill="#64748b">{image.provenance}</text>
</svg>
"""


def _heat_color(value: float) -> str:
    value = max(0.0, min(1.0, value))
    stops = [
        (240, 249, 255),
        (125, 211, 252),
        (37, 99, 235),
        (124, 58, 237),
        (220, 38, 38),
    ]
    scaled = value * (len(stops) - 1)
    index = min(len(stops) - 2, int(scaled))
    blend = scaled - index
    left = stops[index]
    right = stops[index + 1]
    rgb = tuple(int(left[channel] * (1.0 - blend) + right[channel] * blend) for channel in range(3))
    return f"rgb({rgb[0]},{rgb[1]},{rgb[2]})"


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
