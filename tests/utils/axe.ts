import type { Page } from '@playwright/test';
import { checkA11y as checkA11yLib } from 'axe-playwright';

export async function injectAxe(_page: Page): Promise<void> {
  // no-op (axe-playwright injects axe-core internally)
}

export async function checkA11y(page: Page): Promise<{ violations: any[] }> {
  const results: any = await checkA11yLib(page, {
    detailedReport: true,
    tags: ['wcag2a', 'wcag2aa'],
  });

  // axe-playwright returns { violations } in normal cases.
  // If the returned payload changes, default to an empty list.
  return { violations: results?.violations ?? [] };
}





