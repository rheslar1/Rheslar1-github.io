# Final Design Documentation Suggestions

Scrub date: 2026-06-11

This list summarizes additional final-design content that would make the portfolio projects easier to review as finished engineering artifacts.

## Portfolio-Wide Final Design Package

Add this documentation pattern to each major project when it is ready to be presented as final design work:

- `docs/final-design-report.md`: problem, requirements, constraints, architecture, major design decisions, validation summary, known limitations, and future work.
- `docs/requirements-traceability.md`: project requirements mapped to code modules, tests, screenshots, and evidence artifacts.
- `docs/evidence-matrix.md`: artifact inventory with command used, date generated, environment, source/provenance, and review purpose.
- `docs/test-report.md`: exact validation commands, environment, pass/fail results, coverage boundaries, and unresolved test gaps.
- `docs/deployment-runbook.md`: setup, environment variables, build, deploy, rollback, logs, and troubleshooting.
- `docs/operation-manual.md`: how a reviewer or operator uses the system after deployment.
- `docs/risk-register.md`: technical, safety, security, privacy, deployment, and data-quality risks with mitigations.
- `docs/performance-budget.md`: latency, memory, storage, CPU, network, power, and timing budgets where relevant.
- `docs/screenshots.md`: screenshots, plotted evidence, dashboard states, CLI transcripts, and expected visual outputs.
- `docs/change-log.md`: design milestones, commits/releases, validation improvements, and evidence updates.

## Predictive AI Neural Seizure Analysis

Suggested final content:

- Model card for the teacher ensemble and distilled student, including intended use, non-use, inputs, outputs, thresholds, metrics, and limitations.
- Data card for synthetic data and any approved public dataset adapter, including source, license, citation, consent basis, de-identification, and patient split notes.
- Requirements-to-tests matrix mapping signal generation, feature extraction, model scoring, EKG fusion, C export, timing evidence, and safety gates.
- Calibration evidence with probability histograms, threshold sweep, confusion matrix, lead-time distribution, and false-alert analysis.
- Live BeagleBone or embedded Linux timing report for the distilled student inference path.
- ONNX export or fixed-point export note comparing the current plain C export with future deployment options.
- Public dataset example run using a strictly approved deidentified dataset and provenance notes.
- Hardware-in-the-loop report for synthetic or replayed neural/EKG windows streamed through an embedded Linux target.
- Safety case expansion with hazard severity, detectability, mitigation owner, verification method, and clinical gate status.
- Reviewer walkthrough that explains each generated plot, CSV, JSON report, C file, and timing artifact.

## BeagleBone AD8232 EKG ADC Driver

Suggested final content:

- Final design report for the AD8232 OUT to protected BeagleBone AIN acquisition path.
- Wiring photo or diagram showing AD8232 `OUT`, `GND`, `3.3V`, optional `LO+`, optional `LO-`, and selected BeagleBone header pins.
- Voltage-divider calculation with resistor values, measured ADC-side maximum, reconstructed sensor-side millivolts, and safety margin below 1.8V.
- Bill of materials covering AD8232 breakout, BeagleBone board, resistors/analog conditioning, electrodes or test fixture, wires, and measurement tools.
- BeagleBone setup runbook for IIO ADC availability, overlays/kernel notes, permissions, and GPIO lead-off setup.
- Oscilloscope or logic analyzer evidence for AD8232 OUT and LO+/LO- behavior.
- Live capture package with `ad8232_capture.csv`, `ad8232_report.json`, waveform screenshot, board revision, ADC channel, divider values, and timestamp.
- Lead-off validation report showing disconnected and connected electrode states.
- Timing evidence under BeagleBone CPU load, including achieved sample rate and dropped-sample checks.
- Systemd service example for repeatable logging on embedded Linux.

## BMS, BEMS, And BEMS-AI

Suggested final content:

- Login-to-dashboard screenshot sequence showing the BMS redirect path and operational landing page.
- OpenAPI contract or endpoint table for the Node/API service.
- Database ERD plus seeded-data explanation for buildings, rooms, sensors, events, schedules, alarms, and energy records.
- Edge-core deployment runbook for C++ service build, configuration, logs, restart policy, and failure modes.
- AI service model card for forecasting or optimization components.
- Alarm validation report with triggered, acknowledged, resolved, and historical states.
- Energy baseline comparison showing simulated or measured before/after cost, demand, comfort, or carbon metrics.
- Docker Compose or deployment diagram showing UI, API, AI service, database, and edge services.
- Operator manual for recurring workflows: login, building review, room review, alarms, schedules, reports, and system health.
- CI/deployment evidence with build commands, artifacts, Pages URL, and known warnings.

## Portfolio Site

Suggested final content:

- Route map covering home, about, project catalog, project detail, BMS dashboard route, and embedded systems views.
- Screenshot matrix across desktop and mobile for key pages.
- Accessibility and keyboard navigation report.
- Performance or Lighthouse summary after production build.
- Deployment runbook for GitHub Pages, including Actions workflow, branch strategy, cache behavior, and rollback.
- Content governance note describing how project data in `src/data/projects.ts` becomes portfolio UI.
- Asset provenance list for profile photo, project diagrams, generated screenshots, and repository previews.

## Embedded Systems Project Collection

Suggested final content for each embedded project folder:

- Final design report with system context, hardware target, firmware/software layers, interfaces, safety constraints, and validation.
- Pin map, connector map, or register map depending on the project.
- Build and flash runbook with host tools, target tools, expected outputs, and recovery path.
- Host simulation evidence plus target hardware evidence when hardware is available.
- Power, latency, memory, flash, CPU, and storage budgets for embedded targets.
- Hardware-in-the-loop validation report for timing-sensitive projects.
- Fault-injection tests for update, communication, sensor, actuator, or storage failure modes.
- CI badge, test transcript, and artifact bundle for each repo.

## Utility, Automation, And Media Projects

Suggested final content:

- Python CLI transcript showing complete user/task workflow, sample input, output, and persistence file changes.
- Ansible dry-run and applied-run evidence with inventory, variable handling, and sensitive-data boundary notes.
- CameraDemo capture evidence with camera device path, V4L2 format, sample frame, build command, and runtime logs.
- Study repo index mapping C++ examples to diagrams, tests, static-analysis checks, and learning outcomes.
- Containers repo runbook showing image build, container start, health check, logs, and cleanup.

## Recommended Priority

1. Add final design reports and evidence matrices for `neural-seizure-ai-analysis` and `beaglebone-ad8232-ekg-driver`.
2. Add live hardware evidence for the AD8232 BeagleBone driver when the board is available.
3. Add BMS login/dashboard screenshots and API/database documentation.
4. Add CI/test reports for the portfolio, neural project, AD8232 driver, and embedded systems collection.
5. Add screenshot matrices and deployment runbooks for public-facing projects.
