/**
 * Home Page Tests — concert.ua
 * Section: Головна сторінка
 * Contains 13 positive functional tests
 * Covers TC-HP-001 through TC-HP-013
 *
 * Key findings:
 * - Home page URL is /uk/kyiv (not /)
 * - Logo: a.header__logo
 * - Search: header overlay via .js-header-search-btn icon → #searchform-search input
 * - Banner: .js-top-events-slider (slick slider)
 * - Event cards: a.event-card
 * - Nav: nav.main-menu
 * - Cookie: button "Прийняти все"
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Головна сторінка (Home Page)', () => {
  test.beforeEach(async ({ homePage, page }) => {
    await homePage.navigateToHome();
    await acceptCookieBanner(page);
  });

  test('[TC-HP-001] Home page loads successfully with HTTP 200', async ({ page }) => {
    const response = await page.goto('/uk/kyiv');
    expect(response?.status(), 'Home page should return HTTP 200').toBe(200);
  });

  test('[TC-HP-002] Logo is visible on the home page', async ({ homePage }) => {
    const logo = await homePage.getLogoLocator();
    await expect(logo, 'Logo (a.header__logo) should be visible').toBeVisible();
  });

  test('[TC-HP-003] Main navigation menu is displayed', async ({ homePage }) => {
    const nav = await homePage.getNavigationMenu();
    await expect(nav, 'Navigation menu (nav.main-menu) should be visible').toBeVisible();
  });

  test('[TC-HP-004] Search icon is visible in header', async ({ homePage }) => {
    const searchIcon = await homePage.getSearchIcon();
    await expect(searchIcon, 'Search icon should be visible in header').toBeVisible();
  });

  test('[TC-HP-005] Main banner/slider is displayed', async ({ homePage }) => {
    const banner = await homePage.getMainBanner();
    await expect(banner, 'Main slider (.js-top-events-slider) should be visible').toBeVisible();
  });

  test('[TC-HP-006] Event cards are displayed on the home page', async ({ homePage }) => {
    const count = await homePage.getEventCardCount();
    expect(count, 'At least one event card (a.event-card) should be displayed').toBeGreaterThan(0);
  });

  test('[TC-HP-007] Footer section is present', async ({ homePage }) => {
    const footer = await homePage.getFooter();
    await expect(footer, 'Footer (footer.footer) should be visible').toBeVisible();
  });

  test('[TC-HP-008] Profile/account button is accessible', async ({ homePage }) => {
    const loginBtn = await homePage.getLoginButton();
    await expect(loginBtn, 'Profile button should be visible in header').toBeVisible();
  });

  test('[TC-HP-009] Clicking logo navigates to home page', async ({ homePage, page }) => {
    // Navigate to a catalog page first
    await page.goto('/uk/catalog/kyiv/concerts');
    await page.waitForLoadState('domcontentloaded');
    await homePage.clickLogo();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate back to home').toHaveURL(/\/uk\/kyiv/);
  });

  test('[TC-HP-010] Page title contains relevant text', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title, 'Page title should be non-empty').toBeTruthy();
    expect(title.length, 'Page title should have content').toBeGreaterThan(0);
  });

  test('[TC-HP-011] Event cards are clickable and navigate to event page', async ({ homePage, page }) => {
    const events = await homePage.getEventCards();
    const count = await events.count();
    if (count > 0) {
      const initialUrl = page.url();
      await events.first().click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url(), 'Should navigate to event page').not.toBe(initialUrl);
    }
  });

  test('[TC-HP-012] Header section is present at top of page', async ({ homePage }) => {
    const header = await homePage.getHeader();
    await expect(header, 'Header should be visible').toBeVisible();
  });

  test('[TC-HP-013] Category navigation links are present in menu', async ({ homePage }) => {
    const categories = await homePage.getCategoryLinks();
    const count = await categories.count();
    expect(count, 'At least one category link should be present in nav').toBeGreaterThan(0);
  });
});
