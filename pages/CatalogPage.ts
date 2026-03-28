import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua catalog pages (/uk/catalog/kyiv/{category}).
 * Selectors verified against live DOM on 2026-03-28.
 */
export class CatalogPage extends BasePage {
  private readonly eventCards: Locator;
  private readonly categoryTitle: Locator;
  private readonly breadcrumbs: Locator;
  private readonly eventList: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.eventCards = page.locator('a.event-card');
    this.categoryTitle = page.locator('h1').first();
    this.breadcrumbs = page.locator('.breadcrumbs').first();
    this.eventList = page.locator('.event-list').first();
  }

  async navigateToCatalog(category: string = 'all-categories'): Promise<void> {
    await this.goto(`/uk/catalog/kyiv/${category}`);
  }

  async navigateToCategory(slug: string): Promise<void> {
    await this.goto(`/uk/catalog/kyiv/${slug}`);
  }

  async getEventCards(): Promise<Locator> {
    return this.eventCards;
  }

  async getEventCardCount(): Promise<number> {
    return this.eventCards.count();
  }

  async getCategoryTitle(): Promise<Locator> {
    return this.categoryTitle;
  }

  async getBreadcrumbs(): Promise<Locator> {
    return this.breadcrumbs;
  }

  async getEventList(): Promise<Locator> {
    return this.eventList;
  }

  async clickFirstEventCard(): Promise<void> {
    await this.eventCards.first().click();
  }

  async clickEventCardByIndex(index: number): Promise<void> {
    await this.eventCards.nth(index).click();
  }
}
