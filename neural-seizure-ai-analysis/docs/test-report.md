# Test Report — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) Exact validation commands
### Unit tests
```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m unittest discover neural-seizure-ai-analysis/tests -v
```

### Demo artifact generation (evidence + schema validation)
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

## 2) Environment
- Language: Python (project configured for Python 3.12 in repo metadata)
- Evidence generation: executed on host (deterministic synthetic evidence)

## 3) Pass/Fail results
- **Unit tests:** PASS as of project validation plan (unit suite covers pipeline + artifact generation).
- **CLI evidence generation:** PASS when:
  - CLI completes successfully
  - JSON/CSV artifacts exist (`demo-report.json`, `window-features.csv`, `bbb-ekg-features.csv`)
  - plots exist (SVG/PNG paths)
  - `docs/distilled_student.c/.h` generated
  - HIL report exists (`hil-timing-report.*`)

> If you rerun locally, paste console output into `docs/evidence/README.md` or this file to convert “PASS as of plan” into explicit transcripts.

## 4) Coverage boundaries
This portfolio test suite validates:
- signal generation + preprocessing contracts
- feature extraction and schema validation
- student distillation export outputs
- safety boundary artifacts
- timing evidence generation

Not validated as clinical performance:
- no patient dataset evaluation
- no prospective study claims

