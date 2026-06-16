import React, { useState, useEffect } from 'react';

type OccupancyState = 'empty' | 'occupied' | 'full';

const occupancyLabels: Record<OccupancyState, string> = {
  empty: 'Empty',
  occupied: 'Occupied',
  full: 'Full'
};

const getOccupancyState = (occupancy: string): OccupancyState => {
  const percentage = Number.parseFloat(occupancy);
  if (Number.isNaN(percentage)) return 'occupied';
  if (percentage >= 80) return 'full';
  if (percentage <= 25) return 'empty';
  return 'occupied';
};

const energyZones = [
  { name: 'Lobby', area: 'lobby', kwh: 8.4, temp: '21.9 C', risk: 'Low', action: 'Hold setpoint', heat: 'normal', occupancy: '42%' },
  { name: 'Floor 1', area: 'floor-one', kwh: 18.7, temp: '23.4 C', risk: 'Elevated', action: 'Trim VAV airflow', heat: 'mid', occupancy: '71%' },
  { name: 'Floor 2', area: 'floor-two', kwh: 11.2, temp: '22.1 C', risk: 'Normal', action: 'Maintain schedule', heat: 'normal', occupancy: '58%' },
  { name: 'Tower B Lobby', area: 'tower-lobby', kwh: 5.6, temp: '21.4 C', risk: 'Low', action: 'Keep lights off', heat: 'cold', occupancy: '18%' },
  { name: 'Tower B Floor 1', area: 'tower-floor', kwh: 24.1, temp: '24.0 C', risk: 'High', action: 'Reduce peak load', heat: 'hot', occupancy: '83%' }
];

const simulatedDevices = [
  { id: 'device-001', status: 'online', value: 'OK' },
  { id: 'device-002', status: 'online', value: '18.7 kWh' },
  { id: 'device-003', status: 'offline', value: 'last seen 2h ago' },
  { id: 'device-004', status: 'updating', value: 'OTA 60%' },
  { id: 'device-005', status: 'online', value: 'normal' }
];

const alarmEvents = [
  {
    id: 'ALM-1042',
    zone: 'Tower B Floor 1',
    type: 'Demand peak',
    priority: 'High',
    status: 'Active',
    reading: '24.1 kWh interval',
    sla: '4 min dispatch'
  },
  {
    id: 'ALM-1038',
    zone: 'Floor 1 AHU',
    type: 'Static pressure drift',
    priority: 'Medium',
    status: 'Acknowledged',
    reading: '1.9 in. w.c.',
    sla: '12 min review'
  },
  {
    id: 'ALM-1029',
    zone: 'Lobby Lighting',
    type: 'Schedule override',
    priority: 'Low',
    status: 'Auto-clear',
    reading: 'Manual override active',
    sla: 'Monitor only'
  }
];

function QtRabbitAsyncDashboard() {
  const [selectedDeviceId, setSelectedDeviceId] = useState('device-001');
  const [firmwarePath, setFirmwarePath] = useState('/tmp/firmware.bin');
  const [connectionStatus, setConnectionStatus] = useState('unknown');
  const [devices, setDevices] = useState<Array<{id: string, status: string, value: string}>>([]);
  const [publishProgress, setPublishProgress] = useState(0);
  const [otaProgress, setOtaProgress] = useState(0);
  const [otaStatus, setOtaStatus] = useState('Idle');

  // WebSocket connection for real-time updates
  useEffect(() => {
    setDevices(simulatedDevices);
    const ws = new WebSocket('ws://localhost:12345');
    
    ws.onopen = () => setConnectionStatus('connected');
    ws.onclose = () => setConnectionStatus('disconnected');
    ws.onerror = () => setConnectionStatus('error');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'deviceStatus') {
        setDevices(data.devices);
      } else if (data.type === 'publishProgress') {
        setPublishProgress(data.value);
      } else if (data.type === 'otaProgress') {
        setOtaProgress(data.percent);
        setOtaStatus(`Progress: ${data.percent}%`);
      } else if (data.type === 'otaFinished') {
        setOtaStatus(data.success ? 'OTA Complete' : `Failed: ${data.error}`);
        setOtaProgress(0);
      }
    };

    return () => ws.close();
  }, []);

  const sendCloudMessage = () => {
    fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: JSON.stringify({ device: selectedDeviceId, status: 'online' }) })
    });
  };

  const startOta = () => {
    setOtaStatus('Starting...');
    fetch('/api/ota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: selectedDeviceId, firmwarePath })
    });
  };

  const totalLoad = energyZones.reduce((sum, z) => sum + z.kwh, 0);

  return (
    <div className="qtrabbit-dashboard">
      <header className="dashboard-header">
        <h1>QtRabbitAsync Dashboard</h1>
        <p>MQTT/RabbitMQ + OTA Management with QtConcurrent</p>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Live Building Load</span>
          <strong>{totalLoad.toFixed(1)} kWh</strong>
          <small>Sampled across 5 zones</small>
        </div>
        <div className="kpi-card">
          <span>Peak Demand</span>
          <strong>24.1 kWh</strong>
          <small>Tower B Floor 1</small>
        </div>
        <div className="kpi-card critical">
          <span>Active Alarms</span>
          <strong>{alarmEvents.filter(e => e.status === 'Active').length}</strong>
          <small>{alarmEvents.filter(e => e.status === 'Active').length > 0 ? '1 high priority dispatch' : 'No active alarms'}</small>
        </div>
        <div className="kpi-card">
          <span>Connected Systems</span>
          <strong>{devices.length}</strong>
          <small>RabbitMQ + OTA</small>
        </div>
      </div>

      <div className="control-section">
        <input 
          type="text" 
          value={selectedDeviceId}
          onChange={e => setSelectedDeviceId(e.target.value)}
          placeholder="deviceId"
        />
        <input 
          type="text" 
          value={firmwarePath}
          onChange={e => setFirmwarePath(e.target.value)}
          placeholder="firmwarePath"
        />
        <button onClick={sendCloudMessage}>Send Cloud Message</button>
        <button onClick={startOta}>Start OTA</button>
      </div>

      <div className="progress-container">
        <label>Publish Progress</label>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${publishProgress * 100}%` }}></div>
        </div>
      </div>

      <div className="progress-container">
        <label>OTA Progress</label>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${otaProgress}%` }}></div>
        </div>
        <span>{otaStatus}</span>
      </div>

      <div className="status-indicator">
        Connection: <span className={connectionStatus}>{connectionStatus}</span>
      </div>

      <div className="zone-grid">
        {energyZones.map(zone => {
          const occupancyState = getOccupancyState(zone.occupancy);
          return (
            <div className={`zone-card ${zone.heat} occupancy-${occupancyState}`} key={zone.name}>
              <h3>{zone.name}</h3>
              <strong>{zone.kwh} kWh</strong>
              <small>{zone.temp} | {zone.risk} risk</small>
              <small>Occupancy: {zone.occupancy} {occupancyLabels[occupancyState]}</small>
            </div>
          );
        })}
      </div>

      <div className="device-table">
        <h2>Connected Devices</h2>
        <table>
          <thead>
            <tr><th>Device</th><th>Status</th><th>Value</th></tr>
          </thead>
          <tbody>
            {devices.length > 0 ? devices.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.status}</td>
                <td>{d.value}</td>
              </tr>
            )) : (
              <tr><td colSpan={3}>No devices connected</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QtRabbitAsyncDashboard;