from __future__ import annotations

import csv
import json
import time
from dataclasses import asdict, dataclass
from pathlib import Path

from .config import Ad8232Config
from .heart_rate import HeartRateReport, analyze
from .iio import Ad8232Sample, BeagleBoneIioReader, SimulatedAd8232Reader


@dataclass(frozen=True)
class CaptureReport:
    sensor: str
    source: str
    sample_rate_hz: int
    duration_seconds: float
    analog_channel: int
    heart_rate: HeartRateReport

    def to_dict(self) -> dict[str, object]:
        data = asdict(self)
        data["heart_rate"] = asdict(self.heart_rate)
        return data


def capture_samples(config: Ad8232Config, duration_seconds: float, simulate: bool = False) -> tuple[list[Ad8232Sample], CaptureReport]:
    reader = SimulatedAd8232Reader(config) if simulate else BeagleBoneIioReader(config)
    total = max(1, int(duration_seconds * config.sample_rate_hz))
    interval = 1.0 / config.sample_rate_hz
    start = time.monotonic()
    samples: list[Ad8232Sample] = []
    for index in range(total):
        timestamp = index * interval
        samples.append(reader.read(timestamp))
        if not simulate:
            sleep_for = start + (index + 1) * interval - time.monotonic()
            if sleep_for > 0:
                time.sleep(sleep_for)
    report = CaptureReport(
        sensor="AD8232 Single-Lead Heart Rate Monitor",
        source=samples[0].source if samples else "none",
        sample_rate_hz=config.sample_rate_hz,
        duration_seconds=duration_seconds,
        analog_channel=config.analog_channel,
        heart_rate=analyze(samples, config.sample_rate_hz),
    )
    return samples, report


def write_capture(samples: list[Ad8232Sample], report: CaptureReport, output_dir: Path) -> list[Path]:
    output_dir.mkdir(parents=True, exist_ok=True)
    csv_path = output_dir / "ad8232_capture.csv"
    report_path = output_dir / "ad8232_report.json"
    with csv_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["timestamp_seconds", "raw_count", "millivolts", "lead_off", "source"])
        writer.writeheader()
        writer.writerows(asdict(sample) for sample in samples)
    report_path.write_text(json.dumps(report.to_dict(), indent=2), encoding="utf-8")
    return [csv_path, report_path]

