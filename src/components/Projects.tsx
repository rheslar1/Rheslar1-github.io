import React, { useEffect } from 'react';
import type { Project, ProjectSelectHandler } from '../types';

const getProjectPreview = (project: Project): string | undefined => project.preview || project.visuals?.[0]?.src;

interface PortfolioCardProps {
  project: Project;
  onSelectProject: ProjectSelectHandler;
}

function PortfolioCard({ project, onSelectProject }: PortfolioCardProps) {
  const preview = getProjectPreview(project);
  const tags = project.tags || [];

  return (
    <article className="portfolio-card">
      <button
        type="button"
        className="portfolio-image-link"
        onClick={() => onSelectProject(project.id)}
        aria-label={`Open ${project.title} portfolio case study`}
      >
        {preview ? (
          <img src={preview} alt={`${project.title} project preview`} />
        ) : (
          <span>{project.title}</span>
        )}
      </button>
      <h3>
        <button type="button" onClick={() => onSelectProject(project.id)}>
          {project.title}
        </button>
      </h3>
      <p>{project.summary}</p>
      <button
        type="button"
        className="portfolio-read-more"
        onClick={() => onSelectProject(project.id)}
      >
        Read More
      </button>
      <div className="portfolio-tags" aria-label={`${project.title} technologies`}>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

interface ProjectsProps {
  projects: Project[];
  onSelectProject: ProjectSelectHandler;
}

function Projects({ projects, onSelectProject }: ProjectsProps) {
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

    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach((el) => observer.observe(el));

    return () => {
      cards.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" className="projects portfolio-index">
      <div className="container">
        <div className="portfolio-page-heading">
          <div>
            <h2>Portfolio</h2>
            <p>
              Selected project work across embedded systems, C/C++, building energy management,
              automation, documentation, and full-stack engineering.
            </p>
          </div>
          <a href="#dashboard" className="project-link secondary-link">
            Dashboard
          </a>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <PortfolioCard
              project={project}
              onSelectProject={onSelectProject}
              key={project.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
