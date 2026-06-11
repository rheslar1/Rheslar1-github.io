import React from 'react';
import type { Project } from '../types';

interface StackCategory {
  label: string;
  matcher: RegExp;
}

interface StackGroup {
  label: string;
  items: string[];
}

interface DetailStat {
  label: string;
  value: string;
  helper: string;
}

interface ReportSection {
  title: string;
  text?: string;
  items?: string[];
}

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

const stackCategories: StackCategory[] = [
  {
    label: 'Frontend / UI',
    matcher: /(React|Vite|Recharts|GitHub Pages|Pages|Node\.js tooling|react-scripts)/i
  },
  {
    label: 'Backend / API',
    matcher: /(Node\.js|Express|gRPC|protobuf|API|mysql2|CORS)/i
  },
  {
    label: 'Data / Storage',
    matcher: /(MySQL|schema|CSV|database|Inventory|YAML)/i
  },
  {
    label: 'AI / Simulation',
    matcher: /(AI|BEMS-ai|PPO|ONNX|EnergyPlus|LightGBM|digital twin|forecast|simulation|Deep Learning|CNN|LSTM|Transformers|GNN|Knowledge Distillation)/i
  },
  {
    label: 'Embedded / Native',
    matcher: /(C\+\+|CMake|C\+\+17|V4L2|Framebuffer|DRM|mmap|aarch64|Yocto|Linux|BACnet|i\.MX93|clang|cppcheck|CodeChecker|EEG|ECoG|iEEG|Edge AI|Neural Sensors)/i
  },
  {
    label: 'Automation / Deployment',
    matcher: /(Docker|Ansible|SSH|SCP|GitHub Actions|Makefile|workflow|CI|CMake|pytest|CTest)/i
  }
];

const buildStackGroups = (dependencies: string[] = []): StackGroup[] => {
  const assigned = new Set<string>();
  const groups = stackCategories
    .map((category) => {
      const items = dependencies.filter((item) => {
        if (assigned.has(item) || !category.matcher.test(item)) {
          return false;
        }
        assigned.add(item);
        return true;
      });
      return { label: category.label, items };
    })
    .filter((group) => group.items.length > 0);

  const remaining = dependencies.filter((item) => !assigned.has(item));
  if (remaining.length > 0) {
    groups.push({ label: 'Additional Tools', items: remaining });
  }

  return groups;
};

const detailStats = (project: Project): DetailStat[] => [
  {
    label: 'Stack Items',
    value: String(project.dependencies?.length || 0),
    helper: 'technologies tracked'
  },
  {
    label: 'Deep Details',
    value: String(project.deepDetails?.length || 0),
    helper: 'technical notes'
  },
  {
    label: 'Case Images',
    value: String(project.visuals?.length || 0),
    helper: 'visual references'
  },
  {
    label: 'Evidence Queue',
    value: String(project.suggestedContent?.length || 0),
    helper: 'next captures'
  },
  {
    label: 'Docs Linked',
    value: String(project.architectureDocs?.length || 0),
    helper: 'architecture references'
  },
  {
    label: 'Proof Points',
    value: String(project.proofPoints?.length || 0),
    helper: 'portfolio evidence'
  }
];

const reportSections = (project: Project): ReportSection[] => [
  {
    title: 'Hardware Stack',
    items: [
      ...(project.dependencies || []).filter((item) => (
        /(C\+\+|C\+\+17|C$|CMake|V4L2|Framebuffer|DRM|mmap|aarch64|Linux|Yocto|BACnet|i\.MX93|STM32|ESP32|I2C|SPI|UART|CAN|BLE|MySQL|Docker|EEG|ECoG|iEEG|Edge AI|Neural Sensors)/i.test(item)
      )),
      ...((project.architectureDocs || []).length > 0 ? ['Architecture markdown linked'] : []),
      ...((project.visuals || []).length > 0 ? ['Project visuals attached'] : [])
    ]
  },
  {
    title: 'The Challenge',
    text: project.problem
  },
  {
    title: 'The Solution',
    text: `${project.architecture} ${project.deployment}`
  },
  {
    title: 'Results And Artifacts',
    items: [
      ...(project.outcomes || []).slice(0, 3),
      ...((project.architectureDocs || []).map((doc) => `${doc.title}: ${doc.path}`)),
      ...((project.suggestedContent || []).slice(0, 2).map((item) => `Next capture: ${item}`))
    ]
  }
];

function ProjectDetails({ project, onBack }: ProjectDetailsProps) {
  const [failedVisuals, setFailedVisuals] = React.useState<Record<string, boolean>>({});

  if (!project) {
    return null;
  }

  const stackGroups = buildStackGroups(project.dependencies);
  const stats = detailStats(project);

  return (
    <main className="project-detail-page">
      <section className="project-detail-hero">
        <div className="container">
          <button className="back-button" type="button" onClick={onBack}>
            Back to portfolio
          </button>
          <div className="project-detail-header">
            <div>
              <p className="detail-kicker">Project Details</p>
              <h1>{project.title}</h1>
              <p>{project.summary}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="detail-actions">
              <a
                href={project.repository}
                className="project-link detail-repo-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.repositoryLabel || 'View Repository'}
              </a>
              {project.loginRoute && (
                <a
                  href={project.loginRoute}
                  className="project-link secondary-link detail-repo-link"
                >
                  {project.loginLabel || 'Login Page'}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="project-link secondary-link detail-repo-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.liveLabel || 'Open Live Project'}
                </a>
              )}
            </div>
          </div>
          <div className="detail-stat-grid" aria-label={`${project.title} project detail metrics`}>
            {stats.map((stat) => (
              <article className="detail-stat" key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.helper}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-detail-content">
        <div className="container">
          <div className="detail-layout">
            <div className="detail-main-column">
              <article className="detail-panel detail-story-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Case Study Brief</p>
                  <h2>What This Project Proves</h2>
                </div>
                <div className="detail-story-grid">
                  <section>
                    <h3>Problem Solved</h3>
                    <p>{project.problem}</p>
                  </section>
                  <section>
                    <h3>Architecture</h3>
                    <p>{project.architecture}</p>
                  </section>
                  <section>
                    <h3>Deployment Model</h3>
                    <p>{project.deployment}</p>
                  </section>
                </div>
                {project.proofPoints.length > 0 && (
                  <div className="proof-point-grid">
                    {project.proofPoints.map((point) => (
                      <section key={point.title}>
                        <span>{point.label}</span>
                        <h3>{point.title}</h3>
                        <p>{point.detail}</p>
                      </section>
                    ))}
                  </div>
                )}
              </article>

              <article className="detail-panel engineering-report-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Mini Engineering Report</p>
                  <h2>Hardware, Firmware, Architecture, And Artifacts</h2>
                </div>
                <div className="engineering-report-grid">
                  {reportSections(project).map((section) => (
                    <section key={section.title}>
                      <h3>{section.title}</h3>
                      {section.text ? (
                        <p>{section.text}</p>
                      ) : (
                        <ul>
                          {((section.items ?? []).length > 0 ? section.items ?? [] : ['Artifact not yet documented']).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </div>
              </article>

              {project.databaseDetails && (
                <article className="detail-panel detail-database-panel">
                  <div className="detail-panel-heading">
                    <p className="detail-kicker">MySQL Data Layer</p>
                    <h2>{project.databaseDetails.title}</h2>
                  </div>
                  <p>{project.databaseDetails.summary}</p>
                  <div className="database-meta-grid">
                    {project.databaseDetails.quickFacts.map((fact) => (
                      <section key={fact.label}>
                        <span>{fact.label}</span>
                        <strong>{fact.value}</strong>
                        <small>{fact.helper}</small>
                      </section>
                    ))}
                  </div>
                  <div className="database-group-grid">
                    {project.databaseDetails.tableGroups.map((group) => (
                      <section key={group.label}>
                        <h3>{group.label}</h3>
                        <div>
                          {group.tables.map((table) => (
                            <span key={table}>{table}</span>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                  <ol className="data-flow-list">
                    {project.databaseDetails.dataFlows.map((flow, index) => (
                      <li key={flow}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <p>{flow}</p>
                      </li>
                    ))}
                  </ol>
                </article>
              )}

              <article className="detail-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Implementation</p>
                  <h2>Deep Technical Breakdown</h2>
                </div>
                <ol className="detail-numbered-list">
                  {project.deepDetails.map((detail, index) => (
                    <li key={detail}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{detail}</p>
                    </li>
                  ))}
                </ol>
              </article>

              <article className="detail-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Evidence</p>
                  <h2>Screenshots And Case-Study Images</h2>
                </div>
                <div className="visual-gallery">
                  {project.visuals.map((visual) => (
                    <figure key={visual.src} className="visual-item">
                      <div className="screenshot-frame">
                        {!failedVisuals[visual.src] ? (
                          <img
                            src={visual.src}
                            alt={`${project.title} visual`}
                            onError={() => setFailedVisuals((current) => ({
                              ...current,
                              [visual.src]: true
                            }))}
                          />
                        ) : (
                          <div className="screenshot-fallback">
                            Preview image unavailable
                          </div>
                        )}
                      </div>
                      <figcaption>{visual.caption}</figcaption>
                    </figure>
                  ))}
                </div>
                <p>{project.screenshotCaption}</p>
              </article>

              <article className="detail-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Results</p>
                  <h2>Features And Outcomes</h2>
                </div>
                <div className="detail-two-column">
                  <section>
                    <h3>Built Features</h3>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3>Measurable Outcomes</h3>
                    <ul>
                      {project.outcomes.map((outcome) => (
                        <li key={outcome}>{outcome}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </article>
            </div>

            <aside className="detail-side-column" aria-label={`${project.title} supporting project details`}>
              <article className="detail-panel detail-sticky-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Project Links</p>
                  <h2>Access</h2>
                </div>
                <div className="detail-link-stack">
                  <a
                    href={project.repository}
                    className="project-link detail-repo-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.repositoryLabel || 'View Repository'}
                  </a>
                  {project.loginRoute && (
                    <a
                      href={project.loginRoute}
                      className="project-link secondary-link detail-repo-link"
                    >
                      {project.loginLabel || 'Login Page'}
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="project-link secondary-link detail-repo-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.liveLabel || 'Open Live Project'}
                    </a>
                  )}
                </div>
              </article>

              {project.architectureDocs.length > 0 && (
                <article className="detail-panel">
                  <div className="detail-panel-heading">
                    <p className="detail-kicker">Architecture Markdown</p>
                    <h2>Project Docs</h2>
                  </div>
                  <div className="architecture-doc-links detail-doc-links">
                    {project.architectureDocs.map((doc) => (
                      <a
                        href={doc.url}
                        key={doc.path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <strong>{doc.title}</strong>
                        <span>{doc.path}</span>
                        <small>{doc.focus}</small>
                      </a>
                    ))}
                  </div>
                </article>
              )}

              {project.databaseDetails && (
                <article className="detail-panel">
                  <div className="detail-panel-heading">
                    <p className="detail-kicker">Database Access</p>
                    <h2>MySQL Provided</h2>
                  </div>
                  <div className="database-access-list">
                    {project.databaseDetails.access.map((item) => (
                      <section key={item.label}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </section>
                    ))}
                  </div>
                </article>
              )}

              <article className="detail-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Stack Matrix</p>
                  <h2>Tools And Dependencies</h2>
                </div>
                <div className="stack-matrix">
                  {stackGroups.map((group) => (
                    <section key={group.label} className="stack-group">
                      <h3>{group.label}</h3>
                      <div>
                        {group.items.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </article>

              <article className="detail-panel">
                <div className="detail-panel-heading">
                  <p className="detail-kicker">Resume View</p>
                  <h2>Interview-Ready Highlights</h2>
                </div>
                <ul>
                  {project.resumeBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>

              {project.suggestedContent.length > 0 && (
                <article className="detail-panel">
                  <div className="detail-panel-heading">
                    <p className="detail-kicker">Evidence Backlog</p>
                    <h2>Next Content To Capture</h2>
                  </div>
                  <ul className="evidence-list">
                    {project.suggestedContent.map((item) => (
                      <li key={item}>
                        <span>Capture</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;
