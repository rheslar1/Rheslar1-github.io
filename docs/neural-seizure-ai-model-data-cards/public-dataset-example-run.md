# Public Dataset Example Run (Strictly Approved Deidentified Dataset)

## 1. Purpose
Provide a **provenance-first** example run template for using an approved deidentified public dataset adapter.

## 2. Strict Approval Requirements
Before running a public dataset adapter:
- confirm dataset is approved
- confirm license and citation are recorded
- confirm consent basis is recorded
- confirm patient split rules are followed (patient-disjoint)

## 3. Example CLI/Run Transcript Structure
Because the current pipeline is synthetic-centric, this template shows the expected structure once an approved adapter is wired.

### 3.1 Evidence output directory
Create:
- `docs/evidence/public-dataset-run/<dataset-id>/<run-id>/`

### 3.2 Transcript
Record:
- CLI arguments
- seed
- adapter version/hash

Example (template):
```bash
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --duration-seconds 90 \
  --preictal-start-seconds 55 \
  --ictal-start-seconds 75 \
  --seed 42 \
  --output-dir "docs/evidence/public-dataset-run/DATASET/2026-XX-XX" \
  --write-plots \
  --export-c \
  --write-hil-report
```

### 3.3 Provenance notes
Add in the run directory:
- `dataset-provenance.json`
- `patient-split-notes.md`
- `adapter-version.json`

## 4. Limitations
This template does not include patient data itself. Evidence files must remain deidentified.


