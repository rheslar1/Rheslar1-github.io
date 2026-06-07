import React, { useEffect } from 'react';

function About() {
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

    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach((el) => observer.observe(el));

    return () => {
      highlights.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            I'm an engineer passionate about building scalable solutions and contributing to open source projects.
            With experience in full-stack development, I love solving complex problems and learning new technologies.
          </p>
          <div className="about-highlights">
            <div className="highlight">
              <h3>🎓 Education</h3>
              <p>Add your education details here</p>
            </div>
            <div className="highlight">
              <h3>💼 Experience</h3>
              <p>Add your professional experience here</p>
            </div>
            <div className="highlight">
              <h3>🚀 Focus</h3>
              <p>Add your areas of focus here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;