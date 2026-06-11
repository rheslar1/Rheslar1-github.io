# Predictive AI Neural Seizure Analysis

Synthetic research and engineering project derived from the paper
`Predictive AI Analysis of Brain Neurons Using High-Bandwidth Neural Sensors for Early Detection of Brain Seizures`.

This is not a clinical device, diagnosis tool, or treatment recommendation. It is a portfolio-grade implementation that turns the paper's architecture into runnable code: synthetic high-bandwidth neural sensing, signal preprocessing, pre-ictal feature extraction, model-family comparison, teacher-to-student distillation, edge-inference budgeting, and safety review artifacts.

## What The Code Demonstrates

- Synthetic EEG/ECoG/iEEG-style multichannel neural signal generation.
- Preprocessing with detrending, high-pass style baseline removal, channel normalization, and windowing.
- Feature extraction for energy, line length, bandpower, high-frequency oscillation ratio, phase-amplitude coupling proxy, channel connectivity, and spatial concentration.
- A teacher ensemble that blends CNN-like, LSTM-like, transformer-like, and GNN-like risk heuristics.
- A distilled logistic student model trained from teacher soft labels for edge deployment.
- Evaluation metrics for sensitivity, specificity, false prediction rate, latency, and lead time.
- Edge budget estimates for memory, multiply-accumulate count, latency, and power.
- Safety controls that separate research analysis from clinical or closed-loop intervention use.

## Quick Start

Run tests:

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m unittest discover neural-seizure-ai-analysis/tests -v
```

Run the demo pipeline and write artifacts:

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --output-dir neural-seizure-ai-analysis/artifacts
```

The demo emits:

- `demo-report.json`: summary metrics, model outputs, edge budget, and safety case.
- `window-features.csv`: per-window feature vectors and labels.

## Project Boundary

The implementation uses deterministic synthetic data. It does not train on patient records, does not claim clinical performance, and does not trigger intervention. The code exists to show the engineering pipeline that would be needed before any clinical validation: data contracts, feature extraction, model comparison, edge constraints, and safety gates.

## Documentation

- [Source paper extraction](docs/source-paper-extracted.md)
- [Deep architecture](docs/deep-architecture.md)
- [Pipeline contract](docs/pipeline-contract.md)
- [Model comparison](docs/model-comparison.md)
- [Edge inference budget](docs/edge-inference-budget.md)
- [Safety review](docs/safety-review.md)
- [Validation plan](docs/validation-plan.md)

