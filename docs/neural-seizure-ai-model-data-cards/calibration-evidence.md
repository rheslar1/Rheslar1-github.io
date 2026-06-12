# Calibration Evidence Package (Probability Histograms, Threshold Sweep, Confusion Matrix)

This document defines a repeatable evidence structure for calibration and decision-threshold review for the **distilled student**.

## 1. Scope
Calibration evidence is for:
- Distilled student logistic probabilities
- Decision threshold selection and expected tradeoffs

Optional extension:
- Calibration of fused (student + EKG) probabilities under fusion boost gating.

## 2. Required Evidence Artifacts
All artifacts are produced for a given run configuration (sensor, duration, preictal/ictal start, window/stride, seed).

### 2.1 Probability histograms
- Separate distributions for:
  - expected positive windows (pre-ictal/ictal labels used in pipeline)
  - expected negative windows

Expected filenames (planned):
- `calibration/probability_histogram_positive.png|svg`
- `calibration/probability_histogram_negative.png|svg`

### 2.2 Threshold sweep
Compute metrics over a grid of thresholds (e.g., 0.05 steps within [0.05..0.95] or unique probability values).

Required columns (CSV planned):
- threshold
- sensitivity
- specificity
- precision
- false_predictions_per_hour
- lead_time_seconds

Expected filename (planned):
- `calibration/threshold_sweep.csv`

### 2.3 Confusion matrix
At the selected `decision_threshold`:
- TP, FP, TN, FN

Expected filename (planned):
- `calibration/confusion_matrix.json`
- `calibration/confusion_matrix.svg|png`

### 2.4 Lead-time distribution
Distribution of lead-time seconds for:
- true positive alerts

Expected filename:
- `calibration/lead_time_distribution.csv`
- `calibration/lead_time_distribution.svg|png`

### 2.5 False-alert analysis
For windows that produce FP:
- record window start/end
- record student probability
- record key features (at least top-k explainability features)

Expected filename:
- `calibration/false_alerts.csv`

## 3. Evidence Manifest Integration
Each run must reference:
- config parameters
- seed
- thresholds used
- output file list

Use:
- `docs/neural-seizure-ai-model-data-cards/evidence-manifest.json`

## 4. Limitations
This calibration evidence is based on synthetic pipeline labels and internal teacher-target framing. Clinical calibration requires patient-level held-out datasets and governance.


