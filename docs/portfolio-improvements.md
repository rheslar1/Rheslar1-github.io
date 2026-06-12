# Portfolio Improvements (Implemented + Actionable Next Steps)

Updated: 2026-06-12

This MD file consolidates portfolio improvements and implementation suggestions that improve reviewer throughput, evidence quality, and documentation consistency.

---

## 1) Project Detail Page: evidence-first layout (already implemented in UI)

### What changed
Your `src/components/ProjectDetails.tsx` is already structured to support “case-study scanning”:
- A **Mini Engineering Report** with consistent sections: *Technical Stack & Boundaries*, *The Challenge*, *The Solution*, *Results And Artifacts*.
- A **Deep Technical Breakdown** rendered as numbered steps.
- An **Evidence** section with a resilient **visual gallery fallback**.
- A **Top Recommendations / What to Read Next** sidebar driven by:
  - `project.architectureDocs`
  - `project.suggestedContent`

### Recommendations for the data you feed the UI
To maximize the effect of the already-implemented UI logic:
- Ensure each project has:
  - `architectureDocs` entries with meaningful `focus` strings.
  - `suggestedContent` items that are phrased like evidence tasks (CI run, terminal transcript, diagrams, run screenshots).
- Prefer **short, command-level evidence** phrasing in `suggestedContent`, e.g.
  - “Capture CI run transcript: `npm ci && npm run build && npm test` (pass/fail).”
  - “Capture terminal run screenshot of `ctest --output-on-failure`.”

---

## 2) Portfolio Suggested Updates: convert backlog into concrete evidence deliverables

The authoritative backlog is here:
- `docs/portfolio-suggested-updates.md`

Below is the backlog converted into a *reviewer-ready* evidence checklist format.

### 2.1 Highest Priority Projects (evidence completeness gate)
Projects:
- `bare-metal-custom-board-bring-up`
- `beaglebone-ad8232-ekg-driver`
- `neural-seizure-ai-analysis`
- `bems`
- `BEMS-ai`

Evidence deliverables (per project):
1. **CI badge + passing transcript**
2. **Local build/test transcript**
3. **Terminal run screenshot** (the exact command + output)
4. **Architecture diagram** (image + link to source)
5. **Evidence artifact folder** (with provenance notes)
6. **Short validation report**
   - include exact commands and pass/fail
   - include “what was verified” and “what is pending”

---

## 3) Embedded Project Final Content Standard (map portfolio projects to a standard)

The required folder structure is defined by:
- `docs/embedded-project-final-content-standard.md`

For each embedded project folder, ensure these documents exist:
- `docs/final-design-report.md`
- `docs/pin-connector-register-map.md`
- `docs/build-flash-runbook.md`
- `docs/evidence/README.md`
- `docs/performance-budget.md`
- `docs/hil-validation-report.md`
- `docs/fault-injection-tests.md`
- `docs/ci-artifacts.md`

### Implementation rule (important)
If target hardware evidence is missing, include host simulation evidence and mark target evidence as **pending**.

---

## 4) Portfolio Site: make the “portfolio-ness” measurable

### 4.1 Screenshot matrix
Your screenshot matrix exists at:
- `docs/portfolio-screenshot-matrix.md`

Ensure every major route has both:
- desktop evidence
- mobile evidence

### 4.2 Accessibility and performance evidence
Ensure you have:
- `docs/portfolio-accessibility-keyboard-report.md`
- `docs/portfolio-performance-summary.md`

These should link to actual Lighthouse/Axe outputs or clearly stated methodology.

### 4.3 Content governance and asset provenance
Ensure you have:
- `docs/content-governance.md`
- `docs/asset-provenance.md`

These docs should explain:
- how `src/data/projects.ts` + `src/data/embeddedSystemsProjects.ts` feed the UI
- where screenshots/artifacts come from
- how provenance is tracked

---

## 5) Concrete “data upgrades” to perform in `src/data/projects.ts`

This portfolio UI is data-driven. The fastest improvement route is editing `src/data/projects.ts` (and/or `src/data/embeddedSystemsProjects.ts`) so that every project:

- uses consistent evidence verbs in `suggestedContent`:
  - **Capture**, **Run**, **Record**, **Verify**, **Measure**, **Export**
- includes architecture doc entries with consistent `focus` text (what it proves)
- includes `visuals` items that are either:
  - real screenshots, or
  - clearly labeled simulated evidence

### Example suggestedContent item patterns
Use patterns like:
- “Capture terminal screenshot of the successful build + test transcript:
  - `cmake -S . -B build`
  - `cmake --build build -- -j`
  - `ctest --test-dir build --output-on-failure`”

- “Capture evidence screenshot of UART/USB CDC diagnostics command output (nominal + failure mode).”

- “Attach register dump example (masked registers) and include decoding snippet.”

---

## 6) Implementation order (practical)

1. **Finish evidence completeness** for the highest priority projects.
2. Update/normalize `suggestedContent` and `architectureDocs` for those projects so the UI recommendation sidebar becomes truly useful.
3. Ensure embedded project folders comply with `docs/embedded-project-final-content-standard.md`.
4. Refresh screenshots for EnergyBuildAI routes.
5. Verify Lighthouse/accessibility evidence is present and linked.

---

## 7) Verification steps (to keep the improvements “real”)

Run:
- `npm run typecheck`
- `npm test --watchAll=false`
- `npm run build`

Then re-capture key screenshots from production build if UI/data changes are made.

