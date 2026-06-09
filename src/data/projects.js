const githubPreview = (repo) => `https://opengraph.githubassets.com/1/rheslar1/${repo}`;
const projectAsset = (name) => `${process.env.PUBLIC_URL}/assets/projects/${name}`;

const projects = [
  {
    id: 'pythonProject',
    title: 'pythonProject',
    summary: 'Python command-line project for user and task-list management experiments.',
    deployment:
      'Runs locally with Python from the command line; data is stored in users.csv and can later be migrated to MySQL or an API-backed service.',
    dependencies: ['Python standard library', 'csv', 'os', 'dataclasses'],
    repository: 'https://github.com/rheslar1/pythonProject',
    architectureDocs: [
      {
        title: 'Root Architecture',
        path: 'ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/pythonProject/blob/main/ARCHITECTURE.md',
        focus: 'CLI layers, CSV persistence, User model, runtime flow, extension plan'
      }
    ],
    preview: projectAsset('python-cli-simulated.svg'),
    visuals: [
      {
        src: projectAsset('python-cli-simulated.svg'),
        caption: 'Simulated CLI screenshot based on main.py, db.py, Userclass.py, and CSV-backed workflow.'
      },
      {
        src: githubPreview('pythonProject'),
        caption: 'GitHub repository preview for the Python CLI project.'
      }
    ],
    tags: ['Python', 'CSV', 'CLI', 'Automation'],
    problem:
      'Create a small Python application that can model users, persist user records, and provide a simple command workflow for viewing and adding data.',
    architecture:
      'A command-line Python app organized around main.py for menu flow, db.py for CSV persistence, Userclass.py for the user model, and users.csv as lightweight storage.',
    deepDetails: [
      'main.py owns the command loop and routes user commands to focused functions such as show_users, add_user, and del_user.',
      'db.py isolates CSV file access so persistence can be replaced later without rewriting command-flow logic.',
      'Userclass.py defines the User model, equality behavior, and accessors used by the command workflow.',
      'The data contract is intentionally small: each users.csv row stores user_name and user_id, giving the CLI a simple persistence boundary that can be tested with plain file fixtures.',
      'The presentation layer, domain layer, and persistence layer are separated enough that a future SQLite, MySQL, PostgreSQL, or REST-backed adapter can replace CSV without changing the terminal menu.',
      'The architecture doc identifies hardening work around malformed CSV rows, missing files, duplicate names, integer parsing, and clearer storage errors.',
      'The current structure is suitable for incremental upgrades such as input validation, unit tests, a MySQL storage adapter, or a Node.js/React front end.'
    ],
    features: [
      'Command menu for showing users, adding users, deleting users, and exiting the program.',
      'Dataclass-backed user model with equality behavior for duplicate detection.',
      'CSV-backed storage layer for simple persistence without a database dependency.',
      'Case-insensitive user-name comparison that starts to encode a real domain rule instead of treating rows as anonymous strings.',
      'Separation between application flow, user model, and data access code.'
    ],
    outcomes: [
      '158-line starter application split across 3 Python modules plus CSV storage.',
      'CSV-backed workflow keeps the project runnable with no database server or external package installation.',
      'Architecture notes define a clear growth path from CLI and CSV toward tests, repository interfaces, task-list objects, database storage, and a possible web-backed service.',
      'Provides a compact foundation for adding unit tests, validation, a MySQL storage adapter, or a React/Node.js UI.'
    ],
    resumeBullets: [
      'Built Python automation-style application code with discrete modules for command handling, persistence, and data modeling.',
      'Used CSV persistence and object comparison logic to support repeatable user-management workflows.',
      'Structured the project so storage and user behavior can evolve independently.'
    ],
    screenshotCaption:
      'Simulated view shows the intended terminal workflow. Replace it with a real terminal capture after running the CLI with sample data.',
    suggestedContent: [
      'Capture a real terminal screenshot showing show users, add user, del user, and updated users.csv output.',
      'Add unit-test output once model and persistence tests are added.',
      'Add a MySQL adapter diagram if the storage layer is upgraded from CSV.'
    ]
  },
  {
    id: 'study',
    title: 'study',
    summary: 'Engineering study repository with C++17 examples, static-analysis workflows, diagrams, and embedded Linux notes.',
    deployment:
      'Documentation/reference repository hosted on GitHub; published by repository browsing rather than an application runtime.',
    dependencies: ['C++17', 'CMake', 'clang-tidy', 'cppcheck', 'CodeChecker', 'Draw.io', 'GitHub Actions'],
    repository: 'https://github.com/rheslar1/study',
    architectureDocs: [
      {
        title: 'Study Architecture',
        path: 'ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/study/blob/analysis/ARCHITECTURE.md',
        focus: 'C++ examples, UML index, CI/static analysis, embedded deployment study flow'
      },
      {
        title: 'C++ Examples README',
        path: 'examples/cpp/README.md',
        url: 'https://github.com/rheslar1/study/blob/analysis/examples/cpp/README.md',
        focus: 'CMake, CTest, sanitizer, static-analysis, and edge-service examples'
      }
    ],
    preview: projectAsset('study-cpp-ci-simulated.svg'),
    visuals: [
      {
        src: projectAsset('study-cpp-ci-simulated.svg'),
        caption: 'Simulated study workbench showing CMake builds, static analysis, CI, and diagram review.'
      },
      {
        src: projectAsset('study-cpp-service-lifecycle.png'),
        caption: 'C++ service lifecycle diagram from the study repository.'
      },
      {
        src: githubPreview('study'),
        caption: 'GitHub repository preview for the study notes and examples.'
      }
    ],
    tags: ['C++17', 'Static Analysis', 'UML', 'Yocto Notes'],
    problem:
      'Keep engineering notes, C++ examples, diagrams, static-analysis workflows, and embedded Linux deployment references organized for reuse.',
    architecture:
      'A documentation and examples repository with examples/cpp for CMake-based C++17 code, diagrams for draw.io source and exported PNGs, and GitHub Actions for build/static-analysis validation.',
    deepDetails: [
      'examples/cpp contains 12 C++ source examples covering RAII, strategy, observer, factory method, dependency inversion, startup cleanup, lock guards, and sanitizer practice.',
      'The CMake project supports local builds, test execution, clang-tidy, cppcheck, CodeChecker, and sanitizer smoke-test workflows.',
      'The diagrams folder includes 10 exported PNG diagrams with editable draw.io source files.',
      'The modular edge-service examples separate configuration, logging, RAII handles, network probing, formatting strategies, worker-thread lifecycle, and hardware I/O interfaces.',
      'The CI/analysis subsystem validates configure, build, CTest, smoke examples, clang-tidy, cppcheck, CodeChecker/Clang Static Analyzer, sanitizer runs, and artifact upload.',
      'The repository keeps documentation contracts between README.md, ARCHITECTURE.md, examples/cpp/README.md, diagrams/README.md, the capstone plan, and senior engineering study notes.',
      'The repository also includes Yocto and ARM Linux deployment notes that connect study material back to embedded engineering practice.'
    ],
    features: [
      'C++17 examples for design patterns, resource management, lifecycle handling, and static-analysis practice.',
      'CI workflow for CMake builds, clang-tidy, cppcheck, CodeChecker, sanitizer smoke tests, and artifact upload.',
      'UML/architecture diagrams exported from draw.io for visual review and portfolio support.',
      'Embedded deployment study notes for systemd units, Yocto image recipes, hardware path selection, reboot validation, and upgrade/rollback practice.'
    ],
    outcomes: [
      '12 C++17 example programs and 10 exported architecture/study diagrams are tracked in the repository.',
      'GitHub Actions validates build and analysis workflows for the C++ study examples.',
      'Study notes connect C++ patterns, embedded Linux, Yocto deployment, and static-analysis tooling.',
      'The repo functions as a reusable engineering reference: a small example can be studied in isolation, then validated through the same build/test/analyzer path as larger C++ services.'
    ],
    resumeBullets: [
      'Maintained a study repository to capture technical research, implementation notes, and engineering experiments.',
      'Organized learning material for reuse across embedded systems, automation, and full-stack development.',
      'Used GitHub as a repeatable knowledge-management workflow.'
    ],
    screenshotCaption:
      'Simulated view summarizes the C++/CI study workflow. Repository diagrams are real exported assets from the study repo.',
    suggestedContent: [
      'Capture GitHub Actions passing for the C++ CI workflow.',
      'Add screenshots of selected C++ examples running locally.',
      'Add a diagram index image that links each UML visual to its source example.'
    ]
  },
  {
    id: 'BEMS-ai',
    title: 'BEMS-ai',
    summary: 'PPO-based BEMS controller with Python training, closed-loop simulation, digital twin logic, forecasting, ONNX export, and C++ deployment code.',
    deployment:
      'Supports Python research/training workflows and C++ controller deployment checks using CMake, pytest, EnergyPlus-oriented scaffolding, a deterministic simulation harness, and an ONNX Runtime deployment boundary.',
    dependencies: ['Python', 'pytest', 'C++', 'CMake', 'EnergyPlus concepts', 'LightGBM concepts', 'PPO', 'ONNX Runtime'],
    repository: 'https://github.com/rheslar1/BEMS-ai',
    architectureDocs: [
      {
        title: 'Controller Architecture',
        path: 'ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/BEMS-ai/blob/master/ARCHITECTURE.md',
        focus: '116-state contract, 12-action control, PPO, digital twin, ONNX boundary'
      },
      {
        title: 'Deep Architecture',
        path: 'docs/DEEP_ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/BEMS-ai/blob/master/docs/DEEP_ARCHITECTURE.md',
        focus: 'Training pipeline, simulation loop, grid optimizer, C++ deployment interface'
      }
    ],
    preview: projectAsset('bems-ai-system-architecture.png'),
    visuals: [
      {
        src: projectAsset('bems-ai-rl-simulated.svg'),
        caption: 'Simulated BEMS-ai controller dashboard based on the 116-state and 12-action RL contract.'
      },
      {
        src: projectAsset('bems-ai-system-architecture.png'),
        caption: 'BEMS-ai system architecture diagram from the repository documentation.'
      },
      {
        src: projectAsset('bems-ai-rl-control-loop.png'),
        caption: 'Reinforcement-learning control loop diagram for BEMS-ai.'
      }
    ],
    tags: ['AI', 'BEMS', 'Python', 'Automation'],
    problem:
      'Explore how reinforcement learning, forecasting, occupancy prediction, and digital-twin simulation can improve building energy management decisions.',
    architecture:
      'Python package for state layout, prediction, closed-loop simulation, digital twin logic, PPO training, and ONNX export; C++ source for action decoding, state building, controller behavior, and deployment-oriented tests.',
    deepDetails: [
      'The project defines a 116-dimensional state contract and 12-dimensional action contract for multi-zone HVAC, battery, and thermal storage control.',
      'Python modules cover energy prediction, occupancy prediction, occupancy-aware setpoint adjustment, digital twin rollout, closed-loop simulation, solar/battery optimization, power-grid optimization, and resource-advisor style insights.',
      'The simulation path now uses PpoBemsPolicy as the default AI controller, with RuleBasedBaselinePolicy preserved as a non-AI comparison baseline.',
      'The simulator can run deterministic scenario tests with the same 116-state and 12-action contracts used by training and deployment.',
      'Forecast blocks cover weather, price, and occupancy horizons so the policy can reason about future outdoor temperature, irradiance, tariff pressure, and zone demand instead of only current telemetry.',
      'The training/export flow saves PPO actor weights, exports an ONNX actor graph, validates ONNX inference, and preserves a C++ controller boundary for deployment-side integration.',
      'The BMS integration contract is service-oriented: BMS UI calls Node API, Node calls the Python AI service over gRPC, and runtime paths consume BEMS-ai modules without importing training scripts.',
      'C++ modules provide action_decoder, controller, digital_twin, and state_builder source for deterministic deployment-side behavior.',
      'Tests cover cloud services, digital twin behavior, energy prediction, MDP/reward logic, occupancy prediction, simulation, training/export scaffolding, and C++ controller patterns.'
    ],
    features: [
      'Multi-zone HVAC, battery, and thermal-storage control framing.',
      'Forecast-aware state, reward, PPO simulation, and digital-twin modules.',
      'Operator-approved fallback schedules and rule-based baseline simulation for non-AI comparison.',
      'Grid-aware optimization for buy price, sell price, carbon intensity, grid stress, import limits, demand-response flags, battery behavior, and solar export/curtailment.',
      'Fixed Python/C++/ONNX state and action contracts for safer deployment integration.',
      'Python research path with C++ deployment boundary and ONNX export/validation scaffolding.',
      'Architecture diagrams for system flow, RL control loop, and C++ deployment classes.'
    ],
    outcomes: [
      '116-dimensional state vector and 12-dimensional action vector define the BEMS control contract.',
      'Rebased master/debug branches now point to the PPO simulation update commit d6f09d1.',
      '36 Python/C++ source and test files provide about 2,900 lines of controller, simulation, prediction, export, and test code.',
      'Deep architecture documentation maps the policy loop, forecasting, occupancy adjustment, digital twin, grid optimizer, simulation, ONNX export, and BMS service integration boundary.',
      'Python and C++ tests document expected behavior across control, prediction, simulation, and reward workflows.'
    ],
    resumeBullets: [
      'Explored AI-backed support workflows for building energy management use cases.',
      'Mapped AI project concepts to full-stack and automation architecture patterns.',
      'Positioned the project for future integration with APIs, databases, and dashboard interfaces.'
    ],
    screenshotCaption:
      'Simulated controller view is paired with real BEMS-ai architecture and RL control-loop diagrams from the repository.',
    suggestedContent: [
      'Capture pytest and CTest output from a clean run.',
      'Add a training/reward plot from a PPO training session.',
      'Add an ONNX export/validation screenshot once a trained policy artifact is generated.',
      'Add a before/after energy-cost comparison using a representative simulation scenario.'
    ]
  },
  {
    id: 'portfolio',
    title: 'Rheslar1-github.io',
    summary: 'React portfolio built with Node.js tooling and deployed through GitHub Pages.',
    deployment:
      'Deployed by GitHub Actions: npm ci, npm run build, upload the build artifact, and publish to GitHub Pages.',
    dependencies: ['React 18', 'Node.js', 'react-scripts', 'GitHub Actions', 'GitHub Pages'],
    repository: 'https://github.com/rheslar1/Rheslar1-github.io',
    architectureDocs: [
      {
        title: 'Portfolio Architecture',
        path: 'ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/ARCHITECTURE.md',
        focus: 'React SPA routing, project data model, dashboard/detail pages, Pages deployment'
      }
    ],
    preview: projectAsset('portfolio-home.png'),
    visuals: [
      {
        src: projectAsset('portfolio-home.png'),
        caption: 'Real screenshot captured from the running portfolio production build.'
      },
      {
        src: githubPreview('Rheslar1-github.io'),
        caption: 'GitHub repository preview for the portfolio source.'
      }
    ],
    tags: ['React', 'Node.js', 'GitHub Actions', 'GitHub Pages'],
    problem:
      'Create a public portfolio that communicates embedded engineering, full-stack development, MySQL, automation, and GitHub project experience.',
    architecture:
      'Create React App project built by Node.js tooling. GitHub Actions installs dependencies, runs the production build, uploads the build artifact, and deploys it to GitHub Pages.',
    deepDetails: [
      'The application is split into focused React components for hero, about, experience, skills, projects, project details, contact, navigation, and footer.',
      'Project data lives in src/data/projects.js so summaries, deployment details, dependencies, features, and outcomes can be maintained in one place.',
      'Hash-based routes such as #project/bms keep project detail pages compatible with static GitHub Pages hosting.',
      'Dashboard.js aggregates the project catalog into portfolio KPIs, BEMS energy heat map, architecture Markdown matrix, readiness cards, stack coverage tags, visual evidence board, and suggested content queue.',
      'ProjectDetails.js renders each repo as a case study with problem, architecture, deployment model, numbered deep technical breakdown, visual gallery, features, measurable outcomes, stack matrix, and resume highlights.',
      'BmsLogin.js provides a BMS secure-access concept page that links role-based access, facility telemetry, API readiness, and BEMS-ai optimization status.',
      'The GitHub Pages workflow uses Node.js 18, npm ci, npm run build, upload-pages-artifact, and deploy-pages.'
    ],
    features: [
      'Responsive portfolio layout with hero, about, professional experience, skills, projects, contact, and footer sections.',
      'Dark and light theme toggle persisted in localStorage.',
      'GitHub Pages workflow with npm ci, npm run build, artifact upload, and Pages deployment.',
      'Project detail pages implemented inside the React single-page app with hash-based deep links.',
      'Architecture-document cards connect each project page to the Markdown files that explain its repo structure and runtime flow.'
    ],
    outcomes: [
      'Live portfolio is deployed at rheslar1.github.io/Rheslar1-github.io.',
      'Current resume positioning is visible: Embedded Engineer, Full Stack Developer, React, Node.js, and MySQL.',
      'Project catalog now carries deep architecture and implementation details for every showcased repository.',
      'GitHub Actions deployment published the portfolio successfully to GitHub Pages.'
    ],
    resumeBullets: [
      'Built and deployed a React portfolio using Node.js build tooling and GitHub Pages.',
      'Implemented responsive UI sections, project detail pages, SEO metadata, and automated deployment.',
      'Used GitHub Actions to publish a production build from the main branch.'
    ],
    screenshotCaption:
      'Repository preview for the live portfolio. The live site itself is the primary screenshot source.',
    suggestedContent: [
      'Capture desktop and mobile screenshots after every major content update.',
      'Add a GitHub Actions deployment screenshot showing the latest successful Pages run.',
      'Add Lighthouse or accessibility results after the final content pass.'
    ]
  },
  {
    id: 'bems',
    aliases: ['bms', 'nms'],
    title: 'BEMS',
    summary: 'Building energy management system that uses BEMS-ai as the optimization layer with edge C++, Node.js API, React/Vite dashboard, MySQL, Docker, GitHub Actions, and Yocto integration.',
    deployment:
      'Verified with the local Docker stack: UI, API, BEMS-ai service, edge-core, MySQL, Kafka, RabbitMQ, Prometheus, Grafana, Alertmanager, and Watchtower run together with healthy container checks.',
    dependencies: ['BEMS-ai', 'C++', 'Node.js', 'Express', 'mysql2', 'React', 'Vite', 'Recharts', 'Python', 'gRPC', 'Docker', 'GitHub Actions', 'Yocto'],
    repository: 'https://github.com/rheslar1/BMS',
    architectureDocs: [
      {
        title: 'System Architecture',
        path: 'BEMS_ENTERPRISE_COMPLETE/repo/docs/architecture.md',
        url: 'https://github.com/rheslar1/BMS/blob/bems/BEMS_ENTERPRISE_COMPLETE/repo/docs/architecture.md',
        focus: 'Enterprise BMS layers, API, database, AI service, edge, Docker, Yocto'
      },
      {
        title: 'Deep Architecture',
        path: 'BEMS_ENTERPRISE_COMPLETE/repo/docs/deep-architecture.md',
        url: 'https://github.com/rheslar1/BMS/blob/bems/BEMS_ENTERPRISE_COMPLETE/repo/docs/deep-architecture.md',
        focus: 'BEMS-ai integration, service contracts, telemetry flow, deployment evidence model'
      }
    ],
    loginRoute: '#bms-login',
    loginLabel: 'BMS Login Page',
    preview: projectAsset('bms-detail.png'),
    visuals: [
      {
        src: projectAsset('bms-dashboard-simulated.svg'),
        caption: 'Simulated BEMS operations dashboard based on the React/Vite UI source and seeded MySQL schema.'
      },
      {
        src: projectAsset('bems-energy-heat-map.svg'),
        caption: 'BEMS dashboard view showing energy heat map and usage over a simulated building floorplan.'
      },
      {
        src: projectAsset('bems-ai-rl-simulated.svg'),
        caption: 'BEMS-ai controller view used as the BEMS optimization layer for predictive energy decisions.'
      },
      {
        src: projectAsset('bms-detail.png'),
        caption: 'Real screenshot captured from the running portfolio BMS project detail page.'
      },
      {
        src: projectAsset('bms-uml-architecture.png'),
        caption: 'BEMS UML architecture diagram from the repository.'
      },
      {
        src: projectAsset('bms-uml-layers.png'),
        caption: 'BEMS layer diagram showing system separation.'
      }
    ],
    tags: ['BEMS-ai', 'C++', 'Node.js', 'React', 'MySQL', 'Yocto', 'Docker'],
    problem:
      'Model an enterprise-style building energy management platform that connects edge data, BEMS-ai optimization, APIs, database storage, and operator-facing dashboards.',
    architecture:
      'Public repository structure includes edge-core C++, node-api Express service using mysql2 and gRPC packages, React/Vite UI with Recharts, BEMS-ai/Python optimization service, database/schema.sql, Docker deployment files, protobuf definitions, and Yocto meta-bems layers.',
    deepDetails: [
      'edge-core is the embedded/edge layer and is primarily C++, with BACnet-oriented integration and CMake-style structure.',
      'node-api is an Express service that depends on cors, @grpc/grpc-js, @grpc/proto-loader, and mysql2 for API, service, and database workflows.',
      'ui is a React/Vite dashboard that uses Recharts for operator-facing visualization, including BEMS-ai energy heat-map and usage overlays on a simulated building floorplan.',
      'The dashboard home page now includes a Deep Architecture Alignment panel that maps React/Vite UI, Node API, MySQL, BEMS-ai service, C++ edge core, and BACnet devices to live status and evidence rows.',
      'ai-service is the BEMS-ai/Python optimization layer with gRPC/protobuf dependencies, designed to connect predictive energy analysis into the system.',
      'Runtime data flow runs from operator dashboard to Node API, MySQL telemetry lookup, BEMS-ai gRPC optimization, persisted optimization history, edge command publication, BACnet read/write response, and telemetry/status event feedback.',
      'The API owns safety checks and coordination across session/auth, REST endpoints, MySQL persistence, AI optimization, edge commands, digital twin composition, schedules, alarms, and audit/event shaping.',
      'database/schema.sql provides the database foundation, while Docker files and Yocto meta-bems recipes support containerized and embedded Linux deployment.',
      'Root GitHub Actions workflows now run BEMS CI and BEMS CD from the repository root, including C++ tests, static analysis, Python checks, Node checks, UI build, Docker image build, and GHCR publishing.'
    ],
    features: [
      'Edge Core BACnet-oriented integration area written primarily in C++.',
      'Node.js API service using Express, CORS, gRPC tooling, and mysql2 for database workflows.',
      'React/Vite UI with Recharts, architecture-alignment status, dashboard-style visualization, energy heat-map, and usage trends.',
      'BEMS-ai/Python optimization layer with gRPC/protobuf dependencies for predictive energy recommendations.',
      'HTTP/JSON and SSE UI/API boundary, SQL database boundary, gRPC AI boundary, edge command/event boundary, and Docker health-check boundary.',
      'Docker deployment files, MySQL schema, GitHub Actions CI/CD, and Yocto recipes for embedded Linux packaging.'
    ],
    outcomes: [
      '38 source/config/database/deployment files and about 7,800 lines are tracked in the enterprise project tree when generated caches and node_modules are excluded.',
      'Multi-service architecture covers React UI, Node.js API, BEMS-ai/Python optimization, C++ edge control, MySQL schema, Docker deployment, protobuf contracts, and Yocto recipes.',
      'GitHub Actions BEMS CI and BEMS CD passed on commit 4dbd8045 after root workflow and CMake-cache cleanup fixes.',
      'Local Docker deployment verified the updated dashboard bundle and healthy UI, API, AI service, edge-core, database, event bus, and observability containers.',
      'UML architecture, layer, sequence, and data-model diagrams are included as case-study documentation.'
    ],
    resumeBullets: [
      'Designed a multi-service BEMS architecture that uses BEMS-ai for predictive energy optimization with edge C++, Node.js API, React dashboard, MySQL schema, Docker, GitHub Actions, and Yocto integration.',
      'Connected embedded/edge concerns with full-stack web application patterns and database-backed workflows.',
      'Organized repository structure for deployment, documentation, edge-core code, API services, UI, AI service, CI/CD, and Yocto layers.'
    ],
    screenshotCaption:
      'BEMS case-study images combine a simulated dashboard view, energy heat map and usage over a simulated building floorplan, BEMS-ai controller view, a real running portfolio detail screenshot, and UML diagrams sourced from the repository. The real BMS Docker dashboard was also verified locally on port 5173.',
    suggestedContent: [
      'Run the Docker stack and capture the real React dashboard with seeded MySQL data.',
      'Capture a real BEMS energy heat map and usage dashboard over the production building floorplan from telemetry or MySQL sample data.',
      'Capture API health, digital-twin, alarm, and schedule endpoint responses.',
      'Add MySQL schema/entity screenshots or an ERD generated from schema.sql.',
      'Add a deployment screenshot showing Docker services healthy together.'
    ]
  },
  {
    id: 'ansible',
    title: 'ansible',
    summary: 'Infrastructure automation repository with Ansible playbooks and inventory examples.',
    deployment:
      'Executed with Ansible against local or remote inventory; playbooks support connectivity checks, command execution, and automation validation.',
    dependencies: ['Ansible', 'YAML', 'SSH', 'Inventory files', 'Linux shell commands'],
    repository: 'https://github.com/rheslar1/ansible',
    architectureDocs: [
      {
        title: 'Automation Architecture',
        path: 'ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/ansible/blob/main/ARCHITECTURE.md',
        focus: 'Control node, inventory, playbooks, modules, security, validation workflow'
      }
    ],
    preview: projectAsset('ansible-playbook-simulated.svg'),
    visuals: [
      {
        src: projectAsset('ansible-playbook-simulated.svg'),
        caption: 'Simulated Ansible terminal output based on the repository playbooks and inventory structure.'
      },
      {
        src: githubPreview('ansible'),
        caption: 'GitHub repository preview for Ansible playbooks and inventory examples.'
      }
    ],
    tags: ['Ansible', 'Automation', 'Infrastructure'],
    problem:
      'Capture repeatable infrastructure automation examples for local and remote host workflows instead of relying on manual command execution.',
    architecture:
      'Ansible repository with playbooks including a hello-world debug playbook, SSH remote login command example, local ping test, ansible.cfg, and inventory structure.',
    deepDetails: [
      'helloworld.yml validates basic Ansible task execution with ansible.builtin.debug.',
      'ssh_renmote_login.yml demonstrates remote execution, fact gathering, privilege escalation, command registration, and debug output.',
      'test.yml provides a local ping workflow for quick connectivity and inventory checks.',
      'playbooks/ansible.cfg defines the default inventory location, host-key checking behavior, retry-file behavior, and remote temporary directory.',
      'The architecture separates the control node, inventory layer, playbook layer, and built-in module layer so host-specific values can move out of task definitions.',
      'Security notes call out real IP addresses, usernames, SSH keys, topology-revealing logs, and privileged output as sensitive data that should be handled through inventory discipline or secret tooling.',
      'The repository can grow into provisioning, validation, deployment, and embedded Linux support automation.'
    ],
    features: [
      'Basic hello-world playbook for validating Ansible execution.',
      'Remote SSH command workflow with fact gathering, privilege escalation, command registration, and debug output.',
      'Local ping test playbook for checking baseline connectivity.',
      'File-based inventory model for grouping local and development target hosts.',
      'Configuration defaults for inventory, host-key checking, retry files, and remote temporary paths.',
      'Inventory folder and configuration file layout for future expansion.'
    ],
    outcomes: [
      '3 starter playbooks cover hello-world validation, local ping checks, and remote SSH command execution.',
      'Inventory and ansible.cfg examples establish a reusable structure for remote automation.',
      'The architecture defines a practical growth path toward dev/stage/prod inventories, group_vars, host_vars, roles, Molecule tests, ansible-lint, syntax checks, and deployment playbooks.',
      'Repository can grow into provisioning, CI/CD support, and embedded Linux deployment automation.'
    ],
    resumeBullets: [
      'Created Ansible playbooks to standardize command execution, connectivity checks, and remote automation tasks.',
      'Used automation patterns that can support deployment, validation, and infrastructure maintenance.',
      'Structured repository for future inventory and playbook expansion.'
    ],
    screenshotCaption:
      'Simulated terminal view shows the intended validation workflow. Replace it with real playbook output after running against a safe inventory.',
    suggestedContent: [
      'Capture a real ansible-playbook run with hostnames/IPs masked if needed.',
      'Add ansible-lint or syntax-check output once linting is configured.',
      'Add a short deployment before/after example for a real managed host.'
    ]
  },
  {
    id: 'CameraDemo',
    title: 'CameraDemo',
    summary: 'Native C camera capture demo for Linux V4L2, mmap buffers, framebuffer/DRM display hooks, and i.MX93-style target deployment.',
    deployment:
      'Built with an aarch64 cross-compiler Makefile and deployable to an embedded Linux target over SCP/SSH for camera bring-up and display validation.',
    dependencies: ['C', 'Linux V4L2', 'Framebuffer/DRM', 'mmap', 'aarch64-linux-gnu-gcc', 'SCP/SSH', 'Optional libpng'],
    repository: 'https://github.com/rheslar1/CameraDemo',
    architectureDocs: [
      {
        title: 'Camera Architecture',
        path: 'ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/CameraDemo/blob/main/ARCHITECTURE.md',
        focus: 'V4L2 ioctls, mmap buffers, framebuffer/DRM display, Makefile target deployment'
      }
    ],
    preview: projectAsset('camera-architecture.svg'),
    visuals: [
      {
        src: projectAsset('camera-capture-simulated.svg'),
        caption: 'Simulated camera capture console based on the V4L2, mmap, framebuffer, and i.MX93 deployment code.'
      },
      {
        src: projectAsset('camera-detail.png'),
        caption: 'Real screenshot captured from the running portfolio CameraDemo project detail page.'
      },
      {
        src: projectAsset('camera-architecture.svg'),
        caption: 'CameraDemo architecture diagram based on the V4L2, mmap, framebuffer, and i.MX93 deployment code.'
      }
    ],
    tags: ['C', 'V4L2', 'Embedded Linux', 'i.MX93'],
    problem:
      'Provide a small native utility for verifying camera device capability, capture formats, mmap buffers, timestamps, display output, and target deployment.',
    architecture:
      'main.c opens /dev/video0, queries V4L2 capabilities and formats, configures capture, requests four mmap buffers, queues frames, streams data, and routes output toward framebuffer/DRM or optional file export; the Makefile cross-compiles and deploys to an i.MX93-style target.',
    deepDetails: [
      'The capture path uses V4L2 ioctl calls including VIDIOC_QUERYCAP, VIDIOC_ENUM_FMT, VIDIOC_S_FMT, VIDIOC_REQBUFS, VIDIOC_QUERYBUF, VIDIOC_QBUF, and VIDIOC_STREAMON.',
      'BUFFER_COUNT is set to 4, giving the application a four-buffer mmap capture path for frame acquisition.',
      'frame_data_t records frame pointer, size, index, geometry, and capture timestamp for downstream processing or display.',
      'buffer_t separates mmap buffer ownership from frame metadata, which keeps the capture layer flexible if frame processing, display, or file-output behavior grows.',
      'display_t tracks file descriptor, dimensions, bytes per pixel, line length, mapped framebuffer pointer, and cached framebuffer state for framebuffer or DRM-style output paths.',
      'The Makefile provides cross-compile, scp, ssh, run, clean, and debug workflows, with target IP, user, and path values overrideable from the command line.',
      'Expected failure modes are documented for missing /dev/video0, unsupported formats, insufficient buffers, mmap failure, missing framebuffer/DRM devices, SSH problems, and missing cross-compiler tools.',
      'The Makefile targets aarch64-linux-gnu-gcc and includes scp, ssh, run, and debug targets for embedded target iteration.'
    ],
    features: [
      'V4L2 capability query, format enumeration, format setting, buffer request, mmap mapping, queueing, and streaming.',
      'Framebuffer/DRM display configuration hooks for HDMI or local display output.',
      'Optional PNG/movie frame export hooks behind compile-time support.',
      'Four-buffer low-copy capture model using mmap for streaming camera data.',
      'Target override support for TARGET_IP, TARGET_USER, and TARGET_PATH during make run.',
      'Cross-compile and deploy workflow for embedded Linux target testing.'
    ],
    outcomes: [
      'Native C application includes a 4-buffer mmap V4L2 capture path.',
      'Makefile automates cross-compilation plus SCP/SSH deployment and target execution.',
      'Architecture documentation maps host build, target deployment, /dev/video0 capture, framebuffer/DRM display, optional frame files, validation sequence, and extension plan.',
      'Architecture diagram documents the /dev/video0 to framebuffer/DRM capture and display flow.'
    ],
    resumeBullets: [
      'Built a native C V4L2 camera capture demo with mmap buffers and framebuffer/DRM display integration hooks.',
      'Created Makefile targets for aarch64 cross-compilation, SCP deployment, SSH execution, and debug builds.',
      'Documented camera bring-up architecture for embedded Linux/i.MX93-style validation.'
    ],
    screenshotCaption:
      'CameraDemo case-study visuals include a simulated capture console, a running portfolio detail screenshot, and an architecture diagram derived from the C/V4L2 implementation.',
    suggestedContent: [
      'Capture real target terminal output from make run with /dev/video0 connected.',
      'Add a real frame or HDMI preview photo from the embedded target.',
      'Add a hardware setup photo showing camera, target board, display, and network connection.',
      'Add format/capability output for the tested camera module.'
    ]
  }
];

export default projects;
