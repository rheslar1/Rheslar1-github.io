from pathlib import Path

from neural_seizure_ai import SimulationConfig, run_demo


if __name__ == "__main__":
    result = run_demo(
        SimulationConfig(sensor="ecog", duration_seconds=90.0, seed=42),
        output_dir=Path(__file__).resolve().parents[1] / "artifacts",
    )
    print(f"windows={result.window_count}")
    print(f"student_sensitivity={result.student_metrics.sensitivity:.3f}")
    print(f"student_specificity={result.student_metrics.specificity:.3f}")
    print(f"student_memory_bytes={result.student_budget.memory_bytes}")

