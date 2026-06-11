# Distilled Student C Export

## Purpose

The distilled student can be exported as plain C for embedded review. This is the implementation path for tiny Linux services, BeagleBone gateways, MCU-adjacent tests, or future fixed-point ports.

## Generated Files

The evidence package includes:

- `docs/evidence/distilled_student.h`
- `docs/evidence/distilled_student.c`

## Runtime Shape

```c
float neural_seizure_predict_preictal_probability(const float features[NEURAL_SEIZURE_FEATURE_COUNT]);
int neural_seizure_predict_preictal(const float features[NEURAL_SEIZURE_FEATURE_COUNT]);
```

The generated source stores:

- Feature weights.
- Bias.
- Calibrated threshold.
- Sigmoid probability function.
- Boolean pre-ictal decision function.

## Embedded Notes

- The current export uses floating-point `expf`.
- A production embedded port should consider fixed-point math, saturation, and a deterministic approximation for the sigmoid.
- Feature extraction cost must be budgeted alongside model inference.

