from __future__ import annotations

import json
import platform
import time
from dataclasses import asdict, dataclass
from pathlib import Path

from .distillation import DistillationReport, StudentLogisticModel
from .features import WindowFeatures


@dataclass(frozen=True)
class TimingEvidence:
    target_label: str
    platform: str
    iterations: int
    windows: int
    total_seconds: float
    average_inference_us: float
    max_window_latency_us: float
    notes: list[str]

    def to_dict(self) -> dict[str, object]:
        return asdict(self)


def benchmark_student(
    features: list[WindowFeatures],
    report: DistillationReport,
    output_dir: Path | None = None,
    target_label: str = "host-python",
    iterations: int = 200,
) -> TimingEvidence:
    if not features:
        raise ValueError("At least one feature row is required for timing evidence.")
    model = StudentLogisticModel(weights=report.weights, bias=report.bias, threshold=report.decision_threshold)
    max_latency = 0.0
    total_predictions = iterations * len(features)
    start = time.perf_counter()
    for _ in range(iterations):
        for row in features:
            sample_start = time.perf_counter()
            model.predict(row)
            max_latency = max(max_latency, time.perf_counter() - sample_start)
    total = time.perf_counter() - start
    evidence = TimingEvidence(
        target_label=target_label,
        platform=f"{platform.system()} {platform.release()} {platform.machine()}",
        iterations=iterations,
        windows=len(features),
        total_seconds=total,
        average_inference_us=(total / total_predictions) * 1_000_000.0,
        max_window_latency_us=max_latency * 1_000_000.0,
        notes=[
            "Python host timing is evidence for software path repeatability, not a substitute for target profiling.",
            "Run this same benchmark on BeagleBone or MCU-adjacent Linux to collect hardware-in-the-loop timing.",
        ],
    )
    if output_dir is not None:
        write_timing_evidence(evidence, output_dir)
    return evidence


def write_timing_evidence(evidence: TimingEvidence, output_dir: Path) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    json_path = output_dir / "hil-timing-report.json"
    md_path = output_dir / "hil-timing-report.md"
    json_path.write_text(json.dumps(evidence.to_dict(), indent=2), encoding="utf-8")
    md_path.write_text(
        f"""# Hardware-In-The-Loop Timing Evidence

| Field | Value |
| --- | --- |
| Target label | `{evidence.target_label}` |
| Platform | `{evidence.platform}` |
| Iterations | {evidence.iterations} |
| Windows per iteration | {evidence.windows} |
| Total seconds | {evidence.total_seconds:.6f} |
| Average inference | {evidence.average_inference_us:.3f} us |
| Max observed window latency | {evidence.max_window_latency_us:.3f} us |

## Notes

{chr(10).join(f'- {note}' for note in evidence.notes)}
""",
        encoding="utf-8",
    )
    return [json_path, md_path]

