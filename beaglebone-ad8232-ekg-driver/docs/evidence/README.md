# AD8232 BeagleBone Evidence

This folder stores generated evidence for the **AD8232 Single-Lead Heart Rate Monitor** driver on a BeagleBone Black ADC path.

## Generated From

```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

## Artifacts

- `ad8232_capture.csv`: deterministic simulated EKG/EKG-like waveform rows with timestamp, ADC raw count, reconstructed millivolts, lead-off state, and source.
- `ad8232_report.json`: heart-rate, peak count, HRV, lead-off fraction, and signal-quality summary.
- `ad8232-waveform.svg`: dependency-free plotted waveform evidence emitted by the Python driver.
- `ad8232-waveform.png`: screenshot capture of the SVG for portfolio and document review.

## Provenance

The committed evidence is synthetic. It does not contain human biometric data, patient records, clinical measurements, or diagnostic conclusions. A live hardware capture should be stored separately with board revision, ADC channel, divider values, electrode/fixture notes, and safety review notes.
