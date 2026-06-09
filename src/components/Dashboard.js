import React from 'react';

function uniqueItems(projects, key) {
  return Array.from(new Set(projects.flatMap((project) => project[key] || [])));
}

const energyZones = [
  { name: 'Lobby', area: 'lobby', kwh: 8.4, temp: '21.9 C', risk: 'Low', action: 'BEMS-ai: hold setpoint', heat: 'normal' },
  { name: 'Floor 1', area: 'floor-one', kwh: 18.7, temp: '23.4 C', risk: 'Elevated', action: 'BEMS-ai: trim VAV airflow', heat: 'mid' },
  { name: 'Floor 2', area: 'floor-two', kwh: 11.2, temp: '22.1 C', risk: 'Normal', action: 'BEMS-ai: maintain schedule', heat: 'normal' },
  { name: 'Tower B Lobby', area: 'tower-lobby', kwh: 5.6, temp: '21.4 C', risk: 'Low', action: 'BEMS-ai: keep lights off', heat: 'cold' },
  { name: 'Tower B Floor 1', area: 'tower-floor', kwh: 24.1, temp: '24.0 C', risk: 'High', action: 'BEMS-ai: reduce peak load', heat: 'hot' }
];

const usageTrend = [
  { label: '06:00', kwh: 8.2 },
  { label: '09:00', kwh: 12.6 },
  { label: '12:00', kwh: 18.7 },
  { label: '15:00', kwh: 24.1 },
  { label: '18:00', kwh: 15.8 },
  { label: '21:00', kwh: 9.4 }
];

function Dashboard({ projects, onSelectProject }) {
  const [failedVisuals, setFailedVisuals] = React.useState({});
  const allDependencies = uniqueItems(projects, 'dependencies');
  const allTags = uniqueItems(projects, 'tags');
  const visualCount = projects.reduce((total, project) => total + (project.visuals?.length || 0), 0);
  const architectureDocCount = projects.reduce((total, project) => total + (project.architectureDocs?.length || 0), 0);
  const architectureProjectCount = projects.filter((project) => project.architectureDocs?.length > 0).length;
  const suggestedContentCount = projects.reduce(
    (total, project) => total + (project.suggestedContent?.length || 0),
    0
  );
  const stackCounts = allDependencies
    .map((dependency) => ({
      name: dependency,
      count: projects.filter((project) => project.dependencies?.includes(dependency)).length
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 18);
  const captureQueue = projects.flatMap((project) =>
    (project.suggestedContent || []).map((item) => ({
      project: project.title,
      item
    }))
  );
  const totalBemsUsage = energyZones.reduce((total, zone) => total + zone.kwh, 0);
  const peakUsage = Math.max(...usageTrend.map((point) => point.kwh));
  const handleHeatmapScroll = () => {
    const heatmap = document.getElementById('building-heatmap');
    if (heatmap) {
      heatmap.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="dashboard-page" id="dashboard">
      <section className="dashboard-hero">
        <div className="container dashboard-hero-grid">
          <div>
            <p className="detail-kicker">Portfolio Dashboard</p>
            <h1>Project Command Center</h1>
            <p>
              A project dashboard for reviewing Robert Heslar's GitHub work, building heatmap telemetry,
              simulated screenshots, architecture Markdown, measurable outcomes, and the next content to capture.
            </p>
          </div>
          <div className="dashboard-hero-actions">
            <button type="button" className="cta-button" onClick={handleHeatmapScroll}>
              Building Heatmap
            </button>
            <a href="#projects" className="cta-button secondary-cta">
              Back to Projects
            </a>
          </div>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="container">
          <div className="dashboard-kpis">
            <article className="dashboard-kpi">
              <span>Total Projects</span>
              <strong>{projects.length}</strong>
            </article>
            <article className="dashboard-kpi">
              <span>Project Visuals</span>
              <strong>{visualCount}</strong>
            </article>
            <article className="dashboard-kpi">
              <span>Architecture Docs</span>
              <strong>{architectureDocCount}</strong>
            </article>
            <article className="dashboard-kpi">
              <span>Repos Documented</span>
              <strong>{architectureProjectCount}</strong>
            </article>
            <article className="dashboard-kpi">
              <span>Stack Items</span>
              <strong>{allDependencies.length}</strong>
            </article>
            <article className="dashboard-kpi">
              <span>Suggested Captures</span>
              <strong>{suggestedContentCount}</strong>
            </article>
          </div>

          <div className="dashboard-layout">
            <section className="dashboard-panel dashboard-panel-wide">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Architecture Markdown Matrix</h2>
                  <p>Project architecture documents are linked from the same dashboard used to review screenshots, stack coverage, and capture readiness.</p>
                </div>
              </div>
              <div className="architecture-doc-grid">
                {projects.map((project) => {
                  const docs = project.architectureDocs || [];
                  const primaryDoc = docs[0];

                  return (
                    <article className="architecture-doc-card" key={`${project.id}-architecture`}>
                      <div>
                        <span className={docs.length > 0 ? 'doc-status ready' : 'doc-status missing'}>
                          {docs.length > 0 ? 'Documented' : 'Needs doc'}
                        </span>
                        <h3>{project.title}</h3>
                        <p>{project.architecture}</p>
                      </div>
                      {docs.length > 0 && (
                        <div className="architecture-doc-links">
                          {docs.map((doc) => (
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
                      )}
                      <div className="project-actions dashboard-actions">
                        <button
                          type="button"
                          className="project-link"
                          onClick={() => onSelectProject(project.id)}
                        >
                          Details
                        </button>
                        {primaryDoc && (
                          <a
                            href={primaryDoc.url}
                            className="project-link secondary-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Architecture
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="dashboard-panel dashboard-panel-wide dashboard-heatmap-panel" id="building-heatmap">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Building Heatmap Dashboard</h2>
                  <p>Energy heatmap and usage analytics over a simulated building floorplan, using the BEMS-ai optimization layer for comfort risk and control recommendations.</p>
                </div>
              </div>
              <div className="usage-kpis">
                <article>
                  <span>Current Load</span>
                  <strong>{totalBemsUsage.toFixed(1)} kWh</strong>
                </article>
                <article>
                  <span>Peak Interval</span>
                  <strong>{peakUsage.toFixed(1)} kWh</strong>
                </article>
                <article>
                  <span>BEMS-ai Target</span>
                  <strong>18 kWh saved</strong>
                </article>
                <article>
                  <span>Comfort Risk</span>
                  <strong>Moderate</strong>
                </article>
              </div>
              <div className="energy-heatmap">
                <div className="building-floorplan" aria-label="Simulated building floorplan energy heat map">
                  <div className="floorplan-corridor">Main Corridor / Mechanical Core</div>
                  {energyZones.map((zone) => (
                    <article
                      className={`floorplan-zone floorplan-${zone.area} energy-zone-${zone.heat}`}
                      key={zone.name}
                    >
                      <div>
                        <h3>{zone.name}</h3>
                        <strong>{zone.kwh} kWh</strong>
                      </div>
                      <p>{zone.temp} | {zone.risk} risk</p>
                      <span>{zone.action}</span>
                    </article>
                  ))}
                </div>
                <aside className="energy-readout">
                  <h3>BEMS-ai Optimization Readout</h3>
                  <ul>
                    <li>Peak zone: Tower B Floor 1</li>
                    <li>Total sampled load: 68.0 kWh</li>
                    <li>Estimated savings target: 18 kWh</li>
                    <li>BEMS-ai action: shift load and trim peak airflow</li>
                  </ul>
                  <div className="usage-chart" aria-label="BEMS usage trend">
                    {usageTrend.map((point) => (
                      <div className="usage-bar" key={point.label}>
                        <span style={{ height: `${Math.max(18, (point.kwh / peakUsage) * 100)}%` }}></span>
                        <small>{point.label}</small>
                      </div>
                    ))}
                  </div>
                  <div className="heatmap-legend" aria-label="Energy heat map legend">
                    <span className="energy-zone-cold">Cold</span>
                    <span className="energy-zone-normal">Normal</span>
                    <span className="energy-zone-mid">Mid</span>
                    <span className="energy-zone-hot">Hot</span>
                  </div>
                  <p>Blue cold, green normal, orange mid, and red hot energy states from the BEMS floorplan telemetry layer</p>
                </aside>
              </div>
            </section>

            <section className="dashboard-panel dashboard-panel-wide">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Project Status</h2>
                  <p>Each row summarizes portfolio readiness, visual evidence, and next-capture depth.</p>
                </div>
              </div>
              <div className="dashboard-project-grid">
                {projects.map((project) => {
                  const visualTotal = project.visuals?.length || 0;
                  const suggestedTotal = project.suggestedContent?.length || 0;
                  const docTotal = project.architectureDocs?.length || 0;
                  const score = Math.min(100, 35 + visualTotal * 10 + suggestedTotal * 6 + docTotal * 10);

                  return (
                    <article className="dashboard-project" key={project.id}>
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <div className="dashboard-project-meta">
                        <span>{visualTotal} visuals</span>
                        <span>{docTotal} architecture docs</span>
                        <span>{suggestedTotal} next captures</span>
                        <span>{project.tags.slice(0, 2).join(' + ')}</span>
                      </div>
                      <div className="dashboard-meter" aria-label={`${project.title} portfolio readiness ${score}%`}>
                        <span style={{ width: `${score}%` }}></span>
                      </div>
                      <div className="project-actions dashboard-actions">
                        <button
                          type="button"
                          className="project-link"
                          onClick={() => onSelectProject(project.id)}
                        >
                          Details
                        </button>
                        <a
                          href={project.repository}
                          className="project-link secondary-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="dashboard-panel">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Stack Coverage</h2>
                  <p>Technologies represented across the project set.</p>
                </div>
              </div>
              <div className="stack-cloud">
                {stackCounts.map((stack) => (
                  <span key={stack.name} className="stack-chip">
                    {stack.name} <strong>{stack.count}</strong>
                  </span>
                ))}
              </div>
            </section>

            <section className="dashboard-panel">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Project Tags</h2>
                  <p>Fast scan of portfolio positioning.</p>
                </div>
              </div>
              <div className="stack-cloud">
                {allTags.map((tag) => (
                  <span key={tag} className="stack-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="dashboard-panel dashboard-panel-wide">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Visual Evidence Board</h2>
                  <p>Simulated screenshots, real portfolio captures, and architecture diagrams currently attached to projects.</p>
                </div>
              </div>
              <div className="dashboard-visual-grid">
                {projects.map((project) => {
                  const visual = project.visuals?.[0];
                  if (!visual) return null;

                  return (
                    <figure className="dashboard-visual" key={project.id}>
                      <div className="screenshot-frame">
                        {!failedVisuals[visual.src] ? (
                          <img
                            src={visual.src}
                            alt={`${project.title} dashboard visual`}
                            onError={() => setFailedVisuals((current) => ({
                              ...current,
                              [visual.src]: true
                            }))}
                          />
                        ) : (
                          <div className="screenshot-fallback">Preview image unavailable</div>
                        )}
                      </div>
                      <figcaption>
                        <strong>{project.title}</strong>
                        <span>{visual.caption}</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </section>

            <section className="dashboard-panel dashboard-panel-wide">
              <div className="dashboard-panel-heading">
                <div>
                  <h2>Suggested Content Queue</h2>
                  <p>Next artifacts to capture so simulated views can become real project evidence.</p>
                </div>
              </div>
              <div className="capture-list">
                {captureQueue.map((capture) => (
                  <article className="capture-item" key={`${capture.project}-${capture.item}`}>
                    <strong>{capture.project}</strong>
                    <p>{capture.item}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
