import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua checkout flow.
 * NOTE: concert.ua has NO dedicated /checkout page (returns 404).
 * The checkout/payment flow is integrated into event pages
 * via the "Обрати дату і час" button and subsequent modal/flow.
 */
export class CheckoutPage extends BasePage {
  private readonly buyButton: Locator;
  private readonly dateSelector: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.buyButton = page.locator('button.btn--green, button:has-text("Обрати дату"), button:has-text("Купити")').first();
    this.dateSelector = page.locator('.event-schedule, .schedule-selector').first();
  }

  async getBuyButton(): Promise<Locator> {
    return this.buyButton;
  }

  async getDateSelector(): Promise<Locator> {
    return this.dateSelector;
  }

  async clickBuyButton(): Promise<void> {
    await this.buyButton.click();
  }
}
