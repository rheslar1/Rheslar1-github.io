# Portfolio Evidence

Generated evidence captured from the local production build and deterministic project simulations.

## EnergyBuildAI Dashboard

- `energybuildai-schedules-desktop.png`: desktop capture of `#dashboard/schedules` with the Schedule Details view, building-zone-floor-room details, schedule source, next event, override state, and control intent.
- `energybuildai-schedules-mobile.png`: mobile capture of the Schedule Details route at `#dashboard/schedules`.
- `energybuildai-building-summary-desktop.png`: desktop capture of `#dashboard/building` after renaming the page to Building Summary and adding expanded systems context.
- `energybuildai-equipment-systems-desktop.png`: desktop capture focused on fans, dampers, motors, pump motor, and lighting relay system health.

## Login And Portfolio QA

- `bms-login-01-sign-in.png`: desktop capture of the BMS login page before redirect.
- `bms-login-02-dashboard-landing.png`: desktop capture after login redirect to the EnergyBuildAI dashboard.
- `bms-login-01-sign-in-mobile.png`: mobile capture of the login page.
- `bms-login-02-dashboard-landing-mobile.png`: mobile capture after redirect.
- `portfolio-home-desktop.png` and `portfolio-home-mobile.png`: portfolio home captures.
- `portfolio-project-bems-desktop.png` and `portfolio-project-bems-mobile.png`: BEMS project detail captures.
- `portfolio-projects-section-desktop.png` and `portfolio-projects-section-mobile.png`: project grid entry captures.
- `lighthouse-home.json`: Lighthouse report generated against the local production build.

## All-Project Simulations

- `project-simulations/*.png`: 44 generated screenshots, one for every project in `src/data/projects.ts` and `src/data/embeddedSystemsProjects.ts`.
- Source data and SVG evidence live under `docs/project-simulations/`.
- Regenerate with `npm run simulate:projects`.

## Capture Command Pattern

```bash
npm run build
python3 -m http.server 4173 --directory build
google-chrome --headless=new --no-sandbox --disable-gpu \
  --virtual-time-budget=5000 \
  --window-size=1440,1200 \
  --screenshot=docs/evidence/energybuildai-schedules-desktop.png \
  'http://127.0.0.1:4173/#dashboard/schedules'
```

## Provenance

These screenshots are generated from the portfolio React production build, seeded dashboard data in `src/components/Dashboard.tsx`, and deterministic simulation code in `scripts/generate-project-simulations.js`. They are portfolio evidence, not live building telemetry or live hardware captures unless a project-specific evidence note says otherwise.
