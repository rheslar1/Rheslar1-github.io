import React, { useState } from 'react';

function Navbar({ onThemeToggle, currentTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Robert Heslar</div>
        <button 
          className="theme-toggle" 
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
        >
          {currentTheme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="#home" 
              className="nav-link"
              onClick={(e) => handleScroll(e, 'home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="nav-link"
              onClick={(e) => handleScroll(e, 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className="nav-link"
              onClick={(e) => handleScroll(e, 'experience')}
            >
              Experience
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className="nav-link"
              onClick={(e) => handleScroll(e, 'skills')}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="nav-link"
              onClick={(e) => handleScroll(e, 'projects')}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="nav-link"
              onClick={(e) => handleScroll(e, 'contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
