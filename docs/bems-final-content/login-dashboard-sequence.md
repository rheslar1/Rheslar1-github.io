# Login Dashboard Sequence

## Route Sequence

1. User opens `#bms-login`.
2. `BmsLogin` renders role selection, username/password fields, service readiness, and recent access events.
3. Valid form submit stores `energyBuildAI.session` in local storage.
4. The login handler sets `window.location.hash = 'dashboard'`.
5. `App` detects `#dashboard`, renders `Dashboard`, and opens the EnergyBuildAI operations landing page.

## Screenshot Evidence

| Step | Evidence |
| --- | --- |
| Login page, desktop | `docs/evidence/bms-login-01-sign-in.png` |
| Dashboard landing, desktop | `docs/evidence/bms-login-02-dashboard-landing.png` |
| Login page, mobile | `docs/evidence/bms-login-01-sign-in-mobile.png` |
| Dashboard landing, mobile | `docs/evidence/bms-login-02-dashboard-landing-mobile.png` |

## Validation Notes

- Automated test: `src/App.test.tsx` verifies that a valid BMS login redirects to the dashboard.
- Manual evidence: screenshots were captured from the local production build served on port `4173`.
- Scope: this is a portfolio login flow for role-based dashboard access evidence, not a production authentication backend.

