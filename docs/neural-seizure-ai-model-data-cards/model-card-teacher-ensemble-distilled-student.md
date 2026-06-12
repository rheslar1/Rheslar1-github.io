# Model Card: Teacher Ensemble + Distilled Student (Neural Seizure Predictive AI)

**Project**: Predictive AI Neural Seizure Analysis (synthetic/replay research pipeline)

## 1. Intended Use
This model is intended for **research and engineering review** only:
- Generate **bounded pre-ictal risk probability curves** from **windowed neural features**.
- Provide **teacher ensemble probability signals** as a knowledge source.
- Provide a **distilled student logistic model** (weights + bias + calibrated threshold) intended to be exported to embedded inference paths (currently via C export).
- Support **auxiliary EKG/ECG context fusion** as a bounded, non-autonomous signal boost (synthetic or replayed).

The output is **not** a diagnosis, not a medical device function, and not authorized for clinical decision-making.

## 2. Non-Use
Do **not** use this model for:
- Clinical diagnosis or treatment decisions.
- Autonomous intervention (e.g., stimulation, medication delivery, device control).
- Patient monitoring in real-world settings.
- Any use involving identifiable patient data without IRB/ethics and explicit governance.

## 3. Inputs
### 3.1 Neural feature vector (per window)
The distilled student consumes a fixed-length **feature vector** derived from a window of neural time-series. The pipeline exports a `window-features.csv` artifact with named columns.

Expected input contract (conceptual):
- **Window-aligned features** such as HFO ratio, PAC proxy, connectivity metrics, and energy/entropy complexity proxies.
- Feature normalization/conditioning is performed by the research pipeline before scoring.

### 3.2 Optional EKG/ECG feature windows (fusion)
When EKG context is enabled, the pipeline:
- Captures/generates EKG/ECG auxiliary windows.
- Extracts named EKG features into `bbb-ekg-features.csv`.
- Applies a **bounded probability boost** gated by signal quality.

Fusion gate (implemented): if `signal_quality < 0.35` then EKG boost is `0.0`.

## 4. Outputs
### 4.1 Teacher ensemble output
- Per window: `teacher_predictions` includes:
  - probability
  - boolean predicted pre-ictal decision (at teacher’s implied decision rule)
  - rationale string

### 4.2 Distilled student output
- Per window: `student_predictions` includes:
  - probability (logistic sigmoid)
  - boolean predicted pre-ictal decision using `decision_threshold`
  - rationale string

### 4.3 Fused output (student + EKG context)
- Per window: `fused_predictions` includes:
  - probability after bounded context boost
  - boolean predicted pre-ictal decision using the same threshold

### 4.4 Exported embedded interface (current)
- C export generates:
  - `distilled_student.h`
  - `distilled_student.c`

The C model provides:
- `predict_preictal_probability(float features[FEATURE_COUNT])`
- `predict_preictal(float features[FEATURE_COUNT])`

## 5. Thresholds
### 5.1 Distilled student decision threshold
- Stored as `decision_threshold` in the distillation report.
- Exported as `kThreshold` in `distilled_student.c`.

### 5.2 Teacher probability reference
The distillation calibrates the student threshold based on teacher probability targets.

## 6. Metrics (research evaluation)
The pipeline computes per-run metrics using `evaluate_predictions`:
- **Sensitivity**
- **Specificity**
- **Precision**
- **False predictions per hour**
- **First alert time** and **lead-time seconds** (when first alert occurs before ictal start)

Artifacts that carry these metrics:
- `demo-report.json` (contains `teacher_metrics`, `student_metrics`, optional `fused_metrics`)

## 7. Calibration Evidence
Calibration currently includes:
- threshold selection derived during distillation (`_calibrate_threshold`)

**Planned/composable evidence package** (see `docs/neural-seizure-ai-model-data-cards/calibration-evidence.md`):
- probability histograms
- threshold sweep
- confusion matrix
- lead-time distribution
- false-alert analysis

## 8. Limitations
Known limitations of this research pipeline:
- Synthetic-data realism does not guarantee clinical representativeness.
- EKG/ECG fusion is auxiliary context only; it does not replace neural evidence.
- Timing evidence in the repo may be **host-side**; hardware profiling must be repeated on the target.
- Threshold calibration is based on the pipeline’s internal teacher target framing.

## 9. Safety Boundary
The safety case is included in `demo-report.json` under `safety_case`:
- Required gates emphasize:
  - patient privacy and de-identification
  - held-out evaluation
  - clinician review
  - no autonomous intervention authority

This model must remain inside that research-only boundary.

## 10. Documentation Pointers (reviewer)
- Evidence artifacts: `neural-seizure-ai-analysis/docs/evidence/`
- Evidence generation entrypoints:
  - `neural-seizure-ai-analysis/src/neural_seizure_ai/cli.py`
  - `--export-c`, `--write-plots`, `--write-hil-report`


