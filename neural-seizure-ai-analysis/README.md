# Predictive AI Neural Seizure Analysis

Synthetic research and engineering project derived from the paper
`Predictive AI Analysis of Brain Neurons Using High-Bandwidth Neural Sensors for Early Detection of Brain Seizures`.

This is not a clinical device, diagnosis tool, or treatment recommendation. It is a portfolio-grade implementation that turns the paper's architecture into runnable code: synthetic high-bandwidth neural sensing, signal preprocessing, pre-ictal feature extraction, model-family comparison, teacher-to-student distillation, edge-inference budgeting, and safety review artifacts.

The IEEE Access review mapping is documented in
[`docs/ieee-11031450-paper-to-code-traceability.md`](docs/ieee-11031450-paper-to-code-traceability.md) and
[`docs/evidence/ieee-11031450-implementation-evidence.md`](docs/evidence/ieee-11031450-implementation-evidence.md). These documents connect `https://ieeexplore.ieee.org/document/11031450/`, DOI `10.1109/ACCESS.2025.3578991`, the local extracted PDF, runnable Python modules, generated evidence images, tests, and the safety boundary.

## What The Code Demonstrates

- Synthetic EEG/ECoG/iEEG-style multichannel neural signal generation.
- Preprocessing with detrending, high-pass style baseline removal, channel normalization, and windowing.
- Feature extraction for energy, line length, bandpower, high-frequency oscillation ratio, phase-amplitude coupling proxy, channel connectivity, and spatial concentration.
- A teacher ensemble that blends CNN-like, LSTM-like, transformer-like, and GNN-like risk heuristics.
- A distilled logistic student model trained from teacher soft labels for edge deployment.
- Evaluation metrics for sensitivity, specificity, false prediction rate, latency, and lead time.
- Edge budget estimates for memory, multiply-accumulate count, latency, and power.
- Safety controls that separate research analysis from clinical or closed-loop intervention use.
- BeagleBone Black EKG/ECG auxiliary context through Linux IIO ADC reads.
- Optional NumPy acceleration for numeric reducers while preserving the dependency-free pure-Python fallback.
- JSON/CSV artifact schema validation for report, neural feature, and EKG feature evidence.
- Generated evidence package with plots, PNG screenshots, CSV/JSON artifacts, C export, and timing report.
- Notebook visualization for synthetic traces, HFO ratio, PAC proxy, and connectivity curves.

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
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report
```

The demo emits:

- `demo-report.json`: summary metrics, model outputs, edge budget, and safety case.
- `window-features.csv`: per-window feature vectors and labels.
- `bbb-ekg-features.csv`: EKG/ECG context features from synthetic or BeagleBone ADC input.
- `synthetic-neural-ekg-traces.svg/png`: trace evidence and screenshot capture.
- `feature-trajectories.svg/png`: feature trajectory evidence and screenshot capture.
- `biomarker-feature-curves.svg/png`: dedicated HFO ratio, PAC proxy, and connectivity curve evidence.
- `distilled_student.c/.h`: C export for embedded review.
- `hil-timing-report.md`: timing evidence for the student inference path.

## BeagleBone EKG Capture

Use an ADC-connected EKG/ECG front end on BeagleBone Black through Linux IIO:

```bash
PYTHONPATH=src python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --ekg-source beaglebone \
  --bbb-ain 0 \
  --bbb-iio-device /sys/bus/iio/devices/iio:device0 \
  --ekg-sampling-rate-hz 250 \
  --output-dir artifacts/beaglebone-ekg-run
```

EKG is used only as auxiliary autonomic context. It is not a substitute for neural sensing.

## Project Boundary

The implementation uses deterministic synthetic data. It does not train on patient records, does not claim clinical performance, and does not trigger intervention. The code exists to show the engineering pipeline that would be needed before any clinical validation: data contracts, feature extraction, model comparison, edge constraints, and safety gates.

## Documentation

- [Source paper extraction](docs/source-paper-extracted.md)
- [Architecture](docs/deep-architecture.md)
- [Pipeline contract](docs/pipeline-contract.md)
- [Model comparison](docs/model-comparison.md)
- [Edge inference budget](docs/edge-inference-budget.md)
- [Safety review](docs/safety-review.md)
- [Validation plan](docs/validation-plan.md)
- [BeagleBone EKG integration](docs/beaglebone-ekg-integration.md)
- [Public dataset adapter](docs/public-dataset-adapter.md)
- [Distilled student export](docs/distilled-student-export.md)
- [Artifact schema validation](docs/artifact-schema-validation.md)
- [Notebook visualization](docs/notebook-visualization.md)
- [IEEE 11031450 paper-to-code traceability](docs/ieee-11031450-paper-to-code-traceability.md)
- [IEEE 11031450 implementation evidence](docs/evidence/ieee-11031450-implementation-evidence.md)
- [Generated evidence package](docs/evidence/README.md)

## Future Upgrade Path

- Replace synthetic data with approved public datasets.
- Add PyTorch dataset and dataloader boundaries.
- Train CNN/LSTM/transformer/GNN baselines against the same `WindowFeatures` contract or raw windows.
- Export a trained student to ONNX or C for embedded inference.
- Add calibration, uncertainty, and patient-specific thresholding.
