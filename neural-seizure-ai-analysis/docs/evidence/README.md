# Predictive AI Neural Seizure Analysis Evidence

This folder stores generated evidence for the synthetic **Predictive AI Neural Seizure Analysis** project.

## Generated From

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report \
  --hil-target-label host-python-reference
```

## Plot Evidence

- `synthetic-neural-ekg-traces.svg`: generated SVG showing synthetic neural channel activity and auxiliary BeagleBone EKG/ECG context.
- `synthetic-neural-ekg-traces.png`: screenshot capture of the trace SVG for portfolio/document review.
- `feature-trajectories.svg`: generated SVG showing HFO ratio, PAC proxy, connectivity, and energy trajectories used by the teacher/student pipeline.
- `feature-trajectories.png`: screenshot capture of the feature trajectory SVG for portfolio/document review.
- `biomarker-feature-curves.svg`: generated SVG dedicated to HFO ratio, PAC proxy, and connectivity curves over time.
- `biomarker-feature-curves.png`: screenshot capture of the dedicated biomarker curve SVG for portfolio/document review.

## Data And Model Evidence

- `demo-report.json`: end-to-end metrics, edge budget, safety case, fused neural/EKG metrics, and model summary.
- `window-features.csv`: per-window synthetic neural feature vectors and labels.
- `bbb-ekg-features.csv`: per-window EKG/ECG context features from the BeagleBone-compatible sensor path.
- `distilled_student.c`: plain C implementation of the distilled student model.
- `distilled_student.h`: C header for the distilled student model.
- `hil-timing-report.json`: machine-readable timing evidence.
- `hil-timing-report.md`: human-readable timing evidence for embedded Linux or host review.
- `ieee-11031450-implementation-evidence.md`: IEEE Access review source mapping, algorithm coverage, generated run summary, test evidence, and future upgrade path.

## Validation Evidence

- `src/neural_seizure_ai/artifact_schema.py` validates `demo-report.json`, `window-features.csv`, and `bbb-ekg-features.csv`.
- `src/neural_seizure_ai/features.py` reports `numeric_backend()` as `numpy` when NumPy is available and `pure-python` otherwise.
- `notebooks/neural-seizure-feature-visualization.ipynb` runs the demo, writes plots, validates artifacts, exports C, and displays sample traces plus feature curves.

## Provenance

All committed plots and data artifacts are synthetic. They do not contain patient data, human neural recordings, clinical EKG recordings, protected health information, or diagnostic conclusions. Live BeagleBone or approved public-dataset evidence should be added only with explicit source, license, consent, de-identification, and patient-split notes.
