import type { Page } from '@playwright/test';

export async function ensurePageLoaded(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load');
}

