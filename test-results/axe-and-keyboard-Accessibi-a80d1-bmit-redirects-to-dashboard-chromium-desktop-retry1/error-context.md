# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: axe-and-keyboard.spec.ts >> Accessibility + keyboard smoke >> bms login - keyboard submit redirects to dashboard
- Location: tests/axe-and-keyboard.spec.ts:23:7

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /access console/i }) to be visible

```

# Page snapshot

```yaml
- link "Skip to main content" [ref=e1] [cursor=pointer]:
  - /url: "#main-content"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { injectAxe, checkA11y } from './utils/axe';
  3  | import { enableFocusSnapshotOnPage } from './utils/focus';
  4  | import { ensurePageLoaded } from './utils/http';
  5  | 
  6  | const gotoHash = async (page: import('@playwright/test').Page, hash: string) => {
  7  |   await ensurePageLoaded(page, `/index.html${hash}`);
  8  | };
  9  | 
  10 | test.describe('Accessibility + keyboard smoke', () => {
  11 |   test('home route - axe checks', async ({ page }) => {
  12 |     await gotoHash(page, '');
  13 |     await injectAxe(page);
  14 |     const results = await checkA11y(page);
  15 | 
  16 |     // Report but don't fail on known issues until semantic structure is updated.
  17 |     // Fail only on serious violations.
  18 |     const serious = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
  19 |     expect(serious).toEqual([]);
  20 | 
  21 |   });
  22 | 
  23 |   test('bms login - keyboard submit redirects to dashboard', async ({ page }) => {
  24 |     await page.goto('/index.html#bms-login');
  25 | 
  26 |     // Wait for the BMS login form to render.
  27 |     const submit = page.getByRole('button', { name: /access console/i });
> 28 |     await submit.waitFor({ state: 'visible', timeout: 10_000 });
     |                  ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  29 | 
  30 |     const usernameInput = page.locator('input[name="username"], input#username, input[placeholder*="user"], input[placeholder*="admin"]').first();
  31 |     const passwordInput = page.locator('input[name="password"], input#password, input[placeholder*="pass"], input[placeholder*="admin"]').first();
  32 | 
  33 |     await usernameInput.waitFor({ state: 'visible', timeout: 10_000 });
  34 |     await passwordInput.waitFor({ state: 'visible', timeout: 10_000 });
  35 | 
  36 |     // Keyboard-only: tab through and type.
  37 |     await page.keyboard.press('Tab');
  38 |     await page.keyboard.type('operator');
  39 |     await page.keyboard.press('Tab');
  40 |     await page.keyboard.type('admin');
  41 | 
  42 |     await submit.focus();
  43 |     await page.keyboard.press('Enter');
  44 | 
  45 |     await page.waitForURL('**/index.html#dashboard*');
  46 |   });
  47 | 
  48 |   test('focus snapshot - visible focus targets rendered (snapshot artifacts)', async ({ page }, testInfo) => {
  49 |     await enableFocusSnapshotOnPage(page);
  50 |     await page.goto('/index.html#bms-login');
  51 | 
  52 |     // Move focus around to capture focus rings.
  53 |     await page.keyboard.press('Tab');
  54 |     await page.keyboard.press('Tab');
  55 |     await page.keyboard.press('Tab');
  56 | 
  57 |     // Capture screenshots (matrix will consume them)
  58 |     await page.waitForTimeout(250);
  59 |     await page.screenshot({ path: testInfo.outputPath('focus-bms-login.png'), fullPage: true });
  60 |   });
  61 | });
  62 | 
  63 | 
```