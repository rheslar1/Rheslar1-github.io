import React from 'react';

function uniqueItems(projects, key) {
  return Array.from(new Set(projects.flatMap((project) => project[key] || [])));
}

const operationNav = ['Overview', 'Alarms', 'Building', 'Zones', 'Floors', 'Rooms', 'Schedules', 'Energy', 'HVAC', 'Lighting'];

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
  {
    id: 'ALM-1042',
    zone: 'Tower B Floor 1',
    building: 'EnergyBuildAI Tower',
    floor: 'Tower B',
    room: 'Server Room / Open Office Return',
    equipment: 'VAV-TB1-14',
    source: 'BEMS-ai peak guard',
    type: 'Demand peak',
    priority: 'High',
    status: 'Active',
    firstSeen: '14:08',
    lastSeen: '14:14',
    reading: '24.1 kWh interval',
    threshold: '18.0 kWh demand target',
    temperature: '24.0 C',
    occupancy: '83%',
    trend: 'Rising 11% over last interval',
    cause: 'Tower B is above the peak demand envelope while occupancy and cooling load are both high.',
    impact: 'Demand charge exposure and comfort drift risk if the zone remains above target for another interval.',
    action: 'Apply demand response trim, reduce VAV airflow in low-priority rooms, and shift noncritical plug load.',
    owner: 'Operations lead',
    sla: '4 min response',
    history: ['14:08 BEMS-ai detected interval spike', '14:10 Demand response armed', '14:14 Awaiting operator acknowledgement'],
    steps: ['Acknowledge alarm in BMS console', 'Trim Tower B VAV airflow by 8%', 'Verify load drops below 18.0 kWh target']
  },
  {
    id: 'ALM-1038',
    zone: 'Floor 1 AHU',
    building: 'EnergyBuildAI Tower',
    floor: 'Floor 1',
    room: 'Mechanical / AHU Closet',
    equipment: 'AHU-01',
    source: 'Static pressure monitor',
    type: 'Static pressure drift',
    priority: 'Medium',
    status: 'Acknowledged',
    firstSeen: '13:42',
    lastSeen: '14:12',
    reading: '1.9 in. w.c.',
    threshold: '1.4 in. w.c. target',
    temperature: '23.4 C',
    occupancy: '71%',
    trend: 'Stable after acknowledgement',
    cause: 'Supply fan pressure is holding above the normal control band during occupied mode.',
    impact: 'Fan energy waste and potential diffuser noise in conference rooms.',
    action: 'Review AHU static reset, inspect VAV damper positions, and confirm pressure sensor calibration.',
    owner: 'Controls technician',
    sla: '12 min review',
    history: ['13:42 Pressure crossed warning threshold', '13:48 Technician acknowledged alarm', '14:12 Drift remains stable'],
    steps: ['Review AHU static reset command', 'Inspect conference room VAV feedback', 'Log calibration check for next maintenance window']
  },
  {
    id: 'ALM-1029',
    zone: 'Lobby Lighting',
    building: 'EnergyBuildAI Tower',
    floor: 'Ground Floor',
    room: 'Lobby',
    equipment: 'Lighting Bus LB-01',
    source: 'Schedule supervisor',
    type: 'Schedule override',
    priority: 'Low',
    status: 'Auto-clear',
    firstSeen: '12:55',
    lastSeen: '13:05',
    reading: 'Manual override active',
    threshold: 'Schedule off at 20:00',
    temperature: '21.9 C',
    occupancy: '42%',
    trend: 'Clearing on next schedule pulse',
    cause: 'Lobby lighting was manually overridden during a maintenance walkthrough.',
    impact: 'Minor lighting energy increase until the next schedule command clears the override.',
    action: 'Let the scheduler auto-clear unless the override remains active after the next pulse.',
    owner: 'Facilities operator',
    sla: 'Monitor only',
    history: ['12:55 Manual override detected', '13:00 Scheduler pulse queued', '13:05 Auto-clear pending'],
    steps: ['Confirm lobby is occupied', 'Allow next schedule pulse', 'Escalate only if override remains active']
  }
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

const buildingSummary = [
  { label: 'Building', value: 'EnergyBuildAI Tower' },
  { label: 'Floors', value: '3 active' },
  { label: 'Zones', value: '5 monitored' },
  { label: 'Rooms', value: '18 scheduled' },
  { label: 'Mode', value: 'Occupied' },
  { label: 'Outdoor Air', value: '64 F' }
];

const floorSummaries = [
  { name: 'Ground Floor', load: '14.0 kWh', rooms: 'Lobby, Security, Mechanical', schedule: '06:00-20:00', status: 'Normal' },
  { name: 'Floor 1', load: '18.7 kWh', rooms: 'Open Office, Conference 101, Lab 1A', schedule: '07:00-19:00', status: 'Elevated' },
  { name: 'Floor 2', load: '11.2 kWh', rooms: 'Engineering, Quiet Rooms, Storage', schedule: '07:30-18:30', status: 'Normal' },
  { name: 'Tower B', load: '29.7 kWh', rooms: 'Tower Lobby, Tower Office, Server Room', schedule: '24/7 partial', status: 'High' }
];

const roomSchedules = [
  { room: 'Lobby', floor: 'Ground', zone: 'Lobby', schedule: '06:00-20:00', mode: 'Occupied', setpoint: '72 F' },
  { room: 'Conference 101', floor: 'Floor 1', zone: 'Floor 1', schedule: '08:30-17:30', mode: 'Reserved', setpoint: '71 F' },
  { room: 'Engineering Lab', floor: 'Floor 2', zone: 'Floor 2', schedule: '07:30-18:30', mode: 'Occupied', setpoint: '72 F' },
  { room: 'Server Room', floor: 'Tower B', zone: 'Tower B Floor 1', schedule: '24/7', mode: 'Cooling priority', setpoint: '68 F' },
  { room: 'Tower Office', floor: 'Tower B', zone: 'Tower B Floor 1', schedule: '07:00-19:00', mode: 'Demand response', setpoint: '73 F' }
];

function Dashboard({ projects, onSelectProject }) {
  const [activeNav, setActiveNav] = React.useState('Overview');
  const [selectedAlarmId, setSelectedAlarmId] = React.useState(alarmEvents[0].id);

  const allDependencies = uniqueItems(projects, 'dependencies');
  const totalBemsUsage = energyZones.reduce((total, zone) => total + zone.kwh, 0);
  const peakUsage = Math.max(...usageTrend.map((point) => point.kwh));
  const activeAlarmCount = alarmEvents.filter((event) => event.status === 'Active').length;
  const selectedAlarm = alarmEvents.find((event) => event.id === selectedAlarmId) || alarmEvents[0];
  const isAlarmView = activeNav === 'Alarms';
  const isBuildingView = activeNav === 'Building';

  const jumpTargets = {
    Overview: 'dashboard',
    Zones: 'zone-status',
    Floors: 'floor-status',
    Rooms: 'room-schedules',
    Schedules: 'room-schedules',
    Energy: 'building-heatmap',
    HVAC: 'equipment-health',
    Lighting: 'equipment-health'
  };

  const jumpToDashboardContent = (item) => {
    setActiveNav(item);

    if (item === 'Alarms' || item === 'Building') {
      return;
    }

    window.setTimeout(() => {
      const target = document.getElementById(jumpTargets[item] || 'dashboard');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const handleHeatmapScroll = () => {
    jumpToDashboardContent('Energy');
  };

  const commandKpis = [
    { label: 'Live building load', value: `${totalBemsUsage.toFixed(1)} kWh`, helper: 'Sampled across 5 zones' },
    { label: 'Peak demand', value: `${peakUsage.toFixed(1)} kWh`, helper: 'Tower B Floor 1' },
    { label: 'Active alarms', value: String(activeAlarmCount), helper: '1 high priority' },
    { label: 'Connected systems', value: '4', helper: 'HVAC, lighting, sensors, controls' }
  ];

  const alarmKpis = [
    { label: 'Active alarms', value: String(activeAlarmCount), helper: '1 high priority dispatch' },
    { label: 'Acknowledged', value: String(alarmEvents.filter((event) => event.status === 'Acknowledged').length), helper: 'Floor 1 AHU under review' },
    { label: 'Auto-clear queue', value: String(alarmEvents.filter((event) => event.status === 'Auto-clear').length), helper: 'Lobby lighting schedule pulse' },
    { label: 'Response SLA', value: selectedAlarm.sla, helper: selectedAlarm.owner }
  ];

  const buildingKpis = [
    { label: 'Building mode', value: 'Occupied', helper: 'Primary weekday schedule' },
    { label: 'Floors monitored', value: String(floorSummaries.length), helper: 'Ground, Floor 1, Floor 2, Tower B' },
    { label: 'Rooms scheduled', value: String(roomSchedules.length), helper: 'Critical rooms surfaced here' },
    { label: 'Zone load', value: `${totalBemsUsage.toFixed(1)} kWh`, helper: 'Live sampled energy status' }
  ];

  const activeKpis = isAlarmView ? alarmKpis : isBuildingView ? buildingKpis : commandKpis;
  const heroTitle = isAlarmView
    ? 'Alarm queue, response ownership, and BMS troubleshooting details are available from the active console view.'
    : isBuildingView
      ? 'Brief Building Summary opens as a dedicated dashboard subpage for core facility status.'
      : '';
  const heroCopy = isAlarmView
    ? 'Select an alarm to inspect its location, source point, current reading, threshold, likely cause, impact, response steps, and event history.'
    : isBuildingView
      ? 'Use the Building tab for a concise view of the building, floors, zones, rooms, schedules, and connected systems.'
      : 'Real-time energy zones, comfort risk, alarm state, equipment health, portfolio evidence, and AI-assisted BEMS recommendations are arranged like an operational building dashboard.';
  const systemSummary = isAlarmView
    ? [
        { label: 'Alarm Console', value: 'Armed' },
        { label: 'Selected Alarm', value: selectedAlarm.id },
        { label: 'Priority', value: selectedAlarm.priority }
      ]
    : isBuildingView
      ? [
          { label: 'Building', value: 'Online' },
          { label: 'Floors', value: `${floorSummaries.length} active` },
          { label: 'Schedules', value: 'Synced' }
        ]
      : [
          { label: 'Controller Status', value: 'Healthy' },
          { label: 'Data Latency', value: '2.4 s' },
          { label: 'Efficiency Index', value: '87%' }
        ];

  return (
    <main className="dashboard-page ecostruxure-dashboard" id="dashboard">
      <aside className="eco-sidebar" aria-label="Building operation navigation">
        <div className="eco-brand">
          <span>BMS</span>
          <strong>Operations</strong>
        </div>
        <nav>
          {operationNav.map((item) => (
            <button
              className={activeNav === item ? 'active' : ''}
              type="button"
              key={item}
              onClick={() => jumpToDashboardContent(item)}
              aria-current={activeNav === item ? 'page' : undefined}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className="eco-workspace">
        <section className="eco-topbar">
          <div>
            <p className="detail-kicker">EnergyBuildAI</p>
            <h1>{isAlarmView ? 'Alarm Response Center' : isBuildingView ? 'Brief Building Summary' : 'Building Operation Center'}</h1>
          </div>
          <div className="eco-topbar-actions">
            <span className="eco-live-pill">Live</span>
            <button type="button" className="cta-button" onClick={handleHeatmapScroll}>
              Building Energy Status
            </button>
            <button
              type="button"
              className="cta-button secondary-cta"
              onClick={() => jumpToDashboardContent(isAlarmView ? 'Overview' : 'Alarms')}
            >
              {isAlarmView ? 'Overview' : 'Alarm Details'}
            </button>
            <a href="#projects" className="cta-button secondary-cta">
              Back to Projects
            </a>
          </div>
        </section>

        {(isAlarmView || isBuildingView) && (
          <section className="eco-command-hero">
            <div>
              <h2>{heroTitle}</h2>
              <p>{heroCopy}</p>
            </div>
            <div className="eco-system-summary" aria-label="System health summary">
              {systemSummary.map((item) => (
                <article key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="eco-kpi-grid" aria-label="Building dashboard KPIs">
          {activeKpis.map((kpi) => (
            <article className="eco-kpi" key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.helper}</small>
            </article>
          ))}
        </section>

        {isAlarmView ? (
          <section className="eco-dashboard-grid eco-alarm-page" aria-label="Alarm details dashboard">
            <article className="eco-card eco-card-wide eco-alarm-detail-card">
              <div className="eco-card-heading">
                <div>
                  <span>Selected Alarm</span>
                  <h2>{selectedAlarm.type}</h2>
                  <p>{selectedAlarm.cause}</p>
                </div>
                <strong>{selectedAlarm.status}</strong>
              </div>
              <div className={`eco-critical-strip ${selectedAlarm.priority.toLowerCase()}`}>
                <strong>{selectedAlarm.priority} Priority</strong>
                <span>{selectedAlarm.id} | {selectedAlarm.zone} | {selectedAlarm.sla}</span>
              </div>
              <div className="eco-alarm-detail-grid">
                <section>
                  <span>Current Reading</span>
                  <strong>{selectedAlarm.reading}</strong>
                  <small>Threshold: {selectedAlarm.threshold}</small>
                </section>
                <section>
                  <span>Temperature</span>
                  <strong>{selectedAlarm.temperature}</strong>
                  <small>Occupancy: {selectedAlarm.occupancy}</small>
                </section>
                <section>
                  <span>Trend</span>
                  <strong>{selectedAlarm.trend}</strong>
                  <small>Last seen {selectedAlarm.lastSeen}</small>
                </section>
                <section>
                  <span>Equipment</span>
                  <strong>{selectedAlarm.equipment}</strong>
                  <small>Source: {selectedAlarm.source}</small>
                </section>
              </div>
              <div className="eco-alarm-narrative">
                <section>
                  <span>Operational Impact</span>
                  <p>{selectedAlarm.impact}</p>
                </section>
                <section>
                  <span>Recommended BEMS Action</span>
                  <p>{selectedAlarm.action}</p>
                </section>
              </div>
            </article>

            <article className="eco-card" id="alarm-events">
              <div className="eco-card-heading">
                <div>
                  <span>Alarm Queue</span>
                  <h2>Events And Acknowledgement</h2>
                </div>
              </div>
              <div className="eco-alarm-queue">
                {alarmEvents.map((event) => (
                  <button
                    type="button"
                    className={`eco-alarm-ticket ${event.priority.toLowerCase()} ${selectedAlarm.id === event.id ? 'active' : ''}`}
                    onClick={() => setSelectedAlarmId(event.id)}
                    key={event.id}
                  >
                    <span>{event.id}</span>
                    <strong>{event.zone}</strong>
                    <small>{event.type} | {event.status}</small>
                  </button>
                ))}
              </div>
            </article>

            <article className="eco-card">
              <div className="eco-card-heading">
                <div>
                  <span>Location</span>
                  <h2>Alarm Location Details</h2>
                </div>
              </div>
              <div className="eco-alarm-location-grid">
                <section>
                  <span>Building</span>
                  <strong>{selectedAlarm.building}</strong>
                </section>
                <section>
                  <span>Floor</span>
                  <strong>{selectedAlarm.floor}</strong>
                </section>
                <section>
                  <span>Room</span>
                  <strong>{selectedAlarm.room}</strong>
                </section>
                <section>
                  <span>Zone</span>
                  <strong>{selectedAlarm.zone}</strong>
                </section>
              </div>
            </article>

            <article className="eco-card">
              <div className="eco-card-heading">
                <div>
                  <span>Response</span>
                  <h2>Operator Steps</h2>
                </div>
                <strong>{selectedAlarm.owner}</strong>
              </div>
              <ol className="eco-response-list">
                {selectedAlarm.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>

            <article className="eco-card">
              <div className="eco-card-heading">
                <div>
                  <span>Timeline</span>
                  <h2>Alarm History</h2>
                </div>
              </div>
              <div className="eco-history-list">
                {selectedAlarm.history.map((item) => (
                  <section key={item}>{item}</section>
                ))}
              </div>
            </article>
          </section>
        ) : isBuildingView ? (
          <section className="eco-dashboard-grid eco-building-page" aria-label="Brief building summary subpage">
            <article className="eco-card eco-card-wide">
              <div className="eco-card-heading">
                <div>
                  <span>Building</span>
                  <h2>Brief Building Summary</h2>
                  <p>Focused facility status for the EnergyBuildAI Tower, including floors, zones, rooms, operating mode, and active controls context.</p>
                </div>
                <strong>Online</strong>
              </div>
              <div className="eco-building-detail-grid">
                {buildingSummary.map((item) => (
                  <section key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </section>
                ))}
              </div>
            </article>

            <article className="eco-card eco-card-wide">
              <div className="eco-card-heading">
                <div>
                  <span>Floors</span>
                  <h2>Floor Summary</h2>
                </div>
              </div>
              <div className="eco-floor-grid">
                {floorSummaries.map((floor) => (
                  <section className={floor.status.toLowerCase()} key={`${floor.name}-building-page`}>
                    <span>{floor.name}</span>
                    <strong>{floor.load}</strong>
                    <small>{floor.rooms}</small>
                    <em>{floor.schedule} | {floor.status}</em>
                  </section>
                ))}
              </div>
            </article>

            <article className="eco-card">
              <div className="eco-card-heading">
                <div>
                  <span>Zones</span>
                  <h2>Zone Energy Status</h2>
                </div>
              </div>
              <div className="eco-zone-list">
                {energyZones.map((zone) => (
                  <section className={`zone-${zone.heat}`} key={`${zone.name}-building-zone`}>
                    <div>
                      <strong>{zone.name}</strong>
                      <span>{zone.kwh} kWh | {zone.temp}</span>
                    </div>
                    <small>{zone.risk} risk | {zone.occupancy} occupied | {zone.action}</small>
                  </section>
                ))}
              </div>
            </article>

            <article className="eco-card">
              <div className="eco-card-heading">
                <div>
                  <span>Systems</span>
                  <h2>Connected Building Systems</h2>
                </div>
              </div>
              <div className="eco-building-system-grid">
                {equipmentSystems.map((system) => (
                  <section className={system.state === 'Review' ? 'review' : ''} key={`${system.name}-building-system`}>
                    <span>{system.name}</span>
                    <strong>{system.value}</strong>
                    <small>{system.label} | {system.state}</small>
                  </section>
                ))}
              </div>
            </article>

            <article className="eco-card eco-card-wide">
              <div className="eco-card-heading">
                <div>
                  <span>Rooms And Schedules</span>
                  <h2>Room Schedule Summary</h2>
                </div>
              </div>
              <div className="eco-schedule-table" role="table" aria-label="Building room schedule summary">
                <div role="row">
                  <span role="columnheader">Room</span>
                  <span role="columnheader">Floor</span>
                  <span role="columnheader">Zone</span>
                  <span role="columnheader">Schedule</span>
                  <span role="columnheader">Mode</span>
                  <span role="columnheader">Setpoint</span>
                </div>
                {roomSchedules.map((room) => (
                  <div role="row" key={`${room.room}-building-page`}>
                    <strong role="cell">{room.room}</strong>
                    <span role="cell">{room.floor}</span>
                    <span role="cell">{room.zone}</span>
                    <span role="cell">{room.schedule}</span>
                    <span role="cell">{room.mode}</span>
                    <span role="cell">{room.setpoint}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        ) : (
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

          <article className="eco-card eco-building-brief" id="building-summary-brief">
            <div className="eco-card-heading">
              <div>
                <span>Building</span>
                <h2>Brief Building Summary</h2>
              </div>
              <button type="button" className="eco-inline-action" onClick={() => jumpToDashboardContent('Building')}>
                Building Subpage
              </button>
            </div>
            <div className="eco-building-list">
              {buildingSummary.slice(0, 4).map((item) => (
                <section key={`${item.label}-brief`}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </section>
              ))}
            </div>
          </article>

          <article className="eco-card" id="zone-status">
            <div className="eco-card-heading">
              <div>
                <span>Zones</span>
                <h2>Zone Status</h2>
              </div>
            </div>
            <div className="eco-zone-list">
              {energyZones.map((zone) => (
                <section className={`zone-${zone.heat}`} key={`${zone.name}-status`}>
                  <div>
                    <strong>{zone.name}</strong>
                    <span>{zone.kwh} kWh | {zone.temp}</span>
                  </div>
                  <small>{zone.risk} risk | {zone.occupancy} occupied</small>
                </section>
              ))}
            </div>
          </article>

          <article className="eco-card eco-card-wide" id="floor-status">
            <div className="eco-card-heading">
              <div>
                <span>Floors</span>
                <h2>Floor Status</h2>
              </div>
            </div>
            <div className="eco-floor-grid">
              {floorSummaries.map((floor) => (
                <section className={floor.status.toLowerCase()} key={floor.name}>
                  <span>{floor.name}</span>
                  <strong>{floor.load}</strong>
                  <small>{floor.rooms}</small>
                  <em>{floor.schedule} | {floor.status}</em>
                </section>
              ))}
            </div>
          </article>

          <article className="eco-card eco-card-wide" id="room-schedules">
            <div className="eco-card-heading">
              <div>
                <span>Rooms And Schedules</span>
                <h2>Room Schedules</h2>
              </div>
            </div>
            <div className="eco-schedule-table" role="table" aria-label="Room schedules">
              <div role="row">
                <span role="columnheader">Room</span>
                <span role="columnheader">Floor</span>
                <span role="columnheader">Zone</span>
                <span role="columnheader">Schedule</span>
                <span role="columnheader">Mode</span>
                <span role="columnheader">Setpoint</span>
              </div>
              {roomSchedules.map((room) => (
                <div role="row" key={room.room}>
                  <strong role="cell">{room.room}</strong>
                  <span role="cell">{room.floor}</span>
                  <span role="cell">{room.zone}</span>
                  <span role="cell">{room.schedule}</span>
                  <span role="cell">{room.mode}</span>
                  <span role="cell">{room.setpoint}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="eco-card" id="alarm-events">
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

          <article className="eco-card" id="equipment-health">
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

          <article className="eco-card" id="energy-distribution">
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
        )}
      </div>
    </main>
  );
}

export default Dashboard;
