# Live Embedded Linux Timing Report (Distilled Student Inference Path)

## 1. Objective
Provide evidence that the **distilled student inference path** meets a time budget on an embedded Linux target.

Current repo includes host-side timing evidence via:
- `python3 -m neural_seizure_ai.cli --write-hil-report`

This document specifies how to create/record a **live embedded Linux** timing report.

## 2. Timing Scope
Measure:
- per-window inference time (student probability computation)
- worst-case latency observed under loop load
- CPU platform identity

## 3. Target Paths
### 3.1 Host timing evidence (existing)
Produces:
- `hil-timing-report.json`
- `hil-timing-report.md`

### 3.2 Embedded Linux timing evidence (to run)
Expected approach:
- Compile `distilled_student.c/.h` (or future ONNX/fixed-point path)
- Stream feature vectors through a small benchmark program
- Log per-window inference latency

## 4. Required Output Schema
Write a JSON report matching `schemas/timing-report-schema.json`.

Minimum fields:
- target label (e.g., `beaglebone-linux-distilled-student`)
- platform string
- iterations
- windows
- total_seconds
- average_inference_us
- max_window_latency_us
- notes

## 5. Evidence Reproducibility
Record:
- compiler version
- optimization flags
- CPU governor state (if known)
- feature count and feature vector generation settings (seed/config)


