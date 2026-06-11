# BeagleBone EKG Sensor Integration

## Purpose

The project now supports an ADC-connected EKG/ECG sensor on BeagleBone Black through the Linux IIO sysfs interface. The EKG signal is used as auxiliary autonomic context for multimodal fusion. It does not replace EEG, ECoG, iEEG, or other neural sensing.

## Hardware Boundary

Expected runtime path:

```text
EKG analog front end
  -> BeagleBone Black AIN pin
  -> Linux IIO ADC driver
  -> /sys/bus/iio/devices/iio:device0/in_voltageN_raw
  -> BeagleBoneIioAnalogReader
  -> BeagleBoneEkgSensor
  -> EkgFeatureWindow
  -> student_plus_beaglebone_ekg_context
```

## Live Capture Command

Example for AIN0:

```bash
PYTHONPATH=src python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --ekg-source beaglebone \
  --bbb-ain 0 \
  --bbb-iio-device /sys/bus/iio/devices/iio:device0 \
  --ekg-sampling-rate-hz 250 \
  --output-dir artifacts/beaglebone-ekg-run
```

## EKG Features

The code extracts:

- Mean millivolts.
- Peak-to-peak amplitude.
- R-peak count.
- Heart rate estimate.
- RR interval standard deviation.
- RMSSD heart-rate-variability estimate.
- Lead-off fraction.
- Signal-quality score.
- Autonomic-stress context score.

## Fusion Boundary

The fusion model applies a small bounded probability boost when the EKG signal is clean and shows elevated autonomic stress. This makes EKG useful as context while preserving the neural model as the primary predictor.

## Safety Notes

- EKG/ECG is a cardiac signal, not a brain signal.
- EKG context cannot diagnose or forecast seizures by itself.
- Any hardware capture must use a safe medical front end and isolation appropriate for biosignal work.
- This repository is research and portfolio evidence only.

