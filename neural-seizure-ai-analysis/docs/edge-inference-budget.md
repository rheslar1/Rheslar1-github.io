# Edge Inference Budget

The paper identifies knowledge distillation as a path toward wearable or implantable edge deployment. This project implements that idea through a teacher proxy and compact student model.

## Budget Fields

| Field | Meaning |
| --- | --- |
| `parameter_count` | Number of scalar parameters. |
| `memory_bytes` | Parameter memory assuming 32-bit floats. |
| `macs_per_window` | Multiply-accumulate operations per analysis window. |
| `estimated_latency_ms` | Latency proxy at the configured MOPS target. |
| `estimated_power_mw` | Rough power proxy for comparison, not a hardware measurement. |

## Teacher Versus Student

The teacher proxy budget intentionally assumes larger hidden layers across four model-family branches. The student budget uses one logistic layer over the normalized features:

```text
student_parameters = feature_count + bias
student_macs = feature_count
```

That difference is the core embedded systems lesson: a model that is useful for offline analysis may not be appropriate for a wearable, battery-backed, or implantable inference loop.

## Embedded Review Questions

- What sample rate must be preserved to retain HFO cues?
- How many channels can the edge target process within the latency budget?
- Is the student model calibrated per patient?
- How does the runtime behave when signal quality drops?
- Are feature extraction costs included in the total edge budget?
- Is inference isolated from any autonomous intervention authority?

## Current Boundary

The budget is a first-pass engineering estimate. A production project would require hardware-in-the-loop profiling, fixed-point quantization analysis, memory allocator review, watchdog behavior, and fail-safe state transitions.

