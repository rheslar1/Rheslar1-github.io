from __future__ import annotations

import argparse
import json
from pathlib import Path

from .config import SENSOR_PROFILES, SimulationConfig
from .pipeline import run_demo


def main() -> int:
    parser = argparse.ArgumentParser(description="Run the synthetic neural seizure AI analysis pipeline.")
    parser.add_argument("--sensor", choices=sorted(SENSOR_PROFILES), default="ecog")
    parser.add_argument("--duration-seconds", type=float, default=90.0)
    parser.add_argument("--preictal-start-seconds", type=float, default=55.0)
    parser.add_argument("--ictal-start-seconds", type=float, default=75.0)
    parser.add_argument("--window-seconds", type=float, default=2.0)
    parser.add_argument("--stride-seconds", type=float, default=1.0)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--output-dir", type=Path, default=None)
    args = parser.parse_args()

    config = SimulationConfig(
        sensor=args.sensor,
        duration_seconds=args.duration_seconds,
        preictal_start_seconds=args.preictal_start_seconds,
        ictal_start_seconds=args.ictal_start_seconds,
        window_seconds=args.window_seconds,
        stride_seconds=args.stride_seconds,
        seed=args.seed,
    )
    result = run_demo(config=config, output_dir=args.output_dir)

    summary = {
        "sensor": result.config["sensor_name"],
        "samples": result.sample_count,
        "windows": result.window_count,
        "teacher_sensitivity": result.teacher_metrics.sensitivity,
        "student_sensitivity": result.student_metrics.sensitivity,
        "student_specificity": result.student_metrics.specificity,
        "student_lead_time_seconds": result.student_metrics.lead_time_seconds,
        "student_memory_bytes": result.student_budget.memory_bytes,
    }
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

