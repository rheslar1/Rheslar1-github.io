# EnergyBuildAI Schedule Route Test Report

## Purpose

Confirm that the static portfolio route `#dashboard/schedules` opens the dashboard schedule view directly.

## Test

Automated coverage lives in `src/App.test.tsx`.

```text
renders schedules directly from #dashboard/schedules without the removed intro copy
```

The test sets `window.location.hash = '#dashboard/schedules'`, renders `App`, advances the loading timer, and verifies:

- the dashboard renders the `Building Schedules` page title,
- the left operation sidebar renders `schedules`,
- the removed schedule-intro copy does not render on the route,
- the previous long intro text is absent,
- the BMS login page is not shown.

## Command

```bash
npm test -- --watchAll=false
```

## Expected Result

The route parsing test passes with the rest of the React test suite.
