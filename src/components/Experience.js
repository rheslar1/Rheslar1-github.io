import React, { useEffect } from 'react';

function Experience() {
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

    const items = document.querySelectorAll('.experience-item');
    items.forEach((el) => observer.observe(el));

    return () => {
      items.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const roles = [
    {
      company: 'Fresenius Medical Care',
      title: 'IoT Engineer, Yocto',
      period: '2025 - Present',
      highlights: [
        'Developing Yocto and BitBake layers for i.MX8 SOM integration, kernel configuration, device tree updates, and secure boot support.',
        'Building Jenkins CI/CD pipelines and Python tooling for flashing, system updates, and embedded Linux maintenance.',
        'Creating OTA update firmware with NRF52, Bluetooth, FreeRTOS, and security patch workflows for CVE mitigation.'
      ]
    },
    {
      company: 'Medtronic',
      title: 'Senior Embedded Software Engineer, Contractor',
      period: '2024 - 2025',
      highlights: [
        'Built custom Yocto images, BSP layers, kernel patches, and device trees for NVIDIA Xavier and medical robotics hardware.',
        'Developed C/C++ Linux drivers for USB, video capture, and V4L2 workflows, with OpenCV 3D imaging and display integration.',
        'Created Qt 6 GUI applications, migration plans, and AI/vision application prototypes for surgical and robotic systems.'
      ]
    },
    {
      company: 'MedAcuity Software',
      title: 'Senior Embedded Software Engineer',
      period: '2022 - 2024',
      highlights: [
        'Supported medical device software using ISO 13485, ISO 14971, and IEC 62304 practices across embedded and distributed systems.',
        'Led ROS1/ROS2, DDS, gRPC, Docker, Yocto, embedded Linux, and device-tree development for client platforms.',
        'Delivered Qt/QML, Win32, C++/WinRT, laser control, FPGA, NVIDIA Orin Nano, and Python motor-control solutions.'
      ]
    },
    {
      company: 'Parabit Systems',
      title: 'Firmware Engineer',
      period: '2020 - 2021',
      highlights: [
        'Led firmware architecture for touchless access-control products, STM ARM Cortex systems, and secure entry controllers.',
        'Developed IoT, Bluetooth, Wi-Fi, ESP32, Qt/QML, C/C++, FPGA, and embedded security-panel software.',
        'Co-authored a patent for a production touchless exit device used in high-traffic secure environments.'
      ]
    },
    {
      company: 'The LiRo Group',
      title: 'Software Developer',
      period: '2015 - 2020',
      highlights: [
        'Designed and deployed full-stack ASP.NET MVC, Web API, Angular, Telerik, MS SQL Server, and Azure DevOps systems.',
        'Built database schemas, views, triggers, stored procedures, mobile apps, and web portals for enterprise workflows.',
        'Delivered iOS, Android, Xamarin, Swift, Objective-C, JavaScript, jQuery, C#, and Windows C/C++ applications.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2>Professional Experience</h2>
        <div className="experience-list">
          {roles.map((role) => (
            <article key={`${role.company}-${role.period}`} className="experience-item">
              <div className="experience-heading">
                <div>
                  <h3>{role.company}</h3>
                  <p>{role.title}</p>
                </div>
                <span>{role.period}</span>
              </div>
              <ul>
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
