# Test Report — BeagleBone AD8232 EKG ADC Driver

Scrub date: 2026-06-11

## 1) Exact validation commands
### Unit tests
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m unittest discover beaglebone-ad8232-ekg-driver/tests -v
```

### Simulated evidence generation
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

## 2) Environment
- Evidence generation: host execution
- Hardware path: available via CLI (non-verified by CI)

## 3) Pass/Fail results
- Unit tests: PASS as defined by repository test coverage.
- Evidence generation: PASS when required evidence artifacts are produced.

## 4) Unresolved test gaps
- Embedded timing tests on the actual BeagleBone device.
- Oscilloscope-based electrical verification of divider behavior.

