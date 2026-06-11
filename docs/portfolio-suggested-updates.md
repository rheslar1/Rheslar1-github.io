# Portfolio Suggested Updates

Updated: 2026-06-11

This document lists practical updates that would make the Rheslar portfolio easier to review as a finished embedded systems, BMS, full-stack, and AI engineering portfolio.

## Highest Priority

1. Promote the strongest projects from generated case studies into fully custom case studies.
   - `bare-metal-custom-board-bring-up`
   - `beaglebone-ad8232-ekg-driver`
   - `neural-seizure-ai-analysis`
   - `bems`
   - `BEMS-ai`

2. Add direct evidence to each priority project.
   - Passing CI screenshot or workflow badge.
   - Local build/test transcript.
   - Terminal run screenshot.
   - Architecture diagram.
   - Generated artifact folder with provenance notes.
   - Short validation report with exact commands and pass/fail status.

3. Separate live operations UI from portfolio navigation.
   - Keep EnergyBuildAI focused on building operations, schedules, alarms, equipment, energy, HVAC, lighting, dampers, motors, and fans.
   - Keep project browsing in the portfolio project grid and project detail pages.
   - Avoid adding portfolio repo lists back into the EnergyBuildAI dashboard.

4. Standardize visible document naming.
   - Use `Architecture` as the visible label instead of `Deep Architecture`.
   - Keep existing file paths such as `docs/deep-architecture.md` when renaming files would break links.
   - Use document titles that match what reviewers expect: `Architecture`, `Validation Plan`, `Evidence`, `Safety Review`, `Runbook`, and `Final Design Report`.

## Bare-Metal Custom Board Bring-Up

Portfolio route:

```text
https://rheslar1.github.io/Rheslar1-github.io/#project/bare-metal-custom-board-bring-up
```

Correct project repo:

```text
git@github.com:rheslar1/bare-metal-custom-board-bring-up.git
```

Suggested updates:

- Update the local canonical repo remote from the older leading-hyphen remote to the corrected repo URL once the repo has a default branch.
- Replace the generic embedded-systems generated detail with a custom `Project` entry in `src/data/projects.ts`.
- Add board bring-up code for:
  - power rail validation,
  - reset reason decoding,
  - clock lock checks,
  - peripheral probe sequencing,
  - masked register checks,
  - UART/USB CDC diagnostic command output,
  - structured JSON/text evidence reports.
- Add tests for:
  - nominal board-ready scenario,
  - brownout rail failure,
  - clock unlock failure,
  - register mismatch,
  - missing peripheral,
  - diagnostic CLI output.
- Add docs:
  - `docs/final-design-report.md`,
  - `docs/bring-up-checklist.md`,
  - `docs/register-map.md`,
  - `docs/diagnostic-cli.md`,
  - `docs/evidence-matrix.md`,
  - `docs/test-report.md`,
  - `docs/hardware-validation-plan.md`.
- Add evidence:
  - CMake configure/build/CTest transcript,
  - CLI run screenshots for nominal and failed diagnostics,
  - logic analyzer or oscilloscope capture placeholders,
  - boot banner screenshot,
  - register dump example,
  - first-board validation checklist.

## EnergyBuildAI Dashboard

Suggested updates:

- Add one captured screenshot per route:
  - `#dashboard`,
  - `#dashboard/building`,
  - `#dashboard/alarms`,
  - `#dashboard/rooms`,
  - `#dashboard/schedules`.
- Add an operator workflow document:
  - login,
  - dashboard overview,
  - alarm triage,
  - building summary,
  - schedule review,
  - equipment health review.
- Add database/API evidence for schedules:
  - schedule table records,
  - room setpoints,
  - override state,
  - next event,
  - control intent.
- Keep the dashboard focused on building operations. Do not re-add portfolio repo cards to the dashboard.

## Predictive AI Neural Seizure Analysis

Suggested updates:

- Add model card for teacher ensemble and distilled student.
- Add data card for synthetic data and approved public-dataset adapters.
- Add probability threshold sweep plot.
- Add confusion matrix and lead-time distribution plot.
- Add BeagleBone timing report from real embedded Linux hardware.
- Add optional ONNX export or fixed-point student export.
- Add a short reviewer walkthrough for every generated file in `docs/evidence`.

## BeagleBone AD8232 EKG ADC Driver

Suggested updates:

- Publish the driver to a dedicated repo if it should stand alone outside the portfolio repo.
- Add wiring photo or diagram for AD8232 `OUT`, `GND`, `3.3V`, `LO+`, `LO-`, and BeagleBone AIN.
- Add voltage-divider calculation with resistor values and 1.8V ADC safety margin.
- Add live BeagleBone capture evidence.
- Add oscilloscope evidence for AD8232 output and lead-off pins.
- Add systemd service example for repeated logging.
- Add hardware timing and dropped-sample report.

## BEMS And BEMS-AI

Suggested updates:

- Add API endpoint table or OpenAPI file.
- Add MySQL ERD and seeded-data explanation.
- Add Docker Compose runbook with service health screenshots.
- Add BEMS-ai model card and service contract.
- Add energy savings comparison with baseline vs optimized run.
- Add alarm lifecycle evidence: active, acknowledged, auto-clear, resolved.
- Add schedule lifecycle evidence: base schedule, reservation, override, AI trim, reset.

## Portfolio Site

Suggested updates:

- Add a screenshot matrix for desktop and mobile.
- Add Lighthouse or accessibility report.
- Add content governance note explaining how `src/data/projects.ts` and `src/data/embeddedSystemsProjects.ts` feed the UI.
- Add asset provenance list for profile photo, screenshots, diagrams, generated evidence, and GitHub previews.
- Add deploy runbook for GitHub Pages.
- Add a short release note per major portfolio update.

## Suggested Implementation Order

1. Finish the custom Bare-Metal Custom Board Bring-Up project entry and repo implementation.
2. Capture fresh screenshots for all EnergyBuildAI routes.
3. Add final design reports for Bare-Metal, AD8232, Neural Seizure AI, and BEMS.
4. Add CI badges and validation transcripts to the top five projects.
5. Add mobile screenshots and accessibility notes for the portfolio.
