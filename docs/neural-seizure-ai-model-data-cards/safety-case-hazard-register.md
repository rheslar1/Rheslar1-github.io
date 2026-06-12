# Safety Case Expansion: Hazard Register (Neural Seizure Predictive AI)

## 1. Safety Case Boundary
Safety boundary is research-only, with explicit “no autonomous intervention authority.”

This aligns with `safety_case` in `demo-report.json` and the pipeline safety gate list.

## 2. Expanded Hazard Register (template + guidance)
Fill and maintain this list per release.

| Hazard Severity | Hazard (what can go wrong) | Detectability (how observed) | Mitigation Owner | Mitigation | Verification Method | Clinical Gate Status |
|---|---|---|---|---|---|---|
| High | False positive pre-ictal alert | Alarm count vs threshold; explainability features present | Engineering lead | Tune thresholds; apply post-processing hysteresis; require clinician review | false predictions per hour; review FP windows | Research-only (no clinical gate cleared) |
| High | False negative missed pre-ictal state | lead-time absence before ictal start | Engineering lead | Increase sensitivity tradeoffs; incorporate uncertainty handling | sensitivity + lead-time analysis | Research-only |
| Medium | EKG fusion misapplied under poor signal quality | signal quality gate; boost=0 under low quality | Embedded integration owner | Enforce `signal_quality` threshold gate in fusion | unit tests for boost gating; integration tests | Research-only |
| Medium | Privacy exposure from biosignal retention | evidence storage policy check | Security owner | minimize retention; encrypt at rest; access log review | threat model; security review | Research-only |
| Medium | Opaque decision behavior | reviewer cannot trace features | XAI owner | provide feature-level curve evidence and top features per alert | explainability report review | Research-only |
| Medium | Export mismatch between Python and C | numerical deviation; test vectors | Verification owner | deterministic vector tests and tolerance bounds | C equivalence tests | Research-only |

## 3. Verification Methods (examples)
- Schema validation of artifacts
- Deterministic reproducibility via seed
- C export equivalence tests
- Timing report capture on target
- Calibration sweep and threshold tradeoff evidence


