import React, { useEffect } from 'react';

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

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((el) => observer.observe(el));

    return () => {
      cards.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Selected GitHub Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <div className="project-card-section">
                <h4>Project Summary</h4>
                <p>{project.summary}</p>
              </div>
              <div className="project-card-section">
                <h4>Deployment Details</h4>
                <p>{project.deployment}</p>
              </div>
              {project.suggestedContent?.length > 0 && (
                <div className="project-card-section project-suggested-content">
                  <h4>Suggested Content</h4>
                  <ul>
                    {project.suggestedContent.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  type="button"
                  className="project-link"
                  onClick={() => onSelectProject(project.id)}
                >
                  View Details
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
