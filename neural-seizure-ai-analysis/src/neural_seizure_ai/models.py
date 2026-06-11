from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Protocol

from .features import WindowFeatures


@dataclass(frozen=True)
class Prediction:
    model: str
    probability: float
    predicted_preictal: bool
    rationale: str


class RiskModel(Protocol):
    name: str

    def predict(self, features: WindowFeatures) -> Prediction:
        ...

    def reset(self) -> None:
        ...


class CnnSpectrogramHeuristic:
    name = "cnn_spectrogram_teacher"

    def reset(self) -> None:
        return None

    def predict(self, features: WindowFeatures) -> Prediction:
        hfo = _cap(features.hfo_to_beta / 1.1)
        gamma = _cap(features.gamma_power / (features.beta_power + 1e-9) / 1.6)
        line = _cap(features.avg_line_length / 5.0)
        probability = _sigmoid(-1.55 + 2.2 * hfo + 1.2 * gamma + 0.95 * line)
        return Prediction(self.name, probability, probability >= 0.55, "time-frequency HFO/gamma/line-length risk")


class LstmTemporalHeuristic:
    name = "lstm_temporal_teacher"

    def __init__(self):
        self.previous_risk = 0.0

    def reset(self) -> None:
        self.previous_risk = 0.0

    def predict(self, features: WindowFeatures) -> Prediction:
        instantaneous = _cap(0.34 * features.hfo_to_total / 0.35 + 0.33 * features.pac_proxy / 0.45 + 0.33 * features.avg_energy / 2.4)
        smoothed = 0.72 * self.previous_risk + 0.28 * instantaneous
        self.previous_risk = smoothed
        probability = _sigmoid(-1.1 + 3.4 * smoothed)
        return Prediction(self.name, probability, probability >= 0.55, "temporal accumulation of rising biomarkers")


class TransformerAttentionHeuristic:
    name = "transformer_attention_teacher"

    def reset(self) -> None:
        return None

    def predict(self, features: WindowFeatures) -> Prediction:
        attention_proxy = max(
            _cap(features.hfo_to_total / 0.35),
            _cap(features.pac_proxy / 0.5),
            _cap(features.zero_crossing_rate / 0.42),
        )
        probability = _sigmoid(-1.35 + 3.0 * attention_proxy + 0.45 * _cap(features.avg_energy / 2.5))
        return Prediction(self.name, probability, probability >= 0.55, "attention proxy over strongest temporal biomarker")


class GnnConnectivityHeuristic:
    name = "gnn_connectivity_teacher"

    def reset(self) -> None:
        return None

    def predict(self, features: WindowFeatures) -> Prediction:
        graph_signal = 0.55 * _cap(features.mean_abs_connectivity / 0.72) + 0.45 * _cap(features.spatial_concentration / 0.42)
        probability = _sigmoid(-1.5 + 3.1 * graph_signal + 0.45 * _cap(features.hfo_to_beta / 1.2))
        return Prediction(self.name, probability, probability >= 0.55, "connectivity and spatial concentration risk")


class WaveletEntropyHeuristic:
    name = "wavelet_entropy_teacher"

    def reset(self) -> None:
        return None

    def predict(self, features: WindowFeatures) -> Prediction:
        wavelet_signal = (
            0.42 * _cap(features.wavelet_detail_energy / 1.35)
            + 0.32 * _cap(features.wavelet_entropy / 0.9)
            + 0.26 * _cap(features.sample_entropy / 1.25)
        )
        probability = _sigmoid(-1.25 + 3.25 * wavelet_signal + 0.35 * _cap(features.hfo_to_total / 0.35))
        return Prediction(self.name, probability, probability >= 0.55, "wavelet detail energy plus entropy complexity risk")


class StatisticalComplexityHeuristic:
    name = "statistical_complexity_teacher"

    def reset(self) -> None:
        return None

    def predict(self, features: WindowFeatures) -> Prediction:
        complexity = (
            0.30 * _cap((features.katz_fractal_dimension - 1.0) / 1.8)
            + 0.30 * _cap((features.higuchi_fractal_dimension - 1.0) / 1.0)
            + 0.24 * _cap(features.channel_energy_iqr / 0.85)
            + 0.16 * _cap(features.connectivity_spread / 0.55)
        )
        probability = _sigmoid(-1.35 + 3.0 * complexity + 0.5 * _cap(features.avg_line_length / 4.5))
        return Prediction(self.name, probability, probability >= 0.55, "nonlinear complexity, channel variance, and graph-spread risk")


class TeacherEnsemble:
    name = "teacher_ensemble"

    def __init__(self):
        self.models: list[RiskModel] = [
            CnnSpectrogramHeuristic(),
            LstmTemporalHeuristic(),
            TransformerAttentionHeuristic(),
            GnnConnectivityHeuristic(),
            WaveletEntropyHeuristic(),
            StatisticalComplexityHeuristic(),
        ]

    def reset(self) -> None:
        for model in self.models:
            model.reset()

    def predict(self, features: WindowFeatures) -> Prediction:
        predictions = [model.predict(features) for model in self.models]
        probability = sum(prediction.probability for prediction in predictions) / len(predictions)
        voters = ", ".join(f"{prediction.model}:{prediction.probability:.2f}" for prediction in predictions)
        return Prediction(self.name, probability, probability >= 0.55, f"ensemble blend [{voters}]")


def _sigmoid(value: float) -> float:
    value = max(-60.0, min(60.0, value))
    return 1.0 / (1.0 + math.exp(-value))


def _cap(value: float, low: float = 0.0, high: float = 1.0) -> float:
    return max(low, min(high, value))
