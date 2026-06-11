# Predictive AI Neural Seizure Analysis

Canonical repo: https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis

Source artifact: `Predictive AI Analysis of Brain Neurons Using High-Bandwidth Neural Sensors for Early Detection of Brain Seizures_05_13_2026 - Copy.docx`

## Project Summary

This project converts a research paper on high-bandwidth neural sensing and predictive AI seizure forecasting into a runnable embedded AI portfolio artifact. It includes synthetic EEG/ECoG/iEEG-style data generation, preprocessing, pre-ictal biomarker feature extraction, teacher model-family comparison, teacher-to-student knowledge distillation, edge inference budgeting, and safety review documentation.

The project is not a deployed clinical system. It is a research and engineering demonstration that shows how computational neuroscience concepts can be structured into reviewable software boundaries before any patient data, clinical validation, or hardware-in-the-loop deployment is introduced.

## Technical Focus

- High-bandwidth sensing profiles for EEG, ECoG, iEEG, and microelectrode arrays.
- Synthetic pre-ictal biomarkers such as high-frequency oscillations, phase-amplitude coupling proxy, micro-burst activity, and increasing channel synchrony.
- Feature extraction for bandpower, HFO ratios, line length, energy, connectivity, and spatial concentration.
- Teacher ensemble inspired by CNN, LSTM, transformer, and graph neural network model families.
- Distilled logistic student model with calibrated threshold, inspectable weights, and edge-budget estimates.
- Safety review covering false positives, false negatives, privacy, explainability, consent, and human-in-the-loop gates.

## Code Evidence

- `src/neural_seizure_ai/signals.py`: deterministic synthetic neural signal generator.
- `src/neural_seizure_ai/preprocessing.py`: baseline removal, normalization, and window labeling.
- `src/neural_seizure_ai/features.py`: biomarker feature extraction.
- `src/neural_seizure_ai/models.py`: CNN/LSTM/transformer/GNN-inspired teacher ensemble.
- `src/neural_seizure_ai/distillation.py`: threshold-calibrated distilled edge student.
- `src/neural_seizure_ai/evaluation.py`: sensitivity, specificity, precision, false prediction rate, and lead-time metrics.
- `src/neural_seizure_ai/edge_budget.py`: memory, MAC, latency, and power estimates.
- `src/neural_seizure_ai/safety.py`: research boundary and hazard register.
- `src/neural_seizure_ai/cli.py`: demo runner that writes JSON and CSV artifacts.
- `tests/test_pipeline.py`: unit coverage for the runnable pipeline.

## Deep Documentation

- `README.md`: quick start and project boundary.
- `ARCHITECTURE.md`: system boundary and runtime flow.
- `docs/deep-architecture.md`: layered implementation architecture.
- `docs/pipeline-contract.md`: input, feature, and artifact contracts.
- `docs/model-comparison.md`: model-family mapping and distillation flow.
- `docs/edge-inference-budget.md`: embedded inference budget review.
- `docs/safety-review.md`: hazards, controls, and clinical gates.
- `docs/validation-plan.md`: current tests and future validation plan.
- `docs/source-paper-extracted.md`: Markdown extraction from the source DOCX.

## Engineering Boundaries

1. Generate synthetic high-resolution neural time-series data.
2. Convert raw windows into reviewable signal-processing features.
3. Compare teacher model-family probabilities for pre-ictal state detection.
4. Distill the teacher ensemble into a lower-power student model.
5. Estimate embedded memory, compute, latency, and power costs.
6. Keep safety, privacy, explainability, consent, and clinical validation constraints explicit.

## Current Validation

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m unittest discover neural-seizure-ai-analysis/tests -v
```

The demo CLI can also write inspectable artifacts:

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --output-dir neural-seizure-ai-analysis/artifacts
```

## Future Evidence

- Add plotted screenshots of synthetic traces and feature trajectories.
- Add an approved public-dataset adapter with strict provenance notes.
- Add ONNX or C export for the distilled student.
- Add hardware-in-the-loop timing evidence on an embedded Linux or MCU target.

