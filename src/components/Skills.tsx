import React, { useEffect } from 'react';

function Skills() {
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

    const categories = document.querySelectorAll('.skill-category');
    categories.forEach((el) => observer.observe(el));

    return () => {
      categories.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const skillCategories = [
    {
      name: 'Languages',
      skills: ['C', 'C++', 'Python', 'JavaScript', 'C#']
    },
    {
      name: 'Full Stack',
      skills: ['React', 'Node.js', 'Express', 'ASP.NET Web API', 'REST APIs']
    },
    {
      name: 'Databases',
      skills: ['MySQL', 'MS SQL Server', 'SQL', 'Data Modeling']
    },
    {
      name: 'Embedded Linux',
      skills: ['Yocto/BitBake', 'Device Trees', 'Kernel Drivers', 'BSP Layers']
    },
    {
      name: 'Firmware',
      skills: ['RTOS', 'Bare-Metal C', 'ARM Cortex', 'NRF52', 'STM32']
    },
    {
      name: 'Tools',
      skills: ['GitHub Actions', 'Jenkins', 'Docker', 'CMake', 'GitLab']
    }
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.name}</h3>
              <ul>
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
