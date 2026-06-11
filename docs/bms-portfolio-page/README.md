# BMS Portfolio Page

Updated: 2026-06-11

This document describes the standalone BMS portfolio page package created for:

```text
https://rheslar1.github.io/BMS/portfolio/
```

The page source lives in this repository at:

```text
public/BMS/portfolio/index.html
```

It is a static HTML/CSS/JavaScript page with no build-time dependency. It can be copied into the GitHub Pages source for the `rheslar1/BMS` repository as `portfolio/index.html` to serve the exact requested URL.

## Purpose

The page provides a reviewer-facing BMS/BEMS case study with deep content for:

- React/Vite operator dashboard.
- Node/Express API contract.
- MySQL schema and seeded operational data.
- BEMS-ai advisory optimization service.
- C++ edge-core and BACnet-oriented point boundary.
- Docker service deployment model.
- GitHub Pages portfolio delivery.
- Operator workflow and alarm/schedule review path.

## Content Structure

| Section | Content |
| --- | --- |
| Hero | BMS Portfolio Dashboard positioning, repository links, and core metrics. |
| Overview | What the project proves as an end-to-end BMS engineering artifact. |
| Architecture | UI, API, MySQL, AI service, edge-core, and deployment boundaries. |
| Evidence | Database, energy comparison, AI model-card controls, and CI commands. |
| API | Key endpoint surface for health, hierarchy, devices, alarms, schedules, AI, edge, and remote management. |
| Workflow | Login, building review, schedule review, alarm triage, optimization review, and health checks. |
| Code Notes | Static publish shape and verification commands. |
| Visual Evidence | Dashboard, energy heat map, and architecture images. |

## Deployment Shape

To publish from the `BMS` repository:

```text
BMS pages source
.
├── portfolio/
│   └── index.html
└── README.md
```

Expected public URL:

```text
https://rheslar1.github.io/BMS/portfolio/
```

The page currently references visual assets from the live portfolio repository:

```text
https://rheslar1.github.io/Rheslar1-github.io/assets/projects/
```

If the BMS repository should be fully self-contained, copy these assets into the BMS Pages source and update the `src` URLs in `portfolio/index.html`:

- `bms-dashboard-simulated.svg`
- `bems-energy-heat-map.svg`
- `bms-detail.png`
- `bms-uml-architecture.png`

## Related Deep Documentation

The page intentionally links into the deeper BEMS documentation package:

- [BMS/BEMS Final Content Package](../bems-final-content/README.md)
- [API Contract](../bems-final-content/api-contract.md)
- [Database ERD And Seed Data](../bems-final-content/database-erd-seed-data.md)
- [Operator Manual](../bems-final-content/operator-manual.md)
- [AI Service Model Card](../bems-final-content/ai-service-model-card.md)
- [Energy Baseline Comparison](../bems-final-content/energy-baseline-comparison.md)
- [CI Deployment Evidence](../bems-final-content/ci-deployment-evidence.md)

## Project Simulation Screenshots

The project catalog screenshot package is generated with:

```bash
npm run simulate:projects
```

Generated PNG evidence lives at:

```text
docs/evidence/project-simulations/
```

The generated project index lives at:

```text
docs/project-simulations/README.md
```

## Verification

Use these commands from this repository before publishing:

```bash
npm run simulate:projects
npm run typecheck
npm test -- --watchAll=false
npm run build
```

## Notes

- The requested live URL belongs to the `BMS` GitHub Pages site, not this `Rheslar1-github.io` project site.
- This repo can store and preview the page package, but the exact `https://rheslar1.github.io/BMS/portfolio/` route must be published from the BMS repository Pages source.
- The page is designed to stay static and portable, so it can work even if the BMS app itself uses a different framework or branch layout.
