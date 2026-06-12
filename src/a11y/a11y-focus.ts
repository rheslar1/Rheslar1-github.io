export function enablePersistentFocus(): void {
  document.documentElement.dataset['focusSnapshot'] = 'enabled';
  document.documentElement.setAttribute('data-focus-snapshot', 'enabled');
}

export function disablePersistentFocus(): void {
  delete document.documentElement.dataset['focusSnapshot'];
  document.documentElement.removeAttribute('data-focus-snapshot');
}


