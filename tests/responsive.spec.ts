/**
 * Responsive / Mobile Tests — concert.ua
 * Section: Адаптивність / Мобайл
 * Contains 10 positive functional tests
 * Covers TC-RES-001 through TC-RES-010
 *
 * Key findings:
 * - Site uses responsive design with .header__menu-btn (hamburger) on mobile
 * - Search icon .js-header-search-btn is also used on mobile
 * - nav.main-menu may be hidden on mobile, replaced by hamburger menu
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Адаптивність / Мобайл (Responsive / Mobile)', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookieBanner(page);
  });

  test('[TC-RES-001] Home page renders on mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title, 'Home page should load on mobile viewport').toBeTruthy();
  });

  test('[TC-RES-002] Home page renders on tablet viewport (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title, 'Home page should load on tablet viewport').toBeTruthy();
  });

  test('[TC-RES-003] Hamburger menu button visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const hamburger = page.locator('.header__menu-btn, .js-header-menu-btn').first();
    await expect(hamburger, 'Hamburger menu button should be visible on mobile').toBeVisible();
  });

  test('[TC-RES-004] No horizontal scroll on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5;
    });
    expect(hasHorizontalScroll, 'Page should not have significant horizontal scroll').toBeFalsy();
  });

  test('[TC-RES-005] Header logo visible on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const logo = page.locator('a.header__logo').first();
    await expect(logo, 'Logo should be visible on mobile').toBeVisible();
  });

  test('[TC-RES-006] Event cards are displayed on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const events = page.locator('a.event-card, .event-card');
    const count = await events.count();
    expect(count, 'Events should display on mobile viewport').toBeGreaterThan(0);
  });

  test('[TC-RES-007] Footer is visible on mobile after scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator('footer.footer').first();
    await expect(footer, 'Footer should be visible after scrolling on mobile').toBeVisible();
  });

  test('[TC-RES-008] Page content adjusts between viewport sizes', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const desktopWidth = await page.evaluate(() => document.body.clientWidth);

    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForLoadState('domcontentloaded');
    const mobileWidth = await page.evaluate(() => document.body.clientWidth);

    expect(mobileWidth, 'Content width should be narrower on mobile').toBeLessThan(desktopWidth);
  });

  test('[TC-RES-009] Touch-friendly tap targets on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const hamburger = page.locator('.header__menu-btn').first();
    if (await hamburger.isVisible()) {
      const box = await hamburger.boundingBox();
      if (box) {
        expect(box.height, 'Hamburger button should be at least 30px tall').toBeGreaterThanOrEqual(30);
        expect(box.width, 'Hamburger button should be at least 30px wide').toBeGreaterThanOrEqual(30);
      }
    }
  });

  test('[TC-RES-010] Viewport meta tag is present', async ({ page }) => {
    await page.goto('/uk/kyiv');
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta, 'Viewport meta tag should be present').toBeTruthy();
    expect(viewportMeta, 'Viewport should contain width=device-width').toContain('width=device-width');
  });
});
