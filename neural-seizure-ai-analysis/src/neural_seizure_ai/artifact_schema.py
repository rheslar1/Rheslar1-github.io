from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Iterable


DEMO_REPORT_REQUIRED_KEYS = {
    "config",
    "sample_count",
    "window_count",
    "teacher_metrics",
    "student_metrics",
    "distillation",
    "teacher_budget",
    "student_budget",
    "safety_case",
    "ekg_feature_rows",
    "teacher_predictions",
    "student_predictions",
    "fused_predictions",
    "fused_metrics",
    "post_processing",
    "explainability",
}

WINDOW_FEATURE_COLUMNS = (
    "start_seconds",
    "end_seconds",
    "label",
    "avg_energy",
    "avg_line_length",
    "zero_crossing_rate",
    "delta_power",
    "theta_power",
    "alpha_power",
    "beta_power",
    "gamma_power",
    "hfo_power",
    "hfo_to_beta",
    "hfo_to_total",
    "pac_proxy",
    "wavelet_detail_energy",
    "wavelet_entropy",
    "sample_entropy",
    "katz_fractal_dimension",
    "higuchi_fractal_dimension",
    "mean_abs_connectivity",
    "max_abs_connectivity",
    "connectivity_spread",
    "spatial_concentration",
    "channel_energy_iqr",
)

EKG_FEATURE_COLUMNS = (
    "start_seconds",
    "end_seconds",
    "sample_count",
    "mean_mv",
    "peak_to_peak_mv",
    "heart_rate_bpm",
    "rr_std_ms",
    "rmssd_ms",
    "peak_count",
    "lead_off_fraction",
    "signal_quality",
    "autonomic_stress",
)


def validate_demo_report_dict(report: dict[str, object]) -> None:
    missing = DEMO_REPORT_REQUIRED_KEYS - set(report)
    if missing:
        raise ValueError(f"demo-report.json missing required keys: {', '.join(sorted(missing))}")
    _require_number(report, "sample_count")
    _require_number(report, "window_count")
    if int(report["sample_count"]) <= 0:
        raise ValueError("demo-report.json sample_count must be positive.")
    if int(report["window_count"]) <= 0:
        raise ValueError("demo-report.json window_count must be positive.")
    _require_mapping(report, "config")
    _require_mapping(report, "teacher_metrics")
    _require_mapping(report, "student_metrics")
    _require_mapping(report, "distillation")
    _require_mapping(report, "teacher_budget")
    _require_mapping(report, "student_budget")
    _require_mapping(report, "safety_case")
    _require_mapping(report, "post_processing")
    _require_mapping(report, "explainability")
    _require_sequence(report, "teacher_predictions")
    _require_sequence(report, "student_predictions")
    _require_sequence(report, "fused_predictions")
    _require_sequence(report, "ekg_feature_rows")


def validate_window_feature_rows(rows: Iterable[dict[str, object]]) -> None:
    _validate_rows(list(rows), WINDOW_FEATURE_COLUMNS, "window-features.csv")


def validate_ekg_feature_rows(rows: Iterable[dict[str, object]]) -> None:
    _validate_rows(list(rows), EKG_FEATURE_COLUMNS, "bbb-ekg-features.csv")


def validate_written_artifacts(output_dir: Path) -> None:
    report_path = output_dir / "demo-report.json"
    feature_path = output_dir / "window-features.csv"
    ekg_path = output_dir / "bbb-ekg-features.csv"

    validate_demo_report_dict(json.loads(report_path.read_text(encoding="utf-8")))
    validate_window_feature_rows(_read_csv_rows(feature_path))
    if ekg_path.exists():
        validate_ekg_feature_rows(_read_csv_rows(ekg_path))


def _validate_rows(rows: list[dict[str, object]], required_columns: tuple[str, ...], artifact_name: str) -> None:
    if not rows:
        raise ValueError(f"{artifact_name} must contain at least one row.")
    missing = set(required_columns) - set(rows[0])
    if missing:
        raise ValueError(f"{artifact_name} missing required columns: {', '.join(sorted(missing))}")
    for index, row in enumerate(rows, start=1):
        for column in required_columns:
            value = row[column]
            if value in ("", None):
                raise ValueError(f"{artifact_name} row {index} has empty value for {column}.")
        if float(row["end_seconds"]) <= float(row["start_seconds"]):
            raise ValueError(f"{artifact_name} row {index} end_seconds must be greater than start_seconds.")


def _read_csv_rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def _require_number(report: dict[str, object], key: str) -> None:
    if not isinstance(report.get(key), (int, float)):
        raise ValueError(f"demo-report.json key {key} must be numeric.")


def _require_mapping(report: dict[str, object], key: str) -> None:
    if not isinstance(report.get(key), dict):
        raise ValueError(f"demo-report.json key {key} must be an object.")


def _require_sequence(report: dict[str, object], key: str) -> None:
    if not isinstance(report.get(key), list):
        raise ValueError(f"demo-report.json key {key} must be an array.")
