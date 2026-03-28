/**
 * Cookie Banner & Footer Tests — concert.ua
 * Section: Cookie / Футер
 * Contains 12 positive functional tests
 * Covers TC-FT-001 through TC-FT-012
 *
 * Tests: cookie consent banner (accept/decline/configure), footer sections,
 * social links, phone numbers, copyright, payment logos, footer links
 */
import { test, expect } from '../fixtures/test-fixtures';

test.describe('Cookie банер та Футер (Cookie Banner & Footer)', () => {

  test('[TC-FT-001] Cookie banner appears on first visit', async ({ page }) => {
    const ctx = page.context();
    await ctx.clearCookies();
    await page.goto('/uk/kyiv');
    const banner = page.locator('button:has-text("Прийняти все")').first();
    await expect(banner, 'Cookie accept button should be visible on fresh visit').toBeVisible();
  });

  test('[TC-FT-002] Cookie banner has "Прийняти все" button', async ({ page }) => {
    const ctx = page.context();
    await ctx.clearCookies();
    await page.goto('/uk/kyiv');
    const acceptBtn = page.locator('button:has-text("Прийняти все")').first();
    await expect(acceptBtn, '"Прийняти все" button should be visible').toBeVisible();
  });

  test('[TC-FT-003] Cookie banner has "Відхилити" button', async ({ page }) => {
    const ctx = page.context();
    await ctx.clearCookies();
    await page.goto('/uk/kyiv');
    const declineBtn = page.locator('button:has-text("Відхилити")').first();
    await expect(declineBtn, '"Відхилити" button should be visible').toBeVisible();
  });

  test('[TC-FT-004] Cookie banner has cookie type checkboxes', async ({ page }) => {
    const ctx = page.context();
    await ctx.clearCookies();
    await page.goto('/uk/kyiv');
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    expect(count, 'Cookie banner should have configuration checkboxes').toBeGreaterThanOrEqual(3);
  });

  test('[TC-FT-005] Clicking "Прийняти все" hides cookie banner', async ({ page }) => {
    const ctx = page.context();
    await ctx.clearCookies();
    await page.goto('/uk/kyiv');
    const acceptBtn = page.locator('button:has-text("Прийняти все")').first();
    await acceptBtn.click();
    await expect(acceptBtn, 'Cookie banner should disappear after accepting').toBeHidden();
  });

  test('[TC-FT-006] Page contains social media links (Facebook, Instagram, etc.)', async ({ page }) => {
    await page.goto('/uk/kyiv');
    // Social links are in the side-menu, not the <footer> element
    const socialLinks = page.locator('a[href*="facebook.com"], a[href*="instagram.com"], a[href*="youtube.com"], a[href*="tiktok.com"]');
    const count = await socialLinks.count();
    expect(count, 'Page should have social media links').toBeGreaterThanOrEqual(4);
  });

  test('[TC-FT-007] Page contains phone number links', async ({ page }) => {
    await page.goto('/uk/kyiv');
    // Phone links are in the side-menu/contact section, not <footer>
    const phoneLinks = page.locator('a[href^="tel:"]');
    const count = await phoneLinks.count();
    expect(count, 'Page should have phone number links').toBeGreaterThanOrEqual(1);
  });

  test('[TC-FT-008] Footer shows copyright text', async ({ page }) => {
    await page.goto('/uk/kyiv');
    const footer = page.locator('footer');
    await expect(footer, 'Footer should contain copyright').toContainText('Concert.ua');
    await expect(footer, 'Footer should contain year').toContainText('2026');
  });

  test('[TC-FT-009] Footer contains payment logos (Visa, Mastercard)', async ({ page }) => {
    await page.goto('/uk/kyiv');
    const visaLogo = page.locator('footer img[alt*="visa" i]').first();
    const mcLogo = page.locator('footer img[alt*="mastercard" i]').first();
    await expect(visaLogo, 'Visa logo should be in footer').toBeVisible();
    await expect(mcLogo, 'Mastercard logo should be in footer').toBeVisible();
  });

  test('[TC-FT-010] Footer "Архів" link works', async ({ page }) => {
    await page.goto('/uk/kyiv');
    const archiveLink = page.locator('footer a[href*="/archive"]').first();
    await expect(archiveLink, 'Archive link should exist in footer').toBeVisible();
    await archiveLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to archive page').toHaveURL(/\/archive/);
  });

  test('[TC-FT-011] Footer "Список майданчиків" link works', async ({ page }) => {
    await page.goto('/uk/kyiv');
    const venueLink = page.locator('footer a[href*="/venue-list"]').first();
    await expect(venueLink, 'Venue list link should exist in footer').toBeVisible();
    await venueLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to venue list').toHaveURL(/\/venue-list/);
  });

  test('[TC-FT-012] Footer "Список артистів" link works', async ({ page }) => {
    await page.goto('/uk/kyiv');
    const artistLink = page.locator('footer a[href*="/talent/list"]').first();
    await expect(artistLink, 'Artist list link should exist in footer').toBeVisible();
    await artistLink.click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page, 'Should navigate to artist list').toHaveURL(/\/talent\/list/);
  });
});
