import React, { useEffect } from 'react';

function Projects() {
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

  const projects = [
    {
      title: 'Project One',
      description: 'Description of your first project and the technologies used.',
      tags: ['Technology 1', 'Technology 2'],
      link: '#'
    },
    {
      title: 'Project Two',
      description: 'Description of your second project and the technologies used.',
      tags: ['Technology 1', 'Technology 2'],
      link: '#'
    },
    {
      title: 'Project Three',
      description: 'Description of your third project and the technologies used.',
      tags: ['Technology 1', 'Technology 2'],
      link: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <a href={project.link} className="project-link">View Project →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;