import React from 'react';

function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p>I'm always interested in hearing about new projects and opportunities.</p>
        <div className="contact-links">
          <a href="https://github.com/rheslar1" target="_blank" rel="noopener noreferrer" className="contact-link">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
            LinkedIn
          </a>
          <a href="mailto:your.email@example.com" className="contact-link">
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;