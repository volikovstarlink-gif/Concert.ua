/**
 * Catalog Filters & Sorting Tests — concert.ua
 * Section: Каталог подій (фільтри)
 * Contains 12 positive functional tests
 * Covers TC-CF-001 through TC-CF-012
 *
 * Tests: genre sub-filter tabs, sort dropdown, filter button,
 * event card info (price/date/venue/badges), sub-genre pages, endless scroll
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Каталог — фільтри та сортування (Catalog Filters & Sorting)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uk/catalog/kyiv/concerts');
    await acceptCookieBanner(page);
  });

  test('[TC-CF-001] Genre sub-filter tabs are displayed (Поп, Рок, Класика, etc.)', async ({ page }) => {
    const genreTabs = page.locator('a[href*="/concerts/pop"], a[href*="/concerts/rock"], a[href*="/concerts/classics"]');
    const count = await genreTabs.count();
    expect(count, 'Genre sub-filter tabs should be present').toBeGreaterThanOrEqual(3);
  });

  test('[TC-CF-002] "Всі" genre tab links to main concerts page', async ({ page }) => {
    const allTab = page.locator('a[href="/uk/catalog/kyiv/concerts"]').filter({ hasText: 'Всі' }).first();
    await expect(allTab, '"Всі" tab should be visible').toBeVisible();
  });

  test('[TC-CF-003] Clicking "Рок" genre tab navigates to rock sub-page', async ({ page }) => {
    const rockTab = page.locator('a[href*="/concerts/rock"]').first();
    await rockTab.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to rock sub-category').toHaveURL(/\/concerts\/rock/);
  });

  test('[TC-CF-004] Rock sub-genre page has correct h1', async ({ page }) => {
    await page.goto('/uk/catalog/kyiv/concerts/rock');
    await page.waitForLoadState('domcontentloaded');
    const h1 = page.locator('h1').first();
    await expect(h1, 'h1 should mention рок').toContainText('рок');
  });

  test('[TC-CF-005] Filter button is visible on catalog page', async ({ page }) => {
    // The filter button may use "ФІЛЬТРИ" text or just a filter icon
    const filterBtn = page.locator('button:has-text("ільтр"), button:has-text("Filter"), .aside-menu button').first();
    await expect(filterBtn, 'Filter button should be visible').toBeVisible();
  });

  test('[TC-CF-006] Sort dropdown is present on catalog page', async ({ page }) => {
    // Sort is a custom dropdown with "Популярні" text
    const sortDropdown = page.locator('text=Популярні').first();
    await expect(sortDropdown, 'Sort dropdown with "Популярні" should be visible').toBeVisible();
  });

  test('[TC-CF-007] Event card shows price information', async ({ page }) => {
    const firstCard = page.locator('a.event-card').first();
    const cardText = await firstCard.textContent();
    expect(cardText, 'Event card should contain price with ₴').toMatch(/\d+\s*₴|від\s*\d+/);
  });

  test('[TC-CF-008] Event card shows date information', async ({ page }) => {
    const firstCard = page.locator('a.event-card').first();
    const cardText = await firstCard.textContent();
    // Date pattern: DD.MM or month name
    expect(cardText, 'Event card should contain date info').toMatch(/\d{2}\.\d{2}|\d{2}\s+(січня|лютого|березня|квітня|травня|червня|липня|серпня|вересня|жовтня|листопада|грудня)/i);
  });

  test('[TC-CF-009] Event card shows venue/city information', async ({ page }) => {
    const firstCard = page.locator('a.event-card').first();
    const cardText = await firstCard.textContent();
    expect(cardText, 'Event card should contain city name Київ').toContain('Київ');
  });

  test('[TC-CF-010] Event card has image', async ({ page }) => {
    const cardImg = page.locator('a.event-card img[src*="storage.concert"]').first();
    await expect(cardImg, 'Event card should have a loaded image').toBeVisible();
  });

  test('[TC-CF-011] Theater catalog loads with events', async ({ page }) => {
    await page.goto('/uk/catalog/kyiv/theater');
    await page.waitForLoadState('domcontentloaded');
    const cards = page.locator('a.event-card');
    const count = await cards.count();
    expect(count, 'Theater catalog should have event cards').toBeGreaterThan(0);
  });

  test('[TC-CF-012] Kids catalog loads with events', async ({ page }) => {
    await page.goto('/uk/catalog/kyiv/kids');
    await page.waitForLoadState('domcontentloaded');
    const cards = page.locator('a.event-card');
    const count = await cards.count();
    expect(count, 'Kids catalog should have event cards').toBeGreaterThan(0);
  });
});
