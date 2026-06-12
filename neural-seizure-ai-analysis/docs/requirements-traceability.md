# Requirements Traceability — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) Requirements (R)
R1. Deterministic synthetic neural signal generation.

R2. Preprocess/window multichannel signals into reviewable windows.

R3. Feature extraction for a defined biomarker contract (bandpower, HFO ratio, PAC proxy, line length, connectivity, spatial concentration).

R4. Teacher ensemble model-family proxies producing calibrated probabilities.

R5. Distill teacher probabilities into a smaller calibrated student and export to C.

R6. Generate BeagleBone EKG/ECG-derived features and fuse bounded auxiliary context.

R7. Produce evidence artifacts: plots, CSV/JSON reports, and artifact schema validation outputs.

R8. Generate timing/HIL evidence and edge inference budget estimates.

R9. Safety boundary enforcement: research-only scope; explicit hazard/risk register artifacts.

R10. Provenance-guarded public dataset adapter (de-identification and patient-split guardrails).

## 2) Traceability Matrix
| Requirement | Code Modules (evidence of implementation) | Tests | Evidence Artifacts |
|---|---|---|---|
| R1 | `src/neural_seizure_ai/signals.py` | `tests/test_pipeline.py` | `docs/evidence/synthetic-neural-ekg-traces.*` |
| R2 | `src/neural_seizure_ai/preprocessing.py` | `tests/test_pipeline.py` | `docs/evidence/window-features.csv` |
| R3 | `src/neural_seizure_ai/features.py` | `tests/test_pipeline.py` | `docs/evidence/feature-trajectories.*`, `docs/evidence/biomarker-feature-curves.*` |
| R4 | `src/neural_seizure_ai/models.py` | `tests/test_pipeline.py` | `docs/evidence/demo-report.json` |
| R5 | `src/neural_seizure_ai/distillation.py`, `src/neural_seizure_ai/export.py` | `tests/test_pipeline.py` | `docs/distilled_student.c/.h`, `docs/evidence/demo-report.json` |
| R6 | `src/neural_seizure_ai/ekg.py`, `src/neural_seizure_ai/fusion.py` | `tests/test_pipeline.py` | `docs/evidence/bbb-ekg-features.csv` |
| R7 | `src/neural_seizure_ai/plots.py`, `src/neural_seizure_ai/artifact_schema.py` | `tests/test_pipeline.py` | `docs/evidence/*`, schema validation outputs |
| R8 | `src/neural_seizure_ai/edge_budget.py`, `src/neural_seizure_ai/hil.py` | `tests/test_pipeline.py` | `docs/evidence/hil-timing-report.*`, `docs/edge-inference-budget.md` |
| R9 | `src/neural_seizure_ai/safety.py` | `tests/test_pipeline.py` | `docs/safety-review.md`, `docs/evidence/risk-warning-timeline.*` |
| R10 | `src/neural_seizure_ai/datasets.py` | `tests/test_pipeline.py` | `docs/public-dataset-adapter.md`, dataset provenance docs |

## 3) Review Notes
- This mapping intentionally ties each portfolio “evidence artifact” to the specific modules that produce or validate it.
- Any future additions (calibration sweep outputs, live embedded timing) should extend both this matrix and `docs/evidence-matrix.md`.

