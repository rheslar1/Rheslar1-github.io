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
      title: 'Rheslar1-github.io',
      description: 'Personal portfolio site built with React and deployed with GitHub Pages.',
      tags: ['JavaScript', 'React', 'GitHub Pages'],
      link: 'https://github.com/rheslar1/Rheslar1-github.io'
    },
    {
      title: 'BMS',
      description: 'Python repository from Robert Heslar\'s GitHub portfolio.',
      tags: ['Python', 'GitHub'],
      link: 'https://github.com/rheslar1/BMS'
    },
    {
      title: 'ansible',
      description: 'Infrastructure automation repository for Ansible configuration work.',
      tags: ['Ansible', 'Automation', 'GitHub'],
      link: 'https://github.com/rheslar1/ansible'
    },
    {
      title: 'pythonHelpers',
      description: 'Python helper utilities and reusable scripts.',
      tags: ['Python', 'Utilities', 'GitHub'],
      link: 'https://github.com/rheslar1/pythonHelpers'
    },
    {
      title: 'pythonProject',
      description: 'Python project repository from Robert Heslar\'s GitHub portfolio.',
      tags: ['Python', 'GitHub'],
      link: 'https://github.com/rheslar1/pythonProject'
    },
    {
      title: 'home-automation',
      description: 'Home automation repository for configuration and automation experiments.',
      tags: ['Home Automation', 'Automation', 'GitHub'],
      link: 'https://github.com/rheslar1/home-automation'
    },
    {
      title: 'containers',
      description: 'C code containers.',
      tags: ['C', 'Containers', 'GitHub'],
      link: 'https://github.com/rheslar1/containers'
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
              <a
                href={project.link}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
              >
                View Repository
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
