# Architecture

## 1. Project Intent

The source paper describes early seizure forecasting with high-bandwidth neural sensors, predictive AI, multimodal context, knowledge distillation, and closed-loop neuromodulation review. This repository turns that paper into runnable engineering evidence.

The implementation is deliberately synthetic. It demonstrates how the software layers should be separated before real datasets, hardware, protected health information, or clinical validation are introduced.

## 2. Sensor Layer

The `SensorProfile` table defines four source-paper sensor modalities:

| Profile | Channels | Sampling Rate | Modeled Tradeoff |
| --- | ---: | ---: | --- |
| EEG | 8 | 256 Hz | Non-invasive, noisier, lower HFO gain. |
| ECoG | 12 | 512 Hz | Higher SNR and cortical surface precision. |
| iEEG | 16 | 512 Hz | Depth-electrode connectivity and deep-region access. |
| Microelectrode Array | 24 | 1024 Hz | Highest bandwidth and localized burst resolution. |

Each profile changes channel count, sample rate, noise, and HFO gain. This keeps the model behavior tied to sensor reality instead of treating all neural streams as interchangeable arrays.

## 3. Synthetic Data Layer

`SyntheticNeuralSignalGenerator` emits labeled `SignalSample` rows:

- `interictal`: baseline alpha, beta, slow drift, and noise.
- `preictal`: rising high-frequency oscillations, PAC-like modulation, micro-bursts, and channel synchrony.
- `ictal`: stronger rhythmic activity and broadband activity after configured onset.

The generator uses deterministic seeding so test runs are repeatable.

## 4. Preprocessing Layer

`preprocess_samples` removes slow baseline drift and normalizes each channel. The current implementation uses:

- Moving baseline subtraction.
- Per-channel z-score normalization.
- Label preservation.

`window_samples` creates fixed windows and assigns labels from sample state composition. Windows that contain ictal samples are labeled ictal, windows with enough pre-ictal samples are labeled preictal, and the rest are interictal.

## 5. Feature Layer

The feature extractor produces one `WindowFeatures` record per window:

- Energy and line length for activity intensity.
- Zero-crossing rate for signal-frequency behavior.
- Delta, theta, alpha, beta, gamma, and HFO bandpower through Goertzel power estimation.
- HFO-to-beta and HFO-to-total ratios.
- PAC proxy from slow activity versus fast-envelope correlation.
- Mean and max absolute channel connectivity.
- Spatial concentration from per-channel energy distribution.

The feature set is intentionally explainable so alert decisions can be reviewed.

## 6. Teacher Model Layer

The teacher ensemble includes four model-family proxies:

- `CnnSpectrogramHeuristic`: time-frequency and localized pattern proxy.
- `LstmTemporalHeuristic`: temporal accumulation proxy.
- `TransformerAttentionHeuristic`: strongest biomarker attention proxy.
- `GnnConnectivityHeuristic`: channel graph and synchrony proxy.

The ensemble averages probabilities and preserves per-model rationale strings. This gives the portfolio an AI architecture without claiming a trained clinical model.

## 7. Distilled Student Layer

`distill_student` trains `StudentLogisticModel` from teacher soft probabilities. The student has:

- One normalized feature vector.
- One logistic layer.
- JSON-friendly weights, bias, loss, and feature names.

This creates a realistic embedded deployment boundary: a high-capacity teacher can exist offline, while the edge runtime can use a compact student.

## 8. Evaluation Layer

`evaluate_predictions` reports:

- True positives, false positives, true negatives, false negatives.
- Sensitivity, specificity, and precision.
- False predictions per hour.
- First alert time.
- Lead time before ictal onset.
- Mean positive and negative probabilities.

The numbers are synthetic evidence only. They are useful for pipeline validation, not clinical claims.

## 9. Edge Budget Layer

`edge_budget.py` estimates:

- Parameter count.
- Memory bytes.
- Multiply-accumulate operations per window.
- Latency at a target MOPS value.
- Power proxy.

The student budget is expected to be much smaller than the teacher proxy, proving why distillation matters for embedded neurotechnology.

## 10. BeagleBone EKG Context Layer

`ekg.py` adds an ADC/IIO path for BeagleBone Black EKG/ECG acquisition:

- `BeagleBoneIioAnalogReader` reads `/sys/bus/iio/devices/iio:device0/in_voltageN_raw`.
- `BeagleBoneEkgSensor` captures samples at a configured rate.
- `SyntheticEkgGenerator` supports repeatable tests and non-hardware demos.
- `extract_ekg_feature_windows` computes heart rate, HRV, lead-off fraction, signal quality, and autonomic stress.

The EKG context is intentionally bounded. EKG is a cardiac signal, not a neural signal. The fusion layer can only apply a small probability boost when signal quality is acceptable and autonomic stress is elevated.

## 11. Evidence Generation Layer

The CLI can generate:

- Synthetic neural/EKG trace plots.
- HFO, PAC, connectivity, and energy feature trajectories.
- CSV feature exports.
- Full JSON model report.
- C export for the distilled student.
- Timing evidence for host or target runs.

## 12. Safety Layer

`build_safety_case` creates:

- Research-only project boundary.
- Required validation gates.
- Hazard register.
- Metric-driven flags for false positives, false negatives, and missing lead time.

This layer keeps the project honest: the code can demonstrate an architecture, but it cannot authorize clinical use.
