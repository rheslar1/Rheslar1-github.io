import React from 'react';


const accessProfiles = [
  { id: 'operator', label: 'Operator', scope: 'Live dashboards, alarms, and schedules' },
  { id: 'engineer', label: 'Engineer', scope: 'Optimization, devices, and service diagnostics' },
  { id: 'admin', label: 'Admin', scope: 'Users, roles, audit trail, and integrations' }
] as const;

type AccessProfileId = typeof accessProfiles[number]['id'];

interface LoginMessage {
  tone: 'info' | 'error' | 'success';
  text: string;
}

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
  const [activeProfile, setActiveProfile] = React.useState<AccessProfileId>(accessProfiles[0].id);
  const [loginMessage, setLoginMessage] = React.useState<LoginMessage>({
    tone: 'info',
    text: 'Enter your credentials to open the EnergyBuildAI console.'
  });

  const selectedProfile = accessProfiles.find((profile) => profile.id === activeProfile) ?? accessProfiles[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get('username') || '').trim();
    const password = String(formData.get('password') || '').trim();
    const remember = formData.get('remember') === 'on';

    if (!username || !password) {
      setLoginMessage({
        tone: 'error',
        text: 'Username and password are required.'
      });
      return;
    }

    localStorage.setItem('energyBuildAI.session', JSON.stringify({
      profile: selectedProfile.id,
      username,
      remember,
      authenticatedAt: new Date().toISOString()
    }));
    setLoginMessage({
      tone: 'success',
      text: `${selectedProfile.label} session recorded. Opening dashboard...`
    });
    window.location.hash = 'dashboard';
  };

  return (
    <main className="bms-login-page" id="main-content" tabIndex={-1}>
      <section className="bms-login-shell">
        <div className="container bms-login-layout">
          <div className="bms-login-copy">
            <p className="detail-kicker">BMS Secure Access</p>
            <h1>Building Management Login</h1>
            <p>
              Live EnergyBuildAI access for role-based building operations, facility telemetry,
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
              <span className="login-status-pill">Live</span>
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
              <span>Username</span>
              <input type="text" name="username" placeholder="admin" autoComplete="username" required />
            </label>

            <label className="form-field">
              <span>Password</span>
              <input type="password" name="password" placeholder="admin" autoComplete="current-password" required />
            </label>

            <div className="login-options">
              <label>
                <input type="checkbox" name="remember" />
                <span>Remember console</span>
              </label>
              <a href="#project/bems">Project details</a>
            </div>

            <button className="login-submit" type="submit">Access Console</button>
            <p className={`login-message ${loginMessage.tone}`} aria-live="polite">{loginMessage.text}</p>
          </form>

          <aside className="bms-system-panel" aria-label="BMS system readiness">
            <div className="system-panel-heading">
              <div>
                <p className="detail-kicker">System Readiness</p>
                <h2>Service Handshake</h2>
              </div>
              <span>Live</span>
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
                <li>EnergyBuildAI role requested dashboard session</li>
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
