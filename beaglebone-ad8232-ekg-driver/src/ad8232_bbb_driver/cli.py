from __future__ import annotations

import argparse
import json
from pathlib import Path

from .config import Ad8232Config
from .plots import write_waveform_plot
from .recorder import capture_samples, write_capture


def main() -> int:
    parser = argparse.ArgumentParser(description="Capture AD8232 EKG samples on BeagleBone Black.")
    parser.add_argument("--duration-seconds", type=float, default=10.0)
    parser.add_argument("--sample-rate-hz", type=int, default=250)
    parser.add_argument("--ain", type=int, default=0)
    parser.add_argument("--iio-device", type=Path, default=Path("/sys/bus/iio/devices/iio:device0"))
    parser.add_argument("--divider-ratio", type=float, default=1.8333333333)
    parser.add_argument("--lo-plus-value", type=Path, default=None)
    parser.add_argument("--lo-minus-value", type=Path, default=None)
    parser.add_argument("--simulate", action="store_true")
    parser.add_argument("--output-dir", type=Path, default=None)
    parser.add_argument("--write-plot", action="store_true")
    args = parser.parse_args()

    config = Ad8232Config(
        analog_channel=args.ain,
        iio_device_path=args.iio_device,
        sample_rate_hz=args.sample_rate_hz,
        input_divider_ratio=args.divider_ratio,
        lead_off_plus_path=args.lo_plus_value,
        lead_off_minus_path=args.lo_minus_value,
    )
    samples, report = capture_samples(config, args.duration_seconds, simulate=args.simulate)
    if args.output_dir:
        write_capture(samples, report, args.output_dir)
        if args.write_plot:
            write_waveform_plot(samples, report, args.output_dir)
    print(json.dumps(report.to_dict(), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
