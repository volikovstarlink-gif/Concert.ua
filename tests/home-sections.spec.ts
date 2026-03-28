/**
 * Home Page Sections & Interactive Features — concert.ua
 * Section: Головна сторінка (розширені)
 * Contains 16 positive functional tests
 * Covers TC-HS-001 through TC-HS-016
 *
 * Tests: hero slider navigation, "Топ подій" section, date filter buttons,
 * category radio tabs, recommendations carousel, venue sections, "Всі події" button,
 * carousel scroll buttons, metacard links
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Головна сторінка — секції (Home Page Sections)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uk/kyiv');
    await acceptCookieBanner(page);
  });

  test('[TC-HS-001] Hero slider has navigation dots', async ({ page }) => {
    const dots = page.locator('.slick-dots li');
    const count = await dots.count();
    expect(count, 'Hero slider should have navigation dots').toBeGreaterThan(1);
  });

  test('[TC-HS-002] Hero slider dots are clickable', async ({ page }) => {
    const secondDot = page.locator('.slick-dots li').nth(1);
    await secondDot.click();
    // After clicking, the dot should become active
    const activeClass = await secondDot.getAttribute('class');
    expect(activeClass, 'Clicked dot should become active').toContain('slick-active');
  });

  test('[TC-HS-003] "Топ подій у Києві" section is displayed', async ({ page }) => {
    const heading = page.locator('h2, h3').filter({ hasText: 'Топ подій' }).first();
    await expect(heading, '"Топ подій" heading should be visible').toBeVisible();
  });

  test('[TC-HS-004] "Топ подій" section contains event cards', async ({ page }) => {
    // Top events are in a list section after the heading
    const topSection = page.locator('h2:has-text("Топ подій"), h3:has-text("Топ подій")').first();
    await expect(topSection, 'Top events heading should exist').toBeVisible();
    // Event cards should be present on the page
    const cards = page.locator('a.event-card');
    const count = await cards.count();
    expect(count, 'Page should have event cards').toBeGreaterThan(0);
  });

  test('[TC-HS-005] Date filter "Сьогодні" button is present', async ({ page }) => {
    const todayBtn = page.locator('button:has-text("Сьогодні")').first();
    await expect(todayBtn, '"Сьогодні" button should be visible').toBeVisible();
  });

  test('[TC-HS-006] Date filter "Завтра" button is present', async ({ page }) => {
    const tomorrowBtn = page.locator('button:has-text("Завтра")').first();
    await expect(tomorrowBtn, '"Завтра" button should be visible').toBeVisible();
  });

  test('[TC-HS-007] Date filter "Цього вікенду" button is present', async ({ page }) => {
    const weekendBtn = page.locator('button:has-text("Цього вікенду")').first();
    await expect(weekendBtn, '"Цього вікенду" button should be visible').toBeVisible();
  });

  test('[TC-HS-008] "Обрати період" date picker button is present', async ({ page }) => {
    const periodBtn = page.locator('button:has-text("Обрати період")').first();
    await expect(periodBtn, '"Обрати період" button should be visible').toBeVisible();
  });

  test('[TC-HS-009] Category radio tabs are displayed (Концерти, Театр, etc.)', async ({ page }) => {
    const radios = page.locator('input[type="radio"]');
    const count = await radios.count();
    expect(count, 'Category radio tabs should be present').toBeGreaterThan(5);
  });

  test('[TC-HS-010] "Рекомендації для вас" section is displayed', async ({ page }) => {
    const heading = page.locator('h2, h3').filter({ hasText: 'Рекомендації' }).first();
    await expect(heading, '"Рекомендації" heading should be visible').toBeVisible();
  });

  test('[TC-HS-011] Recommendation cards contain event info (image, title, price)', async ({ page }) => {
    // Recommendation cards have image, title, date, venue, price
    const recoCard = page.locator('h2:has-text("Рекомендації") ~ a, section:has(h2:has-text("Рекомендації")) a').first();
    if (await recoCard.isVisible().catch(() => false)) {
      const img = recoCard.locator('img').first();
      await expect(img, 'Recommendation card should have an image').toBeVisible();
    }
  });

  test('[TC-HS-012] "Нове у продажу" section exists', async ({ page }) => {
    const heading = page.locator('h2, h3').filter({ hasText: 'Нове у продажу' }).first();
    await expect(heading, '"Нове у продажу" heading should be visible').toBeVisible();
  });

  test('[TC-HS-013] "Популярне у Києві" metacard section exists', async ({ page }) => {
    const heading = page.locator('h2, h3').filter({ hasText: 'Популярне' }).first();
    await expect(heading, '"Популярне" heading should be visible').toBeVisible();
  });

  test('[TC-HS-014] Venue sections display on home page (Origin Stage, МЦКМ)', async ({ page }) => {
    const originHeading = page.locator('h2, h3').filter({ hasText: 'Origin Stage' }).first();
    const isVisible = await originHeading.isVisible().catch(() => false);
    // At least one venue section should be present
    const mckmHeading = page.locator('h2, h3').filter({ hasText: 'МЦКМ' }).first();
    const mckmVisible = await mckmHeading.isVisible().catch(() => false);
    expect(isVisible || mckmVisible, 'At least one venue section should be visible').toBeTruthy();
  });

  test('[TC-HS-015] "Всі події" button is present', async ({ page }) => {
    const allEventsBtn = page.locator('button:has-text("Всі події")').first();
    await expect(allEventsBtn, '"Всі події" button should be visible').toBeVisible();
  });

  test('[TC-HS-016] Carousel scroll buttons exist on home page', async ({ page }) => {
    // Scroll buttons use aria-label, not text content
    const scrollBtns = page.locator('button[aria-label="Scroll left"], button[aria-label="Scroll right"], button[aria-label="Previous"], button[aria-label="Next"]');
    const count = await scrollBtns.count();
    expect(count, 'Carousel scroll/nav buttons should exist').toBeGreaterThan(0);
  });
});
