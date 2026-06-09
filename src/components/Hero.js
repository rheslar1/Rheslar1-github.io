import React from 'react';

function Hero({ projects = [] }) {
  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const architectureDocCount = projects.reduce((total, project) => total + (project.architectureDocs?.length || 0), 0);
  const nativeProjectCount = projects.filter((project) => (
    [...(project.dependencies || []), ...(project.tags || [])].join(' ').match(/C\+\+|CMake|C$|V4L2|Linux|Yocto|BACnet|i\.MX93/i)
  )).length;

  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Architecture Docs', value: architectureDocCount },
    { label: 'C/C++ Repositories', value: nativeProjectCount }
  ];

  return (
    <section id="home" className="hero portfolio-hero">
      <div className="container">
        <p className="detail-kicker">Robert Heslar</p>
        <h1>Portfolio</h1>
        <p className="tagline">
          Embedded Linux, firmware, C/C++, BEMS energy systems, full-stack dashboards, and engineering
          documentation collected as project case studies.
        </p>
        <div className="portfolio-hero-actions">
          <button className="cta-button" onClick={handleScroll}>
            View Projects
          </button>
          <a className="cta-button secondary-cta" href="#dashboard">
            Dashboard
          </a>
          <a
            className="cta-button secondary-cta"
            href="https://www.linkedin.com/in/robert-h-2343bb21/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="portfolio-hero-stats" aria-label="Portfolio summary">
          {stats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
