# BeagleBone AD8232 EKG ADC Driver

Python driver project for the **AD8232 Single-Lead Heart Rate Monitor** connected to a **BeagleBone Black EKG ADC input**.

The project reads AD8232 analog output through Linux IIO ADC files, supports optional AD8232 LO+/LO- lead-off GPIO inputs, filters the waveform, detects R-peaks, estimates heart rate/HRV, and writes CSV/JSON capture evidence.

## Hardware Boundary

```text
AD8232 OUT
  -> safe divider / analog front-end protection
  -> BeagleBone Black AIN0..AIN6
  -> /sys/bus/iio/devices/iio:device0/in_voltageN_raw
  -> ad8232_bbb_driver
  -> CSV waveform + JSON heart-rate report
```

BeagleBone Black analog inputs are 1.8V max. Many AD8232 breakout boards are powered from 3.3V and can swing above the BeagleBone ADC limit. Use a safe divider or analog front-end conditioning before connecting AD8232 OUT to a BeagleBone AIN pin.

## Quick Start

Run tests:

```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m unittest discover beaglebone-ad8232-ekg-driver/tests -v
```

Run the simulator:

```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

Run on BeagleBone Black with AD8232 on AIN0:

```bash
PYTHONPATH=src python3 -m ad8232_bbb_driver.cli \
  --duration-seconds 30 \
  --ain 0 \
  --iio-device /sys/bus/iio/devices/iio:device0 \
  --divider-ratio 1.8333333333 \
  --output-dir artifacts/live-ad8232
```

Add lead-off GPIO value files if LO+/LO- are wired to GPIO inputs:

```bash
PYTHONPATH=src python3 -m ad8232_bbb_driver.cli \
  --duration-seconds 30 \
  --ain 0 \
  --lo-plus-value /sys/class/gpio/gpio60/value \
  --lo-minus-value /sys/class/gpio/gpio48/value \
  --output-dir artifacts/live-ad8232
```

## Output

- `ad8232_capture.csv`: timestamp, raw ADC count, millivolts, lead-off flag, and source.
- `ad8232_report.json`: heart rate, RR variability, lead-off fraction, signal quality, source, sample rate, and duration.
- `ad8232-waveform.svg`: plotted waveform evidence with raw sensor-side millivolts, filtered R-peak view, quality score, and lead-off fraction.

The generated SVG can be captured to PNG with headless Chrome for portfolio documentation:

```bash
google-chrome --headless=new --no-sandbox --disable-gpu \
  --window-size=1120,520 \
  --screenshot=beaglebone-ad8232-ekg-driver/docs/evidence/ad8232-waveform.png \
  file:///absolute/path/to/beaglebone-ad8232-ekg-driver/docs/evidence/ad8232-waveform.svg
```

## Safety Boundary

This project is for portfolio engineering evidence and lab simulation. It is not a medical device, diagnostic system, patient monitor, or treatment system.
