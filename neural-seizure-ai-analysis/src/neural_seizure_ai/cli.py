from __future__ import annotations

import argparse
import json
from pathlib import Path

from .config import SENSOR_PROFILES, SimulationConfig
from .ekg import BeagleBoneEkgConfig, BeagleBoneEkgSensor
from .export import export_student_to_c
from .hil import benchmark_student
from .pipeline import run_demo
from .plots import write_plot_evidence


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
    parser.add_argument("--ekg-source", choices=["synthetic", "beaglebone", "none"], default="synthetic")
    parser.add_argument("--bbb-ain", type=int, default=0)
    parser.add_argument("--bbb-iio-device", type=Path, default=Path("/sys/bus/iio/devices/iio:device0"))
    parser.add_argument("--ekg-sampling-rate-hz", type=int, default=250)
    parser.add_argument("--ekg-reference-mv", type=float, default=1800.0)
    parser.add_argument("--ekg-frontend-gain", type=float, default=1.0)
    parser.add_argument("--write-plots", action="store_true")
    parser.add_argument("--export-c", action="store_true")
    parser.add_argument("--write-hil-report", action="store_true")
    parser.add_argument("--hil-target-label", default="host-python")
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
    ekg_samples = None
    include_synthetic_ekg = args.ekg_source == "synthetic"
    if args.ekg_source == "beaglebone":
        ekg_config = BeagleBoneEkgConfig(
            analog_channel=args.bbb_ain,
            iio_device_path=args.bbb_iio_device,
            sampling_rate_hz=args.ekg_sampling_rate_hz,
            reference_voltage_mv=args.ekg_reference_mv,
            frontend_gain=args.ekg_frontend_gain,
        )
        ekg_samples = BeagleBoneEkgSensor(ekg_config).capture(args.duration_seconds)

    result = run_demo(
        config=config,
        output_dir=args.output_dir,
        ekg_samples=ekg_samples,
        include_synthetic_ekg=include_synthetic_ekg,
    )
    if args.output_dir is not None:
        if args.write_plots:
            write_plot_evidence(config, result, args.output_dir)
        if args.export_c:
            export_student_to_c(result.distillation, args.output_dir)
        if args.write_hil_report:
            benchmark_student(
                result.feature_rows,
                result.distillation,
                output_dir=args.output_dir,
                target_label=args.hil_target_label,
            )

    summary = {
        "sensor": result.config["sensor_name"],
        "samples": result.sample_count,
        "windows": result.window_count,
        "ekg_windows": len(result.ekg_feature_rows),
        "teacher_sensitivity": result.teacher_metrics.sensitivity,
        "student_sensitivity": result.student_metrics.sensitivity,
        "student_specificity": result.student_metrics.specificity,
        "fused_sensitivity": result.fused_metrics.sensitivity if result.fused_metrics else None,
        "fused_specificity": result.fused_metrics.specificity if result.fused_metrics else None,
        "student_lead_time_seconds": result.student_metrics.lead_time_seconds,
        "student_memory_bytes": result.student_budget.memory_bytes,
    }
    print(json.dumps(summary, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
