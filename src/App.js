import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import projects from './data/projects';
import './App.css';

const getProjectIdFromHash = () => {
  const match = window.location.hash.match(/^#project\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

function App() {
  const [theme, setTheme] = React.useState('light');
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedProjectId, setSelectedProjectId] = React.useState(getProjectIdFromHash);

  React.useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Simulate loading completion
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  React.useEffect(() => {
    const handleHashChange = () => {
      setSelectedProjectId(getProjectIdFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const selectedProject = projects.find((project) => project.id === selectedProjectId);

  const handleProjectSelect = (projectId) => {
    window.location.hash = `project/${encodeURIComponent(projectId)}`;
  };

  const handleProjectBack = () => {
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
    setSelectedProjectId(null);
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (selectedProject) {
    return (
      <div className="App" data-theme={theme}>
        <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <ProjectDetails project={selectedProject} onBack={handleProjectBack} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App" data-theme={theme}>
      <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects projects={projects} onSelectProject={handleProjectSelect} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
