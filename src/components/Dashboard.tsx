import React from 'react';
import type { DashboardView } from '../types';

const operationNav = ['Overview', 'Alarms', 'Building', 'Floors', 'Zones', 'Rooms', 'Schedules', 'Energy', 'HVAC', 'Lighting'] as const;

type OperationNavItem = typeof operationNav[number];
type OccupancyState = 'empty' | 'occupied' | 'full';

const operationNavLabels: Record<OperationNavItem, string> = {
  Overview: 'Overview',
  Alarms: 'Alarms',
  Building: 'Building',
  Zones: 'Zones',
  Floors: 'Floors',
  Rooms: 'Rooms',
  Schedules: 'Schedules',
  Energy: 'Energy',
  HVAC: 'HVAC',
  Lighting: 'Lighting'
};

const occupancyLabels: Record<OccupancyState, string> = {
  empty: 'Empty',
  occupied: 'Occupied',
  full: 'Full'
};

const getOccupancyState = (occupancy: string): OccupancyState => {
  const percentage = Number.parseFloat(occupancy);

  if (Number.isNaN(percentage)) {
    return 'occupied';
  }

  if (percentage >= 80) {
    return 'full';
  }

  if (percentage <= 25) {
    return 'empty';
  }

  return 'occupied';
};

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
    history: ['14:08 BEMS-ai detected interval spike', '14:10 Demand response armed', '14:14 Awaiting operator acknowledgement']
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
    history: ['13:42 Pressure crossed warning threshold', '13:48 Technician acknowledged alarm', '14:12 Drift remains stable']
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
    history: ['12:55 Manual override detected', '13:00 Scheduler pulse queued', '13:05 Auto-clear pending']
  }
];

const equipmentSystems = [
  {
    name: 'AHU-01 Supply Fan',
    value: '92%',
    label: 'VFD command',
    state: 'Normal',
    feedback: 'Fan proof on | 1.4 in. w.c.',
    action: 'Hold static reset curve'
  },
  {
    name: 'VAV Damper Network',
    value: '74% avg',
    label: 'Damper position',
    state: 'Review',
    feedback: '1 stuck-open branch | 18 dampers online',
    action: 'Inspect Floor 1 conference VAV'
  },
  {
    name: 'Supply Fan Motor',
    value: '6.8 A',
    label: 'Motor current',
    state: 'Normal',
    feedback: 'Temp 118 F | no overload',
    action: 'Normal motor load'
  },
  {
    name: 'Return Fan Motor',
    value: '4.1 A',
    label: 'Motor current',
    state: 'Normal',
    feedback: 'Tracking supply fan at -8%',
    action: 'Maintain building pressure'
  },
  {
    name: 'Chiller Loop Pump Motor',
    value: '58%',
    label: 'Pump speed',
    state: 'Normal',
    feedback: '68 F return water',
    action: 'Keep chilled-water loop stable'
  },
  {
    name: 'Lighting Relay Bus',
    value: '97%',
    label: 'Online nodes',
    state: 'Normal',
    feedback: 'Lobby override queued',
    action: 'Clear on next schedule pulse'
  }
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
  {
    room: 'Lobby',
    floor: 'Ground',
    zone: 'Lobby',
    schedule: '06:00-20:00',
    mode: 'Occupied',
    setpoint: '72 F',
    source: 'Primary weekday',
    nextEvent: '20:00 lighting setback',
    override: 'Auto-clear pending',
    intent: 'Comfort entry path with lobby lighting pulse'
  },
  {
    room: 'Conference 101',
    floor: 'Floor 1',
    zone: 'Floor 1',
    schedule: '08:30-17:30',
    mode: 'Reserved',
    setpoint: '71 F',
    source: 'Room reservation',
    nextEvent: '17:30 unoccupied reset',
    override: 'None',
    intent: 'Meeting comfort during booked occupancy'
  },
  {
    room: 'Engineering Lab',
    floor: 'Floor 2',
    zone: 'Floor 2',
    schedule: '07:30-18:30',
    mode: 'Occupied',
    setpoint: '72 F',
    source: 'Lab calendar',
    nextEvent: '18:30 ventilation setback',
    override: 'None',
    intent: 'Maintain lab ventilation and occupied comfort'
  },
  {
    room: 'Server Room',
    floor: 'Tower B',
    zone: 'Tower B Floor 1',
    schedule: '24/7',
    mode: 'Cooling priority',
    setpoint: '68 F',
    source: 'Critical space',
    nextEvent: 'Continuous cooling guard',
    override: 'Locked',
    intent: 'Protect server load from temperature drift'
  },
  {
    room: 'Tower Office',
    floor: 'Tower B',
    zone: 'Tower B Floor 1',
    schedule: '07:00-19:00',
    mode: 'Demand response',
    setpoint: '73 F',
    source: 'BEMS-ai peak guard',
    nextEvent: '15:00 load trim review',
    override: 'AI trim active',
    intent: 'Reduce peak demand while preserving comfort'
  }
];

const dashboardRoutes: Record<DashboardView, string> = {
  Overview: '#dashboard',
  Alarms: '#dashboard/alarms',
  Building: '#dashboard/building',
  Rooms: '#dashboard/rooms',
  Schedules: '#dashboard/schedules'
};

interface DashboardProps {
  activeView?: DashboardView;
}

function Dashboard({ activeView = 'Overview' }: DashboardProps) {
  const [activeNav, setActiveNav] = React.useState<OperationNavItem>(activeView);
  const [selectedAlarmId, setSelectedAlarmId] = React.useState(alarmEvents[0].id);
  const [acknowledgedAlarmIds, setAcknowledgedAlarmIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setActiveNav(activeView);
  }, [activeView]);

  const totalBemsUsage = energyZones.reduce((total, zone) => total + zone.kwh, 0);
  const peakUsage = Math.max(...usageTrend.map((point) => point.kwh));
  const activeAlarmCount = alarmEvents.filter((event) => event.status === 'Active').length;
  const activeAlarm = alarmEvents.find((event) => event.status === 'Active') || alarmEvents[0];
  const acknowledgedAlarmSet = new Set([
    ...alarmEvents.filter((event) => event.status === 'Acknowledged').map((event) => event.id),
    ...acknowledgedAlarmIds
  ]);
  const selectedAlarm = alarmEvents.find((event) => event.id === selectedAlarmId) || alarmEvents[0];
  const selectedAlarmAcknowledged = acknowledgedAlarmSet.has(selectedAlarm.id);
  const selectedAlarmDisplayStatus = selectedAlarmAcknowledged ? 'Acknowledged' : selectedAlarm.status;
  const getAlarmDisplayStatus = (event: typeof alarmEvents[number]) =>
    acknowledgedAlarmSet.has(event.id) ? 'Acknowledged' : event.status;
  const isAlarmView = activeNav === 'Alarms';
  const isBuildingView = activeNav === 'Building';
  const isScheduleView = activeNav === 'Rooms' || activeNav === 'Schedules';
  const jumpTargets: Partial<Record<OperationNavItem, string>> = {
    Overview: 'dashboard',
    Zones: 'zone-status',
    Floors: 'floor-status',
    Energy: 'building-heatmap',
    HVAC: 'equipment-health',
    Lighting: 'equipment-health'
  };

  const jumpToDashboardContent = (item: OperationNavItem) => {
    setActiveNav(item);

    if (item === 'Alarms' || item === 'Building' || item === 'Rooms' || item === 'Schedules') {
      if (window.location.hash !== dashboardRoutes[item]) {
        window.location.hash = dashboardRoutes[item];
      }
      return;
    }

    if (item === 'Overview') {
      if (window.location.hash !== dashboardRoutes.Overview) {
        window.location.hash = dashboardRoutes.Overview;
      }
      return;
    }

    if (window.location.hash !== dashboardRoutes.Overview) {
      window.history.pushState('', document.title, `${window.location.pathname}${window.location.search}${dashboardRoutes.Overview}`);
    }

    window.setTimeout(() => {
      const target = document.getElementById(jumpTargets[item] || 'dashboard');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const openActiveAlarmDetails = () => {
    setSelectedAlarmId(activeAlarm.id);
    jumpToDashboardContent('Alarms');

    window.setTimeout(() => {
      const target = document.getElementById('alarm-detail-page');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const acknowledgeSelectedAlarm = () => {
    setAcknowledgedAlarmIds((currentIds) =>
      currentIds.includes(selectedAlarm.id) ? currentIds : [...currentIds, selectedAlarm.id]
    );

    window.setTimeout(() => {
      const target = document.getElementById('alarm-acknowledge-page');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    { label: 'Acknowledged', value: String(acknowledgedAlarmSet.size), helper: 'Operator-reviewed events' },
    { label: 'Auto-clear queue', value: String(alarmEvents.filter((event) => event.status === 'Auto-clear').length), helper: 'Lobby lighting schedule pulse' },
    { label: 'Response SLA', value: selectedAlarm.sla, helper: selectedAlarm.owner }
  ];

  const buildingKpis = [
    { label: 'Building mode', value: 'Occupied', helper: 'Primary weekday schedule' },
    { label: 'Floors monitored', value: String(floorSummaries.length), helper: 'Ground, Floor 1, Floor 2, Tower B' },
    { label: 'Rooms scheduled', value: String(roomSchedules.length), helper: 'Critical rooms surfaced here' },
    { label: 'Zone load', value: `${totalBemsUsage.toFixed(1)} kWh`, helper: 'Live sampled energy status' }
  ];

  const scheduleKpis = [
    { label: 'Rooms scheduled', value: String(roomSchedules.length), helper: 'Schedule Summary page' },
    { label: 'Occupied rooms', value: String(roomSchedules.filter((room) => room.mode === 'Occupied').length), helper: 'Live occupied mode' },
    { label: '24/7 spaces', value: String(roomSchedules.filter((room) => room.schedule === '24/7').length), helper: 'Critical operations' },
    { label: 'Overrides', value: String(roomSchedules.filter((room) => room.override !== 'None').length), helper: 'Auto-clear, locked, and AI trim states' }
  ];
  const scheduleHierarchy = [
    { label: 'Building', value: 'EnergyBuildAI Tower', helper: 'Schedule root' },
    { label: 'Floors', value: `${floorSummaries.length} schedule groups`, helper: 'Ground, Floor 1, Floor 2, Tower B' },
    { label: 'Zones', value: `${energyZones.length} monitored`, helper: 'Energy and comfort groups' },
    { label: 'Rooms', value: `${roomSchedules.length} scheduled`, helper: 'Mode, setpoint, and active window' }
  ];

  const activeKpis = isAlarmView ? alarmKpis : isBuildingView ? buildingKpis : isScheduleView ? scheduleKpis : commandKpis;
  const heroTitle = isAlarmView
    ? ''
      : isBuildingView
        ? ''
      : isScheduleView
        ? ''
      : '';
  const heroCopy = isAlarmView
    ? ''
    : isBuildingView
      ? ''
      : isScheduleView
        ? ''
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
          { label: 'Schedule Summary', value: 'Synced' }
        ]
      : isScheduleView
        ? [
            { label: 'Schedule Summary', value: 'Active' },
            { label: 'Rooms', value: `${roomSchedules.length} listed` },
            { label: 'Sync State', value: 'Current' }
          ]
      : [
          { label: 'Controller Status', value: 'Healthy' },
          { label: 'Data Latency', value: '2.4 s' },
          { label: 'Efficiency Index', value: '87%' }
        ];

  return (
    <main className={`dashboard-page ecostruxure-dashboard ${isAlarmView ? 'is-alarm-dashboard' : ''}`} id="dashboard">
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
              {operationNavLabels[item]}
            </button>
          ))}
        </nav>
      </aside>

      <div className="eco-workspace">
        <section className="eco-topbar">
          <div>
            <p className="detail-kicker">EnergyBuildAI</p>
            <h1>{isAlarmView ? 'Alarm Response Center' : isBuildingView ? 'Building Summary' : isScheduleView ? 'Schedule Summary' : 'Building Operation Center'}</h1>
          </div>
          <div className="eco-topbar-actions">
            <span className="eco-live-pill">Live</span>
            <button type="button" className="cta-button" onClick={handleHeatmapScroll}>
              Building Energy Status
            </button>
            {!isScheduleView && (
              <button
                type="button"
                className="cta-button secondary-cta"
                onClick={() => jumpToDashboardContent('Schedules')}
              >
                Schedule Summary
              </button>
            )}
            <button
              type="button"
              className="cta-button secondary-cta"
              onClick={() => jumpToDashboardContent(isAlarmView || isBuildingView || isScheduleView ? 'Overview' : 'Alarms')}
            >
              {isAlarmView || isBuildingView || isScheduleView ? 'Overview' : 'Alarm Details'}
            </button>
            <a href="#projects" className="cta-button secondary-cta">
              Back to Projects
            </a>
          </div>
        </section>

        {(isAlarmView || isBuildingView) && (
          <section className="eco-command-hero" data-copy-version="building-helper-removed">
            {(heroTitle || heroCopy) && (
              <div>
                {heroTitle && <h2>{heroTitle}</h2>}
                {heroCopy && <p>{heroCopy}</p>}
              </div>
            )}
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
          {activeKpis.map((kpi) => {
            const isActiveAlarmKpi = kpi.label === 'Active alarms';
            const kpiContent = (
              <>
                <span>{kpi.label}</span>
                <strong>{kpi.value}</strong>
                <small>{kpi.helper}</small>
              </>
            );

            return isActiveAlarmKpi ? (
              <button
                type="button"
                className="eco-kpi eco-kpi-action"
                key={kpi.label}
                onClick={openActiveAlarmDetails}
                aria-label="Open active alarm details and acknowledgement page"
              >
                {kpiContent}
              </button>
            ) : (
              <article className="eco-kpi" key={kpi.label}>
                {kpiContent}
              </article>
            );
          })}
        </section>

        {isAlarmView ? (
          <section className="eco-dashboard-grid eco-alarm-page" aria-label="Alarm details dashboard">
            <article className="eco-card eco-card-wide eco-alarm-detail-card" id="alarm-detail-page">
              <div className="eco-card-heading">
                <div>
                  <span>Selected Alarm</span>
                  <h2>{selectedAlarm.type}</h2>
                  <p>{selectedAlarm.cause}</p>
                </div>
                <strong>{selectedAlarmDisplayStatus}</strong>
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

            <article className="eco-card eco-card-wide eco-alarm-ack-card" id="alarm-acknowledge-page">
              <div className="eco-card-heading">
                <div>
                  <span>Alarm Acknowledge Page</span>
                  <h2>Acknowledge Selected Alarm</h2>
                  <p>Operator acknowledgement records ownership for {selectedAlarm.id} before response actions continue.</p>
                </div>
                <strong>{selectedAlarmAcknowledged ? 'Acknowledged' : 'Pending'}</strong>
              </div>
              <div className="eco-acknowledge-grid">
                <section>
                  <span>Alarm</span>
                  <strong>{selectedAlarm.id}</strong>
                  <small>{selectedAlarm.type} | {selectedAlarm.priority} priority</small>
                </section>
                <section>
                  <span>Owner</span>
                  <strong>{selectedAlarm.owner}</strong>
                  <small>{selectedAlarm.sla}</small>
                </section>
                <section>
                  <span>Location</span>
                  <strong>{selectedAlarm.zone}</strong>
                  <small>{selectedAlarm.room}</small>
                </section>
              </div>
              <button type="button" className="cta-button eco-acknowledge-button" onClick={acknowledgeSelectedAlarm}>
                {selectedAlarmAcknowledged ? 'Acknowledgement Recorded' : 'Acknowledge Alarm'}
              </button>
              <p className="eco-acknowledge-note">
                {selectedAlarmAcknowledged
                  ? `Acknowledgement recorded for ${selectedAlarm.id} in this console session.`
                  : 'Acknowledge before applying response actions or closing the alarm.'}
              </p>
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
                    <small>{event.type} | {getAlarmDisplayStatus(event)}</small>
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
                  <h2>Building Summary</h2>
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
                {energyZones.map((zone) => {
                  const occupancyState = getOccupancyState(zone.occupancy);

                  return (
                    <section className={`zone-${zone.heat} occupancy-${occupancyState}`} key={`${zone.name}-building-zone`}>
                      <div>
                        <strong>{zone.name}</strong>
                        <span>{zone.kwh} kWh | {zone.temp}</span>
                      </div>
                      <small>
                        {zone.risk} risk |{' '}
                        <span className={`eco-occupancy-pill occupancy-${occupancyState}`}>
                          {zone.occupancy} {occupancyLabels[occupancyState]}
                        </span>{' '}
                        | {zone.action}
                      </small>
                    </section>
                  );
                })}
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
                    <em>{system.feedback}</em>
                    <em>{system.action}</em>
                  </section>
                ))}
              </div>
            </article>

          </section>
        ) : isScheduleView ? (
          <section className="eco-dashboard-grid eco-schedule-page" aria-label="Building floor zone room schedule summary subpage">
            <article className="eco-card eco-card-wide">
              <div className="eco-card-heading">
                <div>
                  <h2>Building Schedule Summary</h2>
                </div>
                <strong>{roomSchedules.length} rooms</strong>
              </div>
              <div className="eco-schedule-path" aria-label="Schedule hierarchy">
                {scheduleHierarchy.map((item) => (
                  <section key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <small>{item.helper}</small>
                  </section>
                ))}
              </div>
              <div className="eco-room-summary-grid">
                {roomSchedules.map((room) => (
                  <section key={`${room.room}-summary`}>
                    <span>{room.room}</span>
                    <strong>{room.mode}</strong>
                    <small>EnergyBuildAI Tower | {room.floor} | {room.zone} | {room.schedule} | {room.nextEvent}</small>
                  </section>
                ))}
              </div>
            </article>

            <article className="eco-card eco-card-wide">
              <div className="eco-schedule-table" role="table" aria-label="Building floor zone room schedule details">
                <div role="row">
                  <span role="columnheader">Building</span>
                  <span role="columnheader">Floor</span>
                  <span role="columnheader">Zone</span>
                  <span role="columnheader">Room</span>
                  <span role="columnheader">Schedule</span>
                  <span role="columnheader">Mode</span>
                  <span role="columnheader">Setpoint</span>
                  <span role="columnheader">Source</span>
                  <span role="columnheader">Next Event</span>
                  <span role="columnheader">Override</span>
                  <span role="columnheader">Control Intent</span>
                </div>
                {roomSchedules.map((room) => (
                  <div role="row" key={`${room.room}-schedule-page`}>
                    <strong role="cell">EnergyBuildAI Tower</strong>
                    <span role="cell">{room.floor}</span>
                    <span role="cell">{room.zone}</span>
                    <span role="cell">{room.room}</span>
                    <span role="cell">{room.schedule}</span>
                    <span role="cell">{room.mode}</span>
                    <span role="cell">{room.setpoint}</span>
                    <span role="cell">{room.source}</span>
                    <span role="cell">{room.nextEvent}</span>
                    <span role="cell">{room.override}</span>
                    <span role="cell">{room.intent}</span>
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
                {energyZones.map((zone) => {
                  const occupancyState = getOccupancyState(zone.occupancy);

                  return (
                    <article
                      className={`floorplan-zone floorplan-${zone.area} occupancy-${occupancyState}`}
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
                        <span className={`zone-occupancy-value occupancy-${occupancyState}`}>
                          <small>Occupancy</small>
                          {zone.occupancy} {occupancyLabels[occupancyState]}
                        </span>
                      </div>
                      <div className="zone-action">
                        <small>Recommended BEMS Action</small>
                        <span>{zone.action}</span>
                      </div>
                    </article>
                  );
                })}
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
                <div className="heatmap-legend" aria-label="Occupancy color legend">
                  <span className="occupancy-empty">Empty</span>
                  <span className="occupancy-occupied">Occupied</span>
                  <span className="occupancy-full">Full</span>
                </div>
              </aside>
            </div>
          </article>

          <article className="eco-card eco-building-brief" id="building-summary-brief">
            <div className="eco-card-heading">
              <div>
                <span>Building</span>
                <h2>Building Summary</h2>
              </div>
              <button type="button" className="eco-inline-action" onClick={() => jumpToDashboardContent('Building')}>
                Full Building
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
              {energyZones.map((zone) => {
                const occupancyState = getOccupancyState(zone.occupancy);

                return (
                  <section className={`zone-${zone.heat} occupancy-${occupancyState}`} key={`${zone.name}-status`}>
                    <div>
                      <strong>{zone.name}</strong>
                      <span>{zone.kwh} kWh | {zone.temp}</span>
                    </div>
                    <small>
                      {zone.risk} risk |{' '}
                      <span className={`eco-occupancy-pill occupancy-${occupancyState}`}>
                        {zone.occupancy} {occupancyLabels[occupancyState]}
                      </span>
                    </small>
                  </section>
                );
              })}
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
                  <em>{system.feedback}</em>
                  <em>{system.action}</em>
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

        </section>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
