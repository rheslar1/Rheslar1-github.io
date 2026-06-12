# Project Simulations — Examples (Simulated Evidence)

This folder is used to generate **deterministic, synthetic** evidence artifacts for portfolio projects.

> Important: these screenshots are **simulated** (synthetic) unless a specific project page explicitly states live hardware/real capture evidence.

## What you get per project
For every project in the portfolio catalog, the generator produces:

- `docs/project-simulations/<project-slug>/simulation.json` — deterministic scenario data
- `docs/project-simulations/<project-slug>/simulation.svg` — evidence dashboard (vector)
- `docs/evidence/project-simulations/<project-slug>.png` — “simulated screenshot” (headless Chrome capture of the SVG)

## Generate all simulations
From repo root:

```bash
npm run simulate:projects
```

## Example: open a single simulated screenshot
1. Pick a project slug (examples):
   - `bems` → `docs/evidence/project-simulations/bems.png`
   - `closed-loop-motor-control-platform` → `docs/evidence/project-simulations/closed-loop-motor-control-platform.png`
   - `neural-seizure-ai-analysis` → `docs/evidence/project-simulations/neural-seizure-ai-analysis.png`

2. Open the PNG in your browser or image viewer:
   - `docs/evidence/project-simulations/<slug>.png`

## Example: inspect the underlying deterministic SVG
For the same project:

- `docs/project-simulations/<slug>/simulation.svg`

The SVG contains:
- a synthetic trace line
- scenario “PASS” checks
- an artifact footer describing what generated it

## Example: inspect the deterministic JSON
- `docs/project-simulations/<slug>/simulation.json`

This is the source of truth for the generated SVG + PNG.

## How this ties to the portfolio
- The generator reads the project catalog entries from:
  - `src/data/projects.ts`
  - `src/data/embeddedSystemsProjects.ts`
- It classifies each project into a visual “domain model” (energy / AI / media / software / embedded target).
- It then produces one repeatable scenario trace per project.

## Provenance guidance
- Use simulated artifacts for **visual validation** of content layout, route completeness, and evidence UI wiring.
- Do not use simulated artifacts to claim live telemetry, live patient data, or hardware oscilloscope/logic-analyzer results.

