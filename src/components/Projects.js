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
      title: 'pythonProject',
      description: 'Python project repository for automation, scripting, and engineering experiments.',
      tags: ['Python', 'Automation'],
      link: 'https://github.com/rheslar1/pythonProject'
    },
    {
      title: 'study',
      description: 'Study notes, experiments, and learning materials.',
      tags: ['Study', 'Learning'],
      link: 'https://github.com/rheslar1/study'
    },
    {
      title: 'BEMS-ai',
      description: 'AI-focused BEMS project exploring intelligent software support for engineering systems.',
      tags: ['AI', 'BEMS'],
      link: 'https://github.com/rheslar1/BEMS-ai'
    },
    {
      title: 'Rheslar1-github.io',
      description: 'Personal portfolio site built with React and Node.js tooling, then deployed with GitHub Pages.',
      tags: ['React', 'Node.js', 'GitHub Pages'],
      link: 'https://github.com/rheslar1/Rheslar1-github.io'
    },
    {
      title: 'BMS',
      description: 'Python repository for building-management and automation-oriented software work.',
      tags: ['Python', 'Automation'],
      link: 'https://github.com/rheslar1/BMS'
    },
    {
      title: 'ansible',
      description: 'Infrastructure automation repository for Ansible configuration work.',
      tags: ['Ansible', 'Automation', 'GitHub'],
      link: 'https://github.com/rheslar1/ansible'
    },
    {
      title: 'CameraDemo',
      description: 'Camera and imaging demo repository for interface and capture experiments.',
      tags: ['Camera', 'Demo'],
      link: 'https://github.com/rheslar1/CameraDemo'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>GitHub Projects</h2>
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
