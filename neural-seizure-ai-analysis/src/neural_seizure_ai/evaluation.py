from __future__ import annotations

from dataclasses import asdict, dataclass
from statistics import fmean

from .config import BrainState
from .features import WindowFeatures
from .models import Prediction


@dataclass(frozen=True)
class EvaluationMetrics:
    true_positive: int
    false_positive: int
    true_negative: int
    false_negative: int
    sensitivity: float
    specificity: float
    precision: float
    false_predictions_per_hour: float
    first_alert_seconds: float | None
    lead_time_seconds: float | None
    mean_positive_probability: float
    mean_negative_probability: float

    def to_dict(self) -> dict[str, float | int | None]:
        return asdict(self)


def evaluate_predictions(
    features: list[WindowFeatures],
    predictions: list[Prediction],
    ictal_start_seconds: float,
    duration_seconds: float,
) -> EvaluationMetrics:
    if len(features) != len(predictions):
        raise ValueError("features and predictions must have the same length")

    tp = fp = tn = fn = 0
    first_alert_seconds: float | None = None
    positive_probabilities = []
    negative_probabilities = []

    for row, prediction in zip(features, predictions):
        expected_positive = row.label in {BrainState.PREICTAL, BrainState.ICTAL}
        if expected_positive:
            positive_probabilities.append(prediction.probability)
        else:
            negative_probabilities.append(prediction.probability)

        if prediction.predicted_preictal and first_alert_seconds is None:
            first_alert_seconds = row.start_seconds

        if prediction.predicted_preictal and expected_positive:
            tp += 1
        elif prediction.predicted_preictal and not expected_positive:
            fp += 1
        elif not prediction.predicted_preictal and expected_positive:
            fn += 1
        else:
            tn += 1

    sensitivity = tp / (tp + fn) if (tp + fn) else 0.0
    specificity = tn / (tn + fp) if (tn + fp) else 0.0
    precision = tp / (tp + fp) if (tp + fp) else 0.0
    hours = max(duration_seconds / 3600.0, 1e-9)
    lead_time = None
    if first_alert_seconds is not None and first_alert_seconds < ictal_start_seconds:
        lead_time = ictal_start_seconds - first_alert_seconds

    return EvaluationMetrics(
        true_positive=tp,
        false_positive=fp,
        true_negative=tn,
        false_negative=fn,
        sensitivity=sensitivity,
        specificity=specificity,
        precision=precision,
        false_predictions_per_hour=fp / hours,
        first_alert_seconds=first_alert_seconds,
        lead_time_seconds=lead_time,
        mean_positive_probability=fmean(positive_probabilities) if positive_probabilities else 0.0,
        mean_negative_probability=fmean(negative_probabilities) if negative_probabilities else 0.0,
    )

