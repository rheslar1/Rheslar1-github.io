# Final Design Report — BeagleBone AD8232 EKG ADC Driver

Scrub date: 2026-06-11

## 1) Project Overview
- **Project name:** BeagleBone AD8232 EKG ADC Driver
- **Repository:** https://github.com/rheslar1/Rheslar1-github.io/tree/main/beaglebone-ad8232-ekg-driver
- **Primary goal:** Provide a reviewable embedded-Linux acquisition path for AD8232 Single-Lead heart rate waveform capture using BeagleBone Black Linux IIO ADC.
- **Target hardware/platform:** BeagleBone Black (ADC via IIO); optional GPIO LO+/LO- for lead-off detection.
- **Target software/platform:** Python CLI + deterministic simulation mode + evidence plots.

## 2) System Context
This project is engineering evidence for waveform acquisition and heart-rate estimation logic.
- Non-clinical scope.
- Synthetic evidence exists today; live hardware evidence should be captured when available.

## 3) Requirements & Constraints
### Functional requirements
- Read AD8232 `OUT` via BeagleBone AIN (`/sys/bus/iio/.../in_voltageN_raw`).
- Support safe divider ratio scaling to keep reconstruction within modeled constraints.
- Optional lead-off GPIO value-file inputs (`LO+`, `LO-`).
- Apply baseline removal + moving-average smoothing.
- Detect R-peaks and compute heart-rate and HRV metrics.
- Emit evidence artifacts: capture CSV, report JSON, SVG waveform, and PNG plot.
- Provide deterministic simulator mode for CI/reviewer runs.

### Constraints
- BeagleBone ADC inputs are **1.8V max**; many AD8232 breakouts can swing above this if powered at 3.3V.
- This project does **not** claim medical validity; it provides waveform/evidence artifacts.

## 4) Architecture
### Runtime flow
```text
Ad8232Config
  -> BeagleBoneIioReader or SimulatedAd8232Reader
  -> capture_samples
  -> baseline removal + moving average smoothing
  -> detect_r_peaks
  -> analyze
  -> write_capture (CSV)
  -> write_report (JSON)
  -> write_waveform_plot (SVG + PNG)
  -> evidence folder update
```

## 5) Major Design Decisions
1. **IIO file-based ADC reading**
   - Keeps the acquisition path simple and verifiable.

2. **Divider-ratio reconstruction model**
   - Makes the analog protection boundary explicit.

3. **Synthetic deterministic simulator**
   - Ensures reviewer can reproduce outputs without hardware.

4. **Lead-off channel independence**
   - Treat LO+/LO- as independent sensor quality status.

## 6) Validation Summary
### Unit tests
Run:
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m unittest discover beaglebone-ad8232-ekg-driver/tests -v
```

### Evidence generation (simulated)
Run:
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

**Pass criteria:** evidence artifacts exist:
- `ad8232_capture.csv`
- `ad8232_report.json`
- `ad8232-waveform.svg/png`

**Known gaps:**
- Hardware performance/timing and oscilloscope/logic-analyzer evidence are pending (not included in the synthetic evidence bundle).

## 7) Known Limitations & Future Work
- Add measured scope evidence for nominal and lead-off failure mode.
- Add timing evidence under CPU load on the embedded target.
- Add systemd service example for repeatable capture logging (optional if already present).

## 8) Evidence Index
- Evidence readme: `docs/evidence/README.md`
- Wiring diagram: `docs/wiring.md` and `docs/schematics/ad8232-beaglebone-wiring.svg`
- Evidence bundle: `docs/evidence/*`

