# Portfolio Evidence

Generated evidence captured from the local production build.

## EnergyBuildAI Dashboard

- `energybuildai-schedules-desktop.png`: desktop capture of `#dashboard/schedules` with building-zone-floor-room schedule details, schedule source, next event, override state, and control intent.
- `energybuildai-schedules-mobile.png`: mobile capture of `#dashboard/schedules`.
- `energybuildai-building-summary-desktop.png`: desktop capture of `#dashboard/building` after renaming the page to Building Summary and adding expanded systems context.
- `energybuildai-equipment-systems-desktop.png`: desktop capture focused on fans, dampers, motors, pump motor, and lighting relay system health.

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

These screenshots are generated from the portfolio React production build and seeded dashboard data in `src/components/Dashboard.tsx`. They are portfolio evidence, not live building telemetry captures.
