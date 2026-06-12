# Predictive AI Neural Seizure Analysis

Canonical repo: https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis

Source artifact: `Predictive AI Analysis of Brain Neurons Using High-Bandwidth Neural Sensors for Early Detection of Brain Seizures_05_13_2026.docx`

## Project Summary

This project converts a research paper on high-bandwidth neural sensing and predictive AI seizure forecasting into a runnable embedded AI portfolio artifact. It includes synthetic EEG/ECoG/iEEG-style data generation, preprocessing, pre-ictal biomarker feature extraction, teacher model-family comparison, teacher-to-student knowledge distillation, BeagleBone EKG/ECG auxiliary context, edge inference budgeting, C export, timing evidence, and safety review documentation.

The project is not a deployed clinical system. It is a research and engineering demonstration that shows how computational neuroscience concepts can be structured into reviewable software boundaries before any patient data, clinical validation, or hardware-in-the-loop deployment is introduced.

## Technical Focus

- High-bandwidth sensing profiles for EEG, ECoG, iEEG, and microelectrode arrays.
- Synthetic pre-ictal biomarkers such as high-frequency oscillations, phase-amplitude coupling proxy, micro-burst activity, and increasing channel synchrony.
- Feature extraction for bandpower, HFO ratios, line length, energy, connectivity, and spatial concentration.
- Teacher ensemble inspired by CNN, LSTM, transformer, and graph neural network model families.
- Distilled logistic student model with calibrated threshold, inspectable weights, and edge-budget estimates.
- BeagleBone Black EKG/ECG capture through Linux IIO ADC files for auxiliary autonomic context.
- Generated plot screenshots, CSV/JSON artifacts, C export, and host timing report.
- Notebook visualization for synthetic traces, HFO ratio, PAC proxy, and connectivity over time.
- JSON/CSV artifact schema validation and optional NumPy acceleration with pure-Python fallback.
- Safety review covering false positives, false negatives, privacy, explainability, consent, and human-in-the-loop gates.

## Code Evidence

- `src/neural_seizure_ai/signals.py`: deterministic synthetic neural signal generator.
- `src/neural_seizure_ai/preprocessing.py`: baseline removal, normalization, and window labeling.
- `src/neural_seizure_ai/features.py`: biomarker feature extraction.
- `src/neural_seizure_ai/artifact_schema.py`: JSON/CSV artifact validation for generated evidence.
- `src/neural_seizure_ai/models.py`: CNN/LSTM/transformer/GNN-inspired teacher ensemble.
- `src/neural_seizure_ai/distillation.py`: threshold-calibrated distilled edge student.
- `src/neural_seizure_ai/evaluation.py`: sensitivity, specificity, precision, false prediction rate, and lead-time metrics.
- `src/neural_seizure_ai/edge_budget.py`: memory, MAC, latency, and power estimates.
- `src/neural_seizure_ai/ekg.py`: BeagleBone IIO ADC EKG capture and EKG feature extraction.
- `src/neural_seizure_ai/fusion.py`: bounded EKG context fusion with neural student probabilities.
- `src/neural_seizure_ai/datasets.py`: provenance-guarded public dataset adapter.
- `src/neural_seizure_ai/export.py`: C export for the distilled edge student.
- `src/neural_seizure_ai/hil.py`: timing evidence generator.
- `src/neural_seizure_ai/plots.py`: SVG plot evidence generator.
- `src/neural_seizure_ai/safety.py`: research boundary and hazard register.
- `src/neural_seizure_ai/paper_traceability.py`: IEEE 11031450 source, DOI, strategy-to-code map, evidence artifact references, verification checks, and future upgrade path.
- `src/neural_seizure_ai/cli.py`: demo runner that writes JSON and CSV artifacts.
- `tests/test_pipeline.py`: unit coverage for the runnable pipeline.

## Deep Documentation

- `README.md`: quick start and project boundary.
- `ARCHITECTURE.md`: system boundary and runtime flow.
- `docs/detailed design archtitecture.md`: layered implementation architecture.
- `docs/pipeline-contract.md`: input, feature, and artifact contracts.
- `docs/model-comparison.md`: model-family mapping and distillation flow.
- `docs/edge-inference-budget.md`: embedded inference budget review.
- `docs/safety-review.md`: hazards, controls, and clinical gates.
- `docs/validation-plan.md`: current tests and future validation plan.
- `docs/beaglebone-ekg-integration.md`: BeagleBone ADC/IIO EKG sensor integration.
- `docs/public-dataset-adapter.md`: provenance and patient-split guardrails.
- `docs/distilled-student-export.md`: C export documentation.
- `docs/artifact-schema-validation.md`: JSON/CSV artifact contracts and validation checks.
- `docs/notebook-visualization.md`: notebook workflow for traces, HFO/PAC/connectivity curves, artifact validation, and C export.

## Model/Data Cards + Evidence Package (added)
- Model card (teacher ensemble + distilled student):
  - `docs/neural-seizure-ai-model-data-cards/model-card-teacher-ensemble-distilled-student.md`
- Data card (synthetic + approved public dataset adapter):
  - `docs/neural-seizure-ai-model-data-cards/data-card-synthetic-and-public-adapters.md`
- Requirements-to-tests matrix:
  - `docs/neural-seizure-ai-model-data-cards/requirements-to-tests-matrix.md`
- Calibration evidence package specification:
  - `docs/neural-seizure-ai-model-data-cards/calibration-evidence.md`
- Live embedded/Linux timing report spec:
  - `docs/neural-seizure-ai-model-data-cards/live-embedded-linux-timing-report.md`
- Export options note (ONNX/fixed-point vs current C export):
  - `docs/neural-seizure-ai-model-data-cards/export-note-onnx-fixed-point-vs-c.md`
- Public dataset example run template:
  - `docs/neural-seizure-ai-model-data-cards/public-dataset-example-run.md`
- Hardware-in-the-loop report template:
  - `docs/neural-seizure-ai-model-data-cards/hil-report.md`
- Safety case expansion / hazard register:
  - `docs/neural-seizure-ai-model-data-cards/safety-case-hazard-register.md`
- Reviewer walkthrough:
  - `docs/neural-seizure-ai-model-data-cards/reviewer-walkthrough.md`

- `notebooks/neural-seizure-feature-visualization.ipynb`: executable visualization notebook.
- `docs/source/`: included DOCX source manuscript and Markdown extraction.
- `docs/source-paper-provenance.md`: source filename, project copy, SHA-256 checksums, DOCX metadata, and safety boundary.
- `docs/ieee-11031450-paper-to-code-traceability.md`: IEEE Access review-to-code strategy map with evidence images, tests, safety boundary, and future upgrade path.
- `docs/evidence/ieee-11031450-implementation-evidence.md`: implementation evidence for IEEE 11031450, generated run summary, and algorithm coverage artifacts.
- `docs/evidence/README.md`: generated screenshots, plots, artifacts, C export, and timing evidence.
- `docs/source-paper-extracted.md`: Markdown extraction from the source DOCX.

## Engineering Boundaries

1. Generate synthetic high-resolution neural time-series data.
2. Convert raw windows into reviewable signal-processing features.
3. Compare teacher model-family probabilities for pre-ictal state detection.
4. Distill the teacher ensemble into a lower-power student model.
5. Estimate embedded memory, compute, latency, and power costs.
6. Fuse BeagleBone EKG/ECG only as bounded auxiliary context.
7. Generate plots, screenshots, C export, and timing evidence.
8. Keep safety, privacy, explainability, consent, and clinical validation constraints explicit.

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
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report
```

## Completed Evidence

- Plotted screenshots of synthetic neural and BeagleBone EKG traces.
- Plotted screenshots of HFO, PAC, connectivity, and energy feature trajectories.
- Dedicated biomarker plot for HFO ratio, PAC proxy, and connectivity over time.
- Strict public-dataset adapter with de-identification, source, citation, license, consent basis, and patient-level split checks.
- C export for the distilled student model.
- JSON/CSV schema validation for generated report, feature, and EKG artifacts.
- Optional NumPy acceleration with dependency-free pure-Python fallback.
- Host timing evidence that can be rerun on BeagleBone or embedded Linux targets.
- JSON/CSV report artifacts for metrics, predictions, neural features, and EKG features.
- IEEE 11031450 paper-to-code traceability, including the IEEE URL, DOI, local extracted PDF, code modules, evidence artifacts, verification tests, and clinical safety boundary.
- Included the 05/13/2026 DOCX source manuscript, Markdown extraction, and provenance/checksum note inside the project documentation tree.

## Future Upgrade Path

- Replace synthetic data with approved public datasets.
- Add PyTorch dataset and dataloader boundaries.
- Train CNN/LSTM/transformer/GNN baselines against the same `WindowFeatures` contract or raw windows.
- Export a trained student to ONNX or C for embedded inference.
- Add calibration, uncertainty, and patient-specific thresholding.
