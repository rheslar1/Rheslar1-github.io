"""Synthetic predictive AI pipeline for neural seizure analysis."""

from .config import BrainState, SENSOR_PROFILES, SensorProfile, SimulationConfig
from .ekg import BeagleBoneEkgConfig, BeagleBoneEkgSensor, EkgFeatureWindow, EkgSample
from .features import numeric_backend
from .paper_traceability import (
    FUTURE_UPGRADE_PATH,
    IEEE_11031450_LOCAL_SOURCE,
    IEEE_11031450_METADATA,
    IEEE_11031450_SOURCE,
    PaperImplementationMapping,
    build_ieee_11031450_traceability,
    render_ieee_11031450_markdown,
)
from .pipeline import DemoResult, run_demo

__all__ = [
    "BeagleBoneEkgConfig",
    "BeagleBoneEkgSensor",
    "BrainState",
    "DemoResult",
    "EkgFeatureWindow",
    "EkgSample",
    "FUTURE_UPGRADE_PATH",
    "IEEE_11031450_LOCAL_SOURCE",
    "IEEE_11031450_METADATA",
    "IEEE_11031450_SOURCE",
    "PaperImplementationMapping",
    "SENSOR_PROFILES",
    "SensorProfile",
    "SimulationConfig",
    "build_ieee_11031450_traceability",
    "numeric_backend",
    "render_ieee_11031450_markdown",
    "run_demo",
]
