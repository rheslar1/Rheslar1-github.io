import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App';
import BmsLogin from './components/BmsLogin';

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean;
};

actEnvironment.IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true
  });
});

test('renders the loading screen before the portfolio is ready', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  let root: Root | undefined;

  act(() => {
    root = createRoot(container);
    root.render(<App />);
  });

  expect(container.textContent).toContain('Loading...');

  act(() => {
    root?.unmount();
  });
  container.remove();
});

test('redirects BMS login to the dashboard after successful credentials', () => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  window.location.hash = '#bms-login';
  localStorage.clear();
  let root: Root | undefined;

  act(() => {
    root = createRoot(container);
    root.render(<BmsLogin />);
  });

  const username = container.querySelector<HTMLInputElement>('input[name="username"]');
  const password = container.querySelector<HTMLInputElement>('input[name="password"]');
  const form = container.querySelector<HTMLFormElement>('form');

  expect(username).not.toBeNull();
  expect(password).not.toBeNull();
  expect(form).not.toBeNull();

  if (!username || !password || !form) {
    throw new Error('BMS login form did not render expected controls.');
  }

  username.value = 'admin';
  password.value = 'admin';

  act(() => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });

  expect(window.location.hash).toBe('#dashboard');
  expect(localStorage.getItem('energyBuildAI.session')).toContain('"username":"admin"');

  act(() => {
    root?.unmount();
  });
  container.remove();
  localStorage.clear();
  window.location.hash = '';
});

test('renders schedules directly from #dashboard/schedules without the removed intro copy', () => {
  jest.useFakeTimers();
  const container = document.createElement('div');
  document.body.appendChild(container);
  window.location.hash = '#dashboard/schedules';
  let root: Root | undefined;

  act(() => {
    root = createRoot(container);
    root.render(<App />);
  });

  act(() => {
    jest.advanceTimersByTime(600);
  });

  expect(container.textContent).toContain('Schedules');
  expect(container.textContent).toContain('Schedule Details');
  expect(container.textContent).toContain('Building Schedule Details');
  const hierarchyLabels = Array.from(container.querySelectorAll('.eco-schedule-path section > span')).map((node) => node.textContent);
  expect(hierarchyLabels).toEqual(['Building', 'Floors', 'Zones', 'Rooms']);
  const tableHeaderLabels = Array.from(container.querySelectorAll('.eco-schedule-table [role="columnheader"]'))
    .slice(0, 4)
    .map((node) => node.textContent);
  expect(tableHeaderLabels).toEqual(['Building', 'Floor', 'Zone', 'Room']);
  expect(container.textContent).not.toContain(['Building', 'Schedules'].join(' '));
  expect(container.textContent).not.toContain(['Building', 'Hierarchy'].join(' '));
  expect(container.textContent).not.toContain(['Building Zone', 'Floor Room', 'Schedules'].join(' '));
  expect(container.textContent).not.toContain('Dedicated schedule view organized from building to zone, floor, and room-level operating windows.');
  expect(container.querySelector('.eco-command-hero')).toBeNull();
  expect(container.textContent).not.toContain('Secure BMS Access');

  act(() => {
    root?.unmount();
  });
  container.remove();
  window.location.hash = '';
  jest.useRealTimers();
});

test('renders building dashboard without the removed helper copy', () => {
  jest.useFakeTimers();
  const container = document.createElement('div');
  document.body.appendChild(container);
  window.location.hash = '#dashboard/building';
  let root: Root | undefined;

  act(() => {
    root = createRoot(container);
    root.render(<App />);
  });

  act(() => {
    jest.advanceTimersByTime(600);
  });

  expect(container.textContent).toContain('Building Summary');
  expect(container.querySelector('.eco-command-hero h2')).toBeNull();
  expect(container.querySelector('.eco-command-hero p')).toBeNull();
  expect(container.textContent).not.toContain('Secure BMS Access');

  act(() => {
    root?.unmount();
  });
  container.remove();
  window.location.hash = '';
  jest.useRealTimers();
});
