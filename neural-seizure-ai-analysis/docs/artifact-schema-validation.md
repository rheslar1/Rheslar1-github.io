# Artifact Schema Validation

The pipeline validates generated JSON and CSV artifacts before treating them as evidence. Validation is dependency-free and lives in `src/neural_seizure_ai/artifact_schema.py`.

## Validated Artifacts

| Artifact | Validation |
| --- | --- |
| `demo-report.json` | Required report keys, numeric sample/window counts, metrics objects, prediction arrays, safety case, post-processing report, and explainability report. |
| `window-features.csv` | Required `WindowFeatures` columns, non-empty rows, non-empty cell values, and valid `start_seconds` to `end_seconds` ordering. |
| `bbb-ekg-features.csv` | Required EKG feature columns, non-empty rows, non-empty cell values, and valid time-window ordering. |

## Runtime Boundary

`run_demo(..., output_dir=...)` calls the validator before and after writing artifacts. If a report or CSV file is malformed, generation fails immediately with a `ValueError`.

## Review Command

```bash
PYTHONPATH=neural-seizure-ai-analysis/src \
python3 -m neural_seizure_ai.cli \
  --sensor ecog \
  --output-dir neural-seizure-ai-analysis/docs/evidence \
  --write-plots \
  --export-c \
  --write-hil-report
```

The unit test `test_artifact_schema_rejects_missing_fields_and_reports_numeric_backend` covers malformed report and CSV rows. The evidence generation test also validates the generated artifact bundle.
