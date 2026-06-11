import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App';

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean;
};

actEnvironment.IS_REACT_ACT_ENVIRONMENT = true;

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
