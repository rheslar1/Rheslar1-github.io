from __future__ import annotations

import math
import random
from dataclasses import dataclass

from .config import BrainState, SimulationConfig


@dataclass(frozen=True)
class SignalSample:
    timestamp_seconds: float
    values_uv: tuple[float, ...]
    state: BrainState


class SyntheticNeuralSignalGenerator:
    """Generates deterministic, labeled, multichannel neural-like signals.

    The generator intentionally creates interpretable pre-ictal cues from the
    source paper: high-frequency oscillation growth, phase-amplitude coupling,
    micro-bursts, increasing channel synchrony, and an ictal transition.
    """

    def __init__(self, config: SimulationConfig):
        self.config = config
        self.profile = config.profile
        self.rng = random.Random(config.seed)
        self._burst_centers = self._make_burst_centers()

    def generate(self) -> list[SignalSample]:
        sample_count = int(self.config.duration_seconds * self.profile.sampling_rate_hz)
        return [self._sample_at(index / self.profile.sampling_rate_hz) for index in range(sample_count)]

    def _state_at(self, timestamp_seconds: float) -> BrainState:
        if timestamp_seconds >= self.config.ictal_start_seconds:
            return BrainState.ICTAL
        if timestamp_seconds >= self.config.preictal_start_seconds:
            return BrainState.PREICTAL
        return BrainState.INTERICTAL

    def _preictal_ramp(self, timestamp_seconds: float) -> float:
        if timestamp_seconds < self.config.preictal_start_seconds:
            return 0.0
        span = max(1.0, self.config.ictal_start_seconds - self.config.preictal_start_seconds)
        return min(1.0, (timestamp_seconds - self.config.preictal_start_seconds) / span)

    def _make_burst_centers(self) -> list[list[float]]:
        centers: list[list[float]] = []
        for channel in range(self.profile.channels):
            channel_centers = []
            for offset in (4.0, 9.0, 14.0):
                jitter = self.rng.uniform(-0.45, 0.45)
                channel_centers.append(self.config.preictal_start_seconds + offset + jitter + channel * 0.018)
            centers.append(channel_centers)
        return centers

    def _sample_at(self, timestamp_seconds: float) -> SignalSample:
        state = self._state_at(timestamp_seconds)
        ramp = self._preictal_ramp(timestamp_seconds)
        shared_theta = math.sin(2.0 * math.pi * 6.0 * timestamp_seconds)
        shared_ictal = math.sin(2.0 * math.pi * 11.0 * timestamp_seconds)
        values = []

        for channel in range(self.profile.channels):
            phase = channel * 0.19
            alpha = 0.72 * math.sin(2.0 * math.pi * (8.0 + channel * 0.05) * timestamp_seconds + phase)
            beta = 0.28 * math.sin(2.0 * math.pi * (18.0 + channel * 0.1) * timestamp_seconds + phase)
            slow = 0.22 * math.sin(2.0 * math.pi * 1.2 * timestamp_seconds + channel * 0.13)
            artifact = self.profile.noise_uv * self.rng.gauss(0.0, 1.0)

            hfo_frequency = 88.0 + (channel % 5) * 7.0
            pac_modulator = 1.0 + 0.65 * max(0.0, shared_theta)
            hfo = ramp * self.profile.hfo_gain * pac_modulator * math.sin(
                2.0 * math.pi * hfo_frequency * timestamp_seconds + phase
            )
            micro_burst = self._micro_burst(channel, timestamp_seconds) * self.profile.hfo_gain
            synchrony = ramp * 0.42 * shared_theta

            ictal = 0.0
            if state is BrainState.ICTAL:
                ictal_ramp = min(1.0, (timestamp_seconds - self.config.ictal_start_seconds) / 4.0)
                ictal = ictal_ramp * (1.7 * shared_ictal + 0.38 * math.sin(2.0 * math.pi * 33.0 * timestamp_seconds))

            values.append(alpha + beta + slow + artifact + hfo + micro_burst + synchrony + ictal)

        return SignalSample(timestamp_seconds=timestamp_seconds, values_uv=tuple(values), state=state)

    def _micro_burst(self, channel: int, timestamp_seconds: float) -> float:
        total = 0.0
        for center in self._burst_centers[channel]:
            width_seconds = 0.055
            envelope = math.exp(-((timestamp_seconds - center) ** 2) / (2.0 * width_seconds**2))
            total += envelope * math.sin(2.0 * math.pi * 112.0 * timestamp_seconds)
        return total

