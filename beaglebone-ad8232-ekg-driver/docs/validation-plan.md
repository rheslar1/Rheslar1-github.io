# Validation Plan

## Automated

```bash
PYTHONPATH=src python3 -m unittest discover tests -v
```

Checks:

- ADC raw-count to millivolt conversion.
- Optional LO+/LO- lead-off value handling.
- Simulated AD8232 waveform capture.
- Heart-rate analysis and report writing.
- SVG waveform evidence generation.

## Hardware

1. Confirm ADC overlay/IIO device is present.
2. Confirm AD8232 OUT is divided/protected for 1.8V BeagleBone ADC input.
3. Run a short capture with electrodes disconnected and verify lead-off behavior.
4. Run a simulator capture and compare CSV/report shape.
5. Run a live capture and save `ad8232_capture.csv` plus `ad8232_report.json`.
6. Save `ad8232-waveform.svg` or a PNG screenshot for visual waveform review.
7. Add oscilloscope or logic-level evidence for OUT and LO+/LO- if available.
