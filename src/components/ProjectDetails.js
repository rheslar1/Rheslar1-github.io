import React from 'react';

function ProjectDetails({ project, onBack }) {
  const [failedVisuals, setFailedVisuals] = React.useState({});

  if (!project) {
    return null;
  }

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
                View Repository
              </a>
              {project.loginRoute && (
                <a
                  href={project.loginRoute}
                  className="project-link secondary-link detail-repo-link"
                >
                  {project.loginLabel || 'Login Page'}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="project-detail-content">
        <div className="container">
          <div className="detail-grid">
            <article className="detail-panel">
              <h2>Problem Solved</h2>
              <p>{project.problem}</p>
            </article>

            <article className="detail-panel">
              <h2>Architecture</h2>
              <p>{project.architecture}</p>
            </article>

            <article className="detail-panel detail-panel-wide">
              <h2>Deep Technical Details</h2>
              <ul>
                {project.deepDetails.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>

            <article className="detail-panel detail-panel-wide">
              <h2>Screenshots / Case-Study Images</h2>
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
              <h2>Deployment Details</h2>
              <p>{project.deployment}</p>
            </article>

            <article className="detail-panel">
              <h2>Dependencies / Stack</h2>
              <ul>
                {project.dependencies.map((dependency) => (
                  <li key={dependency}>{dependency}</li>
                ))}
              </ul>
            </article>

            <article className="detail-panel">
              <h2>Features</h2>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>

            <article className="detail-panel">
              <h2>Measurable Outcomes</h2>
              <ul>
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>

            <article className="detail-panel detail-panel-wide">
              <h2>Resume-Style Highlights</h2>
              <ul>
                {project.resumeBullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>

            {project.suggestedContent?.length > 0 && (
              <article className="detail-panel detail-panel-wide">
                <h2>Suggested Content To Add</h2>
                <ul>
                  {project.suggestedContent.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;
