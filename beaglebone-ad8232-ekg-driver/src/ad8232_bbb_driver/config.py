from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Ad8232Config:
    analog_channel: int = 0
    iio_device_path: Path = Path("/sys/bus/iio/devices/iio:device0")
    sample_rate_hz: int = 250
    reference_voltage_mv: float = 1800.0
    adc_counts: int = 4095
    input_divider_ratio: float = 1.8333333333
    lead_off_plus_path: Path | None = None
    lead_off_minus_path: Path | None = None

    @property
    def raw_path(self) -> Path:
        return self.iio_device_path / f"in_voltage{self.analog_channel}_raw"

    @property
    def scale_path(self) -> Path:
        return self.iio_device_path / f"in_voltage{self.analog_channel}_scale"

