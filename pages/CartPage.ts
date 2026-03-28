import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua cart functionality.
 * NOTE: concert.ua has NO dedicated /cart page (returns 404).
 * Cart/checkout is integrated into the event purchase flow.
 * This POM covers the header profile area and event buy flow.
 */
export class CartPage extends BasePage {
  private readonly profileIcon: Locator;
  private readonly profileMenu: Locator;
  private readonly ticketsLink: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.profileIcon = page.locator('.header-profile, .header__profile').first();
    this.profileMenu = page.locator('.header-profile__dd, .profile-dropdown').first();
    this.ticketsLink = page.locator('a[href*="/profile/tickets"]').first();
  }

  async getProfileIcon(): Promise<Locator> {
    return this.profileIcon;
  }

  async getProfileMenu(): Promise<Locator> {
    return this.profileMenu;
  }

  async getTicketsLink(): Promise<Locator> {
    return this.ticketsLink;
  }

  async clickProfileIcon(): Promise<void> {
    await this.profileIcon.click();
  }
}
