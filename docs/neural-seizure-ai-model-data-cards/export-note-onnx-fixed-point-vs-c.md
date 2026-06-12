# Export Note: ONNX / Fixed-Point Options vs Current Plain C Export

## 1. Current Export (C)
The repository exports the distilled student to:
- `distilled_student.h`
- `distilled_student.c`

Export contents:
- static weight array (float)
- bias float
- threshold float
- `predict_preictal_probability(features)` with sigmoid
- `predict_preictal(features)` comparison against `kThreshold`

## 2. ONNX Export (future option)
Planned future:
- export the logistic student as an ONNX graph:
  - input: feature vector
  - output: probability
- validate ONNX runtime outputs against the Python host model

## 3. Fixed-Point Export (future option)
For embedded targets where float is costly:
- use fixed-point quantization
- represent sigmoid approximation (e.g., LUT or piecewise approximation)

## 4. Deployment Comparison Considerations
- **Determinism**: fixed-point increases determinism (no FP variance) but requires careful scaling.
- **Accuracy**: quantization error may impact probability calibration and threshold behavior.
- **Performance**: fixed-point may reduce compute and improve worst-case latency.

## 5. Evidence Requirements
For any future ONNX or fixed-point export, produce:
- numerical equivalence evidence within tolerance
- timing evidence on target
- update C export comparison results


