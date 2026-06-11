# Validation Plan

## Current Automated Validation

Run:

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m unittest discover neural-seizure-ai-analysis/tests -v
```

Current tests cover:

- Synthetic generator emits interictal, preictal, and ictal labels.
- Feature extractor exposes paper-backed biomarkers.
- End-to-end demo runs teacher, student, edge budget, and safety case.

## Artifact Validation

Run:

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli --sensor ecog --output-dir neural-seizure-ai-analysis/artifacts
```

Inspect:

- `demo-report.json`
- `window-features.csv`

## Future Engineering Validation

- Add golden feature fixtures for deterministic windows.
- Add threshold-regression tests for alert timing.
- Add CLI artifact schema checks.
- Add fixed-point or quantized student inference tests.
- Add performance budget tests for feature extraction runtime.
- Add hardware-in-the-loop profiling for target edge devices.

## Future Clinical Validation

This project cannot claim clinical performance until it is validated against approved patient datasets. A realistic validation program would include:

- Patient-level train/test separation.
- Sensor-modality separation.
- Medication and sleep-state stratification.
- Reviewer adjudication of seizure onset labels.
- Lead-time distribution by seizure type.
- False predictions per hour across long recordings.
- Calibration curves and confidence thresholds.
- Prospective validation before any intervention workflow.

