/**
 * Navigation & Header Tests — concert.ua
 * Section: Навігація
 * Contains 14 positive functional tests
 * Covers TC-NAV-001 through TC-NAV-014
 *
 * Tests: hamburger menu, category links, city selector, language switch,
 * navigation between pages, header sticky behavior, "..." more menu
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Навігація (Navigation & Header)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uk/kyiv');
    await acceptCookieBanner(page);
  });

  test('[TC-NAV-001] Hamburger menu button opens side menu', async ({ page }) => {
    const menuBtn = page.locator('.header__menu-btn, .js-header-menu-btn').first();
    await menuBtn.click();
    // Side menu should become visible
    const sideMenu = page.locator('.menu-aside, .js-menu-aside').first();
    await expect(sideMenu, 'Side menu should be visible after click').toBeVisible();
  });

  test('[TC-NAV-002] Side menu contains category links', async ({ page }) => {
    const menuBtn = page.locator('.header__menu-btn').first();
    await menuBtn.click();
    const categoryBtn = page.locator('.category-button, .js-open-submenu-btn').filter({ hasText: 'Категорії' }).first();
    await expect(categoryBtn, 'Categories button should be in side menu').toBeVisible();
  });

  test('[TC-NAV-003] Nav link "Концерти" navigates to concerts catalog', async ({ page }) => {
    await page.locator('nav.main-menu a:has-text("Концерти")').first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to concerts catalog').toHaveURL(/\/catalog\/kyiv\/concerts/);
  });

  test('[TC-NAV-004] Nav link "Театр" navigates to theater catalog', async ({ page }) => {
    await page.locator('nav.main-menu a:has-text("Театр")').first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to theater catalog').toHaveURL(/\/catalog\/kyiv\/theater/);
  });

  test('[TC-NAV-005] Nav link "Стендап" navigates to humor catalog', async ({ page }) => {
    await page.locator('nav.main-menu a:has-text("Стендап")').first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to humor catalog').toHaveURL(/\/catalog\/kyiv\/humor/);
  });

  test('[TC-NAV-006] Nav link "Дітям" navigates to kids catalog', async ({ page }) => {
    await page.locator('nav.main-menu a:has-text("Дітям")').first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to kids catalog').toHaveURL(/\/catalog\/kyiv\/kids/);
  });

  test('[TC-NAV-007] Nav link "Танці" navigates to dance catalog', async ({ page }) => {
    await page.locator('nav.main-menu a:has-text("Танці")').first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to dance catalog').toHaveURL(/\/catalog\/kyiv\/dance/);
  });

  test('[TC-NAV-008] City selector shows city name "Київ"', async ({ page }) => {
    const cityText = page.locator('.choose-location-link__text, .js-choose-city-popup-btn').first();
    await expect(cityText, 'City selector should show Київ').toContainText('Київ');
  });

  test('[TC-NAV-009] Language switch links exist (uk/en)', async ({ page }) => {
    const ukLink = page.locator('a:text-is("uk")').first();
    const enLink = page.locator('a:text-is("en")').first();
    await expect(ukLink, 'UK language link should exist').toBeAttached();
    await expect(enLink, 'EN language link should exist').toBeAttached();
  });

  test('[TC-NAV-010] English language link navigates to EN version', async ({ page }) => {
    const enLink = page.locator('a:text-is("en")').first();
    const href = await enLink.getAttribute('href');
    expect(href, 'EN link should point to /en/ path').toContain('/en/');
  });

  test('[TC-NAV-011] Breadcrumbs visible on catalog page', async ({ page }) => {
    await page.goto('/uk/catalog/kyiv/concerts');
    await page.waitForLoadState('domcontentloaded');
    const breadcrumbs = page.locator('.breadcrumbs').first();
    await expect(breadcrumbs, 'Breadcrumbs should be visible on catalog').toBeVisible();
    await expect(breadcrumbs, 'Breadcrumbs should contain "Афіша"').toContainText('Афіша');
  });

  test('[TC-NAV-012] Breadcrumbs link navigates back to parent', async ({ page }) => {
    await page.goto('/uk/catalog/kyiv/concerts');
    await page.waitForLoadState('domcontentloaded');
    const breadcrumbLink = page.locator('.breadcrumbs a').first();
    await breadcrumbLink.click();
    await page.waitForLoadState('domcontentloaded');
    // Should navigate to city home
    await expect(page, 'Should navigate to parent page').toHaveURL(/\/uk\/kyiv/);
  });

  test('[TC-NAV-013] Header remains visible on scroll', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 800));
    const header = page.locator('header.header').first();
    await expect(header, 'Header should remain visible after scrolling').toBeVisible();
  });

  test('[TC-NAV-014] Support chat button is present', async ({ page }) => {
    const chatBtn = page.locator('button[aria-label="Open Support Chat"]').first();
    await expect(chatBtn, 'Support chat button should be visible').toBeVisible();
  });
});
