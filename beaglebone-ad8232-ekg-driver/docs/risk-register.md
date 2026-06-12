# Risk Register — BeagleBone AD8232 EKG ADC Driver

Scrub date: 2026-06-11

## 1) Register
| ID | Risk | Severity | Detectability | Mitigation | Verification |
|---|---|---|---|---|---|
| R1 | ADC overvoltage due to AD8232 breakout swinging above 1.8V | High | High (scope evidence) | Explicit divider-ratio model; wiring notes; safety boundary | Pending: oscilloscope evidence + divider calculations |
| R2 | Incorrect scaling leads to wrong reconstructed millivolts | Medium | Medium | Centralize divider ratio config; tests for conversion | Unit tests + evidence review of waveform scaling |
| R3 | Lead-off detection wiring misconfiguration | Medium | Medium | Separate LO+/LO- file paths; validate existence | Pending: hardware lead-off mode evidence |
| R4 | R-peak detection false positives under noise | Medium | Medium | Signal filtering + quality score in report | Review `ad8232_report.json` and waveform overlay |
| R5 | Timing / dropped-sample issues on embedded CPU | Medium | Medium | Timing evidence generator | Pending: embedded timing report under load |
| R6 | Non-clinical scope misunderstanding | Medium | High | Safety boundary documented | Docs review + portfolio labeling |

## 2) Pending evidence items
- Scope/logic analyzer screenshots for nominal and lead-off.
- Embedded timing under CPU load and dropped-sample checks.

