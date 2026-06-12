# Deployment Runbook — Predictive AI Neural Seizure Analysis (Portfolio Artifact)

Scrub date: 2026-06-11

## 1) Purpose
Enable reviewers to reproduce the evidence package that powers portfolio scanning:
- generate plots and artifacts
- validate schema contracts
- export distilled student C code
- generate host timing/HIL report

## 2) Prerequisites
- Python 3.12+
- Dependencies as defined by `neural-seizure-ai-analysis/pyproject.toml` (install method depends on your environment)

## 3) Environment variables
- Evidence generation uses `PYTHONPATH` to make project modules importable.

## 4) Build / Prepare
(If your workflow uses dependency installation)
```bash
python3 -m pip install -e neural-seizure-ai-analysis
```

## 5) Evidence generation
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

## 6) Rollback
Revert evidence artifacts to a known-good commit if evidence generation is updated.
- Evidence folder: `neural-seizure-ai-analysis/docs/evidence/`
- Distilled export: `neural-seizure-ai-analysis/docs/distilled_student.c/.h`

## 7) Logs & troubleshooting
### Common failure modes
- Missing import paths: fix by keeping `PYTHONPATH=neural-seizure-ai-analysis/src`.
- Missing output: ensure `--output-dir` points to the repository docs evidence folder.

## 8) Deployment target notes
- This repo is not deployed as a clinical system.
- “Deployment” here means producing evidence artifacts for portfolio review.

