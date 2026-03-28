/**
 * Event Detail Page Tests — concert.ua
 * Section: Картка події
 * Contains 12 positive functional tests
 * Covers TC-EV-001 through TC-EV-012
 *
 * Key findings:
 * - Event URLs: /uk/events/{slug} (multi-date) or /uk/event/{slug} (single date)
 * - Title: h1 and h2.event-title
 * - Date: .event-main-info__date-value
 * - Image: img.background, img[src*="storage.concert"]
 * - Buy button: button.btn--green "Обрати дату і час"
 * - Share: .share-button "Поділитись"
 * - Tests navigate directly to known event slugs for reliability
 */
import { test, expect } from '../fixtures/test-fixtures';
import { acceptCookieBanner } from '../utils/helpers';

test.describe('Картка події (Event Detail Page)', () => {
  test.beforeEach(async ({ page }) => {
    await acceptCookieBanner(page);
  });

  test('[TC-EV-001] Event page displays event title (h1)', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const h1 = await eventPage.getEventH1();
    await expect(h1, 'Event h1 should be visible').toBeVisible();
  });

  test('[TC-EV-002] Event page has event-title element in DOM', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const title = await eventPage.getEventTitle();
    // h2.event-title exists but may have width:0 (Angular rendering) — check DOM attachment
    await expect(title, 'h2.event-title should exist in DOM').toBeAttached();
    const text = await title.textContent();
    expect(text?.trim().length, 'event-title should have text content').toBeGreaterThan(0);
  });

  test('[TC-EV-003] Event page displays date information', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const date = await eventPage.getEventDate();
    await expect(date, 'Event date should be visible').toBeVisible();
  });

  test('[TC-EV-004] Event page displays event image', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const image = await eventPage.getEventImage();
    await expect(image, 'Event image should be visible').toBeVisible();
  });

  test('[TC-EV-005] Buy/date selection button is present', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const buyBtn = await eventPage.getBuyButton();
    await expect(buyBtn, 'Buy/date selection button should be visible').toBeVisible();
  });

  test('[TC-EV-006] Event title text is non-empty', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const titleText = await eventPage.getEventTitleText();
    expect(titleText.trim().length, 'Event title should have text content').toBeGreaterThan(0);
  });

  test('[TC-EV-007] Event page has valid meta title', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const pageTitle = await page.title();
    expect(pageTitle, 'Event page should have a meta title').toBeTruthy();
    expect(pageTitle.length, 'Meta title should have content').toBeGreaterThan(0);
  });

  test('[TC-EV-008] Event page URL matches expected pattern', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    expect(page.url(), 'URL should contain /uk/events/').toContain('/uk/events/bumboks');
  });

  test('[TC-EV-009] Event image has valid src attribute', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const image = await eventPage.getEventImage();
    if (await image.isVisible().catch(() => false)) {
      const src = await image.getAttribute('src');
      expect(src, 'Event image should have a valid src').toBeTruthy();
      expect(src, 'Image src should point to storage').toContain('storage.concert');
    }
  });

  test('[TC-EV-010] Share button exists on event page', async ({ eventPage, page }) => {
    await eventPage.navigateToEvent('bumboks');
    await page.waitForLoadState('domcontentloaded');
    const shareBtn = await eventPage.getShareButton();
    await expect(shareBtn, 'Share button should be visible').toBeVisible();
  });

  test('[TC-EV-011] Single-date event page loads correctly', async ({ eventPage, page }) => {
    await eventPage.navigateToSingleEvent('dzidzo');
    await page.waitForLoadState('domcontentloaded');
    const h1 = await eventPage.getEventH1();
    await expect(h1, 'Single-date event h1 should be visible').toBeVisible();
  });

  test('[TC-EV-012] Event page loads without server errors', async ({ eventPage, page }) => {
    const response = await page.goto('/uk/events/bumboks', { waitUntil: 'domcontentloaded' });
    expect(response?.status(), 'Event page should not return 500').not.toBe(500);
    expect(response?.status(), 'Event page should return 200').toBe(200);
  });
});
