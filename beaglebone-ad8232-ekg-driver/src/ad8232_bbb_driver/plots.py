from __future__ import annotations

from pathlib import Path

from .filters import moving_average, remove_baseline
from .iio import Ad8232Sample
from .recorder import CaptureReport


def write_waveform_plot(samples: list[Ad8232Sample], report: CaptureReport, output_dir: Path) -> Path:
    output_dir.mkdir(parents=True, exist_ok=True)
    path = output_dir / "ad8232-waveform.svg"
    path.write_text(_waveform_svg(samples, report), encoding="utf-8")
    return path


def _waveform_svg(samples: list[Ad8232Sample], report: CaptureReport) -> str:
    width = 1120
    height = 520
    margin = 64
    plot_top = 96
    plot_bottom = 424
    plot_right = width - margin
    values = [sample.millivolts for sample in samples]
    filtered = moving_average(remove_baseline(values, max(3, report.sample_rate_hz // 2)), max(3, report.sample_rate_hz // 40))
    timestamps = [sample.timestamp_seconds for sample in samples]
    stride = max(1, len(samples) // 900)
    raw_points = [(timestamps[index], values[index]) for index in range(0, len(samples), stride)]
    filtered_points = [(timestamps[index], filtered[index]) for index in range(0, len(samples), stride)]
    duration = max(report.duration_seconds, timestamps[-1] if timestamps else 1.0, 1.0)
    raw_line = _polyline(raw_points, margin, plot_bottom, plot_right, plot_top, 0.0, duration)
    filtered_line = _polyline(filtered_points, margin, plot_bottom - 50, plot_right, plot_top + 70, 0.0, duration)
    lead_off_segments = _lead_off_segments(samples, margin, plot_right, plot_top, plot_bottom, duration)
    bpm = f"{report.heart_rate.heart_rate_bpm:.1f} bpm" if report.heart_rate.heart_rate_bpm else "not locked"
    quality = f"{report.heart_rate.signal_quality:.2f}"
    lead_off = f"{report.heart_rate.lead_off_fraction:.1%}"

    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="AD8232 BeagleBone EKG waveform">
  <rect width="100%" height="100%" fill="#f8fafc"/>
  <text x="{margin}" y="38" font-family="Arial" font-size="24" fill="#0f172a">AD8232 Single-Lead EKG on BeagleBone ADC</text>
  <text x="{margin}" y="62" font-family="Arial" font-size="13" fill="#475569">Simulated acquisition path: AD8232 OUT -> protected BBB AIN -> Linux IIO raw samples -> heart-rate evidence.</text>
  <rect x="{margin}" y="{plot_top}" width="{plot_right - margin}" height="{plot_bottom - plot_top}" fill="#ffffff" stroke="#cbd5e1"/>
  {lead_off_segments}
  <line x1="{margin}" y1="{plot_bottom}" x2="{plot_right}" y2="{plot_bottom}" stroke="#cbd5e1"/>
  <line x1="{margin}" y1="{plot_top}" x2="{margin}" y2="{plot_bottom}" stroke="#cbd5e1"/>
  <polyline points="{raw_line}" fill="none" stroke="#94a3b8" stroke-width="1.4" opacity="0.75"/>
  <polyline points="{filtered_line}" fill="none" stroke="#0f766e" stroke-width="2.2"/>
  <circle cx="{plot_right - 278}" cy="462" r="5" fill="#94a3b8"/>
  <text x="{plot_right - 266}" y="466" font-family="Arial" font-size="12" fill="#475569">sensor-side mV after divider reconstruction</text>
  <circle cx="{plot_right - 278}" cy="488" r="5" fill="#0f766e"/>
  <text x="{plot_right - 266}" y="492" font-family="Arial" font-size="12" fill="#475569">baseline-removed R-peak view</text>
  <text x="{margin}" y="462" font-family="Arial" font-size="13" fill="#0f172a">Heart rate: {bpm}</text>
  <text x="{margin}" y="486" font-family="Arial" font-size="13" fill="#0f172a">Quality: {quality}  Lead-off: {lead_off}  Samples: {report.heart_rate.sample_count}</text>
  <text x="{margin}" y="444" font-family="Arial" font-size="12" fill="#64748b">0s</text>
  <text x="{plot_right - 40}" y="444" font-family="Arial" font-size="12" fill="#64748b">{duration:.0f}s</text>
</svg>
"""


def _lead_off_segments(
    samples: list[Ad8232Sample],
    x1: float,
    x2: float,
    y1: float,
    y2: float,
    duration: float,
) -> str:
    segments = []
    for sample in samples:
        if not sample.lead_off:
            continue
        x = _scale(sample.timestamp_seconds, 0.0, duration, x1, x2)
        segments.append(f'<line x1="{x:.1f}" y1="{y1}" x2="{x:.1f}" y2="{y2}" stroke="#fecaca" stroke-width="1"/>')
    return "".join(segments)


def _polyline(
    points: list[tuple[float, float]],
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    xmin: float,
    xmax: float,
) -> str:
    if not points:
        return ""
    values = [value for _, value in points]
    low = min(values)
    high = max(values)
    if high == low:
        high = low + 1.0
    padding = (high - low) * 0.08
    low -= padding
    high += padding
    return " ".join(
        f"{_scale(timestamp, xmin, xmax, x1, x2):.1f},{_scale(value, low, high, y1, y2):.1f}"
        for timestamp, value in points
    )


def _scale(value: float, old_min: float, old_max: float, new_min: float, new_max: float) -> float:
    if old_max == old_min:
        return new_min
    ratio = (value - old_min) / (old_max - old_min)
    return new_min + ratio * (new_max - new_min)
