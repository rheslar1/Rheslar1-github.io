import React from 'react';

function uniqueItems(projects, key) {
  return Array.from(new Set(projects.flatMap((project) => project[key] || [])));
}

function Dashboard({ projects, onSelectProject }) {
  const [failedVisuals, setFailedVisuals] = React.useState({});
  const allDependencies = uniqueItems(projects, 'dependencies');
  const allTags = uniqueItems(projects, 'tags');
  const visualCount = projects.reduce((total, project) => total + (project.visuals?.length || 0), 0);
  const simulatedVisualCount = projects.reduce(
    (total, project) => total + (project.visuals || []).filter((visual) => /simulated/i.test(visual.caption)).length,
    0
  );
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
    (project.suggestedContent || []).slice(0, 2).map((item) => ({
      project: project.title,
      item
    }))
  );

  return (
    <main className="dashboard-page" id="dashboard">
      <section className="dashboard-hero">
        <div className="container dashboard-hero-grid">
          <div>
            <p className="detail-kicker">Portfolio Dashboard</p>
            <h1>Project Command Center</h1>
            <p>
              A blue-themed project dashboard for reviewing Robert Heslar's GitHub work, simulated screenshots,
              architecture evidence, measurable outcomes, and the next content to capture.
            </p>
          </div>
          <a href="#projects" className="cta-button secondary-cta">
            Back to Projects
          </a>
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
              <span>Simulated Views</span>
              <strong>{simulatedVisualCount}</strong>
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
                  <h2>Project Status</h2>
                  <p>Each row summarizes portfolio readiness, visual evidence, and next-capture depth.</p>
                </div>
              </div>
              <div className="dashboard-project-grid">
                {projects.map((project) => {
                  const visualTotal = project.visuals?.length || 0;
                  const suggestedTotal = project.suggestedContent?.length || 0;
                  const score = Math.min(100, 35 + visualTotal * 12 + suggestedTotal * 7);

                  return (
                    <article className="dashboard-project" key={project.id}>
                      <div>
                        <h3>{project.title}</h3>
                        <p>{project.summary}</p>
                      </div>
                      <div className="dashboard-project-meta">
                        <span>{visualTotal} visuals</span>
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
