from __future__ import annotations

from dataclasses import dataclass

from .ekg import EkgFeatureWindow
from .models import Prediction


@dataclass(frozen=True)
class FusedPrediction:
    model: str
    probability: float
    predicted_preictal: bool
    neural_probability: float
    ekg_boost: float
    signal_quality: float
    rationale: str


def fuse_student_with_ekg(
    predictions: list[Prediction],
    ekg_features: list[EkgFeatureWindow],
    threshold: float = 0.55,
) -> list[Prediction]:
    fused: list[Prediction] = []
    for prediction, ekg in zip(predictions, ekg_features):
        boost = _ekg_context_boost(ekg)
        probability = min(0.99, prediction.probability + boost)
        rationale = (
            f"{prediction.rationale}; EKG context boost={boost:.3f}, "
            f"hr={ekg.heart_rate_bpm:.1f} bpm, rmssd={ekg.rmssd_ms:.1f} ms, quality={ekg.signal_quality:.2f}"
        )
        fused.append(
            Prediction(
                model="student_plus_beaglebone_ekg_context",
                probability=probability,
                predicted_preictal=probability >= threshold,
                rationale=rationale,
            )
        )
    return fused


def _ekg_context_boost(ekg: EkgFeatureWindow) -> float:
    if ekg.sample_count == 0 or ekg.signal_quality < 0.35:
        return 0.0
    return min(0.08, 0.08 * ekg.autonomic_stress * ekg.signal_quality)

