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
- BeagleBone IIO ADC raw-count conversion to millivolts.
- Synthetic EKG feature extraction and autonomic context.
- Public dataset manifest provenance guard.
- Plot, C export, timing evidence generation, and JSON/CSV artifact schema validation.
- Optional NumPy acceleration backend reporting with pure-Python fallback.
- IEEE 11031450 source, DOI, algorithm-to-code mapping, artifact links, and future upgrade path.

## Artifact Validation

Run:

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report
```

Inspect:

- `demo-report.json`
- `window-features.csv`
- `bbb-ekg-features.csv`
- `synthetic-neural-ekg-traces.svg/png`
- `feature-trajectories.svg/png`
- `biomarker-feature-curves.svg/png`
- `distilled_student.c/.h`
- `hil-timing-report.json/.md`

## Future Engineering Validation

- Add golden feature fixtures for deterministic windows.
- Add threshold-regression tests for alert timing.
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
