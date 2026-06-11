from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class BrainState(str, Enum):
    INTERICTAL = "interictal"
    PREICTAL = "preictal"
    ICTAL = "ictal"


@dataclass(frozen=True)
class SensorProfile:
    name: str
    channels: int
    sampling_rate_hz: int
    noise_uv: float
    hfo_gain: float
    invasiveness: str
    description: str


SENSOR_PROFILES: dict[str, SensorProfile] = {
    "eeg": SensorProfile(
        name="EEG",
        channels=8,
        sampling_rate_hz=256,
        noise_uv=0.42,
        hfo_gain=0.65,
        invasiveness="non-invasive",
        description="Scalp electrode profile with lower spatial precision and higher artifact load.",
    ),
    "ecog": SensorProfile(
        name="ECoG",
        channels=12,
        sampling_rate_hz=512,
        noise_uv=0.24,
        hfo_gain=1.0,
        invasiveness="surface cortical",
        description="High-SNR cortical surface profile suitable for spatial and time-frequency analysis.",
    ),
    "ieeg": SensorProfile(
        name="iEEG",
        channels=16,
        sampling_rate_hz=512,
        noise_uv=0.18,
        hfo_gain=1.15,
        invasiveness="depth electrode",
        description="Depth-electrode profile for deep-region access and connectivity analysis.",
    ),
    "microarray": SensorProfile(
        name="Microelectrode Array",
        channels=24,
        sampling_rate_hz=1024,
        noise_uv=0.12,
        hfo_gain=1.45,
        invasiveness="intracortical",
        description="High-bandwidth profile for microscale activity and localized bursts.",
    ),
}


@dataclass(frozen=True)
class SimulationConfig:
    sensor: str = "ecog"
    duration_seconds: float = 90.0
    preictal_start_seconds: float = 55.0
    ictal_start_seconds: float = 75.0
    window_seconds: float = 2.0
    stride_seconds: float = 1.0
    seed: int = 42

    @property
    def profile(self) -> SensorProfile:
        if self.sensor not in SENSOR_PROFILES:
            valid = ", ".join(sorted(SENSOR_PROFILES))
            raise ValueError(f"Unknown sensor '{self.sensor}'. Expected one of: {valid}")
        return SENSOR_PROFILES[self.sensor]

    @property
    def sampling_rate_hz(self) -> int:
        return self.profile.sampling_rate_hz

