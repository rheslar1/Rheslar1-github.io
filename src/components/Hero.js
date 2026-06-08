import React from 'react';

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
      <div className="hero-content">
        <h1>Hi, I'm Robert Heslar</h1>
        <p className="tagline">Embedded Engineer | Full Stack Developer | React + Node.js + MySQL</p>
        <div className="hero-actions">
          <button className="cta-button" onClick={handleScroll}>
            View My Work
          </button>
          <a
            className="cta-button secondary-cta"
            href="https://www.linkedin.com/in/robert-h-2343bb21/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
