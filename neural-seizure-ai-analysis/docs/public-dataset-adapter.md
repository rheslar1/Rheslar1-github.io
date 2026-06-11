# Public Dataset Adapter

## Purpose

The project includes a strict CSV adapter for approved public datasets. It is intentionally conservative: it refuses to load rows until provenance and patient-level split rules are documented.

## Manifest Contract

Required fields:

```json
{
  "dataset_name": "Approved public EEG fixture",
  "source_url": "https://example.org/dataset",
  "license": "Research use",
  "citation": "Example et al.",
  "consent_or_public_basis": "Public deidentified research release",
  "deidentified": true,
  "patient_id_column": "patient",
  "timestamp_column": "timestamp",
  "label_column": "label",
  "signal_columns": ["ch0", "ch1"],
  "patient_split": {
    "train": ["p1"],
    "validation": ["p2"],
    "test": ["p3"]
  }
}
```

## Guardrails

- `deidentified` must be true.
- `source_url` must be explicit.
- `train`, `validation`, and `test` splits are required.
- Patient IDs cannot overlap across splits.
- CSV headers must include patient, timestamp, label, and all signal columns.

## Why This Exists

Seizure prediction can be badly overstated if windows from the same patient leak across train and test splits. The adapter keeps patient-level separation and provenance visible before any real dataset is used.

