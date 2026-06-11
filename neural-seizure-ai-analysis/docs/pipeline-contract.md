# Pipeline Contract

## Inputs

The pipeline is configured through `SimulationConfig`.

| Field | Type | Meaning |
| --- | --- | --- |
| `sensor` | string | One of `eeg`, `ecog`, `ieeg`, or `microarray`. |
| `duration_seconds` | float | Synthetic recording length. |
| `preictal_start_seconds` | float | Time when pre-ictal synthetic cues begin. |
| `ictal_start_seconds` | float | Time when ictal synthetic state begins. |
| `window_seconds` | float | Feature window length. |
| `stride_seconds` | float | Window stride. |
| `seed` | int | Deterministic synthetic data seed. |

## Sample Contract

`SignalSample`:

| Field | Meaning |
| --- | --- |
| `timestamp_seconds` | Seconds from recording start. |
| `values_uv` | Tuple of channel amplitudes. |
| `state` | `interictal`, `preictal`, or `ictal`. |

## Feature Contract

`WindowFeatures`:

| Field | Meaning |
| --- | --- |
| `avg_energy` | Average channel energy after normalization. |
| `avg_line_length` | Average absolute sample-to-sample change. |
| `zero_crossing_rate` | Frequency-behavior proxy. |
| `delta_power` through `hfo_power` | Bandpower estimates. |
| `hfo_to_beta` | HFO activity relative to beta band. |
| `hfo_to_total` | HFO activity relative to total tracked bandpower. |
| `pac_proxy` | Slow activity versus fast-envelope coupling proxy. |
| `mean_abs_connectivity` | Average absolute channel correlation. |
| `max_abs_connectivity` | Strongest channel-pair correlation. |
| `spatial_concentration` | Energy concentration in the most active channel. |

## Output Artifacts

When `run_demo(..., output_dir=Path(...))` or the CLI is used, the project writes:

| File | Purpose |
| --- | --- |
| `demo-report.json` | Config, metrics, distillation report, edge budget, safety case, and predictions. |
| `window-features.csv` | Per-window feature vectors for inspection or downstream notebook work. |

## CLI Contract

```bash
PYTHONPATH=src python3 -m neural_seizure_ai.cli --sensor ecog --output-dir artifacts
```

The CLI prints a JSON summary and writes artifacts when `--output-dir` is supplied.

