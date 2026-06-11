# Safety Review

## Research Boundary

This repository is a synthetic research and portfolio project. It must not be used for diagnosis, therapy, patient monitoring, medication delivery, stimulation, or any autonomous closed-loop intervention.

The BeagleBone EKG path is auxiliary physiological context only. EKG/ECG measures cardiac activity, not brain activity, and must not be represented as a replacement for EEG, ECoG, iEEG, or other neural sensing.

## Hazards And Controls

| Hazard | Risk | Control |
| --- | --- | --- |
| False positive alert | Alarm fatigue, anxiety, unnecessary intervention | Per-patient thresholds, confidence display, clinician review. |
| False negative alert | No warning before seizure onset | Redundant monitoring, conservative uncertainty state, sensitivity tracking. |
| Dataset shift | Model fails across patients or sensors | Held-out validation, patient-specific calibration, drift monitoring. |
| Privacy exposure | Neural data reveals sensitive health state | Encryption, minimal retention, audit logs, de-identification. |
| Opaque output | Clinician cannot inspect alert basis | Feature-level explanation and alert report. |
| Autonomous intervention | Unsafe stimulation or treatment action | Human-in-the-loop gate and explicit no-autonomy boundary. |
| EKG misuse | Cardiac signal is treated as a neural seizure predictor by itself | EKG context is bounded to a small fusion boost and documented as auxiliary only. |

## Required Gates Before Clinical Use

1. Ethics/IRB approval.
2. Patient consent and data governance.
3. De-identification and secure storage.
4. Clinician-reviewed labeling.
5. Independent held-out validation.
6. Hardware-in-the-loop profiling.
7. Cybersecurity and privacy review.
8. Human factors review.
9. Regulatory pathway analysis.
10. Fail-safe design for uncertainty and sensor loss.

## Explainability Evidence

The current pipeline supports feature-level review through:

- HFO ratios.
- PAC proxy.
- Line length.
- Energy.
- Connectivity.
- Spatial concentration.
- Per-model teacher rationales.

That evidence is not sufficient for clinical trust by itself, but it is the right starting point for a reviewable architecture.
