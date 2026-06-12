# Risk Register — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) Risk taxonomy
- Technical risks
- Safety/clinical scope risks
- Security/privacy risks
- Data-quality risks
- Deployment/timing risks

## 2) Register
| ID | Risk | Severity | Detectability | Mitigation | Verification Method |
|---|---|---|---|---|---|
| R1 | False-positive risk (synthetic probabilities do not guarantee clinical validity) | High | Medium (can see threshold behavior in evidence) | Explicit non-clinical scope; safety boundary and risk-warning timeline | Evidence review: `docs/evidence/risk-warning-timeline.*` + `docs/safety-review.md` |
| R2 | False-negative risk (early detection claims would be overinterpreted) | High | Medium | No clinical claims in documentation; future clinical validation plan exists but is pending | Documentation review + validation plan |
| R3 | Privacy risk if real datasets are used without proper de-identification | High | Low until provenance checked | Provenance-guarded dataset adapter; patient split notes; de-identification basis documented | Adapter documentation + schema checks |
| R4 | Data-quality risk from synthetic mismatch vs real sensors | Medium | Medium | Synthetic sensor profiles are explicit and configurable; adapter path for approved data | Compare synthetic vs dataset outputs when dataset evidence is added |
| R5 | Export/inference mismatch risk (C export diverges from Python student) | Medium | High | Schema validation + export tests; identical student contract | Add golden tests for fixed contract and export correctness |
| R6 | Timing risk on embedded targets | Medium | Medium | Edge budget + host HIL report; mark hardware timing pending | Pending: hardware-measured inference latency report |
| R7 | Security risk (supply-chain / dependency drift) | Medium | Medium | Pin dependencies in lockfiles; keep evidence generation reproducible | CI checks for tests + deterministic runs |

## 3) Pending risk items
- Add measured embedded timing evidence when hardware is available.
- Add calibration sweep evidence (probability histograms, threshold sweep) to strengthen false-alert analysis artifacts.

