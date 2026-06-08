const githubPreview = (repo) => `https://opengraph.githubassets.com/1/rheslar1/${repo}`;

const projects = [
  {
    id: 'pythonProject',
    title: 'pythonProject',
    summary: 'Python command-line project for user and task-list management experiments.',
    repository: 'https://github.com/rheslar1/pythonProject',
    preview: githubPreview('pythonProject'),
    tags: ['Python', 'CSV', 'CLI', 'Automation'],
    problem:
      'Create a small Python application that can model users, persist user records, and provide a simple command workflow for viewing and adding data.',
    architecture:
      'A command-line Python app organized around main.py for menu flow, db.py for CSV persistence, Userclass.py for the user model, and users.csv as lightweight storage.',
    features: [
      'Command menu for showing users, adding users, deleting users, and exiting the program.',
      'Dataclass-backed user model with equality behavior for duplicate detection.',
      'CSV-backed storage layer for simple persistence without a database dependency.',
      'Separation between application flow, user model, and data access code.'
    ],
    outcomes: [
      'Demonstrates Python fundamentals, object modeling, file persistence, and CLI workflow design.',
      'Provides a compact codebase for practicing validation, refactoring, testing, and storage abstraction.',
      'Creates a foundation that could be extended into a MySQL-backed service or React/Node.js UI.'
    ],
    resumeBullets: [
      'Built Python automation-style application code with discrete modules for command handling, persistence, and data modeling.',
      'Used CSV persistence and object comparison logic to support repeatable user-management workflows.',
      'Structured the project so storage and user behavior can evolve independently.'
    ],
    screenshotCaption:
      'Repository preview for the Python CLI project. Application terminal screenshots can be added as the workflow matures.'
  },
  {
    id: 'study',
    title: 'study',
    summary: 'Study and reference repository for engineering notes, experiments, and learning material.',
    repository: 'https://github.com/rheslar1/study',
    preview: githubPreview('study'),
    tags: ['Study', 'Learning', 'Reference'],
    problem:
      'Keep technical notes and experiments organized so topics learned during embedded, full-stack, and automation work can be revisited quickly.',
    architecture:
      'A documentation-first repository intended to hold topic folders, notes, examples, and small experiments as the study material grows.',
    features: [
      'Space for short technical examples and reference notes.',
      'Can group study material by language, platform, tooling, or project area.',
      'Supports repeatable learning by keeping commands, examples, and observations together.'
    ],
    outcomes: [
      'Creates a durable reference base for ongoing React, Node.js, MySQL, Python, embedded Linux, and automation learning.',
      'Helps turn one-off experiments into reusable notes and starter examples.',
      'Can become a public knowledge base as topics are documented.'
    ],
    resumeBullets: [
      'Maintained a study repository to capture technical research, implementation notes, and engineering experiments.',
      'Organized learning material for reuse across embedded systems, automation, and full-stack development.',
      'Used GitHub as a repeatable knowledge-management workflow.'
    ],
    screenshotCaption:
      'Repository preview. This repository may require GitHub access if it is private or still being prepared.'
  },
  {
    id: 'BEMS-ai',
    title: 'BEMS-ai',
    summary: 'AI-focused building energy management concept for intelligent system support.',
    repository: 'https://github.com/rheslar1/BEMS-ai',
    preview: githubPreview('BEMS-ai'),
    tags: ['AI', 'BEMS', 'Python', 'Automation'],
    problem:
      'Explore how AI assistance can support building energy management by helping analyze system behavior, alerts, and operational decisions.',
    architecture:
      'Conceptual AI service layer intended to sit beside building-management data sources, automation scripts, and operator-facing interfaces.',
    features: [
      'AI-oriented project framing for building energy management workflows.',
      'Designed to support analysis, recommendations, and operational context around BEMS data.',
      'Natural companion to Python automation, Node.js APIs, MySQL data storage, and React dashboards.'
    ],
    outcomes: [
      'Defines a direction for applying AI to engineering and building-management operations.',
      'Can be expanded into a service that connects model output to alarms, metrics, and maintenance workflows.',
      'Shows interest in combining embedded systems, automation, data, and AI-enabled software.'
    ],
    resumeBullets: [
      'Explored AI-backed support workflows for building energy management use cases.',
      'Mapped AI project concepts to full-stack and automation architecture patterns.',
      'Positioned the project for future integration with APIs, databases, and dashboard interfaces.'
    ],
    screenshotCaption:
      'Repository preview. Public source details were not readable from this environment, so this page summarizes the portfolio intent.'
  },
  {
    id: 'portfolio',
    title: 'Rheslar1-github.io',
    summary: 'React portfolio built with Node.js tooling and deployed through GitHub Pages.',
    repository: 'https://github.com/rheslar1/Rheslar1-github.io',
    preview: githubPreview('Rheslar1-github.io'),
    tags: ['React', 'Node.js', 'GitHub Actions', 'GitHub Pages'],
    problem:
      'Create a public portfolio that communicates embedded engineering, full-stack development, MySQL, automation, and GitHub project experience.',
    architecture:
      'Create React App project built by Node.js tooling. GitHub Actions installs dependencies, runs the production build, uploads the build artifact, and deploys it to GitHub Pages.',
    features: [
      'Responsive portfolio layout with hero, about, professional experience, skills, projects, contact, and footer sections.',
      'Dark and light theme toggle persisted in localStorage.',
      'GitHub Pages workflow with npm ci, npm run build, artifact upload, and Pages deployment.',
      'Project detail pages implemented inside the React single-page app with hash-based deep links.'
    ],
    outcomes: [
      'Live portfolio is deployed at rheslar1.github.io/Rheslar1-github.io.',
      'Current resume positioning is visible: Embedded Engineer, Full Stack Developer, React, Node.js, and MySQL.',
      'Deployment workflow has repeatedly completed successfully through GitHub Actions.'
    ],
    resumeBullets: [
      'Built and deployed a React portfolio using Node.js build tooling and GitHub Pages.',
      'Implemented responsive UI sections, project detail pages, SEO metadata, and automated deployment.',
      'Used GitHub Actions to publish a production build from the main branch.'
    ],
    screenshotCaption:
      'Repository preview for the live portfolio. The live site itself is the primary screenshot source.'
  },
  {
    id: 'bms',
    title: 'BMS',
    summary: 'Building energy management system with edge C++, Node.js API, React UI, Flask AI service, MySQL, Docker, and Yocto integration.',
    repository: 'https://github.com/rheslar1/BMS',
    preview: githubPreview('BMS'),
    tags: ['C++', 'Node.js', 'React', 'MySQL', 'Yocto', 'Docker'],
    problem:
      'Model an enterprise-style building energy management platform that connects edge data, AI services, APIs, database storage, and operator-facing dashboards.',
    architecture:
      'Public repository structure includes edge-core C++, node-api Express service using mysql2 and gRPC packages, React/Vite UI with Recharts, Python AI service, database/schema.sql, Docker deployment files, protobuf definitions, and Yocto meta-bems layers.',
    features: [
      'Edge Core BACnet-oriented integration area written primarily in C++.',
      'Node.js API service using Express, CORS, gRPC tooling, and mysql2 for database workflows.',
      'React/Vite UI with Recharts for dashboard-style visualization.',
      'Python AI service layer with gRPC/protobuf dependencies.',
      'Docker deployment files, MySQL schema, and Yocto recipes for embedded Linux packaging.'
    ],
    outcomes: [
      'Shows a full-stack plus embedded architecture spanning C++, Python, JavaScript, Node.js, React, MySQL, Docker, and Yocto.',
      'Demonstrates alignment between building-management software, edge systems, and web dashboards.',
      'Provides the strongest portfolio case study for Embedded Engineer plus Full Stack Developer positioning.'
    ],
    resumeBullets: [
      'Designed a multi-service BEMS architecture with edge C++, Node.js API, React dashboard, Python AI service, MySQL schema, Docker, and Yocto integration.',
      'Connected embedded/edge concerns with full-stack web application patterns and database-backed workflows.',
      'Organized repository structure for deployment, documentation, edge-core code, API services, UI, AI service, and Yocto layers.'
    ],
    screenshotCaption:
      'Repository preview for the BMS case study. UI screenshots from the React/Vite dashboard can be added as generated artifacts become available.'
  },
  {
    id: 'ansible',
    title: 'ansible',
    summary: 'Infrastructure automation repository with Ansible playbooks and inventory examples.',
    repository: 'https://github.com/rheslar1/ansible',
    preview: githubPreview('ansible'),
    tags: ['Ansible', 'Automation', 'Infrastructure'],
    problem:
      'Capture repeatable infrastructure automation examples for local and remote host workflows instead of relying on manual command execution.',
    architecture:
      'Ansible repository with playbooks including a hello-world debug playbook, SSH remote login command example, local ping test, ansible.cfg, and inventory structure.',
    features: [
      'Basic hello-world playbook for validating Ansible execution.',
      'Remote SSH command workflow with fact gathering, privilege escalation, command registration, and debug output.',
      'Local ping test playbook for checking baseline connectivity.',
      'Inventory folder and configuration file layout for future expansion.'
    ],
    outcomes: [
      'Demonstrates infrastructure-as-code habits for repeatable operations.',
      'Provides starter playbooks that can grow into server provisioning, CI/CD support, or embedded Linux deployment automation.',
      'Connects with resume experience around Jenkins, Docker, Yocto, Linux, and automation workflows.'
    ],
    resumeBullets: [
      'Created Ansible playbooks to standardize command execution, connectivity checks, and remote automation tasks.',
      'Used automation patterns that can support deployment, validation, and infrastructure maintenance.',
      'Structured repository for future inventory and playbook expansion.'
    ],
    screenshotCaption:
      'Repository preview for Ansible automation examples. Terminal output screenshots can be added after playbook runs are captured.'
  },
  {
    id: 'CameraDemo',
    title: 'CameraDemo',
    summary: 'Camera and imaging demo project for capture, preview, and interface experiments.',
    repository: 'https://github.com/rheslar1/CameraDemo',
    preview: githubPreview('CameraDemo'),
    tags: ['Camera', 'Imaging', 'Demo'],
    problem:
      'Explore camera capture and imaging workflows that can support embedded, robotics, inspection, or UI demonstration scenarios.',
    architecture:
      'Demo-oriented repository intended for camera input, preview/display logic, and small interface experiments. Public source details were not readable from this environment.',
    features: [
      'Camera-oriented project space for capture and imaging experiments.',
      'Can support OpenCV-style workflows, preview windows, diagnostics, or UI integration.',
      'Natural fit for embedded Linux, robotics, medical-device imaging, and full-stack visualization work.'
    ],
    outcomes: [
      'Provides a portfolio slot for camera and imaging work aligned with OpenCV and display-integration resume experience.',
      'Can be expanded with screenshots, capture examples, and architecture diagrams as the demo matures.',
      'Shows cross-over between embedded devices, imaging pipelines, and operator-facing software.'
    ],
    resumeBullets: [
      'Prepared a camera demo project area for imaging, capture, and interface experimentation.',
      'Aligned project direction with embedded Linux, OpenCV, robotics, and display-integration experience.',
      'Positioned the repository for future screenshots, diagnostics, and UI workflow examples.'
    ],
    screenshotCaption:
      'Repository preview. Public source details were not readable from this environment, so live screenshots should be added when available.'
  }
];

export default projects;
