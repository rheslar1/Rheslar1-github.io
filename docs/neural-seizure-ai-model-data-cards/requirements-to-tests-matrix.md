# Requirements-to-Tests Matrix (Neural Seizure Predictive AI)

This matrix maps product requirements (implemented/desired) to verification steps and evidence artifacts.

## Key Assumptions
- Signal generation produces synthetic neural traces and optionally synthetic EKG traces.
- Feature extraction emits `window-features.csv`.
- Model scoring produces predictions and `demo-report.json`.
- EKG fusion is bounded by a signal-quality gate.
- Embedded deployment uses C export (`distilled_student.c/.h`).

## Matrix

| Requirement | What to verify | Test / Evidence method | Output artifacts |
|---|---|---|---|
| R1: Deterministic signal generation | Given seed/config, output trace reproducible | Run CLI with fixed `--seed`, compare checksums of `window-features.csv` and `demo-report.json` | `demo-report.json`, `window-features.csv` |
| R2: Feature extraction contract | All required feature columns exist and are numeric | Schema validation in `artifact_schema.py` and unit tests | `window-features.csv` |
| R3: Teacher model scoring | Teacher probabilities computed per window and metrics are reasonable | Unit tests + inspect `teacher_predictions` | `demo-report.json` |
| R4: Distillation correctness | Student probabilities use exported weights/bias/threshold | Compare host student predictions with recomputed logistic outputs | `demo-report.json`, distillation report fields |
| R5: Student threshold gating | `predicted_preictal` toggles at calibrated threshold | Evaluate `decision_threshold` and compute confusion table | `demo-report.json` |
| R6: EKG fusion bounded behavior | EKG boost is gated by signal quality and is capped | Unit test for boost gating logic | `demo-report.json` (`fused_metrics`), `bbb-ekg-features.csv` |
| R7: C export fidelity | C export compiles and produces consistent probabilities for known inputs | Build + run deterministic feature vectors through C | `distilled_student.c`, `distilled_student.h` |
| R8: Timing evidence reproducibility | Host timing report is written with schema | Run `--write-hil-report` and validate JSON fields | `hil-timing-report.json`, `hil-timing-report.md` |
| R9: Safety gates active | Safety case contains expected gates and hazard register entries | Validate `safety_case` fields in `demo-report.json` | `demo-report.json` |
| R10: Plot/export presence | Plot artifacts are created when `--write-plots` | Validate existence and non-empty outputs | `synthetic-neural-ekg-traces.svg`, `feature-trajectories.svg`, etc |

## Notes
- This repo already includes evidence schema validation for report and CSV artifacts.
- Confusion matrix, probability histograms, and threshold sweep are intended to be added as composable calibration evidence artifacts (see calibration evidence doc).


