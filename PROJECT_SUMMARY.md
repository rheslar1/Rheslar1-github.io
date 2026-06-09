# Robert Heslar Portfolio Summary

This repository contains a React portfolio for Robert Heslar, focused on embedded engineering, full-stack development, React, Node.js, MySQL, Yocto, embedded Linux, C/C++, Python, and automation.

## Current Live Site

https://rheslar1.github.io/Rheslar1-github.io/

## Core Features

- React 18 portfolio application
- Node.js build tooling
- GitHub Pages deployment
- GitHub Actions workflow for automated publishing
- Responsive layout
- Light/dark theme toggle
- Resume-aligned professional experience section
- Technical skills section
- Selected GitHub projects section
- Project detail pages with summaries, architecture, deployment details, dependencies, features, outcomes, previews, and resume-style highlights
- Contact links for GitHub, LinkedIn, and email

## Main Sections

- Hero
- About
- Professional Experience
- Technical Skills
- Selected GitHub Projects
- Project Details
- Contact
- Footer

## In-Depth Project Details

### pythonProject

`pythonProject` is a compact Python CLI application for user-management and
task-list practice. The project is intentionally small, but it demonstrates a
layered design: `main.py` owns terminal flow, `Userclass.py` owns domain/user
identity behavior, and `db.py` owns the CSV persistence boundary.

Key details:

- Data contract is a two-column `users.csv` row: `user_name,user_id`.
- `User` equality uses case-insensitive name comparison, which starts to model
  a real duplicate-detection domain rule.
- The persistence adapter can grow from CSV into SQLite, MySQL, PostgreSQL, or a
  REST-backed service without rewriting the command menu.
- Architecture notes identify hardening needs around malformed CSV rows,
  missing files, integer parsing, clearer storage errors, and unit tests.

Portfolio value:

- Shows Python fundamentals, file-backed persistence, separation of concerns,
  and an upgrade path from local automation to API/database-backed workflows.

### study

`study` is a C++17 and embedded-systems reference workspace. It combines small
inspectable examples with CMake, CTest, static analysis, UML diagrams, sanitizer
practice, CodeChecker, and ARM/Yocto deployment notes.

Key details:

- `examples/cpp` covers RAII, Strategy, Factory Method, Observer, Dependency
  Inversion, startup cleanup, lock guards, sanitizer practice, and service
  lifecycle ownership.
- The modular edge-service study separates configuration, logging, RAII
  handles, network probing, formatting strategies, worker-thread lifecycle, and
  hardware I/O interfaces.
- CI validates configure, build, CTest, runnable examples, clang-tidy,
  cppcheck, CodeChecker/Clang Static Analyzer, sanitizers, and artifacts.
- Draw.io source diagrams and exported PNGs provide portfolio-ready UML
  evidence without losing editable source.

Portfolio value:

- Shows disciplined C++ learning, analysis tooling, diagram-driven explanation,
  and practical embedded Linux deployment thinking.

### BEMS-ai

`BEMS-ai` is a PPO-based building energy management controller. It combines
Python research/training modules, deterministic simulation, digital-twin
guardrails, grid-aware optimization, ONNX export, and C++ deployment-side
controller code.

Key details:

- Stable control contract: `STATE_DIM = 116`, `ACTION_DIM = 12`, `N_ZONES = 4`,
  and `HORIZON_H = 8`.
- State blocks cover per-zone telemetry, global energy/storage/time/grid
  context, weather forecasts, price forecasts, and occupancy forecasts.
- Runtime flow is telemetry to state builder, PPO policy, action decoder,
  occupancy adjustment, grid optimizer, digital twin, command generation, and
  simulation/reward feedback.
- Simulation now defaults to `PpoBemsPolicy`; `RuleBasedBaselinePolicy` is kept
  as a non-AI comparison baseline.
- Training/export flow saves PPO weights, exports an ONNX actor graph, validates
  ONNX inference, and preserves a C++ controller boundary.
- BMS integration should use a service boundary: BMS UI to Node API, Node API to
  Python AI service over gRPC, and AI runtime paths consuming BEMS-ai modules
  without importing training scripts.

Portfolio value:

- Shows AI control-system architecture, fixed deployment contracts, simulation,
  forecasting, optimization, and Python/C++/ONNX integration thinking.

### Rheslar1-github.io

`Rheslar1-github.io` is the live React portfolio itself. It is a static SPA
published by GitHub Pages and built around a central `src/data/projects.js`
catalog.

Key details:

- Hash routing keeps pages compatible with static hosting: home, dashboard, BMS
  login concept, and project detail pages.
- `Dashboard.js` aggregates project catalog data into KPIs, BEMS heat map,
  architecture Markdown matrix, readiness cards, stack coverage, visual evidence,
  and suggested content.
- `ProjectDetails.js` renders each repo as a case study with problem,
  architecture, deployment, deep technical breakdown, visuals, features,
  outcomes, stack matrix, resume highlights, and evidence backlog.
- `BmsLogin.js` presents a focused BMS access concept connecting role-based
  access, telemetry, API readiness, and BEMS-ai optimization.
- GitHub Actions builds with `npm ci` and `npm run build`, then publishes the
  static build artifact to Pages.

Portfolio value:

- Shows React implementation, data-driven case studies, GitHub Pages deployment,
  design polish, and the ability to turn raw repositories into readable
  engineering narratives.

### BEMS

`BEMS` models an enterprise building energy management platform. It connects a
React/Vite operator dashboard, Node.js API, MySQL data, BEMS-ai optimization,
C++ edge services, BACnet-oriented device control, Docker deployment, GitHub
Actions CI/CD, and Yocto packaging.

Key details:

- Runtime flow: React UI requests telemetry, Node API reads MySQL, UI requests
  optimization, Node API calls the BEMS-ai service over gRPC, optimization
  history is persisted, vetted commands move to the C++ edge core, and BACnet
  device response returns as telemetry/status events.
- UI includes an architecture-alignment panel mapping React/Vite UI, Node API,
  MySQL, BEMS-ai service, C++ edge core, and BACnet devices to status/evidence
  rows.
- API owns session/auth, REST endpoints, MySQL persistence, AI optimization,
  edge commands, digital-twin composition, schedules, alarms, and audit/event
  shaping.
- Docker stack verifies UI, API, BEMS-ai service, edge-core, MySQL, Kafka,
  RabbitMQ, Prometheus, Grafana, Alertmanager, and Watchtower health.
- Root GitHub Actions workflows now run BEMS CI and BEMS CD from the repo root;
  CI passed on commit `4dbd8045` after cleaning stale CMake build caches.

Portfolio value:

- Shows full-stack, embedded edge, database, AI-service, Docker, CI/CD, and
  building-automation architecture in one integrated system.

### ansible

`ansible` is a starter infrastructure automation repository. It captures local
and remote validation patterns using Ansible playbooks, inventory files, SSH,
and reusable configuration.

Key details:

- `test.yml` validates local connectivity with a ping workflow.
- `helloworld.yml` validates basic task execution with
  `ansible.builtin.debug`.
- `ssh_renmote_login.yml` demonstrates remote execution, fact gathering,
  privilege escalation, command registration, and debug output.
- `playbooks/ansible.cfg` defines default inventory, host-key checking behavior,
  retry-file behavior, and remote temp path.
- Architecture separates control node, inventory layer, playbook layer, and
  module layer so host-specific values can move out of task definitions.
- Security model identifies sensitive values such as IP addresses, usernames,
  SSH keys, topology-revealing logs, and privileged output.

Portfolio value:

- Shows automation thinking, repeatable remote execution, inventory discipline,
  and a path toward roles, group vars, host vars, Molecule tests, ansible-lint,
  syntax checks, and deployment playbooks.

### CameraDemo

`CameraDemo` is a native C camera bring-up utility for embedded Linux targets
such as a Digi ConnectCore i.MX93 EVK. It exercises V4L2 capture, mmap
streaming buffers, timestamped frame metadata, framebuffer/DRM display hooks,
and SCP/SSH target deployment.

Key details:

- `main.c` opens `/dev/video0`, queries capabilities, enumerates formats, sets
  capture format, requests buffers, maps buffers with `mmap`, queues buffers,
  starts streaming, dequeues frames, and requeues buffers.
- `BUFFER_COUNT = 4` creates a four-buffer low-copy capture path.
- `buffer_t` separates mmap buffer ownership from frame metadata.
- `frame_data_t` records pointer, size, index, width, height, and timestamp.
- `display_t` tracks framebuffer/DRM state including descriptor, dimensions,
  bytes per pixel, line length, mapped pointer, and cached framebuffer state.
- Makefile targets support aarch64 cross-compile, SCP, SSH, run, clean, debug,
  and target overrides such as `TARGET_IP`, `TARGET_USER`, and `TARGET_PATH`.
- Documented failure modes include missing camera node, unsupported format,
  insufficient buffers, mmap failure, missing display devices, SSH problems, and
  missing cross-compiler tools.

Portfolio value:

- Shows low-level Linux C development, direct V4L2 ioctl usage, embedded target
  deployment, hardware bring-up thinking, and practical failure-mode awareness.

## Project Structure

```text
Rheslar1-github.io/
├── .github/workflows/static.yml
├── public/index.html
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Contact.js
│   │   ├── Experience.js
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── Navbar.js
│   │   ├── ProjectDetails.js
│   │   ├── Projects.js
│   │   └── Skills.js
│   ├── data/projects.js
│   ├── App.css
│   ├── App.js
│   ├── index.css
│   └── index.js
├── package.json
├── package-lock.json
├── CLOUD_DEPLOYMENT.md
├── PERFORMANCE_ANALYTICS.md
├── PROJECT_SUMMARY.md
├── README.md
└── SETUP.md
```

## Deployment

Deployment is GitHub Pages only.

```bash
npm ci
npm run build
git push origin main
```

The workflow in `.github/workflows/static.yml` builds and publishes the `build` folder.

## Verification

Recent deployment checks have confirmed:

- `npm run build` compiles successfully
- GitHub Pages workflow completes successfully
- Live site returns `HTTP 200`
- Project detail pages are included in the published React bundle

## Next Content Improvements

- Add real project screenshots from running applications
- Add deeper README files to each project repository
- Add measurable outcomes where available
- Add case-study images or architecture diagrams for BMS and camera work
