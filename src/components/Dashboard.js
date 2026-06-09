import React from 'react';

function uniqueItems(projects, key) {
  return Array.from(new Set(projects.flatMap((project) => project[key] || [])));
}

const operationNav = ['Overview', 'Alarms', 'Energy', 'HVAC', 'Lighting', 'Trends'];

const energyZones = [
  { name: 'Lobby', area: 'lobby', kwh: 8.4, temp: '21.9 C', risk: 'Low', action: 'Hold setpoint', heat: 'normal', occupancy: '42%' },
  { name: 'Floor 1', area: 'floor-one', kwh: 18.7, temp: '23.4 C', risk: 'Elevated', action: 'Trim VAV airflow', heat: 'mid', occupancy: '71%' },
  { name: 'Floor 2', area: 'floor-two', kwh: 11.2, temp: '22.1 C', risk: 'Normal', action: 'Maintain schedule', heat: 'normal', occupancy: '58%' },
  { name: 'Tower B Lobby', area: 'tower-lobby', kwh: 5.6, temp: '21.4 C', risk: 'Low', action: 'Keep lights off', heat: 'cold', occupancy: '18%' },
  { name: 'Tower B Floor 1', area: 'tower-floor', kwh: 24.1, temp: '24.0 C', risk: 'High', action: 'Reduce peak load', heat: 'hot', occupancy: '83%' }
];

const usageTrend = [
  { label: '06:00', kwh: 8.2 },
  { label: '09:00', kwh: 12.6 },
  { label: '12:00', kwh: 18.7 },
  { label: '15:00', kwh: 24.1 },
  { label: '18:00', kwh: 15.8 },
  { label: '21:00', kwh: 9.4 }
];

const alarmEvents = [
  { zone: 'Tower B Floor 1', type: 'Demand peak', priority: 'High', status: 'Active' },
  { zone: 'Floor 1 AHU', type: 'Static pressure drift', priority: 'Medium', status: 'Acknowledged' },
  { zone: 'Lobby Lighting', type: 'Schedule override', priority: 'Low', status: 'Auto-clear' }
];

const equipmentSystems = [
  { name: 'AHU-01', value: '92%', label: 'Supply fan', state: 'Normal' },
  { name: 'Chiller Loop', value: '68 F', label: 'Return water', state: 'Normal' },
  { name: 'VAV Network', value: '1 fault', label: 'Dampers', state: 'Review' },
  { name: 'Lighting Bus', value: '97%', label: 'Online nodes', state: 'Normal' }
];

const energyBreakdown = [
  { name: 'HVAC', value: 46 },
  { name: 'Lighting', value: 19 },
  { name: 'Plug Load', value: 23 },
  { name: 'Controls', value: 12 }
];

function Dashboard({ projects, onSelectProject }) {
  const allDependencies = uniqueItems(projects, 'dependencies');
  const totalBemsUsage = energyZones.reduce((total, zone) => total + zone.kwh, 0);
  const peakUsage = Math.max(...usageTrend.map((point) => point.kwh));
  const activeAlarmCount = alarmEvents.filter((event) => event.status === 'Active').length;

  const handleHeatmapScroll = () => {
    const heatmap = document.getElementById('building-heatmap');
    if (heatmap) {
      heatmap.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commandKpis = [
    { label: 'Live building load', value: `${totalBemsUsage.toFixed(1)} kWh`, helper: 'Sampled across 5 zones' },
    { label: 'Peak demand', value: `${peakUsage.toFixed(1)} kWh`, helper: 'Tower B Floor 1' },
    { label: 'Active alarms', value: String(activeAlarmCount), helper: '1 high priority' },
    { label: 'Connected systems', value: '4', helper: 'HVAC, lighting, sensors, controls' }
  ];

  return (
    <main className="dashboard-page ecostruxure-dashboard" id="dashboard">
      <aside className="eco-sidebar" aria-label="Building operation navigation">
        <div className="eco-brand">
          <span>BMS</span>
          <strong>Operations</strong>
        </div>
        <nav>
          {operationNav.map((item, index) => (
            <button className={index === 0 ? 'active' : ''} type="button" key={item}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="eco-workspace">
        <section className="eco-topbar">
          <div>
            <p className="detail-kicker">EnergyBuildAI</p>
            <h1>Building Operation Center</h1>
          </div>
          <div className="eco-topbar-actions">
            <span className="eco-live-pill">Live</span>
            <button type="button" className="cta-button" onClick={handleHeatmapScroll}>
              Building Energy Status
            </button>
            <a href="#projects" className="cta-button secondary-cta">
              Back to Projects
            </a>
          </div>
        </section>

        <section className="eco-command-hero">
          <div>
            <h2>Monitor, manage, and optimize the simulated facility from one control view.</h2>
            <p>
              Real-time energy zones, comfort risk, alarm state, equipment health, portfolio evidence,
              and AI-assisted BEMS recommendations are arranged like an operational building dashboard.
            </p>
          </div>
          <div className="eco-system-summary" aria-label="System health summary">
            <article>
              <span>Controller Status</span>
              <strong>Healthy</strong>
            </article>
            <article>
              <span>Data Latency</span>
              <strong>2.4 s</strong>
            </article>
            <article>
              <span>Efficiency Index</span>
              <strong>87%</strong>
            </article>
          </div>
        </section>

        <section className="eco-kpi-grid" aria-label="Building dashboard KPIs">
          {commandKpis.map((kpi) => (
            <article className="eco-kpi" key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.helper}</small>
            </article>
          ))}
        </section>

        <section className="eco-dashboard-grid">
          <article className="eco-card eco-card-wide eco-heatmap-card" id="building-heatmap">
            <div className="eco-card-heading">
              <div>
                <span>Energy Management</span>
                <h2>Building Energy Status</h2>
                <p>Simulated floorplan heatmap with zone-level kWh, temperature, comfort risk, occupancy, and recommended BEMS action.</p>
              </div>
              <strong>Demand response armed</strong>
            </div>

            <div className="usage-kpis">
              <article>
                <span>Current Load</span>
                <strong>{totalBemsUsage.toFixed(1)} kWh</strong>
              </article>
              <article>
                <span>Peak Interval</span>
                <strong>{peakUsage.toFixed(1)} kWh</strong>
              </article>
              <article>
                <span>BEMS-ai Target</span>
                <strong>18 kWh saved</strong>
              </article>
              <article>
                <span>Comfort Risk</span>
                <strong>Moderate</strong>
              </article>
            </div>

            <div className="energy-heatmap">
              <div className="building-floorplan" aria-label="Simulated building floorplan energy heat map">
                <div className="floorplan-corridor">Mechanical Core / BACnet Trunk</div>
                {energyZones.map((zone) => (
                  <article
                    className={`floorplan-zone floorplan-${zone.area} energy-zone-${zone.heat}`}
                    key={zone.name}
                  >
                    <div>
                      <h3>{zone.name}</h3>
                      <strong>{zone.kwh} kWh</strong>
                    </div>
                    <div className="zone-readings">
                      <span>
                        <small>Temperature</small>
                        {zone.temp}
                      </span>
                      <span>
                        <small>Comfort Risk</small>
                        {zone.risk}
                      </span>
                      <span>
                        <small>Occupancy</small>
                        {zone.occupancy}
                      </span>
                    </div>
                    <div className="zone-action">
                      <small>Recommended BEMS Action</small>
                      <span>{zone.action}</span>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="energy-readout">
                <h3>Optimization Readout</h3>
                <ul>
                  <li>Peak zone: Tower B Floor 1</li>
                  <li>Total sampled load: 68.0 kWh</li>
                  <li>Demand response target: 18 kWh</li>
                  <li>Recommended action: shift load and trim peak airflow</li>
                </ul>
                <div className="usage-chart" aria-label="BEMS usage trend">
                  {usageTrend.map((point) => (
                    <div className="usage-bar" key={point.label}>
                      <span style={{ height: `${Math.max(18, (point.kwh / peakUsage) * 100)}%` }}></span>
                      <small>{point.label}</small>
                    </div>
                  ))}
                </div>
                <div className="heatmap-legend" aria-label="Energy heatmap legend">
                  <span className="energy-zone-cold">Cold</span>
                  <span className="energy-zone-normal">Normal</span>
                  <span className="energy-zone-mid">Mid</span>
                  <span className="energy-zone-hot">Hot</span>
                </div>
              </aside>
            </div>
          </article>

          <article className="eco-card">
            <div className="eco-card-heading">
              <div>
                <span>Alarms</span>
                <h2>Events And Acknowledgement</h2>
              </div>
            </div>
            <div className="eco-alarm-list">
              {alarmEvents.map((event) => (
                <section className={`eco-alarm ${event.priority.toLowerCase()}`} key={`${event.zone}-${event.type}`}>
                  <div>
                    <strong>{event.zone}</strong>
                    <span>{event.type}</span>
                  </div>
                  <small>
                    <span className="eco-priority-badge">{event.priority}</span>
                    {event.status}
                  </small>
                </section>
              ))}
            </div>
          </article>

          <article className="eco-card">
            <div className="eco-card-heading">
              <div>
                <span>Equipment</span>
                <h2>System Health</h2>
              </div>
            </div>
            <div className="eco-equipment-grid">
              {equipmentSystems.map((system) => (
                <section className={system.state === 'Review' ? 'review' : ''} key={system.name}>
                  <span>{system.name}</span>
                  <strong>{system.value}</strong>
                  <small>{system.label} | {system.state}</small>
                </section>
              ))}
            </div>
          </article>

          <article className="eco-card">
            <div className="eco-card-heading">
              <div>
                <span>Energy</span>
                <h2>Load Distribution</h2>
              </div>
            </div>
            <div className="eco-distribution-list">
              {energyBreakdown.map((item) => (
                <section key={item.name}>
                  <div>
                    <span>{item.name}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="dashboard-meter">
                    <span style={{ width: `${item.value}%` }}></span>
                  </div>
                </section>
              ))}
            </div>
          </article>

          <article className="eco-card">
            <div className="eco-card-heading">
              <div>
                <span>Portfolio Evidence</span>
                <h2>BMS Project Links</h2>
              </div>
            </div>
            <div className="eco-project-list">
              {projects.slice(0, 5).map((project) => (
                <button type="button" onClick={() => onSelectProject(project.id)} key={project.id}>
                  <strong>{project.title}</strong>
                  <span>{project.tags.slice(0, 2).join(' + ')}</span>
                </button>
              ))}
            </div>
            <p className="eco-stack-note">{allDependencies.length} stack items tracked across the portfolio.</p>
          </article>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
