import type { Page } from '@playwright/test';

export async function enableFocusSnapshotOnPage(page: Page) {
  await page.evaluate(() => {
    document.documentElement.dataset.focusSnapshot = 'enabled';
    document.documentElement.setAttribute('data-focus-snapshot', 'enabled');
  });
}


