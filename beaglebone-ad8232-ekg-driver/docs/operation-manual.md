# Operation Manual — BeagleBone AD8232 EKG ADC Driver

Scrub date: 2026-06-11

## 1) Reviewer workflow
1. Run unit tests.
2. Run simulated CLI to generate portfolio evidence.
3. Inspect evidence folder and the wiring diagram.
4. For hardware-capable reviewers, run the live capture command (optional) and attach additional evidence.

## 2) Commands
### Tests
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m unittest discover beaglebone-ad8232-ekg-driver/tests -v
```

### Simulator evidence
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

## 3) Where to look
- `docs/evidence/ad8232_capture.csv`
- `docs/evidence/ad8232_report.json`
- `docs/evidence/ad8232-waveform.svg/png`
- `docs/wiring.md` + `docs/schematics/ad8232-beaglebone-wiring.svg`

## 4) Safety reminders
- ADC input limit is 1.8V.
- Use a safe divider / analog conditioning.
- Treat the project as engineering evidence only.

