from __future__ import annotations

from dataclasses import asdict, dataclass
from statistics import fmean

from .distillation import DistillationReport
from .features import WindowFeatures, feature_vector


@dataclass(frozen=True)
class FeatureContribution:
    feature: str
    mean_abs_contribution: float
    signed_mean_contribution: float
    direction: str

    def to_dict(self) -> dict[str, object]:
        return asdict(self)


@dataclass(frozen=True)
class ExplainabilityReport:
    method: str
    top_features: list[FeatureContribution]
    notes: list[str]

    def to_dict(self) -> dict[str, object]:
        return {
            "method": self.method,
            "top_features": [feature.to_dict() for feature in self.top_features],
            "notes": self.notes,
        }


def explain_student_model(
    features: list[WindowFeatures],
    distillation: DistillationReport,
    top_n: int = 8,
) -> ExplainabilityReport:
    if not features:
        raise ValueError("at least one feature row is required")
    names = distillation.feature_names
    vectors = [feature_vector(row) for row in features]
    contributions: list[FeatureContribution] = []
    for index, name in enumerate(names):
        signed = [distillation.weights[index] * vector[index] for vector in vectors]
        signed_mean = fmean(signed)
        mean_abs = fmean(abs(value) for value in signed)
        contributions.append(
            FeatureContribution(
                feature=name,
                mean_abs_contribution=mean_abs,
                signed_mean_contribution=signed_mean,
                direction="raises_risk" if signed_mean >= 0.0 else "lowers_risk",
            )
        )
    ranked = sorted(contributions, key=lambda item: item.mean_abs_contribution, reverse=True)[:top_n]
    return ExplainabilityReport(
        method="distilled_student_weight_times_normalized_feature",
        top_features=ranked,
        notes=[
            "This is deterministic model introspection for the portfolio student model.",
            "It is not a clinical explanation and must be validated against patient data before any medical use.",
        ],
    )
