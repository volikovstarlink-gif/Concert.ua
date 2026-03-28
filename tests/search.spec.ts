/**
 * Search Tests — concert.ua
 * Section: Пошук
 * Contains 8 positive functional tests
 * Covers TC-SR-001 through TC-SR-008
 *
 * Key findings:
 * - NO dedicated /search page (returns 404)
 * - Search is a header overlay: click .js-header-search-btn SVG → #searchform-search input
 * - Search input name="query", placeholder="Назва, виконавець"
 * - Search shows autocomplete suggestions in overlay, no page navigation
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Пошук (Search)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uk/kyiv');
    await acceptCookieBanner(page);
  });

  test('[TC-SR-001] Search icon is visible in the header', async ({ searchPage }) => {
    const icon = await searchPage.getSearchIcon();
    await expect(icon, 'Search icon (.js-header-search-btn) should be visible').toBeVisible();
  });

  test('[TC-SR-002] Search container is present in header', async ({ searchPage }) => {
    const container = await searchPage.getSearchContainer();
    await expect(container, 'Search container (.header-search) should exist').toBeAttached();
  });

  test('[TC-SR-003] Search input exists with correct attributes', async ({ searchPage }) => {
    const input = await searchPage.getSearchInput();
    await expect(input, 'Search input (#searchform-search) should exist').toBeAttached();
    const name = await input.getAttribute('name');
    expect(name, 'Search input name should be "query"').toBe('query');
    const placeholder = await input.getAttribute('placeholder');
    expect(placeholder, 'Should have Ukrainian placeholder').toContain('Назва');
  });

  test('[TC-SR-004] Clicking search icon activates search input', async ({ searchPage, page }) => {
    await searchPage.openSearch();
    // After clicking, the input should become interactable
    const input = await searchPage.getSearchInput();
    await expect(input, 'Search input should be visible after clicking icon').toBeVisible();
  });

  test('[TC-SR-005] Search input accepts Ukrainian characters', async ({ searchPage }) => {
    await searchPage.searchFor('Концерт');
    const input = await searchPage.getSearchInput();
    const value = await input.inputValue();
    expect(value, 'Search input should contain Ukrainian text').toBe('Концерт');
  });

  test('[TC-SR-006] Search input can be cleared', async ({ searchPage }) => {
    await searchPage.searchFor('тест');
    await searchPage.clearSearch();
    const input = await searchPage.getSearchInput();
    const value = await input.inputValue();
    expect(value, 'Search input should be empty after clearing').toBe('');
  });

  test('[TC-SR-007] Search input handles special characters', async ({ searchPage, page }) => {
    await searchPage.searchFor('test & <script>');
    // Page should not crash
    const status = await page.evaluate(() => document.readyState);
    expect(status, 'Page should remain functional').toBe('complete');
  });

  test('[TC-SR-008] Multiple search queries work sequentially', async ({ searchPage }) => {
    await searchPage.searchFor('рок');
    const input = await searchPage.getSearchInput();
    const value1 = await input.inputValue();
    expect(value1, 'First query should be set').toBe('рок');
    // Clear and type second query directly (search overlay is already open)
    await searchPage.clearSearch();
    await input.fill('джаз');
    const value2 = await input.inputValue();
    expect(value2, 'Second query should replace first').toBe('джаз');
  });
});
