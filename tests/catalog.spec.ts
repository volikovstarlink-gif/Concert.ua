/**
 * Event Catalog Tests — concert.ua
 * Section: Каталог подій
 * Contains 11 positive functional tests
 * Covers TC-CAT-001 through TC-CAT-011
 *
 * Key findings:
 * - Catalog URLs: /uk/catalog/kyiv/{category}
 * - Event cards: a.event-card
 * - Breadcrumbs: .breadcrumbs
 * - No /events listing — use /uk/catalog/kyiv/all-categories instead
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Каталог подій (Event Catalog)', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookieBanner(page);
  });

  test('[TC-CAT-001] Catalog page loads and displays events', async ({ catalogPage }) => {
    await catalogPage.navigateToCatalog('concerts');
    const count = await catalogPage.getEventCardCount();
    expect(count, 'Catalog should display at least one event card').toBeGreaterThan(0);
  });

  test('[TC-CAT-002] Category page title (h1) is displayed', async ({ catalogPage }) => {
    await catalogPage.navigateToCatalog('concerts');
    const title = await catalogPage.getCategoryTitle();
    await expect(title, 'Category page should have a h1 title').toBeVisible();
  });

  test('[TC-CAT-003] Concert category page loads correctly', async ({ catalogPage }) => {
    await catalogPage.navigateToCategory('concerts');
    const count = await catalogPage.getEventCardCount();
    expect(count, 'Concerts category should have event cards').toBeGreaterThan(0);
  });

  test('[TC-CAT-004] Theater category page loads correctly', async ({ catalogPage }) => {
    await catalogPage.navigateToCategory('theater');
    const title = await catalogPage.getCategoryTitle();
    await expect(title, 'Theater category h1 should be visible').toBeVisible();
  });

  test('[TC-CAT-005] Event card displays content and is an anchor link', async ({ catalogPage }) => {
    await catalogPage.navigateToCatalog('concerts');
    const firstCard = (await catalogPage.getEventCards()).first();
    await expect(firstCard, 'First event card should be visible').toBeVisible();
    const href = await firstCard.getAttribute('href');
    expect(href, 'Event card should be a link with href').toBeTruthy();
  });

  test('[TC-CAT-006] Clicking event card navigates to event detail page', async ({ catalogPage, page }) => {
    await catalogPage.navigateToCatalog('concerts');
    const initialUrl = page.url();
    await catalogPage.clickFirstEventCard();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url(), 'Should navigate to event detail page').not.toBe(initialUrl);
  });

  test('[TC-CAT-007] Multiple event cards are displayed in catalog', async ({ catalogPage }) => {
    await catalogPage.navigateToCatalog('concerts');
    const count = await catalogPage.getEventCardCount();
    expect(count, 'Catalog should show multiple events').toBeGreaterThan(1);
  });

  test('[TC-CAT-008] Breadcrumb navigation is present on catalog page', async ({ catalogPage }) => {
    await catalogPage.navigateToCategory('concerts');
    const breadcrumbs = await catalogPage.getBreadcrumbs();
    await expect(breadcrumbs, 'Breadcrumbs should be visible on catalog page').toBeVisible();
  });

  test('[TC-CAT-009] Standup/humor category loads', async ({ catalogPage }) => {
    await catalogPage.navigateToCategory('humor');
    const title = await catalogPage.getCategoryTitle();
    await expect(title, 'Humor category h1 should load').toBeVisible();
  });

  test('[TC-CAT-010] Festival category loads', async ({ catalogPage }) => {
    await catalogPage.navigateToCategory('festivals');
    const title = await catalogPage.getCategoryTitle();
    await expect(title, 'Festivals category h1 should load').toBeVisible();
  });

  test('[TC-CAT-011] Catalog page has valid meta title', async ({ catalogPage, page }) => {
    await catalogPage.navigateToCatalog('concerts');
    const title = await page.title();
    expect(title, 'Catalog page should have a non-empty title').toBeTruthy();
    expect(title.length, 'Page title should have content').toBeGreaterThan(0);
  });
});
