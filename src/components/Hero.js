import React from 'react';

const channelStats = [
  { label: 'Repositories', value: '6' },
  { label: 'Architecture Docs', value: '9' },
  { label: 'C/C++ Focus', value: '3 repos' },
  { label: 'Deployment Evidence', value: 'CI + Docker' }
];

const channelTabs = ['Embedded Systems', 'C/C++', 'BEMS', 'Architecture', 'Evidence'];

function Hero() {
  const handleScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container channel-shell">
        <div className="channel-banner" aria-label="Embedded engineering portfolio banner">
          <div className="banner-circuit-layer" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <p>Embedded Systems Lab</p>
            <strong>Robert Heslar</strong>
          </div>
        </div>

        <div className="channel-profile">
          <div className="channel-avatar" aria-hidden="true">
            <span>RH</span>
          </div>
          <div className="channel-copy">
            <p className="detail-kicker">Embedded Engineer Portfolio</p>
            <h1>Hardware-aware software, firmware, and BMS systems.</h1>
            <p className="tagline">
              Project repositories organized like engineering reports: clean C/C++ code, architecture markdown,
              system diagrams, build/test evidence, MySQL-backed dashboards, and next artifacts to capture.
            </p>
            <div className="channel-actions">
              <button className="cta-button" onClick={handleScroll}>
                View Project Library
              </button>
              <a className="cta-button secondary-cta" href="#dashboard">
                Open Dashboard
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
          </div>
        </div>

        <div className="channel-stat-strip" aria-label="Portfolio evidence summary">
          {channelStats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>

        <nav className="channel-tabs" aria-label="Portfolio focus areas">
          {channelTabs.map((tab) => (
            <a href="#projects" onClick={handleScroll} key={tab}>
              {tab}
            </a>
          ))}
        </nav>

        <div className="featured-upload">
          <div className="featured-thumb">
            <img src={`${process.env.PUBLIC_URL}/assets/projects/bms-dashboard-simulated.svg`} alt="BEMS dashboard preview" />
            <span>Featured System</span>
          </div>
          <div className="featured-copy">
            <p className="detail-kicker">Featured Deep Dive</p>
            <h2>BEMS: C++ edge core, BEMS-ai optimization, Node API, React dashboard, and MySQL telemetry.</h2>
            <p>
              The strongest project is presented as a complete embedded/full-stack system: architecture docs,
              Docker deployment, API/database boundaries, heat-map telemetry, optimization history, and evidence
              still queued for production screenshots.
            </p>
            <div className="featured-meta">
              <span>C++ edge</span>
              <span>MySQL</span>
              <span>BEMS-ai</span>
              <span>Docker healthy</span>
            </div>
            <a className="project-link" href="#project/bems">
              View BEMS Case Study
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
