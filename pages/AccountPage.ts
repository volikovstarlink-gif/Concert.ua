import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua account/profile pages.
 * NOTE: /uk/login redirects to /uk/profile/ when already logged in.
 * /uk/register does NOT exist (returns 404).
 * Auth is handled via header profile button and modal/redirect flow.
 */
export class AccountPage extends BasePage {
  private readonly profileSection: Locator;
  private readonly ticketsLink: Locator;
  private readonly certificatesLink: Locator;
  private readonly preferencesLink: Locator;
  private readonly wishlistLink: Locator;
  private readonly profileLink: Locator;
  private readonly logoutLink: Locator;
  private readonly headerProfileBtn: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.profileSection = page.locator('.profile, .user-profile, main').first();
    this.ticketsLink = page.locator('a[href*="/profile/tickets"]').first();
    this.certificatesLink = page.locator('a[href*="/profile/certificates"]').first();
    this.preferencesLink = page.locator('a[href*="/profile/preferences"]').first();
    this.wishlistLink = page.locator('a[href*="/profile/wishlist"]').first();
    this.profileLink = page.locator('a[href="/uk/profile"]').first();
    this.logoutLink = page.locator('a[href*="/logout"]').first();
    this.headerProfileBtn = page.locator('.header-profile, .header__profile').first();
  }

  async navigateToProfile(): Promise<void> {
    await this.goto('/uk/profile');
  }

  async navigateToTickets(): Promise<void> {
    await this.goto('/uk/profile/tickets');
  }

  async navigateToLogin(): Promise<void> {
    // /uk/login redirects to /uk/profile/ when logged in
    await this.goto('/uk/login');
  }

  async getProfileSection(): Promise<Locator> {
    return this.profileSection;
  }

  async getTicketsLink(): Promise<Locator> {
    return this.ticketsLink;
  }

  async getCertificatesLink(): Promise<Locator> {
    return this.certificatesLink;
  }

  async getPreferencesLink(): Promise<Locator> {
    return this.preferencesLink;
  }

  async getWishlistLink(): Promise<Locator> {
    return this.wishlistLink;
  }

  async getProfileLink(): Promise<Locator> {
    return this.profileLink;
  }

  async getLogoutLink(): Promise<Locator> {
    return this.logoutLink;
  }

  async getHeaderProfileBtn(): Promise<Locator> {
    return this.headerProfileBtn;
  }

  async logout(): Promise<void> {
    await this.logoutLink.click();
  }
}
