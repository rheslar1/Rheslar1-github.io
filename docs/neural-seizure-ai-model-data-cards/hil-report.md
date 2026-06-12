# Hardware-in-the-Loop (HIL) Report (Synthetic/Replay Neural + EKG Windows)

## 1. Objective
Demonstrate that the distilled student inference path behaves correctly when:
- neural feature windows are generated from replayed or synthetic inputs
- EKG/ECG context windows are streamed as auxiliary features
- the embedded Linux target consumes feature vectors and returns probabilities and decisions

## 2. HIL Setup
Record:
- embedded target model
- OS image version
- kernel/CPU governors (if available)
- build flags for inference code

## 3. Stream Contract
Define the stream payload format:
- feature vector values in the exact order used by `distilled_student.h`
- EKG feature fusion is performed in the research pipeline (current fusion is Python-side), unless future embedded fusion is implemented.

## 4. Evidence Artifacts
Expected artifacts (planned):
- `hil-timing-report.json|md` (already supported for host; needs target execution for real HIL)
- `hil-inference-transcript.json` (probability + decision per window)
- `hil-window-manifest.csv` (window start/end, label framing, quality)

## 5. Limitations
Current repo provides timing evidence generation on host. For a full HIL claim, timing and transcript should be captured on the target.


