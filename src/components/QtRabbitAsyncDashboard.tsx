import React, { useState, useEffect } from 'react';

type OtaState = 'Idle' | 'Downloading' | 'Installing' | 'Complete' | 'Failed';

const initialDevices = [
  { id: 'device-001', status: 'online', value: 'OK' },
  { id: 'device-002', status: 'online', value: '18.7 kWh' },
  { id: 'device-003', status: 'offline', value: 'last seen 2h ago' },
  { id: 'device-004', status: 'updating', value: 'OTA 60%' },
  { id: 'device-005', status: 'online', value: 'normal' }
];

function QtRabbitAsyncDashboard() {
  const [selectedDeviceId, setSelectedDeviceId] = useState('device-001');
  const [firmwarePath, setFirmwarePath] = useState('/tmp/firmware.bin');
  const [connectionStatus, setConnectionStatus] = useState('unknown');
  const [devices, setDevices] = useState<Array<{id: string, status: string, value: string}>>([]);
  const [publishProgress, setPublishProgress] = useState(0);
  const [otaState, setOtaState] = useState<OtaState>('Idle');
  const [otaProgress, setOtaProgress] = useState(0);

  useEffect(() => {
    setDevices(initialDevices);
    const timer = setInterval(() => {
      if (otaState !== 'Idle' && otaState !== 'Complete' && otaState !== 'Failed') {
        setOtaProgress(prev => {
          const next = prev + 10;
          if (next >= 100) {
            setOtaState('Complete');
            return 100;
          }
          return next;
        });
      }
    }, 200);
    return () => clearInterval(timer);
  }, [otaState]);

  useEffect(() => {
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
      } else if (data.type === 'otaFinished') {
        setOtaState(data.success ? 'Complete' : 'Failed');
      }
    };
    return () => ws.close();
  }, []);

  const sendCloudMessage = () => {
    setPublishProgress(0);
    setTimeout(() => setPublishProgress(1), 300);
    fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: JSON.stringify({ device: selectedDeviceId, status: 'online' }) })
    });
  };

  const startOta = () => {
    setOtaState('Downloading');
    setOtaProgress(0);
    fetch('/api/ota', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: selectedDeviceId, firmwarePath })
    });
  };

  return (
    <div className="qtrabbit-dashboard">
      <header className="dashboard-header">
        <h1>QtRabbitAsync Dashboard</h1>
        <p>Qt QPromise/QFuture Async Patterns with RabbitMQ + OTA</p>
      </header>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span>Backend Status</span>
          <strong>{connectionStatus === 'connected' ? 'Online' : 'Offline'}</strong>
          <small>WebSocket connection</small>
        </div>
        <div className="kpi-card">
          <span>Publish Progress</span>
          <strong>{Math.round(publishProgress * 100)}%</strong>
          <small>Async message ACK</small>
        </div>
        <div className="kpi-card">
          <span>OTA State</span>
          <strong>{otaState}</strong>
          <small>{otaProgress}% complete</small>
        </div>
        <div className="kpi-card">
          <span>Connected Devices</span>
          <strong>{devices.length}</strong>
          <small>Device registry</small>
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
        <label>OTA Progress ({otaState})</label>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${otaProgress}%` }}></div>
        </div>
      </div>

      <div className="status-indicator">
        Connection: <span className={connectionStatus}>{connectionStatus}</span>
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