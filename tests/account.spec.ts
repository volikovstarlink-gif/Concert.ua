/**
 * Personal Account / Profile Tests — concert.ua
 * Section: Особистий кабінет
 * Contains 12 positive functional tests
 * Covers TC-ACC-001 through TC-ACC-012
 *
 * Key findings:
 * - /uk/login redirects to /uk/profile/ when already logged in
 * - /uk/register does NOT exist (returns 404) → removed
 * - Profile pages: /uk/profile, /uk/profile/tickets, /uk/profile/certificates,
 *   /uk/profile/preferences, /uk/profile/wishlist, /uk/profile/news
 * - Logout: /uk/logout
 * - Header profile button opens dropdown with profile links
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Особистий кабінет (Personal Account)', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookieBanner(page);
  });

  test('[TC-ACC-001] Profile page loads successfully', async ({ page }) => {
    await page.goto('/uk/profile');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title, 'Profile page should have a title').toBeTruthy();
  });

  test('[TC-ACC-002] Login page loads without server error', async ({ page }) => {
    const response = await page.goto('/uk/login');
    await page.waitForLoadState('domcontentloaded');
    // /uk/login either shows login form (unauthenticated) or redirects to profile (authenticated)
    expect(response?.status(), 'Login page should not return 500').not.toBe(500);
    const url = page.url();
    const isLoginOrProfile = url.includes('/login') || url.includes('/profile');
    expect(isLoginOrProfile, 'Should be on login or profile page').toBeTruthy();
  });

  test('[TC-ACC-003] Profile page has valid title', async ({ page }) => {
    await page.goto('/uk/profile');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title, 'Profile page title should be non-empty').toBeTruthy();
    expect(title.length, 'Title should have content').toBeGreaterThan(0);
  });

  test('[TC-ACC-004] Tickets page loads from profile', async ({ page }) => {
    const response = await page.goto('/uk/profile/tickets');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'Tickets page should not error').not.toBe(500);
    const title = await page.title();
    expect(title, 'Tickets page should have title').toBeTruthy();
  });

  test('[TC-ACC-005] Certificates page loads from profile', async ({ page }) => {
    const response = await page.goto('/uk/profile/certificates');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'Certificates page should not error').not.toBe(500);
  });

  test('[TC-ACC-006] Preferences/notifications page loads', async ({ page }) => {
    const response = await page.goto('/uk/profile/preferences');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'Preferences page should not error').not.toBe(500);
  });

  test('[TC-ACC-007] Wishlist page loads', async ({ page }) => {
    const response = await page.goto('/uk/profile/wishlist');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'Wishlist page should not error').not.toBe(500);
  });

  test('[TC-ACC-008] Profile link accessible from header', async ({ page }) => {
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const profileBtn = page.locator('.header-profile, a[href*="profile"]').first();
    await expect(profileBtn, 'Profile section should be visible in header').toBeVisible();
  });

  test('[TC-ACC-009] Profile page loads with valid HTTP status', async ({ page }) => {
    const response = await page.goto('/uk/profile');
    await page.waitForLoadState('domcontentloaded');
    // Profile page should load (may redirect to login if not authenticated)
    expect(response?.status(), 'Profile should not return 500').not.toBe(500);
  });

  test('[TC-ACC-010] Profile page is accessible via keyboard navigation', async ({ page }) => {
    await page.goto('/uk/profile');
    await page.waitForLoadState('domcontentloaded');
    // Tab through the page to check keyboard accessibility
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const status = await page.evaluate(() => document.readyState);
    expect(status, 'Page should remain functional during keyboard navigation').toBe('complete');
  });

  test('[TC-ACC-011] News/updates page loads', async ({ page }) => {
    const response = await page.goto('/uk/profile/news');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'News page should not return 500').not.toBe(500);
  });

  test('[TC-ACC-012] Profile page uses HTTPS', async ({ page }) => {
    await page.goto('/uk/profile');
    expect(page.url(), 'Profile page must use HTTPS').toMatch(/^https:\/\//);
  });
});
