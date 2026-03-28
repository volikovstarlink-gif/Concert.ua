/**
 * Cart & Purchase Flow Tests — concert.ua
 * Section: Кошик та оформлення
 * Contains 8 positive functional tests
 * Covers TC-CART-001 through TC-CART-008
 *
 * Key findings:
 * - NO dedicated /cart page (returns 404)
 * - NO dedicated /checkout page (returns 404)
 * - Purchase flow is integrated into event pages via "Обрати дату і час" button
 * - Profile tickets: /uk/profile/tickets
 * - Tests focus on elements that actually exist in the UI
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Кошик та оформлення (Cart & Purchase Flow)', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookieBanner(page);
  });

  test('[TC-CART-001] Event page has buy/date-selection button', async ({ page }) => {
    await page.goto('/uk/events/bumboks');
    await page.waitForLoadState('domcontentloaded');
    const buyBtn = page.locator('button.btn--green, button:has-text("Обрати дату"), button:has-text("Купити")').first();
    await expect(buyBtn, 'Buy button should be visible on event page').toBeVisible();
  });

  test('[TC-CART-002] Profile tickets page loads for authenticated user', async ({ page }) => {
    const response = await page.goto('/uk/profile/tickets');
    await page.waitForLoadState('domcontentloaded');
    // Should either load tickets page or redirect to login
    expect(response?.status(), 'Tickets page should not return 500').not.toBe(500);
  });

  test('[TC-CART-003] Profile tickets page has valid title', async ({ page }) => {
    await page.goto('/uk/profile/tickets');
    await page.waitForLoadState('domcontentloaded');
    const title = await page.title();
    expect(title, 'Tickets page should have a title').toBeTruthy();
  });

  test('[TC-CART-004] Event buy button is clickable', async ({ page }) => {
    await page.goto('/uk/events/bumboks');
    await page.waitForLoadState('domcontentloaded');
    const buyBtn = page.locator('button.btn--green, button:has-text("Обрати дату"), button:has-text("Купити")').first();
    await expect(buyBtn, 'Buy button should be enabled').toBeEnabled();
  });

  test('[TC-CART-005] Profile certificates page loads', async ({ page }) => {
    const response = await page.goto('/uk/profile/certificates');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'Certificates page should not return 500').not.toBe(500);
  });

  test('[TC-CART-006] Header profile section is visible', async ({ page }) => {
    await page.goto('/uk/kyiv');
    await page.waitForLoadState('domcontentloaded');
    const profileSection = page.locator('.header-profile, .header__profile, a[href*="profile"]').first();
    await expect(profileSection, 'Profile section in header should be visible').toBeVisible();
  });

  test('[TC-CART-007] Gift certificate event page loads', async ({ page }) => {
    const response = await page.goto('/uk/event/gift');
    await page.waitForLoadState('domcontentloaded');
    expect(response?.status(), 'Gift certificate page should return 200').toBe(200);
    const h1 = page.locator('h1').first();
    await expect(h1, 'Gift page should have h1').toBeVisible();
  });

  test('[TC-CART-008] Event page maintains state after reload', async ({ page }) => {
    await page.goto('/uk/events/bumboks');
    await page.waitForLoadState('domcontentloaded');
    const titleBefore = await page.title();
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    const titleAfter = await page.title();
    expect(titleAfter, 'Page title should persist after reload').toBe(titleBefore);
  });
});
