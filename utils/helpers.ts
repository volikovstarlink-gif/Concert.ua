import { type Page, expect } from '@playwright/test';

/**
 * Dismisses the cookie/GDPR consent banner if it appears.
 * Concert.ua uses "Прийняти все" button.
 * Idempotent — safe to call multiple times.
 */
export async function acceptCookieBanner(page: Page): Promise<void> {
  const btn = page.locator('button:has-text("Прийняти все")').first();
  if (await btn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await btn.click().catch(() => {});
    // Wait for banner to disappear
    await btn.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
  }
}

/**
 * Waits until the page has finished loading.
 */
export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Verifies that all visible images on the page have loaded successfully.
 * Checks up to maxCount images.
 */
export async function assertImagesLoaded(page: Page, maxCount = 10): Promise<void> {
  const images = page.locator('img[src]:visible');
  const count = await images.count();

  for (let i = 0; i < Math.min(count, maxCount); i++) {
    const img = images.nth(i);
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    expect(naturalWidth, `Image ${i} should be loaded`).toBeGreaterThan(0);
  }
}

/**
 * Checks that the URL contains the expected path or query parameter.
 */
export async function assertUrlContains(page: Page, substring: string): Promise<void> {
  await expect(page, `URL should contain "${substring}"`).toHaveURL(new RegExp(substring));
}
