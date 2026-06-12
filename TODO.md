# TODO - TGUS Portfolio Improvements

## 1) UI improvements (ProjectDetails)
- [x] Add “Top Recommendations / What to Read Next” block driven by `suggestedContent` and `architectureDocs`
- [x] Improve Mini Engineering Report section headings/wording
- [x] Improve visual gallery: add `loading="lazy"`, decoding hints, and consistent fallback
- [x] Group evidence backlog items by heuristic categories (screenshots/CI/validation/diagrams/metrics)

## 2) Portfolio documentation output (must-have)
- [x] Create `docs/portfolio-improvements.md` to consolidate all reviewer-ready improvements and evidence checklists.

## 3) Data cleanup (highest priority projects)
- [ ] Verify/adjust top-priority projects in `src/data/projects.ts` and `src/data/embeddedSystemsProjects.ts` so `architectureDocs` and `suggestedContent` phrasing produces the intended reviewer evidence backlog.

## 4) Verification
- [ ] Run `npm run typecheck`
- [ ] Run `npm test --watchAll=false`
- [ ] Run `npm run build` and sanity-check rendering

## 5) Evidence refresh (optional but recommended)
- [ ] Refresh desktop/mobile screenshots for major portfolio routes and EnergyBuildAI dashboard routes.
- [ ] Ensure lighthouse/accessibility/performance summaries have up-to-date links or evidence outputs.

