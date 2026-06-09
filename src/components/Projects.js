import React, { useEffect } from 'react';

const embeddedProofItems = [
  {
    title: 'Clean C/C++ Code',
    detail: 'C, C++17, CMake, V4L2, mmap, controller interfaces, action decoding, and edge-service examples.',
    signal: 'Firmware proof'
  },
  {
    title: 'Architecture Reports',
    detail: 'README and architecture markdown links stay attached to each project card and detail page.',
    signal: 'Design proof'
  },
  {
    title: 'Testing And CI/CD',
    detail: 'CMake, CTest, pytest, static analysis, GitHub Actions, Docker health checks, and deployment runs.',
    signal: 'Quality proof'
  },
  {
    title: 'Hardware Evidence Queue',
    detail: 'Schematics, PCB layout, logic analyzer traces, current draw, and HIL screenshots are tracked as next capture work when not yet present.',
    signal: 'Artifact plan'
  }
];

const projectRails = [
  {
    title: 'Firmware, C/C++ And Embedded Linux',
    description: 'Low-level code, native capture, static analysis, CMake, and target deployment evidence.',
    matcher: /(C\+\+|C\+\+17|CMake|C$|V4L2|Framebuffer|DRM|mmap|aarch64|Linux|Yocto|i\.MX93|clang|cppcheck|CodeChecker)/i
  },
  {
    title: 'Systems, BMS And AI Control',
    description: 'Building control, MySQL telemetry, optimization services, simulation, ONNX, and dashboards.',
    matcher: /(BEMS|BMS|AI|PPO|ONNX|EnergyPlus|LightGBM|digital twin|BACnet|MySQL|Docker|React|Node\.js|gRPC)/i
  },
  {
    title: 'Automation, Documentation And Deployment',
    description: 'Architecture markdown, CI/CD, Ansible, GitHub Pages, Docker, test output, and capture backlog.',
    matcher: /(Ansible|GitHub Actions|GitHub Pages|workflow|CI|Docker|YAML|SSH|SCP|pytest|CTest|Makefile|Draw\.io)/i
  }
];

const roadmapIdeas = [
  {
    title: 'Custom Peripheral Driver',
    build: 'Bare-metal SPI TFT or I2C temperature sensor driver on STM32 or ESP32 using native C/C++.',
    proves: 'Reads datasheets, configures registers, and controls timing without hiding behind pre-made libraries.'
  },
  {
    title: 'FreeRTOS Telemetry Device',
    build: 'Sensor task, display task, wireless task, queues, semaphores, mutexes, and priority decisions.',
    proves: 'Understands real-time scheduling, concurrency boundaries, and non-blocking embedded architecture.'
  },
  {
    title: 'Low-Power Data Logger',
    build: 'Battery sensor node that logs to flash, sleeps aggressively, and records measured current draw.',
    proves: 'Optimizes clocks, sleep states, wake cycles, storage writes, and power budget tradeoffs.'
  },
  {
    title: 'UART Command Shell',
    build: 'Serial REPL for reading pins, toggling outputs, dumping registers, and triggering diagnostics.',
    proves: 'Builds practical debug tools and handles command parsing over constrained communication links.'
  }
];

const getProjectText = (project) => [
  project.title,
  project.summary,
  project.architecture,
  project.deployment,
  ...(project.dependencies || []),
  ...(project.tags || [])
].join(' ');

const getEvidenceStatus = (project) => {
  const hasNativeCode = /(C\+\+|C\+\+17|CMake|C$|V4L2|mmap|Linux|Yocto|BACnet|i\.MX93)/i.test(getProjectText(project));
  const hasDocs = (project.architectureDocs || []).length > 0;
  const hasVisuals = (project.visuals || []).length > 1;
  const hasCi = /(GitHub Actions|CTest|pytest|CMake|Docker|CI|static analysis|cppcheck|clang-tidy)/i.test(getProjectText(project));

  return [
    { label: 'C/C++', state: hasNativeCode ? 'ready' : 'planned' },
    { label: 'Docs', state: hasDocs ? 'ready' : 'planned' },
    { label: 'Visuals', state: hasVisuals ? 'ready' : 'planned' },
    { label: 'CI/Test', state: hasCi ? 'ready' : 'planned' }
  ];
};

function ProjectVideoCard({ project, onSelectProject, compact = false }) {
  const evidence = getEvidenceStatus(project);
  const duration = `${project.deepDetails?.length || 0}:${String(project.features?.length || 0).padStart(2, '0')}`;

  return (
    <article className={compact ? 'project-video-card compact' : 'project-video-card'}>
      <button
        type="button"
        className="project-thumbnail"
        onClick={() => onSelectProject(project.id)}
        aria-label={`Open ${project.title} engineering report`}
      >
        <img src={project.preview || project.visuals?.[0]?.src} alt={`${project.title} project preview`} />
        <span>{duration}</span>
      </button>
      <div className="project-video-body">
        <div>
          <p className="project-channel-label">{project.tags.slice(0, 3).join(' / ')}</p>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
        <div className="evidence-pills">
          {evidence.map((item) => (
            <span className={`evidence-pill ${item.state}`} key={item.label}>
              {item.label}
            </span>
          ))}
        </div>
        {!compact && (
          <div className="project-card-section">
            <h4>Engineering Focus</h4>
            <p>{project.problem}</p>
          </div>
        )}
        <div className="project-actions">
          <button
            type="button"
            className="project-link"
            onClick={() => onSelectProject(project.id)}
          >
            Engineering Report
          </button>
          <a
            href={project.repository}
            className="project-link secondary-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            Repository
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects({ projects, onSelectProject }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.project-card, .project-video-card, .embedded-proof-grid article, .roadmap-panel');
    cards.forEach((el) => observer.observe(el));

    return () => {
      cards.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="detail-kicker">Engineering Library</p>
            <h2>Project Reports, Not Beginner Tutorials</h2>
          </div>
          <a href="#dashboard" className="project-link secondary-link">
            Dashboard
          </a>
        </div>

        <div className="embedded-proof-grid">
          {embeddedProofItems.map((item) => (
            <article key={item.title}>
              <span>{item.signal}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>

        <div className="roadmap-panel">
          <div className="rail-heading">
            <div>
              <p className="detail-kicker">Next High-Impact Builds</p>
              <h3>Industry-Standard Embedded Project Roadmap</h3>
              <p>These roadmap items are framed as complete systems, with code, hardware artifacts, timing proof, and test evidence expected for each build.</p>
            </div>
          </div>
          <div className="roadmap-grid">
            {roadmapIdeas.map((idea) => (
              <article key={idea.title}>
                <h4>{idea.title}</h4>
                <p><strong>Build:</strong> {idea.build}</p>
                <p><strong>Proves:</strong> {idea.proves}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="featured-project-row">
          <ProjectVideoCard project={projects.find((project) => project.id === 'bems') || projects[0]} onSelectProject={onSelectProject} />
        </div>

        <div className="project-rails">
          {projectRails.map((rail) => {
            const railProjects = projects.filter((project) => rail.matcher.test(getProjectText(project)));
            if (railProjects.length === 0) {
              return null;
            }

            return (
              <section className="project-rail" key={rail.title} aria-label={rail.title}>
                <div className="rail-heading">
                  <div>
                    <h3>{rail.title}</h3>
                    <p>{rail.description}</p>
                  </div>
                  <span>{railProjects.length} projects</span>
                </div>
                <div className="rail-scroller">
                  {railProjects.map((project) => (
                    <ProjectVideoCard
                      project={project}
                      onSelectProject={onSelectProject}
                      compact
                      key={`${rail.title}-${project.id}`}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="projects-grid all-projects-grid">
          {projects.map((project) => (
            <ProjectVideoCard project={project} onSelectProject={onSelectProject} key={project.id} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
