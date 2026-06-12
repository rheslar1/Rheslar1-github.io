# Operation Manual — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) What an operator/reviewer does
1. Run unit tests to confirm the pipeline is healthy.
2. Run the demo CLI to generate evidence artifacts.
3. Inspect the generated evidence folder and export files.
4. Review the safety boundary and risk register.

## 2) Commands
### Unit test (quick health check)
```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m unittest discover neural-seizure-ai-analysis/tests -v
```

### Generate evidence bundle
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

## 3) Where outputs appear
- `neural-seizure-ai-analysis/docs/evidence/`
  - JSON summary: `demo-report.json`
  - Feature CSV: `window-features.csv`
  - EKG features: `bbb-ekg-features.csv`
  - Plots: SVG/PNG evidence files
  - Timing report: `hil-timing-report.json` / `.md`
- `neural-seizure-ai-analysis/docs/distilled_student.c/.h`

## 4) Safety constraints reminder
This is a research-only artifact.
- No patient diagnosis.
- No treatment decisions.
- No neuromodulation authorization.

