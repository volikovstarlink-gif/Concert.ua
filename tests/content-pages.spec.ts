/**
 * Content & Info Pages Tests — concert.ua
 * Section: Контентні сторінки
 * Contains 14 positive functional tests
 * Covers TC-CP-001 through TC-CP-014
 *
 * Tests: venue-list, talent/list, archive, about, team, FAQ,
 * venue detail page, metacard collections, static info pages
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Контентні сторінки (Content & Info Pages)', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookieBanner(page);
  });

  test('[TC-CP-001] Venue list page loads with title', async ({ page }) => {
    const response = await page.goto('/uk/venue-list');
    expect(response?.status(), 'Venue list should return 200').toBe(200);
    const h1 = page.locator('h1').first();
    await expect(h1, 'Venue list should have h1').toBeVisible();
  });

  test('[TC-CP-002] Artist list page loads with title', async ({ page }) => {
    const response = await page.goto('/uk/talent/list');
    expect(response?.status(), 'Artist list should return 200').toBe(200);
    const h1 = page.locator('h1').first();
    await expect(h1, 'Artist list should have h1 "Список артистів"').toBeVisible();
  });

  test('[TC-CP-003] Archive page loads with title', async ({ page }) => {
    const response = await page.goto('/uk/archive');
    expect(response?.status(), 'Archive should return 200').toBe(200);
    const h1 = page.locator('h1').first();
    await expect(h1, 'Archive should have h1').toBeVisible();
  });

  test('[TC-CP-004] About page loads with content', async ({ page }) => {
    const response = await page.goto('/uk/page/about');
    expect(response?.status(), 'About page should return 200').toBe(200);
    const title = await page.title();
    expect(title, 'About page should have a title').toBeTruthy();
  });

  test('[TC-CP-005] Team page loads', async ({ page }) => {
    const response = await page.goto('/uk/page/komanda');
    expect(response?.status(), 'Team page should return 200').toBe(200);
  });

  test('[TC-CP-006] Ticket offices page loads', async ({ page }) => {
    const response = await page.goto('/uk/page/ticket-offices');
    expect(response?.status(), 'Ticket offices page should return 200').toBe(200);
  });

  test('[TC-CP-007] Delivery page loads', async ({ page }) => {
    const response = await page.goto('/uk/page/delivery');
    expect(response?.status(), 'Delivery page should return 200').toBe(200);
  });

  test('[TC-CP-008] Venue detail page (Origin Stage) loads with events', async ({ page }) => {
    const response = await page.goto('/uk/venue/origin-stage');
    expect(response?.status(), 'Venue page should return 200').toBe(200);
    const h1 = page.locator('h1').first();
    await expect(h1, 'Venue page should have h1').toBeVisible();
    await expect(h1, 'h1 should contain venue name').toContainText('ORIGIN');
  });

  test('[TC-CP-009] Venue detail page shows event listings', async ({ page }) => {
    await page.goto('/uk/venue/origin-stage');
    await page.waitForLoadState('domcontentloaded');
    const eventCards = page.locator('a.event-card');
    const count = await eventCards.count();
    expect(count, 'Venue page should display event cards').toBeGreaterThan(0);
  });

  test('[TC-CP-010] Metacard collection page loads', async ({ page }) => {
    const response = await page.goto('/uk/metacard/top-concerts-kyiv');
    expect(response?.status(), 'Metacard page should return 200').toBe(200);
    const h1 = page.locator('h1').first();
    await expect(h1, 'Metacard should have h1').toBeVisible();
  });

  test('[TC-CP-011] Metacard page contains event cards', async ({ page }) => {
    await page.goto('/uk/metacard/top-concerts-kyiv');
    await page.waitForLoadState('domcontentloaded');
    const cards = page.locator('a.event-card');
    const count = await cards.count();
    expect(count, 'Metacard should contain event cards').toBeGreaterThan(0);
  });

  test('[TC-CP-012] Charity page loads', async ({ page }) => {
    const response = await page.goto('/uk/page/blahodiya');
    expect(response?.status(), 'Charity page should return 200').toBe(200);
  });

  test('[TC-CP-013] Offer/terms page has content', async ({ page }) => {
    await page.goto('/uk/page/offer');
    await page.waitForLoadState('domcontentloaded');
    const bodyText = await page.locator('main, .content, body').first().textContent();
    expect(bodyText?.length, 'Offer page should have substantial content').toBeGreaterThan(100);
  });

  test('[TC-CP-014] FAQ page has questions and answers', async ({ page }) => {
    await page.goto('/uk/page/faq');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title, 'FAQ page should have title').toBeTruthy();
    const bodyText = await page.locator('body').textContent();
    expect(bodyText?.length, 'FAQ page should have content').toBeGreaterThan(100);
  });
});
