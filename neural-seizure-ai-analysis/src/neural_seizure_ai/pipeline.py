from __future__ import annotations

import csv
import json
from dataclasses import asdict, dataclass
from pathlib import Path

from .config import SimulationConfig
from .distillation import DistillationReport, StudentLogisticModel, distill_student
from .edge_budget import EdgeBudget, estimate_student_budget, estimate_teacher_budget
from .ekg import EkgFeatureWindow, EkgSample, SyntheticEkgGenerator, extract_ekg_feature_windows
from .evaluation import EvaluationMetrics, evaluate_predictions
from .explainability import ExplainabilityReport, explain_student_model
from .features import FeatureExtractor, WindowFeatures, feature_names
from .fusion import fuse_student_with_ekg
from .models import Prediction, TeacherEnsemble
from .postprocessing import PostProcessingReport, post_process_predictions
from .preprocessing import preprocess_samples, window_samples
from .safety import SafetyCase, build_safety_case
from .signals import SyntheticNeuralSignalGenerator


@dataclass(frozen=True)
class DemoResult:
    config: dict[str, object]
    sample_count: int
    window_count: int
    teacher_metrics: EvaluationMetrics
    student_metrics: EvaluationMetrics
    distillation: DistillationReport
    teacher_budget: EdgeBudget
    student_budget: EdgeBudget
    safety_case: SafetyCase
    feature_rows: list[WindowFeatures]
    ekg_feature_rows: list[EkgFeatureWindow]
    teacher_predictions: list[Prediction]
    student_predictions: list[Prediction]
    fused_predictions: list[Prediction]
    fused_metrics: EvaluationMetrics | None
    post_processing: PostProcessingReport
    explainability: ExplainabilityReport

    def to_dict(self) -> dict[str, object]:
        return {
            "config": self.config,
            "sample_count": self.sample_count,
            "window_count": self.window_count,
            "teacher_metrics": self.teacher_metrics.to_dict(),
            "student_metrics": self.student_metrics.to_dict(),
            "distillation": asdict(self.distillation),
            "teacher_budget": self.teacher_budget.to_dict(),
            "student_budget": self.student_budget.to_dict(),
            "safety_case": self.safety_case.to_dict(),
            "ekg_feature_rows": [row.to_dict() for row in self.ekg_feature_rows],
            "teacher_predictions": [asdict(prediction) for prediction in self.teacher_predictions],
            "student_predictions": [asdict(prediction) for prediction in self.student_predictions],
            "fused_predictions": [asdict(prediction) for prediction in self.fused_predictions],
            "fused_metrics": self.fused_metrics.to_dict() if self.fused_metrics is not None else None,
            "post_processing": self.post_processing.to_dict(),
            "explainability": self.explainability.to_dict(),
        }


def run_demo(
    config: SimulationConfig | None = None,
    output_dir: Path | None = None,
    ekg_samples: list[EkgSample] | None = None,
    include_synthetic_ekg: bool = True,
) -> DemoResult:
    config = config or SimulationConfig()
    generator = SyntheticNeuralSignalGenerator(config)
    raw_samples = generator.generate()
    baseline_window = max(3, int(config.sampling_rate_hz * 0.75))
    processed_samples = preprocess_samples(raw_samples, baseline_window_samples=baseline_window)
    windows = window_samples(
        processed_samples,
        sampling_rate_hz=config.sampling_rate_hz,
        window_seconds=config.window_seconds,
        stride_seconds=config.stride_seconds,
    )

    extractor = FeatureExtractor(config.sampling_rate_hz)
    feature_rows = [extractor.extract(window) for window in windows]

    teacher = TeacherEnsemble()
    teacher.reset()
    teacher_predictions = [teacher.predict(row) for row in feature_rows]
    teacher_probabilities = [prediction.probability for prediction in teacher_predictions]

    student, distillation = distill_student(feature_rows, teacher_probabilities)
    student_predictions = [student.predict(row) for row in feature_rows]
    post_processing = post_process_predictions(
        feature_rows,
        student_predictions,
        ictal_start_seconds=config.ictal_start_seconds,
        duration_seconds=config.duration_seconds,
        threshold=distillation.decision_threshold,
    )
    explainability = explain_student_model(feature_rows, distillation)
    ekg_feature_rows: list[EkgFeatureWindow] = []
    fused_predictions: list[Prediction] = []
    fused_metrics: EvaluationMetrics | None = None

    if include_synthetic_ekg or ekg_samples is not None:
        if ekg_samples is None:
            ekg_samples = SyntheticEkgGenerator(
                duration_seconds=config.duration_seconds,
                preictal_start_seconds=config.preictal_start_seconds,
                ictal_start_seconds=config.ictal_start_seconds,
                seed=config.seed,
            ).generate()
        ekg_feature_rows = extract_ekg_feature_windows(
            ekg_samples,
            [(row.start_seconds, row.end_seconds) for row in feature_rows],
        )
        fused_predictions = fuse_student_with_ekg(
            student_predictions,
            ekg_feature_rows,
            threshold=distillation.decision_threshold,
        )
        fused_metrics = evaluate_predictions(
            feature_rows,
            fused_predictions,
            ictal_start_seconds=config.ictal_start_seconds,
            duration_seconds=config.duration_seconds,
        )

    teacher_metrics = evaluate_predictions(
        feature_rows,
        teacher_predictions,
        ictal_start_seconds=config.ictal_start_seconds,
        duration_seconds=config.duration_seconds,
    )
    student_metrics = evaluate_predictions(
        feature_rows,
        student_predictions,
        ictal_start_seconds=config.ictal_start_seconds,
        duration_seconds=config.duration_seconds,
    )

    teacher_budget = estimate_teacher_budget(feature_count=len(feature_names()), teacher_models=len(teacher.models))
    student_budget = estimate_student_budget(feature_count=len(feature_names()))
    safety_case = build_safety_case(student_metrics)

    result = DemoResult(
        config={
            "sensor": config.sensor,
            "sensor_name": config.profile.name,
            "channels": config.profile.channels,
            "sampling_rate_hz": config.sampling_rate_hz,
            "duration_seconds": config.duration_seconds,
            "preictal_start_seconds": config.preictal_start_seconds,
            "ictal_start_seconds": config.ictal_start_seconds,
            "window_seconds": config.window_seconds,
            "stride_seconds": config.stride_seconds,
            "seed": config.seed,
        },
        sample_count=len(raw_samples),
        window_count=len(feature_rows),
        teacher_metrics=teacher_metrics,
        student_metrics=student_metrics,
        distillation=distillation,
        teacher_budget=teacher_budget,
        student_budget=student_budget,
        safety_case=safety_case,
        feature_rows=feature_rows,
        ekg_feature_rows=ekg_feature_rows,
        teacher_predictions=teacher_predictions,
        student_predictions=student_predictions,
        fused_predictions=fused_predictions,
        fused_metrics=fused_metrics,
        post_processing=post_processing,
        explainability=explainability,
    )

    if output_dir is not None:
        _write_outputs(output_dir, result)

    return result


def _write_outputs(output_dir: Path, result: DemoResult) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    report_path = output_dir / "demo-report.json"
    feature_path = output_dir / "window-features.csv"
    ekg_path = output_dir / "bbb-ekg-features.csv"
    report_path.write_text(json.dumps(result.to_dict(), indent=2), encoding="utf-8")

    if result.feature_rows:
        rows = [row.to_dict() for row in result.feature_rows]
        with feature_path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
            writer.writeheader()
            writer.writerows(rows)

    if result.ekg_feature_rows:
        rows = [row.to_dict() for row in result.ekg_feature_rows]
        with ekg_path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
            writer.writeheader()
            writer.writerows(rows)
