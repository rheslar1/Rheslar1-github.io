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
        <p className="tagline">Full Stack React + Node.js Engineer | MySQL | Embedded Systems</p>
        <button className="cta-button" onClick={handleScroll}>
          View My Work
        </button>
      </div>
    </section>
  );
}

export default Hero;
