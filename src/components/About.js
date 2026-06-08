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
            I'm a Senior Embedded Software Engineer with 15+ years of experience building reliable software for
            embedded Linux, medical devices, automation systems, and production hardware. I also build practical
            React interfaces, Node.js tooling, and Python automation that help teams test, deploy, and maintain
            complex systems.
          </p>
          <div className="about-highlights">
            <div className="highlight">
              <h3>Education</h3>
              <p>B.S. in Computer Science from SUNY Old Westbury, plus electronics and FMEA training.</p>
            </div>
            <div className="highlight">
              <h3>Experience</h3>
              <p>Senior embedded, IoT, firmware, and software roles across medical, robotics, security, and industrial systems.</p>
            </div>
            <div className="highlight">
              <h3>Focus</h3>
              <p>React, Node.js, Yocto, embedded Linux, C/C++, Python automation, and CI/CD.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
