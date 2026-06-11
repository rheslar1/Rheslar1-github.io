import embeddedSystemsProjects from './embeddedSystemsProjects';
import type { Project } from '../types';

const githubPreview = (repo: string) => `https://opengraph.githubassets.com/1/rheslar1/${repo}`;
const projectAsset = (name: string) => `${process.env.PUBLIC_URL}/assets/projects/${name}`;

const baseProjects: Project[] = [
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
    proofPoints: [
      {
        label: 'Separation Of Concerns',
        title: 'Small App, Real Boundaries',
        detail:
          'The command loop, user object, and CSV persistence are split into separate modules, proving the project can grow from a terminal exercise into a tested service without rewriting every layer.'
      },
      {
        label: 'Data Modeling',
        title: 'Persistence Contract Is Explicit',
        detail:
          'The CSV row shape, user-name comparison behavior, and ID handling make the storage contract visible, which is the first step toward replacing flat files with SQLite, MySQL, PostgreSQL, or a REST data source.'
      },
      {
        label: 'Maintainability',
        title: 'Upgrade Path Is Clear',
        detail:
          'The architecture notes call out validation, malformed rows, duplicate handling, and storage errors, showing the project is documented around practical hardening work rather than just happy-path execution.'
      }
    ],
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
    preview: projectAsset('study-workbench-actual.svg'),
    visuals: [
      {
        src: projectAsset('study-workbench-actual.svg'),
        caption: 'Actual study workbench showing CMake builds, static analysis, CI, and diagram review.'
      },
      {
        src: projectAsset('study-cpp-service-lifecycle.png'),
        caption: 'C++ service lifecycle diagram from the study repository.'
      },
      {
        src: projectAsset('study-diagram-raii-lifecycle.svg'),
        caption: 'RAII ownership and cleanup diagram from the C++ study notes.'
      },
      {
        src: projectAsset('study-diagram-strategy-formatting.svg'),
        caption: 'Strategy pattern diagram for interchangeable formatting behavior.'
      },
      {
        src: projectAsset('study-diagram-observer-event-flow.svg'),
        caption: 'Observer event-flow diagram showing publisher/subscriber separation.'
      },
      {
        src: projectAsset('study-diagram-factory-device.svg'),
        caption: 'Factory method diagram for selecting hardware/device implementations.'
      },
      {
        src: projectAsset('study-diagram-dependency-inversion.svg'),
        caption: 'Dependency inversion diagram showing interfaces between services and hardware.'
      },
      {
        src: projectAsset('study-diagram-lock-guard.svg'),
        caption: 'Lock-guard concurrency diagram for scoped mutex ownership.'
      },
      {
        src: projectAsset('study-diagram-startup-cleanup.svg'),
        caption: 'Startup and cleanup sequence diagram for deterministic service lifecycle.'
      },
      {
        src: projectAsset('study-diagram-sanitizer-analysis.svg'),
        caption: 'Sanitizer and static-analysis workflow diagram for C++ validation.'
      },
      {
        src: projectAsset('study-diagram-edge-service-architecture.svg'),
        caption: 'Modular edge-service architecture diagram tying configuration, logging, network probing, workers, and hardware I/O together.'
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
    proofPoints: [
      {
        label: 'C++ Discipline',
        title: 'Patterns Are Demonstrated In Code',
        detail:
          'The examples cover RAII, strategy, observer, factory, dependency inversion, lock guards, and lifecycle cleanup, proving the study material is tied to runnable C++ instead of being only written notes.'
      },
      {
        label: 'Quality System',
        title: 'Validation Is Part Of The Study',
        detail:
          'CMake, CTest, clang-tidy, cppcheck, CodeChecker, sanitizer smoke tests, and GitHub Actions form a repeatable verification path that mirrors professional embedded and systems workflows.'
      },
      {
        label: 'Architecture Literacy',
        title: 'Diagrams And Markdown Stay Connected',
        detail:
          'The UML images, draw.io sources, README files, and architecture documents create a traceable index from concepts to examples, which makes the repository useful as both a portfolio artifact and a reusable reference.'
      }
    ],
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
      'Actual study workbench summarizes the C++/CI workflow with CMake builds, static analysis, CI, and diagram review.',
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
        title: 'Architecture',
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
    proofPoints: [
      {
        label: 'AI Control Contract',
        title: 'State And Action Shape Are Deployment-Ready',
        detail:
          'The 116-state and 12-action contracts give the controller a stable interface across Python simulation, PPO training, ONNX export, and C++ deployment checks.'
      },
      {
        label: 'Simulation Depth',
        title: 'Policy Decisions Can Be Compared',
        detail:
          'The simulator keeps a rule-based baseline beside the PPO policy, making it possible to compare comfort, energy cost, demand response, battery behavior, and grid-aware decisions in representative scenarios.'
      },
      {
        label: 'Production Boundary',
        title: 'Research Code Has A Service Path',
        detail:
          'The architecture maps BEMS UI to Node API, Node API to the Python AI service over gRPC, and the AI service back to persisted optimization history, proving the model can be consumed by the BMS stack.'
      }
    ],
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
      'Architecture documentation maps the policy loop, forecasting, occupancy adjustment, digital twin, grid optimizer, simulation, ONNX export, and BMS service integration boundary.',
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
    id: 'neural-seizure-ai-analysis',
    title: 'Predictive AI Neural Seizure Analysis',
    summary: 'Synthetic embedded AI project for seizure-forecasting research with high-bandwidth neural sensors, BeagleBone EKG context, teacher/student distillation, C export, timing evidence, and safety review.',
    deployment:
      'Published as a standalone Python project with deterministic synthetic neural-signal generation, unit tests, demo CLI artifacts, and GitHub Actions CI.',
    dependencies: ['Python 3.12', 'Synthetic EEG/ECoG/iEEG', 'BeagleBone EKG/ECG', 'Linux IIO ADC', 'Goertzel Bandpower', 'CNN/LSTM/Transformer/GNN Proxies', 'Knowledge Distillation', 'C Export', 'Edge AI Budgeting', 'unittest', 'GitHub Actions'],
    repository: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis',
    repositoryLabel: 'View Project Repo',
    collection: 'embedded-systems',
    architectureDocs: [
      {
        title: 'Project Brief',
        path: 'docs/neural-seizure-ai-analysis.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/neural-seizure-ai-analysis.md',
        focus: 'Portfolio summary, code evidence, and clinical safety boundary'
      },
      {
        title: 'Project README',
        path: 'README.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/README.md',
        focus: 'Quick start, project boundary, runnable code, and documentation index'
      },
      {
        title: 'Architecture',
        path: 'docs/deep-architecture.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/docs/deep-architecture.md',
        focus: 'Sensor layer, synthetic data, preprocessing, features, teacher ensemble, distillation, edge budget, and safety case'
      },
      {
        title: 'Model Comparison',
        path: 'docs/model-comparison.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/docs/model-comparison.md',
        focus: 'CNN, LSTM, transformer, GNN, teacher ensemble, and distilled student model roles'
      },
      {
        title: 'Edge Inference Budget',
        path: 'docs/edge-inference-budget.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/docs/edge-inference-budget.md',
        focus: 'Memory, MAC, latency, and power estimates for teacher and student inference'
      },
      {
        title: 'Safety Review',
        path: 'docs/safety-review.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/docs/safety-review.md',
        focus: 'Research-only boundary, hazard register, validation gates, privacy, and human-review controls'
      },
      {
        title: 'BeagleBone EKG Integration',
        path: 'docs/beaglebone-ekg-integration.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/docs/beaglebone-ekg-integration.md',
        focus: 'ADC/IIO capture, EKG features, signal quality, and bounded multimodal fusion'
      },
      {
        title: 'Generated Evidence',
        path: 'docs/evidence/README.md',
        url: 'https://github.com/rheslar1/Predictive_AI_Neural-_Seizure_Analysis/blob/main/docs/evidence/README.md',
        focus: 'Trace screenshots, feature screenshots, CSV/JSON artifacts, C export, and timing report'
      },
      {
        title: 'IEEE 11031450 Implementation Evidence',
        path: 'neural-seizure-ai-analysis/docs/evidence/ieee-11031450-implementation-evidence.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/neural-seizure-ai-analysis/docs/evidence/ieee-11031450-implementation-evidence.md',
        focus: 'IEEE URL/PDF mapping, algorithm-to-code evidence, generated metrics, plots, tests, and clinical boundary'
      },
      {
        title: 'IEEE 11031450 Paper-To-Code Traceability',
        path: 'neural-seizure-ai-analysis/docs/ieee-11031450-paper-to-code-traceability.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/neural-seizure-ai-analysis/docs/ieee-11031450-paper-to-code-traceability.md',
        focus: 'Structured strategy map from IEEE Access review methods to Python modules, artifacts, validation, and future upgrade path'
      },
      {
        title: 'Artifact Schema Validation',
        path: 'neural-seizure-ai-analysis/docs/artifact-schema-validation.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/neural-seizure-ai-analysis/docs/artifact-schema-validation.md',
        focus: 'Dependency-free validation for generated demo-report JSON, neural feature CSV, and EKG feature CSV artifacts'
      },
      {
        title: 'Notebook Visualization',
        path: 'neural-seizure-ai-analysis/notebooks/neural-seizure-feature-visualization.ipynb',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/neural-seizure-ai-analysis/notebooks/neural-seizure-feature-visualization.ipynb',
        focus: 'Executable notebook for sample traces, HFO ratio, PAC proxy, connectivity curves, schema validation, and C export'
      }
    ],
    preview: projectAsset('neural-seizure-ai-pipeline.svg'),
    visuals: [
      {
        src: projectAsset('neural-seizure-ai-pipeline.svg'),
        caption: 'Architecture visual derived from the seizure prediction research paper: sensors, AI models, distillation, edge inference, and closed-loop review.'
      },
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/neural-seizure-ai-analysis/docs/evidence/synthetic-neural-ekg-traces.png',
        caption: 'Generated evidence plot: synthetic neural trace with auxiliary BeagleBone EKG/ECG context and pre-ictal/ictal markers.'
      },
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/neural-seizure-ai-analysis/docs/evidence/feature-trajectories.png',
        caption: 'Generated evidence plot: HFO ratio, PAC proxy, connectivity, and energy feature trajectories used by the teacher/student pipeline.'
      },
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/neural-seizure-ai-analysis/docs/evidence/biomarker-feature-curves.png',
        caption: 'Generated evidence plot: dedicated HFO ratio, PAC proxy, and connectivity curves over time.'
      },
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/neural-seizure-ai-analysis/docs/evidence/algorithm-coverage-map.png',
        caption: 'IEEE 11031450 evidence plot: algorithm coverage map linking review strategies to implemented sensing, features, model families, fusion, post-processing, and safety controls.'
      },
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/neural-seizure-ai-analysis/docs/evidence/time-frequency-image-map.png',
        caption: 'IEEE 11031450 evidence plot: time-frequency image representation for CNN-style and pretrained image-model review paths.'
      },
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/neural-seizure-ai-analysis/docs/evidence/risk-warning-timeline.png',
        caption: 'IEEE 11031450 evidence plot: teacher, student, EKG-fused risk, hysteresis threshold, SPH/SOH logic, and warning timing.'
      },
      {
        src: githubPreview('Predictive_AI_Neural-_Seizure_Analysis'),
        caption: 'GitHub repository preview for the standalone synthetic neural seizure AI implementation.'
      }
    ],
    tags: ['Embedded AI', 'Neural Sensors', 'BeagleBone', 'EKG/ECG', 'Python', 'Edge AI', 'Safety'],
    problem:
      'Explore how high-resolution neural data and predictive AI can identify pre-ictal seizure signatures earlier than conventional low-resolution monitoring workflows.',
    architecture:
      'The project maps a runnable Python pipeline from EEG, ECoG, iEEG, and microelectrode-array sensor profiles into synthetic neural samples, BeagleBone EKG context, preprocessing, bandpower/PAC/connectivity features, teacher ensemble probabilities, distilled edge inference, C export, timing evidence, metrics, and safety review.',
    proofPoints: [
      {
        label: 'Neural Signal Pipeline',
        title: 'Sensor Modalities Are Executable',
        detail:
          'The code defines EEG, ECoG, iEEG, and microelectrode-array profiles with different channel counts, sample rates, noise, and HFO gain so model behavior is grounded in sensor tradeoffs.'
      },
      {
        label: 'AI Architecture Review',
        title: 'Teacher Models Match Signal Structure',
        detail:
          'CNN, LSTM, transformer, and graph-neural-network style teacher heuristics map to time-frequency patterns, temporal progression, attention-like strongest biomarkers, and electrode connectivity.'
      },
      {
        label: 'Embedded AI Boundary',
        title: 'Distilled Student Targets Edge Review',
        detail:
          'The teacher ensemble trains a compact logistic student and reports memory, MAC, latency, and power estimates so the edge deployment conversation is backed by runnable evidence.'
      }
    ],
    deepDetails: [
      'The source paper frames seizure prediction around pre-ictal biomarkers that may be difficult to detect through conventional EEG analysis alone.',
      'The IEEE 11031450 traceability layer maps the IEEE Access review URL, DOI 10.1109/ACCESS.2025.3578991, and the locally extracted PDF to runnable Python modules, generated evidence artifacts, verification tests, and explicit safety boundaries.',
      'High-bandwidth neural sensing is described across EEG, ECoG, iEEG, and microelectrode arrays, each with different tradeoffs in safety, signal fidelity, invasiveness, and spatial precision.',
      'Candidate features are implemented as energy, line length, zero-crossing rate, delta/theta/alpha/beta/gamma/HFO bandpower, HFO ratios, PAC proxy, channel connectivity, and spatial concentration.',
      'The CNN-style teacher scores localized time-frequency activity; the LSTM-style teacher accumulates temporal risk; the transformer-style teacher acts as a strongest-biomarker attention proxy; the GNN-style teacher scores connectivity and spatial concentration.',
      'Knowledge distillation trains a threshold-calibrated logistic student from teacher probabilities, producing feature names, weights, bias, final loss, and decision threshold for review.',
      'The CLI writes demo-report.json, window-features.csv, bbb-ekg-features.csv, SVG/PNG plots, distilled_student.c/.h, and timing reports so the project has inspectable artifacts beyond Markdown.',
      'Artifact schema validation checks report keys, CSV columns, non-empty rows, non-empty cells, and time-window ordering before JSON/CSV outputs are accepted as evidence.',
      'The visualization notebook reruns the demo, validates artifacts, exports the C student, writes timing evidence, and displays synthetic traces plus dedicated HFO/PAC/connectivity curves.',
      'Feature reducers can use optional NumPy acceleration when available while preserving the dependency-free pure-Python fallback for embedded and review environments.',
      'Unit tests cover synthetic label generation, biomarker extraction, BeagleBone ADC conversion, EKG feature extraction, dataset provenance guardrails, C export, timing evidence, and end-to-end teacher/student evaluation.',
      'GitHub Actions runs the unit tests, demo CLI, and artifact validation in the standalone project repo.',
      'Closed-loop neuromodulation remains a documented review boundary only; the code does not authorize stimulation, medication, diagnosis, or patient monitoring.',
      'The project explicitly calls out privacy, neural data security, interpretability, false-positive and false-negative risk, informed consent, limited datasets, patient variability, and hardware constraints.'
    ],
    features: [
      'Synthetic high-bandwidth neural signal generator with EEG, ECoG, iEEG, and microelectrode-array profiles.',
      'Preprocessing pipeline for baseline removal, channel normalization, and labeled windowing.',
      'Feature extraction for HFO ratio, PAC proxy, line length, bandpower, connectivity, and spatial concentration.',
      'Teacher ensemble with CNN, LSTM, transformer, and GNN-inspired risk models.',
      'Distilled edge student with calibrated decision threshold and inspectable weights.',
      'BeagleBone IIO ADC EKG capture path with signal quality, heart rate, HRV, and bounded fusion.',
      'Public-dataset adapter with de-identification, citation, license, source, and patient-split guardrails.',
      'Paper-to-code traceability module that renders the IEEE source, DOI, strategy map, evidence artifact list, verification checks, safety boundary, and future upgrade path.',
      'Notebook visualization for sample traces plus HFO ratio, PAC proxy, and connectivity curves.',
      'Dependency-free schema validation for generated JSON and CSV artifacts.',
      'Optional NumPy acceleration path with pure-Python fallback.',
      'Evaluation metrics, edge inference budget, C export, timing evidence, safety case, CLI artifacts, tests, and GitHub Actions CI.'
    ],
    outcomes: [
      'Converted a full research paper into a standalone Python project with runnable signal generation, preprocessing, feature extraction, model comparison, distillation, edge budgeting, and safety review.',
      'Connected computational neuroscience concepts to embedded AI deployment concerns such as latency, power, model size, calibrated thresholds, and edge inference.',
      'Added deep documentation for architecture, pipeline contract, model comparison, BeagleBone EKG integration, dataset provenance, C export, edge budget, safety, validation, generated evidence, and implementation roadmap.',
      'Added IEEE 11031450 implementation evidence that links the IEEE Access review, extracted PDF, algorithms, code modules, generated images, tests, and future upgrade path.',
      'Added a notebook visualization, dedicated biomarker curve plot, JSON/CSV schema validation, and optional NumPy acceleration boundary.',
      'Added unit tests and CI workflow so the project can be validated independently of the portfolio site.',
      'Preserved the project as a research architecture artifact rather than representing it as a deployed clinical medical device.'
    ],
    resumeBullets: [
      'Authored research architecture for predictive AI seizure analysis using high-bandwidth neural sensing and deep learning model families.',
      'Mapped CNN, LSTM, transformer, and graph neural network approaches to neural time-series and spatial-connectivity data.',
      'Evaluated edge AI deployment concerns including knowledge distillation, latency, power, safety, privacy, and closed-loop review constraints.'
    ],
    screenshotCaption:
      'Pipeline visual summarizes the project architecture and is now backed by a standalone Python implementation. The artifact is a research and engineering demo, not a clinical system.',
    suggestedContent: [
      'Replace synthetic data with approved public datasets.',
      'Add PyTorch dataset and dataloader boundaries.',
      'Train CNN/LSTM/transformer/GNN baselines against the same WindowFeatures contract or raw windows.',
      'Export a trained student to ONNX or C for embedded inference.',
      'Add calibration, uncertainty, and patient-specific thresholding.',
      'Run the timing evidence on real BeagleBone hardware and commit the target report.',
      'Add a fixed-point student inference path for MCU-class targets.',
      'Add notebook execution output snapshots after the next evidence refresh.'
    ]
  },
  {
    id: 'beaglebone-ad8232-ekg-driver',
    title: 'BeagleBone AD8232 EKG ADC Driver',
    summary: 'Python BeagleBone Black driver for the AD8232 Single-Lead Heart Rate Monitor using Linux IIO ADC reads, protective divider scaling, optional LO+/LO- lead-off GPIOs, filtering, heart-rate extraction, simulation, and waveform evidence.',
    deployment:
      'Runs as a Python CLI on BeagleBone Black or in deterministic simulator mode; writes CSV waveform captures, JSON heart-rate reports, and SVG/PNG evidence for documentation review.',
    dependencies: ['Python 3.10+', 'BeagleBone Black', 'AD8232 Single-Lead Heart Rate Monitor', 'Linux IIO ADC', 'AIN0..AIN6', 'Optional GPIO LO+/LO-', 'unittest', 'Headless Chrome screenshots'],
    repository: 'https://github.com/rheslar1/Rheslar1-github.io/tree/main/beaglebone-ad8232-ekg-driver',
    repositoryLabel: 'View Driver Source',
    collection: 'embedded-systems',
    architectureDocs: [
      {
        title: 'Driver README',
        path: 'beaglebone-ad8232-ekg-driver/README.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/beaglebone-ad8232-ekg-driver/README.md',
        focus: 'Quick start, simulator, BeagleBone live capture, outputs, and safety boundary'
      },
      {
        title: 'Driver Architecture',
        path: 'beaglebone-ad8232-ekg-driver/ARCHITECTURE.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/beaglebone-ad8232-ekg-driver/ARCHITECTURE.md',
        focus: 'Config, IIO reader, simulator, filters, heart-rate analysis, recorder, plot evidence, and CLI flow'
      },
      {
        title: 'Wiring Notes',
        path: 'beaglebone-ad8232-ekg-driver/docs/wiring.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/beaglebone-ad8232-ekg-driver/docs/wiring.md',
        focus: 'AD8232 OUT to protected BeagleBone AIN path, 1.8V ADC limit, divider ratio, and lead-off pins'
      },
      {
        title: 'Schematic',
        path: 'beaglebone-ad8232-ekg-driver/docs/schematics/ad8232-beaglebone-wiring.svg',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/beaglebone-ad8232-ekg-driver/docs/schematics/ad8232-beaglebone-wiring.svg',
        focus: 'AD8232 to BeagleBone Black wiring, lead-off pins, divider protection, and ADC safety boundary'
      },
      {
        title: 'Generated Evidence',
        path: 'beaglebone-ad8232-ekg-driver/docs/evidence/README.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/beaglebone-ad8232-ekg-driver/docs/evidence/README.md',
        focus: 'Synthetic capture CSV, report JSON, waveform SVG, and PNG screenshot provenance'
      }
    ],
    preview: githubPreview('Rheslar1-github.io'),
    visuals: [
      {
        src: 'https://raw.githubusercontent.com/rheslar1/Rheslar1-github.io/main/beaglebone-ad8232-ekg-driver/docs/evidence/ad8232-waveform.png',
        caption: 'Simulated AD8232 waveform evidence generated by the Python BeagleBone ADC driver.'
      },
      {
        src: githubPreview('Rheslar1-github.io'),
        caption: 'Portfolio repository preview containing the BeagleBone AD8232 EKG ADC driver source and docs.'
      }
    ],
    tags: ['BeagleBone Black', 'AD8232', 'EKG/ECG', 'ADC', 'Linux IIO', 'Python', 'Heart Rate'],
    problem:
      'Build a reviewable embedded Linux acquisition path for an AD8232 single-lead heart-rate breakout connected to a BeagleBone Black ADC input, including scaling, lead-off status, filtering, heart-rate extraction, and evidence artifacts.',
    architecture:
      'The driver starts with an Ad8232Config for AIN channel, Linux IIO device, ADC scale, divider ratio, and optional LO+/LO- GPIO value files. A BeagleBoneIioReader or deterministic simulator produces samples that flow through baseline removal, smoothing, R-peak detection, heart-rate/HRV analysis, CSV/JSON recording, and dependency-free SVG plotting.',
    proofPoints: [
      {
        label: 'Hardware Boundary',
        title: 'BBB ADC Limits Are Modeled',
        detail:
          'The driver treats BeagleBone AIN pins as 1.8V-limited ADC inputs and uses an explicit divider ratio to reconstruct AD8232-side millivolts after the protected analog front end.'
      },
      {
        label: 'Runnable Evidence',
        title: 'Simulation Produces Review Artifacts',
        detail:
          'The simulator generates repeatable EKG-style samples, CSV captures, heart-rate JSON reports, and SVG/PNG waveform evidence without needing hardware on the CI runner.'
      },
      {
        label: 'Lead-Off Handling',
        title: 'Sensor Status Has Its Own Channel',
        detail:
          'Optional LO+/LO- GPIO value paths are tracked independently from the analog waveform so lead-off status can lower signal quality without pretending to be a clinical interpretation.'
      }
    ],
    deepDetails: [
      'Ad8232Config centralizes analog channel selection, Linux IIO device path, ADC reference, ADC counts, protective divider ratio, sample rate, and optional LO+/LO- GPIO value paths.',
      'BeagleBoneIioReader reads `/sys/bus/iio/devices/iio:device0/in_voltageN_raw` and uses `in_voltageN_scale` when present, falling back to reference-voltage math when the kernel scale file is absent.',
      'The default divider ratio of 1.8333333333 maps a protected 1.8V BeagleBone ADC-side range back to an approximate 3.3V AD8232-side range for reporting.',
      'SimulatedAd8232Reader creates a deterministic single-lead waveform with baseline wander, P wave, QRS complex, T wave, changing heart-rate phase, and light noise for repeatable tests.',
      'Filtering removes baseline drift with a long moving average, then smooths the signal with a short moving average before R-peak detection.',
      'Heart-rate analysis reports sample count, peak count, BPM, RR standard deviation, RMSSD, lead-off fraction, and a bounded signal-quality score.',
      'The CLI supports live BeagleBone capture, simulation, AIN channel selection, custom IIO device paths, divider-ratio overrides, lead-off value files, CSV/JSON output, and SVG plot generation.',
      'Docs cover wiring, 1.8V ADC protection, safety boundaries, validation steps, generated evidence provenance, and hardware evidence still needed for live board review.',
      'Unit tests cover ADC conversion, lead-off GPIO handling, simulated capture, heart-rate evidence, report writing, and SVG waveform generation.'
    ],
    features: [
      'BeagleBone Linux IIO ADC reader for AD8232 OUT on AIN0 through AIN6.',
      'Protective divider scaling for 3.3V AD8232 output into the BBB 1.8V ADC range.',
      'Optional LO+/LO- GPIO value-file support for lead-off status.',
      'Deterministic simulator for CI, screenshots, and documentation evidence.',
      'Baseline removal, smoothing, R-peak detection, heart-rate estimate, HRV metrics, lead-off fraction, and signal-quality scoring.',
      'CSV capture writer, JSON report writer, dependency-free SVG waveform plotter, and PNG screenshot generation path.',
      'Safety notes that keep the project framed as engineering evidence, not a medical device or patient monitor.'
    ],
    outcomes: [
      'Created a standalone Python driver package under the portfolio repository with source modules, docs, tests, simulator, CLI, and evidence artifacts.',
      'Made the AD8232/BeagleBone ADC electrical boundary explicit, including the BBB 1.8V ADC limit and the default 1.8333333333 reconstruction ratio.',
      'Produced repeatable synthetic waveform evidence so the project can be demonstrated without live patient-connected hardware.',
      'Provided a path for future live BeagleBone evidence using board revision, ADC channel, divider values, lead-off wiring, and timing/capture logs.'
    ],
    resumeBullets: [
      'Built a Python BeagleBone Black acquisition driver for an AD8232 single-lead heart-rate monitor using Linux IIO ADC files.',
      'Implemented ADC scaling, lead-off status handling, signal filtering, R-peak detection, heart-rate metrics, and evidence artifact generation.',
      'Documented embedded hardware safety boundaries including 1.8V ADC protection and non-clinical project scope.'
    ],
    screenshotCaption:
      'Simulated waveform evidence shows the AD8232-to-BeagleBone ADC acquisition path, filtered R-peak view, heart-rate estimate, signal quality, and lead-off fraction.',
    suggestedContent: [
      'Capture a live BeagleBone run with board revision, ADC channel, divider values, and oscilloscope notes.',
      'Add a systemd service example for long-running local waveform logging.',
      'Add hardware-in-the-loop timing evidence from the BeagleBone under load.',
      'Create a dedicated GitHub repository if the driver should be published outside the portfolio repo.'
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
      },
      {
        title: 'Final Design Suggestions',
        path: 'docs/final-design-documentation-suggestions.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/final-design-documentation-suggestions.md',
        focus: 'Portfolio-wide and project-specific final design documentation, evidence, screenshots, and validation content'
      },
      {
        title: 'Project Simulation Evidence',
        path: 'docs/project-simulations/README.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/project-simulations/README.md',
        focus: 'Generated JSON, SVG, and PNG simulation evidence for every portfolio project'
      },
      {
        title: 'Screenshot Matrix',
        path: 'docs/portfolio-screenshot-matrix.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/portfolio-screenshot-matrix.md',
        focus: 'Desktop/mobile screenshots, BMS login redirect captures, dashboard captures, and simulation screenshot set'
      },
      {
        title: 'Accessibility Report',
        path: 'docs/portfolio-accessibility-keyboard-report.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/portfolio-accessibility-keyboard-report.md',
        focus: 'Keyboard navigation and accessibility review for portfolio and dashboard routes'
      },
      {
        title: 'Performance Summary',
        path: 'docs/portfolio-performance-summary.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/portfolio-performance-summary.md',
        focus: 'Lighthouse performance, accessibility, best-practices, SEO, and known PWA score'
      },
      {
        title: 'GitHub Pages Runbook',
        path: 'docs/github-pages-deployment-runbook.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/github-pages-deployment-runbook.md',
        focus: 'Actions workflow, branch strategy, cache behavior, deployment commands, and rollback notes'
      },
      {
        title: 'Content Governance',
        path: 'docs/content-governance.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/content-governance.md',
        focus: 'How project data feeds portfolio UI, documentation links, and simulation evidence generation'
      },
      {
        title: 'Asset Provenance',
        path: 'docs/asset-provenance.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/asset-provenance.md',
        focus: 'Profile photo, generated screenshots, diagrams, schematics, simulations, and repository previews'
      },
      {
        title: 'Suggested Updates',
        path: 'docs/portfolio-suggested-updates.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/portfolio-suggested-updates.md',
        focus: 'Prioritized implementation backlog for portfolio, BEMS, neural AI, AD8232, and embedded projects'
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
    proofPoints: [
      {
        label: 'Communication System',
        title: 'Projects Become Case Studies',
        detail:
          'The portfolio turns raw repositories into structured case studies with problem statements, architecture, deployment model, evidence, outcomes, stack matrix, resume bullets, and documentation links.'
      },
      {
        label: 'Static Deployment',
        title: 'GitHub Pages Constraints Are Handled',
        detail:
          'Hash routing, React build output, static assets, and GitHub Actions deployment are aligned so deep project links work on a static host without a custom server.'
      },
      {
        label: 'Data-Driven UI',
        title: 'One Project Catalog Drives Multiple Views',
        detail:
          'The same project data powers dashboard cards, detail pages, architecture-document links, visual galleries, evidence backlog, and resume-ready highlights, reducing drift between portfolio sections.'
      }
    ],
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
      'Project catalog now carries architecture and implementation details for every showcased repository.',
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
    id: 'bms-portfolio-dashboard',
    aliases: ['bms-portfolio', 'bms-dashboard-portfolio'],
    title: 'BMS Portfolio Dashboard',
    summary: 'Live BMS portfolio dashboard page hosted through GitHub Pages for the Building Management System project.',
    deployment:
      'Published as a GitHub Pages dashboard route at https://rheslar1.github.io/BMS/portfolio for direct portfolio review of the BMS work.',
    dependencies: ['BMS', 'React', 'GitHub Pages', 'Dashboard UI', 'Building Operations'],
    repository: 'https://github.com/rheslar1/BMS',
    liveUrl: 'https://rheslar1.github.io/BMS/portfolio',
    liveLabel: 'Open Live BMS Portfolio',
    architectureDocs: [
      {
        title: 'BMS Repository',
        path: 'BMS project source',
        url: 'https://github.com/rheslar1/BMS',
        focus: 'BMS portfolio dashboard, enterprise BMS source, dashboard evidence, and project review'
      },
      {
        title: 'BMS Portfolio Page Package',
        path: 'docs/bms-portfolio-page/README.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bms-portfolio-page/README.md',
        focus: 'Static portfolio/index.html package, GitHub Pages publish path, visual assets, and verification commands'
      }
    ],
    preview: projectAsset('bms-dashboard-simulated.svg'),
    visuals: [
      {
        src: projectAsset('bms-dashboard-simulated.svg'),
        caption: 'BMS portfolio dashboard visual used as the live project preview.'
      },
      {
        src: projectAsset('bems-energy-heat-map.svg'),
        caption: 'Building energy heat map visual that supports the BMS dashboard portfolio story.'
      },
      {
        src: projectAsset('bms-detail.png'),
        caption: 'Portfolio BMS project detail screenshot used as supporting dashboard evidence.'
      }
    ],
    tags: ['BMS', 'Dashboard', 'GitHub Pages', 'Portfolio'],
    problem:
      'Provide a direct public portfolio dashboard entry for the BMS project so reviewers can jump straight from the portfolio catalog into the hosted BMS dashboard work.',
    architecture:
      'A GitHub Pages-hosted BMS portfolio route connected to the BMS repository and represented as a dedicated project card in this React portfolio catalog.',
    proofPoints: [
      {
        label: 'Live Evidence',
        title: 'Hosted BMS Work Is Directly Accessible',
        detail:
          'The project entry exposes the BMS portfolio route as a live review target instead of requiring reviewers to infer the dashboard from repository links alone.'
      },
      {
        label: 'Dashboard Focus',
        title: 'Operations UI Is The Primary Artifact',
        detail:
          'The portfolio entry is framed around the BMS dashboard experience, including building operations, energy status, and portfolio evidence visuals.'
      },
      {
        label: 'Portfolio Integration',
        title: 'BMS Link Appears In The Project Catalog',
        detail:
          'The same project data model now carries the BMS hosted portfolio route into project cards, detail pages, and dashboard evidence shortcuts.'
      }
    ],
    deepDetails: [
      'The live route is tracked exactly as https://rheslar1.github.io/BMS/portfolio.',
      'A static page package now exists at public/BMS/portfolio/index.html so the page can be copied to the BMS repository as portfolio/index.html for direct GitHub Pages hosting.',
      'The companion documentation at docs/bms-portfolio-page/README.md explains purpose, content structure, publish path, assets, deep docs, screenshots, and verification commands.',
      'The project links back to the BMS source repository for implementation context.',
      'The portfolio entry uses existing BMS dashboard and heat-map visuals to keep the project catalog consistent with the broader BMS case study.',
      'The project is intentionally dashboard-focused so it can sit beside repository-centered projects as a hosted review artifact.',
      'The entry supports reviewers who want to evaluate the BMS portfolio route without navigating through the full BMS case-study page first.'
    ],
    features: [
      'Dedicated portfolio card for the hosted BMS dashboard route.',
      'Standalone static HTML/CSS/JavaScript page package for the BMS GitHub Pages portfolio route.',
      'Documentation page covering deployment shape, visual assets, deep docs, screenshot generation, and verification commands.',
      'Direct live-project link from project detail pages.',
      'BMS repository link retained for source review.',
      'Dashboard and energy heat-map visuals attached as supporting evidence.'
    ],
    outcomes: [
      'The hosted BMS portfolio route is now represented as a portfolio project.',
      'The deployable page package is available in this repository for publication from the BMS Pages source.',
      'The project catalog can route reviewers from the main portfolio into the live BMS dashboard work.',
      'Dashboard evidence shortcuts can surface the BMS portfolio project alongside repository case studies.'
    ],
    resumeBullets: [
      'Published and linked a live BMS portfolio dashboard route for public project review.',
      'Connected hosted dashboard evidence to a React portfolio project catalog.',
      'Presented BMS dashboard work as both a live page and a source-backed case study.'
    ],
    screenshotCaption:
      'BMS portfolio dashboard entry uses existing BMS dashboard visuals and links to the live GitHub Pages portfolio route.',
    suggestedContent: [
      'Capture a fresh screenshot from https://rheslar1.github.io/BMS/portfolio once the route is serving the final page.',
      'Add a deployment or Pages screenshot for the BMS repository.',
      'Add mobile and desktop captures of the hosted BMS portfolio dashboard.'
    ]
  },
  {
    id: 'energybuildai-qt-dashboard',
    aliases: ['qt-dashboard', 'qt-bms-dashboard', 'digi-connectcore-qt-dashboard'],
    title: 'EnergyBuildAI Qt Dashboard',
    summary: 'Qt Quick BMS dashboard for Digi ConnectCore-class EVKs with alarm acknowledgement, active-alarm clearing, CMake, systemd, and Yocto packaging.',
    deployment:
      'Built as a Qt 6/CMake application for ARM64 Yocto targets. The package includes a systemd kiosk service and a Yocto recipe starter for Digi Embedded Yocto style deployments.',
    dependencies: ['Qt 6', 'Qt Quick', 'QML', 'C++17', 'CMake', 'Digi ConnectCore', 'i.MX94 EVK', 'i.MX95', 'Yocto', 'systemd'],
    repository: 'https://github.com/rheslar1/energybuildai-qt-dashboard',
    repositoryLabel: 'View Qt Dashboard Repo',
    architectureDocs: [
      {
        title: 'Qt Dashboard README',
        path: 'README.md',
        url: 'https://github.com/rheslar1/energybuildai-qt-dashboard/blob/main/README.md',
        focus: 'Qt Quick dashboard purpose, Digi/NXP target notes, build steps, EVK install, service behavior, and Yocto recipe use'
      },
      {
        title: 'Qt Project Mirror',
        path: 'qt/energybuildai-dashboard/README.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/qt/energybuildai-dashboard/README.md',
        focus: 'Portfolio-tracked mirror of the Qt dashboard source package'
      },
      {
        title: 'Yocto Recipe Starter',
        path: 'yocto/energybuildai-dashboard_git.bb',
        url: 'https://github.com/rheslar1/energybuildai-qt-dashboard/blob/main/yocto/energybuildai-dashboard_git.bb',
        focus: 'cmake_qt6 recipe, Qt runtime dependencies, systemd unit installation, and pinned SRCREV guidance'
      }
    ],
    preview: projectAsset('bms-dashboard-simulated.svg'),
    visuals: [
      {
        src: projectAsset('bms-dashboard-simulated.svg'),
        caption: 'Qt dashboard mirrors the BMS operations layout, alarm KPIs, and EnergyBuildAI operator workflow.'
      },
      {
        src: projectAsset('bems-energy-heat-map.svg'),
        caption: 'Building energy status visual used as the Qt dashboard overview model.'
      },
      {
        src: projectAsset('bms-uml-layers.png'),
        caption: 'BEMS layer diagram showing where the Qt kiosk UI fits beside web UI, API, edge, and database layers.'
      }
    ],
    tags: ['Qt 6', 'QML', 'Digi ConnectCore', 'Yocto', 'C++17', 'BMS'],
    problem:
      'Provide an embedded-native BMS operator console that can run on a Digi ConnectCore-class EVK without depending on a browser-hosted React dashboard.',
    architecture:
      'A Qt Quick application uses a small C++17 entry point, QML components for KPI cards and alarm tickets, local ListModel state for seeded alarms, CMake build metadata, a systemd service, and a Yocto recipe starter for image integration.',
    proofPoints: [
      {
        label: 'Embedded UI',
        title: 'Qt Version Mirrors The Dashboard Workflow',
        detail:
          'The app carries the same active-alarm KPI, alarm queue, selected alarm detail, and separate acknowledgement page behavior into a native Qt Quick interface.'
      },
      {
        label: 'EVK Deployment',
        title: 'CMake, systemd, And Yocto Are Included',
        detail:
          'The project is structured for ARM64 Yocto cross-builds, appliance-style startup through systemd, and recipe integration into a custom Digi Embedded Yocto layer.'
      },
      {
        label: 'Alarm Behavior',
        title: 'Active Alarms Clear From The Queue',
        detail:
          'Clicking the active ALM-1042 queue ticket or using the acknowledge page changes the event to Acknowledged and reduces the Active alarms KPI to zero.'
      }
    ],
    deepDetails: [
      'CMakeLists.txt requires Qt 6.5 or newer and links Qt Quick plus Qt Quick Controls 2.',
      'src/main.cpp initializes QGuiApplication, applies the Fusion controls style, and loads the EnergyBuildAI QML module.',
      'qml/Main.qml defines the dashboard shell, sidebar navigation, KPI strip, overview panel, alarm details page, and alarm acknowledgement page.',
      'qml/components/KpiCard.qml, AlarmTicket.qml, and StatusBadge.qml keep repeated dashboard controls small and reusable.',
      'The alarm ListModel seeds ALM-1042, ALM-1038, and ALM-1029 with status, priority, location, owner, SLA, reading, and trend metadata.',
      'The queue click handler acknowledges active events immediately so the dashboard count reflects operator action.',
      'packaging/energybuildai-dashboard.service starts the Qt app under graphical.target and defaults QT_QPA_PLATFORM to wayland.',
      'yocto/energybuildai-dashboard_git.bb provides a cmake_qt6 recipe starter with Qt declarative and Quick Controls runtime dependencies.'
    ],
    features: [
      'Native Qt Quick dashboard shell with portfolio header, BMS sidebar, KPI cards, and alarm pages.',
      'Touch-friendly alarm acknowledgement flow for EVK kiosk displays.',
      'Status-based red alarm card styling that disappears after acknowledgement.',
      'Qt 6/CMake source structure suitable for desktop build and ARM64 Yocto cross-build.',
      'systemd unit for boot-to-dashboard deployment.',
      'Yocto recipe starter for adding the app to a Digi Embedded Yocto image or custom layer.'
    ],
    outcomes: [
      'Standalone GitHub repository target is wired to https://github.com/rheslar1/energybuildai-qt-dashboard.',
      'Portfolio mirror source exists under qt/energybuildai-dashboard for review with this site.',
      'The Qt app implements the active-alarm acknowledgement behavior requested for the dashboard.',
      'Build, EVK install, platform plugin, and Yocto recipe notes are documented in the project README.'
    ],
    resumeBullets: [
      'Built a Qt Quick/C++17 BMS dashboard for Digi ConnectCore-class ARM64 Yocto EVK deployment.',
      'Implemented native alarm acknowledgement flow with active alarm clearing and kiosk-ready systemd packaging.',
      'Prepared CMake and Yocto recipe assets for embedded Linux image integration.'
    ],
    screenshotCaption:
      'Qt project currently reuses BMS dashboard portfolio visuals until a target EVK or desktop Qt runtime screenshot is captured.',
    suggestedContent: [
      'Capture a desktop Qt runtime screenshot after installing Qt 6.5+ locally.',
      'Capture an EVK LCD photo after cross-building with the Digi/NXP Yocto SDK.',
      'Pin the Yocto recipe SRCREV after the first standalone repo commit.',
      'Add a boot log showing systemd launching energybuildai-dashboard on the target.'
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
        title: 'Architecture',
        path: 'BEMS_ENTERPRISE_COMPLETE/repo/docs/deep-architecture.md',
        url: 'https://github.com/rheslar1/BMS/blob/bems/BEMS_ENTERPRISE_COMPLETE/repo/docs/deep-architecture.md',
        focus: 'BEMS-ai integration, service contracts, telemetry flow, deployment evidence model'
      },
      {
        title: 'EnergyBuildAI Schedule Details',
        path: 'docs/energybuildai-schedule-details.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/energybuildai-schedule-details.md',
        focus: 'Schedule route, building-zone-floor-room schedule rows, override rules, dampers, motors, fans, and final screenshot evidence'
      },
      {
        title: 'BEMS Final Content Index',
        path: 'docs/bems-final-content/README.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bems-final-content/README.md',
        focus: 'Final BEMS evidence package covering API, database, edge, AI, alarms, energy, deployment, operations, and CI'
      },
      {
        title: 'API Contract',
        path: 'docs/bems-final-content/api-contract.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bems-final-content/api-contract.md',
        focus: 'Endpoint table for auth, building hierarchy, telemetry, schedules, alarms, AI, edge, reports, and health'
      },
      {
        title: 'Database ERD And Seed Data',
        path: 'docs/bems-final-content/database-erd-seed-data.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bems-final-content/database-erd-seed-data.md',
        focus: 'ERD and seeded-data explanation for buildings, rooms, sensors, events, schedules, alarms, and energy records'
      },
      {
        title: 'MySQL Backup Runbook',
        path: 'docs/bems-final-content/mysql-backup-runbook.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bems-final-content/mysql-backup-runbook.md',
        focus: 'mysqldump backup, restore, checksum, retention, Docker Compose fallback, and cron workflow for dashboard MySQL data'
      },
      {
        title: 'Operator Manual',
        path: 'docs/bems-final-content/operator-manual.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bems-final-content/operator-manual.md',
        focus: 'Recurring login, building, room, alarm, Schedule Details, reports, and system-health workflows'
      },
      {
        title: 'CI And Deployment Evidence',
        path: 'docs/bems-final-content/ci-deployment-evidence.md',
        url: 'https://github.com/rheslar1/Rheslar1-github.io/blob/main/docs/bems-final-content/ci-deployment-evidence.md',
        focus: 'Build commands, artifacts, GitHub Pages URL, Docker stack evidence, and known warnings'
      }
    ],
    loginRoute: '#dashboard',
    loginLabel: 'BEMS Dashboard',
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
    proofPoints: [
      {
        label: 'Enterprise Architecture',
        title: 'Full Stack And Edge Are Connected',
        detail:
          'The project proves an end-to-end BEMS shape: React/Vite dashboard, Node/Express API, MySQL data model, BEMS-ai optimization service, C++ edge core, Docker runtime, observability services, and Yocto packaging.'
      },
      {
        label: 'Runtime Evidence',
        title: 'The Stack Runs As Services',
        detail:
          'The Docker deployment brings up UI, API, AI service, edge-core, MySQL, Kafka, RabbitMQ, Prometheus, Grafana, Alertmanager, and Watchtower together with health checks instead of describing an architecture that only exists on paper.'
      },
      {
        label: 'Operator Workflow',
        title: 'Dashboard Maps Building To Control Decisions',
        detail:
          'The dashboard shows building hierarchy, floors, rooms, zones, devices, telemetry values, alarms, schedules, digital twin status, heat colors, and optimization recommendations from seeded MySQL-backed data.'
      },
      {
        label: 'AI Integration',
        title: 'BEMS-ai Is A Real Optimization Layer',
        detail:
          'The BMS API treats BEMS-ai as a service boundary for optimization and recommendation workflows, then persists results so operators can review projected savings, actions, and control history.'
      }
    ],
    databaseDetails: {
      title: 'BEMS MySQL Schema And Seeded Runtime Data',
      summary:
        'The BEMS stack uses a MySQL database named bems as the system of record for tenants, sites, buildings, floors, rooms, zones, BACnet devices, users, roles, sessions, schedules, alarms, trends, optimization history, reports, maintenance, and firmware workflows.',
      quickFacts: [
        { label: 'Engine', value: 'MySQL 8', helper: 'Docker service db' },
        { label: 'Database', value: 'bems', helper: 'MYSQL_DATABASE' },
        { label: 'Driver', value: 'mysql2', helper: 'Node API persistence adapter' },
        { label: 'Login', value: 'admin / admin', helper: 'seeded username and password' },
        { label: 'Schema Files', value: '2', helper: 'database/schema.sql and docker/init/schema.sql' },
        { label: 'Core Tables', value: '30+', helper: 'tenant, device, trend, auth, report, maintenance' }
      ],
      access: [
        { label: 'Docker service', value: 'db' },
        { label: 'Container port', value: '3306' },
        { label: 'Root password', value: 'root' },
        { label: 'Database name', value: 'bems' },
        { label: 'Seed credential', value: 'admin / admin' },
        { label: 'Schema path', value: 'BEMS_ENTERPRISE_COMPLETE/repo/database/schema.sql' },
        { label: 'Docker init path', value: 'BEMS_ENTERPRISE_COMPLETE/repo/docker/init/schema.sql' }
      ],
      tableGroups: [
        {
          label: 'Tenant And Access',
          tables: ['organizations', 'sites', 'roles', 'users', 'user_sessions', 'audit_events', 'feature_flags']
        },
        {
          label: 'Building Model',
          tables: ['buildings', 'floors', 'rooms', 'zones', 'devices']
        },
        {
          label: 'Operations',
          tables: ['alarms', 'alarm_logs', 'notification_outbox', 'schedules', 'holiday_schedules', 'special_events']
        },
        {
          label: 'Telemetry And AI',
          tables: ['trend_logs', 'analytics_events', 'building_optimization_runs', 'rl_q_values', 'optimization_history', 'fdd_findings']
        },
        {
          label: 'Deployment And Service',
          tables: ['firmware_artifacts', 'firmware_update_jobs', 'maintenance_tickets', 'maintenance_modes', 'report_schedules', 'report_exports', 'report_schedule_runs']
        }
      ],
      dataFlows: [
        'React/Vite dashboard signs in with username/password and stores a session token in localStorage under bems.session.',
        'Node API validates X-Session-Token against user_sessions, resolves RBAC permissions from roles, and scopes requests by organization/site.',
        'Dashboard API calls query MySQL through mysql2 for hierarchy, alarms, schedules, trends, reports, digital-twin inputs, heat-map samples, and building-footprint calculations.',
        'The heat map joins zones to buildings, floors, rooms, and trend_logs, then normalizes average metric values into red, orange, green, and blue heat bands.',
        'Optimization and FDD endpoints persist AI decisions, RL/Q values, maintenance tickets, and report executions back into MySQL for repeatable operator review.'
      ]
    },
    deepDetails: [
      'edge-core is the embedded/edge layer and is primarily C++, with BACnet-oriented integration and CMake-style structure.',
      'node-api is an Express service that depends on cors, @grpc/grpc-js, @grpc/proto-loader, and mysql2 for API, service, and database workflows.',
      'ui is a React/Vite dashboard that uses Recharts for operator-facing visualization, including BEMS-ai energy heat-map and usage overlays on a simulated building floorplan.',
      'The dashboard home page now includes an Architecture Alignment panel that maps React/Vite UI, Node API, MySQL, BEMS-ai service, C++ edge core, and BACnet devices to live status and evidence rows.',
      'ai-service is the BEMS-ai/Python optimization layer with gRPC/protobuf dependencies, designed to connect predictive energy analysis into the system.',
      'Runtime data flow runs from operator dashboard to Node API, MySQL telemetry lookup, BEMS-ai gRPC optimization, persisted optimization history, edge command publication, BACnet read/write response, and telemetry/status event feedback.',
      'The API owns safety checks and coordination across session/auth, REST endpoints, MySQL persistence, AI optimization, edge commands, digital twin composition, schedules, alarms, and audit/event shaping.',
      'database/schema.sql provides the database foundation, while Docker files and Yocto meta-bems recipes support containerized and embedded Linux deployment.',
      'scripts/backup-bems-mysql.sh and scripts/restore-bems-mysql.sh provide repeatable MySQL backup and restore operations with gzip compression, SHA-256 checksums, Docker Compose support, host/port fallback, and retention cleanup.',
      'Root GitHub Actions workflows now run BEMS CI and BEMS CD from the repository root, including C++ tests, static analysis, Python checks, Node checks, UI build, Docker image build, and GHCR publishing.'
    ],
    features: [
      'Edge Core BACnet-oriented integration area written primarily in C++.',
      'Node.js API service using Express, CORS, gRPC tooling, and mysql2 for database workflows.',
      'React/Vite UI with Recharts, architecture-alignment status, dashboard-style visualization, energy heat-map, and usage trends.',
      'BEMS-ai/Python optimization layer with gRPC/protobuf dependencies for predictive energy recommendations.',
      'HTTP/JSON and SSE UI/API boundary, SQL database boundary, gRPC AI boundary, edge command/event boundary, and Docker health-check boundary.',
      'MySQL backup and restore scripts for preserving the dashboard database with checksums and retention.',
      'Docker deployment files, MySQL schema, GitHub Actions CI/CD, and Yocto recipes for embedded Linux packaging.'
    ],
    outcomes: [
      '38 source/config/database/deployment files and about 7,800 lines are tracked in the enterprise project tree when generated caches and node_modules are excluded.',
      'Multi-service architecture covers React UI, Node.js API, BEMS-ai/Python optimization, C++ edge control, MySQL schema, Docker deployment, protobuf contracts, and Yocto recipes.',
      'GitHub Actions BEMS CI and BEMS CD passed on commit 4dbd8045 after root workflow and CMake-cache cleanup fixes.',
      'Local Docker deployment verified the updated dashboard bundle and healthy UI, API, AI service, edge-core, database, event bus, and observability containers.',
      'Dashboard MySQL backup workflow now creates compressed dumps, checksum manifests, and restore-ready artifacts.',
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
      'Run the MySQL backup script against the live Docker database and attach the checksum output.',
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
    proofPoints: [
      {
        label: 'Automation Practice',
        title: 'Manual Commands Become Playbooks',
        detail:
          'The repository converts common checks such as ping, command execution, fact gathering, and debug output into repeatable Ansible workflows.'
      },
      {
        label: 'Inventory Discipline',
        title: 'Host Configuration Is Separated From Tasks',
        detail:
          'The inventory and ansible.cfg structure proves the playbooks can grow toward dev/stage/prod host grouping, variables, roles, secret handling, and deployment validation.'
      },
      {
        label: 'Security Awareness',
        title: 'Sensitive Operational Data Is Called Out',
        detail:
          'The architecture notes identify IP addresses, usernames, SSH keys, privileged output, and topology logs as data that need masking, inventory controls, or secret tooling.'
      }
    ],
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
    proofPoints: [
      {
        label: 'Embedded Native I/O',
        title: 'Linux Camera Bring-Up Is Concrete',
        detail:
          'The code exercises real V4L2 operations including capability query, format enumeration, format selection, buffer allocation, mmap, queueing, and stream start.'
      },
      {
        label: 'Target Workflow',
        title: 'Build And Deploy Steps Are Scripted',
        detail:
          'The Makefile includes cross-compile, SCP, SSH, run, clean, and debug targets, proving the demo is shaped for embedded target iteration instead of host-only experimentation.'
      },
      {
        label: 'Display Path',
        title: 'Capture Output Has A Hardware Route',
        detail:
          'The framebuffer/DRM hooks and optional file export path show how captured frames can move from /dev/video0 toward HDMI preview, local display, or saved evidence.'
      }
    ],
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

const projects: Project[] = [...baseProjects, ...embeddedSystemsProjects];

export default projects;
