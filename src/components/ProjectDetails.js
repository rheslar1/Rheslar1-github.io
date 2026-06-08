import React from 'react';

function ProjectDetails({ project, onBack }) {
  const [previewFailed, setPreviewFailed] = React.useState(false);

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
            <a
              href={project.repository}
              className="project-link detail-repo-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository
            </a>
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
              <h2>Screenshot / Preview</h2>
              <div className="screenshot-frame">
                {!previewFailed ? (
                  <img
                    src={project.preview}
                    alt={`${project.title} repository preview`}
                    onError={() => setPreviewFailed(true)}
                  />
                ) : (
                  <div className="screenshot-fallback">
                    Preview image unavailable
                  </div>
                )}
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
              <h2>Outcomes</h2>
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetails;
