# Final Design Report — Predictive AI Neural Seizure Analysis

Scrub date: 2026-06-11

## 1) Project Overview
- **Project name:** Predictive AI Neural Seizure Analysis
- **Repository:** https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis
- **Primary goal:** Convert a research paper on high-bandwidth neural sensing into a runnable, reviewable engineering artifact that produces synthetic-evidence outputs, inspectable model/export artifacts, and bounded safety documentation.
- **Target hardware/platform:** Host execution today; timing evidence is generated in a host path and designed to be rerunnable on embedded Linux / BeagleBone-like targets.
- **Target software/platform:** Python-based research pipeline; includes plain C export for the distilled student.

## 2) System Context
This project models the research pipeline only. It is intentionally synthetic and deterministic so reviewers can run it without patient identifiers, protected health information, clinical datasets, or real diagnostic conclusions.

## 3) Requirements & Constraints
### Functional requirements
- Generate synthetic EEG/ECoG/iEEG/microelectrode-array style neural time-series.
- Preprocess, window, and label windows as interictal / pre-ictal / ictal (synthetic labels).
- Extract a reviewable feature set (bandpower, HFO ratios, PAC proxy, line length, connectivity, spatial concentration).
- Produce teacher ensemble probabilities using interpretable heuristics mapped to model-family concepts.
- Distill teacher probabilities into a smaller calibrated logistic student and export it to C.
- Produce BeagleBone-oriented EKG/ECG context features with bounded fusion.
- Generate evidence artifacts: plots, CSV/JSON reports, and timing/HIL reports.
- Validate generated evidence via dependency-free schema checks.
- Emit explicit safety boundary outputs.

### Non-functional requirements
- Reproducibility: deterministic generation where possible.
- Evidence-first outputs: every run should create inspectable artifacts.
- Dependency containment: pure-Python fallback when optional acceleration is not available.

### Constraints
- **Non-clinical scope:** no diagnosis, no intervention workflow, no patient monitoring claims.
- **No patient data claims:** synthetic or strictly approved de-identified dataset adapters only.

## 4) Architecture
### High-level layers
- **Signal generation** (synthetic neural profiles)
- **Preprocessing/windowing**
- **Feature extraction**
- **Teacher ensemble** (CNN/LSTM/transformer/GNN-style proxies)
- **Knowledge distillation** (calibrated logistic student)
- **Evaluation + safety review hooks**
- **Edge inference budgeting**
- **BeagleBone EKG context + bounded fusion**
- **Evidence generation** (plots, CSV/JSON)
- **C export**
- **Timing evidence generator**

## 5) Major Design Decisions
1. **Synthetic determinism over clinical realism**
   - **Decision:** represent “model families” as interpretable heuristics aligned to feature representations.
   - **Why:** ensures the artifact is runnable and reviewable without clinical data.
   - **Alternatives:** training deep models directly; rejected due to inability to provide robust non-clinical evidence.

2. **Calibrated distilled student with exportable artifacts**
   - **Decision:** export a logistic student with inspectable weights and decision threshold.
   - **Why:** makes edge integration reviewable (memory/compute/threshold).
   - **Alternatives:** opaque neural net export; rejected for portfolio evidence clarity.

3. **Dependency-free schema validation for evidence**
   - **Decision:** validate JSON/CSV contracts before accepting outputs as evidence.
   - **Why:** reduces “handwavy” artifacts and makes failures explicit.
   - **Alternatives:** rely on downstream reading only; rejected.

4. **Bounded multimodal fusion**
   - **Decision:** treat EKG/ECG context as bounded auxiliary signals.
   - **Why:** avoids implying clinical multimodal diagnosis.
   - **Alternatives:** fused decision authority; rejected.

## 6) Validation Summary
### Automated validation (unit tests)
Run:
```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m unittest discover neural-seizure-ai-analysis/tests -v
```

### Evidence artifact validation (CLI)
Run:
```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report
```

**Pass/fail + known gaps:**
- Pass criteria: CLI exits successfully; schema validation completes; evidence files exist and are non-empty.
- Known gaps: hardware-in-the-loop embedded target runtime numbers are designed to be rerun; live BeagleBone timing evidence should be added when hardware is available.

## 7) Known Limitations & Future Work
- Replace synthetic data with approved de-identified datasets (patient split notes and provenance are already documented in the adapter).
- Add calibration sweeps, probability histograms, and threshold sweep evidence.
- Add hardware-in-the-loop profiling for embedded targets if/when available.

## 8) Evidence Index
- Evidence readme: `docs/evidence/README.md`
- Timing report artifacts: `docs/evidence/hil-timing-report.*`
- C export: `docs/distilled_student.c/.h`
- Main generated evidence bundle: `docs/evidence/*`

