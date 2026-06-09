import React from 'react';

const accessProfiles = [
  { id: 'operator', label: 'Operator', scope: 'Live dashboards, alarms, and schedules' },
  { id: 'engineer', label: 'Engineer', scope: 'Optimization, devices, and service diagnostics' },
  { id: 'admin', label: 'Admin', scope: 'Users, roles, audit trail, and integrations' }
];

const systemChecks = [
  { label: 'Node API', value: 'Online', tone: 'good' },
  { label: 'MySQL', value: 'Synced', tone: 'good' },
  { label: 'Edge Core', value: 'Polling', tone: 'watch' },
  { label: 'BEMS-ai', value: 'Ready', tone: 'good' }
];

const facilityStats = [
  { label: 'Comfort Risk', value: 'Moderate' },
  { label: 'Active Alarms', value: '3' },
  { label: 'Peak Load', value: '24.1 kWh' }
];

function BmsLogin() {
  const [activeProfile, setActiveProfile] = React.useState(accessProfiles[0].id);
  const [loginMessage, setLoginMessage] = React.useState('Demo mode: credentials are not sent to a server.');

  const selectedProfile = accessProfiles.find((profile) => profile.id === activeProfile);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginMessage(`${selectedProfile.label} console preview unlocked for portfolio review.`);
  };

  return (
    <main className="bms-login-page" id="bms-login">
      <section className="bms-login-shell">
        <div className="container bms-login-layout">
          <div className="bms-login-copy">
            <p className="detail-kicker">BMS Secure Access</p>
            <h1>Building Management Login</h1>
            <p>
              Operator access concept for the BEMS project, connecting role-based login, facility telemetry,
              API readiness, and BEMS-ai optimization status in one focused entry point.
            </p>

            <div className="bms-stat-row" aria-label="BMS facility status summary">
              {facilityStats.map((stat) => (
                <article className="bms-stat" key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <form className="bms-login-form" onSubmit={handleSubmit}>
            <div className="login-panel-heading">
              <div>
                <span className="login-lock-mark" aria-hidden="true">BMS</span>
                <h2>Sign In</h2>
              </div>
              <span className="login-status-pill">Demo</span>
            </div>

            <div className="profile-tabs" role="tablist" aria-label="Access profile">
              {accessProfiles.map((profile) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeProfile === profile.id}
                  className={activeProfile === profile.id ? 'profile-tab active' : 'profile-tab'}
                  key={profile.id}
                  onClick={() => setActiveProfile(profile.id)}
                >
                  {profile.label}
                </button>
              ))}
            </div>
            <p className="profile-scope">{selectedProfile.scope}</p>

            <label className="form-field">
              <span>Email</span>
              <input type="email" name="email" placeholder="rheslar@gmail.com" autoComplete="email" />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input type="password" name="password" placeholder="Enter demo password" autoComplete="current-password" />
            </label>

            <div className="login-options">
              <label>
                <input type="checkbox" name="remember" />
                <span>Remember console</span>
              </label>
              <a href="#project/bems">Project details</a>
            </div>

            <button className="login-submit" type="submit">Access Console</button>
            <p className="login-message" aria-live="polite">{loginMessage}</p>
          </form>

          <aside className="bms-system-panel" aria-label="BMS system readiness">
            <div className="system-panel-heading">
              <div>
                <p className="detail-kicker">System Readiness</p>
                <h2>Service Handshake</h2>
              </div>
              <span>Live mock</span>
            </div>

            <div className="system-check-list">
              {systemChecks.map((check) => (
                <article className={`system-check ${check.tone}`} key={check.label}>
                  <span>{check.label}</span>
                  <strong>{check.value}</strong>
                </article>
              ))}
            </div>

            <div className="login-activity">
              <h3>Recent Access Events</h3>
              <ol>
                <li>Operator role requested dashboard session</li>
                <li>BEMS-ai service returned optimization ready</li>
                <li>Edge core reported BACnet polling active</li>
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default BmsLogin;
