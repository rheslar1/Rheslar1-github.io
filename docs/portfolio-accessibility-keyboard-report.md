# Accessibility And Keyboard Navigation Report

## Scope

Production build of the portfolio React app, with focus on navigation, project detail routing, BMS login, and EnergyBuildAI dashboard routes.

## Current Evidence

- Lighthouse accessibility score: 94.
- BMS login form has labels for username/password and uses required fields.
- Dashboard side navigation uses buttons with active state and `aria-current` where applicable.
- Schedule table uses table roles and column/cell roles.
- Login feedback uses `aria-live`.
- Screenshots confirm responsive desktop/mobile layout.

## Keyboard Path

| Workflow | Expected Keyboard Behavior |
| --- | --- |
| Main navigation | Tab through nav links and theme toggle. |
| Project grid | Tab to project cards/buttons and open detail page with Enter/Space. |
| Project detail | Tab through repository/docs/live links and back control. |
| BMS login | Tab through profile tabs, username, password, remember checkbox, submit button, project details link. |
| Dashboard | Tab through sidebar buttons, top actions, cards, alarm controls, schedule controls. |

## Recommended Follow-Up

- Add automated axe checks to CI.
- Add skip-link for keyboard users.
- Confirm color contrast after every palette update.
- Add visible focus snapshot to screenshot matrix.
- Add keyboard-only smoke test for BMS login redirect.

