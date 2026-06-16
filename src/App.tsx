import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';
import Dashboard from './components/Dashboard';
import QtRabbitAsyncDashboard from './components/QtRabbitAsyncDashboard';
import BmsLogin from './components/BmsLogin';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import projects from './data/projects';
import type { DashboardView, Theme } from './types';
import './App.css';

const getProjectIdFromHash = (): string | null => {
  const match = window.location.hash.match(/^#project\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

const getDashboardFromHash = (): boolean => /^#dashboard(?:\/.*)?$/.test(window.location.hash);
const getDashboardViewFromHash = (): DashboardView => {
  const match = window.location.hash.match(/^#dashboard\/(.+)$/);
  const view = match ? match[1] : '';

  if (view === 'alarms' || view.startsWith('alarms/')) {
    return 'Alarms';
  }

  if (view === 'building') {
    return 'Building';
  }

  if (view === 'rooms') {
    return 'Rooms';
  }

  if (view === 'schedules') {
    return 'Schedules';
  }

  return 'Overview';
};
const getBmsLoginFromHash = (): boolean => window.location.hash === '#bms-login';
const getQtRabbitAsyncDashboardFromHash = (): boolean => window.location.hash === '#qtrabbit-async';

function App() {
  const [theme, setTheme] = React.useState<Theme>('light');
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedProjectId, setSelectedProjectId] = React.useState(getProjectIdFromHash);
  const [isDashboard, setIsDashboard] = React.useState(getDashboardFromHash);
  const [dashboardView, setDashboardView] = React.useState(getDashboardViewFromHash);
  const [isBmsLogin, setIsBmsLogin] = React.useState(getBmsLoginFromHash);
  const [isQtRabbitAsyncDashboard, setIsQtRabbitAsyncDashboard] = React.useState(getQtRabbitAsyncDashboardFromHash);

  React.useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Simulate loading completion
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  React.useEffect(() => {
    const handleHashChange = () => {
      setSelectedProjectId(getProjectIdFromHash());
      const hash = window.location.hash.replace('#', '');

      setIsDashboard(getDashboardFromHash());
      setDashboardView(getDashboardViewFromHash());
      setIsBmsLogin(getBmsLoginFromHash());
      setIsQtRabbitAsyncDashboard(getQtRabbitAsyncDashboardFromHash());

      if (!hash || hash.startsWith('dashboard') || hash === 'bms-login' || hash === 'qtrabbit-async' || hash.startsWith('project/')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
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

  const selectedProject = selectedProjectId
    ? projects.find((project) => (
        project.id === selectedProjectId || project.aliases?.includes(selectedProjectId)
      ))
    : undefined;

  const handleProjectSelect = (projectId: string) => {
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

  if (isDashboard) {
    return (
      <div className="App" data-theme={theme}>
        <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <Dashboard activeView={dashboardView} />
        <Footer />
      </div>
    );
  }

  if (isBmsLogin) {
    return (
      <div className="App" data-theme={theme}>
        <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <BmsLogin />
        <Footer />
      </div>
    );
  }

  if (isQtRabbitAsyncDashboard) {
    return (
      <div className="App" data-theme={theme}>
        <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <QtRabbitAsyncDashboard />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App" data-theme={theme}>
      <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
      <Hero projects={projects} />
      <Projects projects={projects} onSelectProject={handleProjectSelect} />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
