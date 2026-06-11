from __future__ import annotations

from dataclasses import asdict, dataclass

from .evaluation import EvaluationMetrics


@dataclass(frozen=True)
class SafetyRisk:
    hazard: str
    risk: str
    mitigation: str
    verification: str


@dataclass(frozen=True)
class SafetyCase:
    project_boundary: str
    required_gates: list[str]
    risk_register: list[SafetyRisk]
    metric_flags: list[str]

    def to_dict(self) -> dict[str, object]:
        data = asdict(self)
        data["risk_register"] = [asdict(risk) for risk in self.risk_register]
        return data


def build_safety_case(metrics: EvaluationMetrics) -> SafetyCase:
    flags: list[str] = []
    if metrics.false_positive > 0:
        flags.append("false_positive_review_required")
    if metrics.false_negative > 0:
        flags.append("false_negative_review_required")
    if metrics.lead_time_seconds is None:
        flags.append("no_preictal_lead_time_observed")

    return SafetyCase(
        project_boundary=(
            "Synthetic research pipeline only. It must not be used for diagnosis, therapy, "
            "closed-loop stimulation, medication delivery, or patient monitoring."
        ),
        required_gates=[
            "IRB/ethics approval before any patient data use.",
            "Patient consent, de-identification, and access logging for neural data.",
            "Dataset shift analysis across patient, sensor, medication, and sleep-state conditions.",
            "Human clinician review before any action or intervention.",
            "Independent validation on held-out clinical datasets and hardware-in-the-loop targets.",
            "Fail-safe behavior that treats model uncertainty as no autonomous intervention authority.",
        ],
        risk_register=[
            SafetyRisk(
                hazard="False positive pre-ictal alert",
                risk="Alarm fatigue, anxiety, or unnecessary intervention.",
                mitigation="Tune alert thresholds per patient and require clinician-facing confidence display.",
                verification="Measure false predictions per hour on held-out patient sessions.",
            ),
            SafetyRisk(
                hazard="False negative missed pre-ictal state",
                risk="No warning before seizure onset.",
                mitigation="Use conservative monitoring, redundancy, and explicit uncertainty states.",
                verification="Track sensitivity and lead time across seizure types and patients.",
            ),
            SafetyRisk(
                hazard="Neural data privacy exposure",
                risk="Highly sensitive biosignal data may reveal health or behavioral state.",
                mitigation="Encrypt at rest and in transit; minimize retention; audit access.",
                verification="Security review, threat model, and access-log inspection.",
            ),
            SafetyRisk(
                hazard="Opaque model decision",
                risk="Clinical reviewer cannot understand why an alert occurred.",
                mitigation="Expose HFO, PAC, line length, connectivity, and trend evidence per alert.",
                verification="Explainability review with feature-level alert reports.",
            ),
        ],
        metric_flags=flags,
    )

