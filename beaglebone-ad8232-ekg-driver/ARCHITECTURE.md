# BeagleBone AD8232 EKG ADC Driver Architecture

## Goal

Capture AD8232 Single-Lead Heart Rate Monitor waveforms on BeagleBone Black through the Linux IIO ADC interface and produce reviewable waveform and heart-rate evidence.

## Runtime Flow

```text
Ad8232Config
  -> BeagleBoneIioReader or SimulatedAd8232Reader
  -> capture_samples
  -> remove_baseline + moving_average
  -> detect_r_peaks
  -> analyze
  -> write_capture
  -> write_waveform_plot
  -> ad8232_capture.csv + ad8232_report.json + ad8232-waveform.svg
```

## Modules

| Module | Responsibility |
| --- | --- |
| `config.py` | AD8232/BeagleBone ADC configuration, IIO paths, divider ratio, lead-off GPIO paths. |
| `iio.py` | Linux IIO raw ADC reader plus deterministic AD8232 simulator. |
| `filters.py` | Baseline removal and moving average smoothing. |
| `heart_rate.py` | R-peak detection, heart-rate estimate, RR variation, RMSSD, signal quality. |
| `recorder.py` | Capture loop, report construction, CSV/JSON writing. |
| `plots.py` | Dependency-free SVG waveform evidence for documentation and screenshot capture. |
| `cli.py` | Simulated and live command-line capture. |

## BeagleBone ADC Notes

- BeagleBone Black AIN pins are 12-bit ADC inputs exposed through IIO.
- The code expects raw counts at `in_voltageN_raw`.
- If `in_voltageN_scale` exists, it is used; otherwise the driver falls back to `reference_voltage_mv / adc_counts`.
- `input_divider_ratio` reconstructs the AD8232-side millivolts after a protective divider.
- The default divider ratio `1.8333333333` maps a protected 1.8V ADC-side range back to an approximate 3.3V AD8232-side range.

## AD8232 Notes

- `OUT` is the analog EKG waveform.
- `LO+` and `LO-` can be wired to GPIO inputs for lead-off detection.
- `3.3V`, `GND`, and electrode placement must follow the AD8232 breakout documentation.
- Patient-connected circuits require isolation and medical-grade design practices; this repo is not a clinical design.
