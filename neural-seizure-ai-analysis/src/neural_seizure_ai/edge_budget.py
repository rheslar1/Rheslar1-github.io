from __future__ import annotations

from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class EdgeBudget:
    model_name: str
    parameter_count: int
    memory_bytes: int
    macs_per_window: int
    estimated_latency_ms: float
    estimated_power_mw: float
    notes: list[str]

    def to_dict(self) -> dict[str, int | float | str | list[str]]:
        return asdict(self)


def estimate_teacher_budget(feature_count: int, teacher_models: int, target_mops: float = 120.0) -> EdgeBudget:
    parameter_count = teacher_models * (feature_count * 64 + 64 * 16 + 16)
    macs = teacher_models * (feature_count * 64 + 64 * 16)
    return _budget(
        model_name="teacher_ensemble_proxy",
        parameter_count=parameter_count,
        macs_per_window=macs,
        target_mops=target_mops,
        notes=[
            "Proxy budget for a multi-family teacher ensemble used during analysis.",
            "Representative of why full teacher models are kept off tiny edge targets.",
        ],
    )


def estimate_student_budget(feature_count: int, target_mops: float = 120.0) -> EdgeBudget:
    parameter_count = feature_count + 1
    macs = feature_count
    return _budget(
        model_name="distilled_logistic_student",
        parameter_count=parameter_count,
        macs_per_window=macs,
        target_mops=target_mops,
        notes=[
            "Student uses one weight per normalized feature plus bias.",
            "Suitable for microcontroller or implantable-gateway style review after clinical validation.",
        ],
    )


def _budget(
    model_name: str,
    parameter_count: int,
    macs_per_window: int,
    target_mops: float,
    notes: list[str],
) -> EdgeBudget:
    memory_bytes = parameter_count * 4
    estimated_latency_ms = (macs_per_window / max(target_mops * 1_000_000.0, 1.0)) * 1000.0
    estimated_power_mw = 18.0 + 0.0025 * macs_per_window
    return EdgeBudget(
        model_name=model_name,
        parameter_count=parameter_count,
        memory_bytes=memory_bytes,
        macs_per_window=macs_per_window,
        estimated_latency_ms=estimated_latency_ms,
        estimated_power_mw=estimated_power_mw,
        notes=notes,
    )

