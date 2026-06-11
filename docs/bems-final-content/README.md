# BMS/BEMS Final Content Package

Updated: 2026-06-11

This package implements the final documentation content requested for the BMS/BEMS portfolio case study.

## Contents

| Document | Purpose |
| --- | --- |
| [Login Dashboard Sequence](login-dashboard-sequence.md) | BMS login route, redirect behavior, and dashboard landing evidence. |
| [API Contract](api-contract.md) | Node/Express API endpoint table and service boundaries. |
| [Database ERD And Seed Data](database-erd-seed-data.md) | MySQL entities, Mermaid ERD, and seeded data explanation. |
| [Edge Core Deployment Runbook](edge-core-deployment-runbook.md) | C++ edge service build, configuration, logs, restart policy, and failure modes. |
| [AI Service Model Card](ai-service-model-card.md) | Forecasting/optimization model boundary, inputs, outputs, risks, and validation. |
| [Alarm Validation Report](alarm-validation-report.md) | Triggered, acknowledged, resolved, and historical alarm-state validation. |
| [Energy Baseline Comparison](energy-baseline-comparison.md) | Simulated before/after energy, cost, demand, comfort, and carbon comparison. |
| [Deployment Diagram](deployment-diagram.md) | Docker Compose/service deployment diagram for UI, API, AI, DB, and edge. |
| [Operator Manual](operator-manual.md) | Recurring workflows for login, building review, rooms, alarms, schedules, reports, and health. |
| [CI Deployment Evidence](ci-deployment-evidence.md) | Build commands, artifacts, Pages URL, and known warnings. |
| [BMS Portfolio Page Package](../bms-portfolio-page/README.md) | Static `portfolio/index.html` package for publishing the direct `https://rheslar1.github.io/BMS/portfolio/` review page. |

## Source Implementation

- Portfolio dashboard: `src/components/BmsLogin.tsx`, `src/components/Dashboard.tsx`
- Standalone BMS portfolio page: `public/BMS/portfolio/index.html`
- Node API: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/node-api/server.js`
- Database schema: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/database/schema.sql`
- Edge core: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/edge-core/`
- AI service: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/ai-service/app.py`
- Docker Compose: `BMS/BEMS_ENTERPRISE_COMPLETE/repo/docker/docker-compose.yml`
