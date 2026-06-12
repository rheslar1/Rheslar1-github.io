# Evidence Matrix — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) How evidence was generated
### Primary CLI run (reproducible)
```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report
```

## 2) Artifact Inventory
| Artifact | Path | Command used | Date (scrub date=2026-06-11) | Environment | Source/Provenance | Review Purpose |
|---|---|---|---|---|---|---|
| Synthetic trace evidence | `docs/evidence/synthetic-neural-ekg-traces.png` / `.svg` | CLI (see above) | 2026-06-11 | Host python3 | Synthetic only | Visual review of sensor pre-ictal/ictal signatures |
| Feature trajectories | `docs/evidence/feature-trajectories.png` / `.svg` | CLI | 2026-06-11 | Host python3 | Synthetic features derived from synthetic signals | Biomarker evolution review |
| Biomarker curves | `docs/evidence/biomarker-feature-curves.png` / `.svg` | CLI | 2026-06-11 | Host python3 | Synthetic biomarker derivations | HFO/PAC/connectivity dynamics review |
| Algorithm coverage map | `docs/evidence/algorithm-coverage-map.png` / `.svg` | CLI | 2026-06-11 | Host python3 | Synthetic strategy map | Evidence that strategies map to code and outputs |
| Time-frequency image map | `docs/evidence/time-frequency-image-map.png` / `.svg` | CLI | 2026-06-11 | Host python3 | Synthetic strategy map | Visual review of time-frequency review paths |
| Risk warning timeline | `docs/evidence/risk-warning-timeline.png` / `.svg` | CLI | 2026-06-11 | Host python3 | Safety boundary + thresholds | Review of bounded warning logic |
| Demo report (JSON) | `docs/evidence/demo-report.json` | CLI | 2026-06-11 | Host python3 | Generated | Reviewer-readable summary of run, predictions, and decisions |
| Window features (CSV) | `docs/evidence/window-features.csv` | CLI | 2026-06-11 | Host python3 | Generated | Feature contract evidence |
| EKG features (CSV) | `docs/evidence/bbb-ekg-features.csv` | CLI | 2026-06-11 | Host python3 | Synthetic EKG context | Multimodal fusion review |
| Distilled student export | `docs/distilled_student.c`, `docs/distilled_student.h` | CLI `--export-c` | 2026-06-11 | Host python3 | Generated export | Inspectable embedded model path |
| HIL timing report | `docs/evidence/hil-timing-report.json` / `.md` | CLI `--write-hil-report` | 2026-06-11 | Host timing | Generated timing estimate | Review of inference path timing evidence |
| Schema/contract validation evidence | (embedded in JSON/CLI logs + validated artifacts) | CLI + schema validator | 2026-06-11 | Host python3 | Validator checks | Evidence contract integrity |

## 3) Pending Evidence
- **Embedded Linux / BeagleBone measured latency** for the distilled student path (host HIL report exists; hardware-measured numbers should be added when available).

