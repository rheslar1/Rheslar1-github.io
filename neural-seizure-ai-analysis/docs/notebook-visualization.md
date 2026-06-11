# Notebook Visualization

Notebook: `notebooks/neural-seizure-feature-visualization.ipynb`

## Purpose

The notebook gives reviewers an executable walkthrough for sample traces and feature curves without requiring patient data or a GPU stack.

## What It Runs

1. Builds an ECoG `SimulationConfig`.
2. Runs `run_demo(...)` and writes JSON/CSV evidence.
3. Writes SVG plot evidence with `write_plot_evidence(...)`.
4. Exports the distilled student through `export_student_to_c(...)`.
5. Writes host timing evidence with `benchmark_student(...)`.
6. Validates generated JSON and CSV artifacts through `validate_written_artifacts(...)`.
7. Displays:
   - `synthetic-neural-ekg-traces.svg`
   - `biomarker-feature-curves.svg`
   - `feature-trajectories.svg`

## Boundary

All notebook outputs are synthetic engineering evidence. They are not patient data, clinical validation, diagnosis, monitoring, treatment advice, or autonomous intervention logic.
