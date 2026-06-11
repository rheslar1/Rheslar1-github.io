# IEEE 11031450 Paper-To-Code Traceability

Project: Predictive AI Neural Seizure Analysis

## Source Boundary

- Requested source: `https://ieeexplore.ieee.org/document/11031450/`
- Local source used for extraction: `A_Comprehensive_Review_of_EEG-Based_Seizure_Detection_Techniques.pdf`
- Extracted metadata: `A Comprehensive Review of EEG-Based Seizure Detection Techniques`, IEEE Access 2025, DOI `10.1109/ACCESS.2025.3578991`.
- Implementation basis: runnable Python code, generated synthetic artifacts, and documentation evidence in this repository.
- Safety boundary: this is synthetic portfolio engineering evidence only. It is not a clinical detector, medical monitor, diagnostic tool, or treatment recommendation.

## Implemented Strategy Map

| IEEE review strategy | Runnable implementation | Evidence artifacts | Verification |
| --- | --- | --- | --- |
| High-bandwidth EEG/ECoG/iEEG sensing | `src/neural_seizure_ai/config.py`, `src/neural_seizure_ai/signals.py` define modality profiles, sampling rates, channels, noise, and HFO visibility. | `synthetic-neural-ekg-traces.png`, `window-features.csv` | `test_synthetic_generator_produces_expected_labels` |
| Preprocessing and labeled windowing | `src/neural_seizure_ai/preprocessing.py`, `src/neural_seizure_ai/pipeline.py` normalize channels and create labeled sliding windows. | `window-features.csv`, `demo-report.json` | `test_feature_extractor_exposes_paper_backed_biomarkers` |
| Time-frequency biomarkers | `src/neural_seizure_ai/features.py` computes bandpower, HFO ratios, line length, and PAC-style markers. | `feature-trajectories.png`, `biomarker-feature-curves.png`, `window-features.csv` | `test_feature_extractor_exposes_paper_backed_biomarkers` |
| Wavelet and nonlinear complexity biomarkers | `src/neural_seizure_ai/features.py` adds Haar detail energy, wavelet entropy, sample entropy, Katz FD, and Higuchi FD. | `algorithm-coverage-map.png`, `window-features.csv` | `test_feature_extractor_exposes_paper_backed_biomarkers` |
| Image-style EEG representation | `src/neural_seizure_ai/representations.py`, `src/neural_seizure_ai/plots.py` build time-frequency and connectivity matrices without GPU dependencies. | `time-frequency-image-map.png` | `test_evidence_outputs_include_plots_c_export_and_timing` |
| CNN, LSTM, transformer, and GNN model-family comparison | `src/neural_seizure_ai/models.py` implements deterministic teacher proxies for spectrogram, temporal, attention, and connectivity views. | `demo-report.json`, `algorithm-coverage-map.png` | `test_demo_runs_teacher_student_edge_budget_and_safety_case` |
| Knowledge distillation for edge deployment | `src/neural_seizure_ai/distillation.py`, `src/neural_seizure_ai/edge_budget.py`, `src/neural_seizure_ai/export.py` train and export a compact student. | `distilled_student.c`, `distilled_student.h`, `demo-report.json` | `test_demo_runs_teacher_student_edge_budget_and_safety_case` |
| EKG/ECG multimodal context on BeagleBone | `src/neural_seizure_ai/ekg.py`, `src/neural_seizure_ai/fusion.py` read AD8232-compatible Linux IIO ADC context and bound fusion impact. | `bbb-ekg-features.csv`, `synthetic-neural-ekg-traces.png` | `test_beaglebone_iio_reader_converts_raw_adc_to_millivolts`, `test_synthetic_ekg_features_provide_autonomic_context` |
| Post-processing and false-warning control | `src/neural_seizure_ai/postprocessing.py`, `src/neural_seizure_ai/pipeline.py` apply EMA smoothing, hysteresis, SPH, and SOH checks. | `risk-warning-timeline.png`, `demo-report.json` | `test_demo_runs_teacher_student_edge_budget_and_safety_case` |
| Explainability and reviewable outputs | `src/neural_seizure_ai/explainability.py` ranks normalized feature contributions from the distilled student. | `demo-report.json` | `test_demo_runs_teacher_student_edge_budget_and_safety_case` |
| Notebook trace and feature visualization | `notebooks/neural-seizure-feature-visualization.ipynb`, `src/neural_seizure_ai/plots.py` run the demo, validate artifacts, export C, and display traces plus feature curves. | `synthetic-neural-ekg-traces.png`, `biomarker-feature-curves.png`, `feature-trajectories.png` | `test_evidence_outputs_include_plots_c_export_and_timing` |
| Generated artifact schema validation | `src/neural_seizure_ai/artifact_schema.py`, `src/neural_seizure_ai/pipeline.py` validate JSON and CSV report/feature contracts. | `demo-report.json`, `window-features.csv`, `bbb-ekg-features.csv` | `test_artifact_schema_rejects_missing_fields_and_reports_numeric_backend`, `test_evidence_outputs_include_plots_c_export_and_timing` |
| Dataset provenance and validation boundary | `src/neural_seizure_ai/datasets.py`, `src/neural_seizure_ai/safety.py` require source, citation, license, consent/public basis, de-identification, and patient split. | `public-dataset-adapter.md`, `safety-review.md` | `test_public_dataset_adapter_requires_strict_provenance` |
| Hardware and timing evidence | `src/neural_seizure_ai/hil.py`, `src/neural_seizure_ai/export.py`, `src/neural_seizure_ai/cli.py` produce host/target timing reports and C export. | `hil-timing-report.md`, `hil-timing-report.json` | `test_evidence_outputs_include_plots_c_export_and_timing` |

## Traceability Module

The same mapping is available to Python callers through `src/neural_seizure_ai/paper_traceability.py`.

Key exports:

- `IEEE_11031450_SOURCE`
- `IEEE_11031450_LOCAL_SOURCE`
- `IEEE_11031450_METADATA`
- `FUTURE_UPGRADE_PATH`
- `PaperImplementationMapping`
- `build_ieee_11031450_traceability()`
- `render_ieee_11031450_markdown()`

## Evidence Images Included In The Project

- `docs/evidence/algorithm-coverage-map.png`: shows the implemented review-paper algorithm coverage across sensing, preprocessing, biomarkers, model families, post-processing, EKG fusion, XAI, and safety.
- `docs/evidence/time-frequency-image-map.png`: shows the image-style time-frequency branch for CNN/pretrained-model review.
- `docs/evidence/risk-warning-timeline.png`: shows teacher, student, EKG-fused risk, smoothing, hysteresis threshold, SPH/SOH logic, and warning timing.
- `docs/evidence/feature-trajectories.png`: shows HFO, PAC, connectivity, and energy trajectories.
- `docs/evidence/biomarker-feature-curves.png`: isolates HFO ratio, PAC proxy, and connectivity over time.
- `docs/evidence/synthetic-neural-ekg-traces.png`: shows synthetic neural trace and BeagleBone AD8232-compatible EKG context.

## Future Upgrade Path

- Replace synthetic data with approved public datasets.
- Add PyTorch dataset and dataloader boundaries.
- Train CNN/LSTM/transformer/GNN baselines against the same `WindowFeatures` contract or raw windows.
- Export a trained student to ONNX or C for embedded inference.
- Add calibration, uncertainty, and patient-specific thresholding.

## Clinical Boundary

The current implementation is a deterministic engineering simulation. Any move toward real clinical use would require approved datasets, patient-level split governance, clinician-adjudicated labels, privacy review, cybersecurity review, target-hardware verification, prospective validation, and regulatory approval.
