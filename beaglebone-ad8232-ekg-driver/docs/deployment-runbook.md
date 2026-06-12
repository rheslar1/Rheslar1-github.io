# Deployment Runbook — BeagleBone AD8232 EKG ADC Driver (Portfolio)

Scrub date: 2026-06-11

## 1) Purpose
Provide repeatable commands for producing waveform evidence and (optionally) capturing live ADC evidence on BeagleBone Black.

## 2) Prerequisites
- Python 3.10+
- BeagleBone Black access with Linux IIO ADC exposed in `/sys/bus/iio/devices/iio:device0`
- Optional: GPIO sysfs paths for LO+/LO-

## 3) Setup
Set `PYTHONPATH` to make module imports work.

## 4) Simulated deployment (evidence for review)
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

## 5) Live capture (hardware, pending verification)
```bash
PYTHONPATH=src python3 -m ad8232_bbb_driver.cli \
  --duration-seconds 30 \
  --ain 0 \
  --iio-device /sys/bus/iio/devices/iio:device0 \
  --divider-ratio 1.8333333333 \
  --output-dir artifacts/live-ad8232
```

Optional lead-off GPIO value files:
```bash
PYTHONPATH=src python3 -m ad8232_bbb_driver.cli \
  --duration-seconds 30 \
  --ain 0 \
  --lo-plus-value /sys/class/gpio/gpio60/value \
  --lo-minus-value /sys/class/gpio/gpio/gpio48/value \
  --output-dir artifacts/live-ad8232
```

## 6) Rollback
Revert evidence artifacts under `docs/evidence/`.

## 7) Logs & troubleshooting
- Verify IIO device path exists.
- Verify divider ratio matches analog front-end conditioning.
- Verify GPIO value files exist if using LO+/LO-.

## 8) Notes on safety boundary
Live hardware capture must remain within engineering evidence scope; do not infer clinical diagnostic conclusions.

