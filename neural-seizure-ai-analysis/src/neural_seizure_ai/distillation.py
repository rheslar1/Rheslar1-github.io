from __future__ import annotations

import math
from dataclasses import dataclass

from .features import WindowFeatures, feature_names, feature_vector
from .models import Prediction


@dataclass
class DistillationReport:
    epochs: int
    learning_rate: float
    final_loss: float
    decision_threshold: float
    feature_names: list[str]
    weights: list[float]
    bias: float


class StudentLogisticModel:
    name = "distilled_edge_student"

    def __init__(self, weights: list[float] | None = None, bias: float = 0.0, threshold: float = 0.55):
        self.weights = weights or [0.0 for _ in feature_names()]
        self.bias = bias
        self.threshold = threshold

    def predict(self, features: WindowFeatures) -> Prediction:
        probability = _sigmoid(_dot(self.weights, feature_vector(features)) + self.bias)
        return Prediction(self.name, probability, probability >= self.threshold, "distilled logistic edge model")


def distill_student(
    features: list[WindowFeatures],
    teacher_probabilities: list[float],
    epochs: int = 240,
    learning_rate: float = 0.08,
    l2: float = 0.001,
) -> tuple[StudentLogisticModel, DistillationReport]:
    if len(features) != len(teacher_probabilities):
        raise ValueError("features and teacher_probabilities must have the same length")
    if not features:
        raise ValueError("at least one feature row is required")

    weights = [0.0 for _ in feature_names()]
    bias = 0.0
    vectors = [feature_vector(row) for row in features]
    final_loss = 0.0

    for _ in range(epochs):
        gradients = [0.0 for _ in weights]
        bias_gradient = 0.0
        final_loss = 0.0

        for vector, soft_label in zip(vectors, teacher_probabilities):
            probability = _sigmoid(_dot(weights, vector) + bias)
            error = probability - soft_label
            final_loss += 0.5 * error * error
            for index, value in enumerate(vector):
                gradients[index] += error * value + l2 * weights[index]
            bias_gradient += error

        scale = 1.0 / len(vectors)
        for index in range(len(weights)):
            weights[index] -= learning_rate * gradients[index] * scale
        bias -= learning_rate * bias_gradient * scale
        final_loss *= scale

    probabilities = [_sigmoid(_dot(weights, vector) + bias) for vector in vectors]
    threshold = _calibrate_threshold(probabilities, teacher_probabilities)
    model = StudentLogisticModel(weights=weights, bias=bias, threshold=threshold)
    report = DistillationReport(
        epochs=epochs,
        learning_rate=learning_rate,
        final_loss=final_loss,
        decision_threshold=threshold,
        feature_names=feature_names(),
        weights=weights,
        bias=bias,
    )
    return model, report


def _sigmoid(value: float) -> float:
    value = max(-60.0, min(60.0, value))
    return 1.0 / (1.0 + math.exp(-value))


def _dot(left: list[float], right: list[float]) -> float:
    return sum(a * b for a, b in zip(left, right))


def _calibrate_threshold(student_probabilities: list[float], teacher_probabilities: list[float]) -> float:
    teacher_positive = [probability >= 0.55 for probability in teacher_probabilities]
    candidates = sorted(set(round(probability, 4) for probability in student_probabilities))
    if not candidates:
        return 0.55

    best_threshold = 0.55
    best_score = -1.0
    for threshold in candidates:
        predicted = [probability >= threshold for probability in student_probabilities]
        true_positive = sum(1 for pred, label in zip(predicted, teacher_positive) if pred and label)
        true_negative = sum(1 for pred, label in zip(predicted, teacher_positive) if not pred and not label)
        false_positive = sum(1 for pred, label in zip(predicted, teacher_positive) if pred and not label)
        false_negative = sum(1 for pred, label in zip(predicted, teacher_positive) if not pred and label)
        sensitivity = true_positive / (true_positive + false_negative) if (true_positive + false_negative) else 0.0
        specificity = true_negative / (true_negative + false_positive) if (true_negative + false_positive) else 0.0
        score = 0.5 * (sensitivity + specificity)
        if score > best_score:
            best_score = score
            best_threshold = threshold
    return best_threshold
