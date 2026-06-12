# Data Card: Synthetic Data + Approved Public Dataset Adapter (Neural Seizure Predictive AI)

## 1. Data Sources
### 1.1 Synthetic data
The pipeline generates synthetic neural time-series windows intended for algorithm development and evidence generation.

Synthetic data generator is **deterministic per seed**:
- Controlled via CLI argument `--seed`

### 1.2 Approved public dataset adapter
This repository includes a **dataset adapter boundary** intended to be used only when:
- the dataset is explicitly approved for use,
- the dataset is de-identified,
- and patient-level splits and provenance rules are followed.

**Adapter contract** (high level):
- Ingest raw neural/EKG signals.
- Apply de-identification requirements.
- Create patient-disjoint splits.
- Emit the same `WindowFeatures` contract used by the model pipeline.

## 2. License & Citation
### 2.1 Synthetic data
- License: internal synthetic generator (repository provenance).
- Citation: refer to the repository’s manuscript source if included in documentation.

### 2.2 Public dataset adapter
Populate these fields for each approved dataset:
- Dataset name:
- Provider:
- License type and URL:
- Citation (formatted):

## 3. Consent Basis and Ethics
For public datasets:
- Consent basis must match the dataset provider’s terms.
- If consent is not applicable (e.g., public de-identified research dataset), record the dataset provider statement.

## 4. De-identification
For any dataset adapter:
- Remove/obfuscate direct identifiers.
- Ensure quasi-identifiers are handled per provider policy.
- Ensure outputs stored in `docs/evidence/` do not contain identifiable patient traces.

Synthetic evidence artifacts must not be confused with real patient data.

## 5. Patient Split Notes
For any clinical/public dataset:
- Use patient-level disjoint splitting.
- Ensure no window-level leakage between train/validation/test.
- Record split IDs and sizes in an evidence manifest.

## 6. Dataset Use in This Repo
In the current evidence workflow, the CLI can run with:
- `--ekg-source synthetic` for auxiliary context
- `--ekg-source beaglebone` for embedded sensor integration (hardware dependent)

For any real dataset use:
- add dataset provenance to the evidence manifest
- attach patient-split notes

## 7. Limitations
- Synthetic data may not represent population-level variability.
- Dataset adapter use requires explicit governance and dataset-specific checks.


