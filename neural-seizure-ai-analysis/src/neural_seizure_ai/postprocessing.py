from __future__ import annotations

from dataclasses import asdict, dataclass
from statistics import fmean

from .features import WindowFeatures
from .models import Prediction


@dataclass(frozen=True)
class WarningEvent:
    start_seconds: float
    end_seconds: float
    smoothed_probability: float
    consecutive_windows: int
    actionable: bool
    lead_time_seconds: float | None
    rationale: str

    def to_dict(self) -> dict[str, object]:
        return asdict(self)


@dataclass(frozen=True)
class PostProcessingReport:
    method: str
    threshold: float
    smoothing_alpha: float
    consecutive_windows_required: int
    seizure_prediction_horizon_seconds: float
    seizure_occurrence_horizon_seconds: float
    warning_count: int
    actionable_warning_count: int
    false_warning_count: int
    first_actionable_warning_seconds: float | None
    best_lead_time_seconds: float | None
    mean_smoothed_probability: float
    events: list[WarningEvent]

    def to_dict(self) -> dict[str, object]:
        data = asdict(self)
        data["events"] = [event.to_dict() for event in self.events]
        return data


def post_process_predictions(
    features: list[WindowFeatures],
    predictions: list[Prediction],
    ictal_start_seconds: float,
    duration_seconds: float,
    threshold: float,
    smoothing_alpha: float = 0.38,
    consecutive_windows_required: int = 2,
    seizure_prediction_horizon_seconds: float = 5.0,
    seizure_occurrence_horizon_seconds: float = 30.0,
) -> PostProcessingReport:
    if len(features) != len(predictions):
        raise ValueError("features and predictions must have the same length")
    if not features:
        raise ValueError("at least one feature row is required")

    smoothed = _smooth_probabilities([prediction.probability for prediction in predictions], smoothing_alpha)
    events: list[WarningEvent] = []
    consecutive = 0
    active_event = False

    for row, probability in zip(features, smoothed):
        if probability >= threshold:
            consecutive += 1
        else:
            consecutive = 0
            active_event = False
            continue

        if consecutive < consecutive_windows_required or active_event:
            continue

        warning_start = row.start_seconds
        actionable_start = warning_start + seizure_prediction_horizon_seconds
        actionable_end = actionable_start + seizure_occurrence_horizon_seconds
        actionable = actionable_start <= ictal_start_seconds <= actionable_end
        lead_time = ictal_start_seconds - warning_start if warning_start < ictal_start_seconds else None
        if warning_start > duration_seconds:
            actionable = False
            lead_time = None

        events.append(
            WarningEvent(
                start_seconds=warning_start,
                end_seconds=row.end_seconds,
                smoothed_probability=probability,
                consecutive_windows=consecutive,
                actionable=actionable,
                lead_time_seconds=lead_time,
                rationale=(
                    "EMA-smoothed risk exceeded threshold for consecutive windows; "
                    "SPH/SOH check determines whether the warning is actionable."
                ),
            )
        )
        active_event = True

    actionable_events = [event for event in events if event.actionable]
    false_warning_count = len(events) - len(actionable_events)
    best_lead = max((event.lead_time_seconds for event in actionable_events if event.lead_time_seconds is not None), default=None)
    first_actionable = actionable_events[0].start_seconds if actionable_events else None

    return PostProcessingReport(
        method="ema_hysteresis_sph_soh",
        threshold=threshold,
        smoothing_alpha=smoothing_alpha,
        consecutive_windows_required=consecutive_windows_required,
        seizure_prediction_horizon_seconds=seizure_prediction_horizon_seconds,
        seizure_occurrence_horizon_seconds=seizure_occurrence_horizon_seconds,
        warning_count=len(events),
        actionable_warning_count=len(actionable_events),
        false_warning_count=false_warning_count,
        first_actionable_warning_seconds=first_actionable,
        best_lead_time_seconds=best_lead,
        mean_smoothed_probability=fmean(smoothed) if smoothed else 0.0,
        events=events,
    )


def _smooth_probabilities(probabilities: list[float], alpha: float) -> list[float]:
    if not probabilities:
        return []
    alpha = max(0.0, min(1.0, alpha))
    smoothed = [probabilities[0]]
    for probability in probabilities[1:]:
        smoothed.append(alpha * probability + (1.0 - alpha) * smoothed[-1])
    return smoothed
