# Evidence Matrix — BeagleBone AD8232 EKG ADC Driver

Scrub date: 2026-06-11

## 1) How evidence was generated
### Simulated evidence
```bash
PYTHONPATH=beaglebone-ad8232-ekg-driver/src \
python3 -m ad8232_bbb_driver.cli \
  --simulate \
  --duration-seconds 10 \
  --write-plot \
  --output-dir beaglebone-ad8232-ekg-driver/docs/evidence
```

## 2) Artifact Inventory
| Artifact | Path | Command used | Date | Environment | Source/Provenance | Review Purpose |
|---|---|---|---|---|---|---|
| Capture waveform CSV | `docs/evidence/ad8232_capture.csv` | CLI `--simulate` | 2026-06-11 | Host python | Synthetic/simulated | Verify acquisition pipeline and scaling output fields |
| Heart-rate report JSON | `docs/evidence/ad8232_report.json` | CLI `--simulate` | 2026-06-11 | Host python | Synthetic/simulated | Verify metric computation and lead-off fraction |
| Waveform evidence SVG | `docs/evidence/ad8232-waveform.svg` | CLI `--write-plot` | 2026-06-11 | Host python | Simulated output | Visual review of raw + filtered + peaks quality /
| Waveform evidence PNG | `docs/evidence/ad8232-waveform.png` | CLI + headless Chrome screenshot procedure | 2026-06-11 | Host python | Rendered from SVG | Portfolio-friendly evidence capture |
| Wiring schematic | `docs/schematics/ad8232-beaglebone-wiring.svg` | (static) | 2026-06-11 | repo source | Author-provided wiring diagram | Electrical boundary review |

## 3) Pending Evidence
- Scope/logic-analyzer captures for OUT, LO+/LO- modes.
- Embedded target timing under CPU load and dropped-sample checks.

