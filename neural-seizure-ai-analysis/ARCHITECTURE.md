# Predictive AI Neural Seizure Analysis Architecture

This repository converts the source paper into an executable engineering scaffold. The system is intentionally synthetic and deterministic so reviewers can run it without protected health information, clinical datasets, or heavyweight ML frameworks.

## System Boundary

The project models the research pipeline only:

1. Generate high-bandwidth synthetic neural sensor data.
2. Preprocess and window multichannel time series.
3. Extract biomarkers associated with pre-ictal activity.
4. Compare teacher model families through interpretable heuristics.
5. Distill teacher probabilities into a smaller edge student.
6. Estimate embedded inference budget.
7. Produce safety review outputs.

The project does not diagnose epilepsy, monitor patients, make treatment decisions, or trigger neuromodulation.

## Runtime Flow

```text
SimulationConfig
  -> SyntheticNeuralSignalGenerator
  -> preprocess_samples
  -> window_samples
  -> FeatureExtractor
  -> TeacherEnsemble
  -> distill_student
  -> StudentLogisticModel
  -> evaluate_predictions
  -> edge_budget + safety_case
  -> JSON/CSV artifacts
```

## Code Map

| Module | Responsibility |
| --- | --- |
| `config.py` | Sensor profiles, simulation timing, brain-state labels. |
| `signals.py` | Synthetic EEG/ECoG/iEEG/microarray signal generation with pre-ictal cues. |
| `preprocessing.py` | Baseline removal, z-score normalization, labeled window creation. |
| `features.py` | Bandpower, HFO ratio, PAC proxy, line length, connectivity, spatial concentration. |
| `models.py` | CNN-like, LSTM-like, transformer-like, and GNN-like teacher heuristics. |
| `distillation.py` | Logistic student trained from teacher soft probabilities. |
| `evaluation.py` | Sensitivity, specificity, precision, false predictions per hour, lead time. |
| `edge_budget.py` | Memory, MAC, latency, and power estimates for teacher and student models. |
| `safety.py` | Research boundary, required gates, and hazard mitigation register. |
| `pipeline.py` | End-to-end orchestration and artifact writing. |
| `cli.py` | Command-line interface for repeatable demo runs. |

## Design Rationale

The paper compares several deep learning model families, but this portfolio implementation avoids pretending that a real clinical neural model was trained. Instead, each family is represented by an interpretable heuristic aligned with the data representation it would normally consume:

- CNN-style model: localized time-frequency activity, HFO ratio, gamma power, and line length.
- LSTM-style model: accumulated temporal trend across windows.
- Transformer-style model: strongest-window attention proxy across HFO, PAC, and zero crossings.
- GNN-style model: inter-channel connectivity and spatial concentration.

The teacher ensemble produces soft labels. The student model is intentionally small: one normalized feature vector, one logistic layer, and a JSON-friendly weight report. That makes the edge deployment path visible without overclaiming clinical performance.

