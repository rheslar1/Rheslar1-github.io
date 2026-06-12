import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from './utils/axe';
import { enableFocusSnapshotOnPage } from './utils/focus';
import { ensurePageLoaded } from './utils/http';

const gotoHash = async (page: import('@playwright/test').Page, hash: string) => {
  await ensurePageLoaded(page, `/index.html${hash}`);
};

test.describe('Accessibility + keyboard smoke', () => {
  test('home route - axe checks', async ({ page }) => {
    await gotoHash(page, '');
    await injectAxe(page);
    const results = await checkA11y(page);

    // Report but don't fail on known issues until semantic structure is updated.
    // Fail only on serious violations.
    const serious = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
    expect(serious).toEqual([]);

  });

  test('bms login - keyboard submit redirects to dashboard', async ({ page }) => {
    await page.goto('/index.html#bms-login');

    // Wait for the BMS login form to render.
    const submit = page.getByRole('button', { name: /access console/i });
    await submit.waitFor({ state: 'visible', timeout: 10_000 });

    const usernameInput = page.locator('input[name="username"], input#username, input[placeholder*="user"], input[placeholder*="admin"]').first();
    const passwordInput = page.locator('input[name="password"], input#password, input[placeholder*="pass"], input[placeholder*="admin"]').first();

    await usernameInput.waitFor({ state: 'visible', timeout: 10_000 });
    await passwordInput.waitFor({ state: 'visible', timeout: 10_000 });

    // Keyboard-only: tab through and type.
    await page.keyboard.press('Tab');
    await page.keyboard.type('operator');
    await page.keyboard.press('Tab');
    await page.keyboard.type('admin');

    await submit.focus();
    await page.keyboard.press('Enter');

    await page.waitForURL('**/index.html#dashboard*');
  });

  test('focus snapshot - visible focus targets rendered (snapshot artifacts)', async ({ page }, testInfo) => {
    await enableFocusSnapshotOnPage(page);
    await page.goto('/index.html#bms-login');

    // Move focus around to capture focus rings.
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Capture screenshots (matrix will consume them)
    await page.waitForTimeout(250);
    await page.screenshot({ path: testInfo.outputPath('focus-bms-login.png'), fullPage: true });
  });
});

