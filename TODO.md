# TODO

## Embedded project design/compliance work

- [x] Confirm standard file requirements from `docs/embedded-project-final-content-standard.md`.
- [x] Audited `embedded-system-repos/bare-metal-custom-board-bring-up` against the standard.
- [x] Added required missing docs for `bare-metal-custom-board-bring-up`:
  - [x] `docs/pin-connector-register-map.md`
  - [x] `docs/build-flash-runbook.md`
  - [x] `docs/evidence/README.md`
  - [x] `docs/performance-budget.md`
  - [x] `docs/hil-validation-report.md`
  - [x] `docs/fault-injection-tests.md`
  - [x] `docs/ci-artifacts.md`
- [x] Next: re-check remaining canonical embedded repos under `embedded-system-repos/` for compliance gaps.
- [x] Implement the same standard-compliance additions/renames for each missing repo document set.

- [ ] Run repo checks (where applicable): `cmake ... && ctest ...` for C++ projects; `npm run build` / tests for JS projects.
- [ ] Re-run compliance scan to ensure every canonical embedded folder includes all required standard docs.

