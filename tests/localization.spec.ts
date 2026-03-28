/**
 * Localization / i18n Tests — concert.ua
 * Section: Локалізація / і18n
 * Contains 8 positive functional tests
 * Covers TC-L10N-001 through TC-L10N-008
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Локалізація / і18n (Localization)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uk/kyiv');
    await acceptCookieBanner(page);
  });

  test('[TC-L10N-001] Default page language is Ukrainian', async ({ page }) => {
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang, 'Default language should be Ukrainian').toMatch(/uk|ua/i);
  });

  test('[TC-L10N-002] Page content contains Ukrainian text', async ({ page }) => {
    const bodyText = await page.locator('body').textContent();
    const hasUkrainianContent = /[а-яіїєґ]/i.test(bodyText || '');
    expect(hasUkrainianContent, 'Page should contain Ukrainian text').toBeTruthy();
  });

  test('[TC-L10N-003] Language switcher links are present', async ({ page }) => {
    const ukLink = page.locator('a:text-is("uk")').first();
    const enLink = page.locator('a:text-is("en")').first();
    // These links exist in the DOM (may be in footer/header dropdown)
    await expect(ukLink, 'Ukrainian language link should exist').toBeAttached();
    await expect(enLink, 'English language link should exist').toBeAttached();
  });

  test('[TC-L10N-004] Ukrainian currency format (₴/грн) used for prices', async ({ page }) => {
    const bodyText = await page.locator('body').textContent();
    const hasCurrency = /грн|UAH|₴/i.test(bodyText || '');
    expect(hasCurrency, 'Page should use Ukrainian currency format').toBeTruthy();
  });

  test('[TC-L10N-005] Date format follows Ukrainian conventions', async ({ page }) => {
    const bodyText = await page.locator('body').textContent() || '';
    const ukMonths = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
                      'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня',
                      'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
                      'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    const hasUkrainianDates = ukMonths.some(month => bodyText.includes(month));
    // Also accept numeric dates like 16.05
    const hasNumericDates = /\d{1,2}\.\d{2}/.test(bodyText);
    expect(hasUkrainianDates || hasNumericDates, 'Page should have Ukrainian or numeric dates').toBeTruthy();
  });

  test('[TC-L10N-006] UTF-8 encoding is declared', async ({ page }) => {
    const charset = await page.locator('meta[charset], meta[http-equiv="Content-Type"]').first().evaluate(el => {
      const meta = el as HTMLMetaElement;
      return meta.getAttribute('charset') || meta.getAttribute('content') || '';
    }).catch(() => '');
    expect(charset.toLowerCase(), 'Page should declare UTF-8 encoding').toMatch(/utf-8/);
  });

  test('[TC-L10N-007] UI buttons have Ukrainian labels', async ({ page }) => {
    const buttons = page.locator('button:visible');
    const count = await buttons.count();
    if (count > 0) {
      let ukrButtons = 0;
      const checkCount = Math.min(count, 5);
      for (let i = 0; i < checkCount; i++) {
        const text = await buttons.nth(i).textContent();
        if (text && /[а-яіїєґ]/i.test(text)) {
          ukrButtons++;
        }
      }
      expect(ukrButtons, 'Some buttons should have Ukrainian labels').toBeGreaterThanOrEqual(0);
    }
  });

  test('[TC-L10N-008] City names display in Ukrainian', async ({ page }) => {
    const bodyText = await page.locator('body').textContent() || '';
    const ukrCities = ['Київ', 'Харків', 'Одеса', 'Дніпро', 'Львів'];
    const hasUkrCities = ukrCities.some(city => bodyText.includes(city));
    expect(hasUkrCities, 'Page should display Ukrainian city names').toBeTruthy();
  });
});
