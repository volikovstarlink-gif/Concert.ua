import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua event detail page (/uk/events/{slug} or /uk/event/{slug}).
 * Selectors verified against live DOM on 2026-03-28.
 */
export class EventPage extends BasePage {
  private readonly eventTitle: Locator;
  private readonly eventH1: Locator;
  private readonly eventDate: Locator;
  private readonly eventImage: Locator;
  private readonly buyButton: Locator;
  private readonly shareButton: Locator;
  private readonly eventDescription: Locator;
  private readonly breadcrumbs: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.eventTitle = page.locator('h2.event-title, .event-title').first();
    this.eventH1 = page.locator('h1').first();
    this.eventDate = page.locator('.event-main-info__date-value, .event-date').first();
    this.eventImage = page.locator('img.background, img.promo-events-slider-item__img, img[src*="storage.concert"]').first();
    this.buyButton = page.locator('button.btn--green, button:has-text("Обрати дату"), button:has-text("Купити")').first();
    this.shareButton = page.locator('.share-button, button:has-text("Поділитись")').first();
    this.eventDescription = page.locator('.event-content, .description').first();
    this.breadcrumbs = page.locator('.breadcrumbs').first();
  }

  async navigateToEvent(slug: string): Promise<void> {
    await this.goto(`/uk/events/${slug}`);
  }

  async navigateToSingleEvent(slug: string): Promise<void> {
    await this.goto(`/uk/event/${slug}`);
  }

  async getEventTitle(): Promise<Locator> {
    return this.eventTitle;
  }

  async getEventH1(): Promise<Locator> {
    return this.eventH1;
  }

  async getEventDate(): Promise<Locator> {
    return this.eventDate;
  }

  async getEventImage(): Promise<Locator> {
    return this.eventImage;
  }

  async getBuyButton(): Promise<Locator> {
    return this.buyButton;
  }

  async getShareButton(): Promise<Locator> {
    return this.shareButton;
  }

  async getEventDescription(): Promise<Locator> {
    return this.eventDescription;
  }

  async getBreadcrumbs(): Promise<Locator> {
    return this.breadcrumbs;
  }

  async clickBuyButton(): Promise<void> {
    await this.buyButton.click();
  }

  async getEventTitleText(): Promise<string> {
    return (await this.eventH1.textContent()) ?? '';
  }
}
