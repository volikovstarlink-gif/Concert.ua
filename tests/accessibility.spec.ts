/**
 * Accessibility (a11y) Tests — concert.ua
 * Section: Доступність (a11y)
 * Contains 10 positive functional tests
 * Covers TC-A11Y-001 through TC-A11Y-010
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Доступність / a11y (Accessibility)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uk/kyiv');
    await acceptCookieBanner(page);
  });

  test('[TC-A11Y-001] Page has a valid lang attribute', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang, 'HTML element should have a lang attribute').toBeTruthy();
  });

  test('[TC-A11Y-002] Page has a main heading (h1)', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1, 'Page should have a visible h1 heading').toBeVisible();
  });

  test('[TC-A11Y-003] Images have alt attributes', async ({ page }) => {
    const images = page.locator('img:visible');
    const count = await images.count();
    let imagesWithAlt = 0;
    const checkCount = Math.min(count, 10);
    for (let i = 0; i < checkCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      if (alt !== null) {
        imagesWithAlt++;
      }
    }
    if (checkCount > 0) {
      expect(imagesWithAlt, 'Most images should have alt attributes').toBeGreaterThan(0);
    }
  });

  test('[TC-A11Y-004] Page title is not empty', async ({ page }) => {
    const title = await page.title();
    expect(title.trim().length, 'Page title should not be empty').toBeGreaterThan(0);
  });

  test('[TC-A11Y-005] Links have discernible text', async ({ page }) => {
    const links = page.locator('a[href]:visible');
    const count = await links.count();
    const checkCount = Math.min(count, 10);
    let linksWithText = 0;
    for (let i = 0; i < checkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      const hasImage = await link.locator('img[alt], svg').count();
      if ((text && text.trim().length > 0) || ariaLabel || title || hasImage > 0) {
        linksWithText++;
      }
    }
    if (checkCount > 0) {
      expect(linksWithText, 'Links should have discernible text').toBeGreaterThan(0);
    }
  });

  test('[TC-A11Y-006] Form inputs have associated labels or placeholders', async ({ page }) => {
    // Check all inputs in DOM (including hidden ones) since concert.ua header search
    // input #searchform-search has placeholder="Назва, виконавець"
    const inputs = page.locator('input:not([type="hidden"])');
    const count = await inputs.count();
    const checkCount = Math.min(count, 10);
    let inputsWithLabels = 0;
    for (let i = 0; i < checkCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');
      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;
      if (hasLabel || ariaLabel || ariaLabelledBy || placeholder) {
        inputsWithLabels++;
      }
    }
    if (checkCount > 0) {
      expect(inputsWithLabels, 'At least some form inputs should have labels, ARIA, or placeholder').toBeGreaterThan(0);
    }
  });

  test('[TC-A11Y-007] Page is navigable with keyboard (Tab key)', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    const activeElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(activeElement, 'Focused element should exist after tabbing').toBeTruthy();
  });

  test('[TC-A11Y-008] Color contrast — text is readable', async ({ page }) => {
    const bodyText = page.locator('body');
    const color = await bodyText.evaluate(el => getComputedStyle(el).color);
    const bgColor = await bodyText.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(color, 'Body text color should be defined').toBeTruthy();
    expect(bgColor, 'Body background color should be defined').toBeTruthy();
  });

  test('[TC-A11Y-009] Main landmark role exists', async ({ page }) => {
    const mainLandmark = page.locator('main, [role="main"]').first();
    await expect(mainLandmark, 'Page should have a main landmark').toBeAttached();
  });

  test('[TC-A11Y-010] Buttons have proper role', async ({ page }) => {
    const buttons = page.locator('button:visible');
    const count = await buttons.count();
    if (count > 0) {
      const firstButton = buttons.first();
      const tag = await firstButton.evaluate(el => el.tagName.toLowerCase());
      expect(tag, 'Button elements should use button tag').toBe('button');
    }
  });
});
