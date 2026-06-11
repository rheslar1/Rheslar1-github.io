# Model Comparison

The source paper discusses CNNs, recurrent networks, transformers, graph neural networks, multimodal fusion, and knowledge distillation. This repository maps those model families to interpretable code paths.

## Implemented Model-Family Proxies

| Family | Code | Input Concept | Reason For Inclusion |
| --- | --- | --- | --- |
| CNN | `CnnSpectrogramHeuristic` | HFO, gamma, line length | CNNs are strong for localized time-frequency patterns. |
| LSTM/RNN | `LstmTemporalHeuristic` | Smoothed rising risk | Recurrent models capture progression toward pre-ictal state. |
| Transformer | `TransformerAttentionHeuristic` | Strongest biomarker proxy | Attention emphasizes important windows/features across time. |
| GNN | `GnnConnectivityHeuristic` | Connectivity and spatial concentration | GNNs model brain regions or electrodes as connected nodes. |
| Ensemble | `TeacherEnsemble` | Average soft probability | Blends model-family views for offline analysis. |
| Student | `StudentLogisticModel` | Normalized feature vector | Compact edge model trained from teacher probabilities. |

## Why Heuristics Instead Of Heavy Frameworks

This project is intended to be runnable as portfolio evidence without patient data or GPU dependencies. A PyTorch or TensorFlow implementation could be added later, but doing so without real clinical training data would create false authority. The current design keeps the model architecture explainable and testable.

## Distillation Flow

1. Extract features for each synthetic window.
2. Run teacher ensemble and collect soft probabilities.
3. Normalize selected features.
4. Train logistic student by minimizing soft-label mean-squared error.
5. Compare student metrics and edge budget against teacher proxy.

## Future Upgrade Path

- Replace synthetic data with approved public datasets.
- Add PyTorch dataset and dataloader boundaries.
- Train CNN/LSTM/transformer/GNN baselines against the same `WindowFeatures` contract or raw windows.
- Export a trained student to ONNX or C for embedded inference.
- Add calibration, uncertainty, and patient-specific thresholding.

