import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua home page (/uk/kyiv).
 * Selectors verified against live DOM on 2026-03-28.
 */
export class HomePage extends BasePage {
  private readonly logo: Locator;
  private readonly searchIcon: Locator;
  private readonly searchInput: Locator;
  private readonly mainBanner: Locator;
  private readonly eventCards: Locator;
  private readonly categoryLinks: Locator;
  private readonly navigationMenu: Locator;
  private readonly footer: Locator;
  private readonly languageSwitcherUk: Locator;
  private readonly languageSwitcherEn: Locator;
  private readonly citySelector: Locator;
  private readonly loginButton: Locator;
  private readonly headerSection: Locator;
  private readonly socialLinks: Locator;
  private readonly cookieAcceptButton: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    // Verified selectors from live DOM
    this.logo = page.locator('a.header__logo').first();
    this.searchIcon = page.locator('.js-header-search-btn').first();
    this.searchInput = page.locator('#searchform-search').first();
    this.mainBanner = page.locator('.js-top-events-slider, .slick-slider').first();
    this.eventCards = page.locator('a.event-card');
    this.categoryLinks = page.locator('nav.main-menu a, .js-main-menu a');
    this.navigationMenu = page.locator('nav.main-menu, .js-main-menu').first();
    this.footer = page.locator('footer.footer').first();
    this.languageSwitcherUk = page.locator('a:text-is("uk")').first();
    this.languageSwitcherEn = page.locator('a:text-is("en")').first();
    this.citySelector = page.locator('.choose-location-link.js-choose-city-popup-btn').first();
    this.loginButton = page.locator('.header-profile, a[href*="profile"]').first();
    this.headerSection = page.locator('header.header, .js-header').first();
    this.socialLinks = page.locator('footer a[href*="facebook"], footer a[href*="instagram"], footer a[href*="telegram"], footer a[href*="youtube"], footer a[href*="tiktok"]');
    this.cookieAcceptButton = page.locator('button:has-text("Прийняти все")').first();
  }

  async navigateToHome(): Promise<void> {
    await this.goto('/uk/kyiv');
  }

  async getLogoLocator(): Promise<Locator> {
    return this.logo;
  }

  async getSearchInput(): Promise<Locator> {
    return this.searchInput;
  }

  async getSearchIcon(): Promise<Locator> {
    return this.searchIcon;
  }

  async getMainBanner(): Promise<Locator> {
    return this.mainBanner;
  }

  async getEventCards(): Promise<Locator> {
    return this.eventCards;
  }

  async getEventCardCount(): Promise<number> {
    return this.eventCards.count();
  }

  async getCategoryLinks(): Promise<Locator> {
    return this.categoryLinks;
  }

  async getNavigationMenu(): Promise<Locator> {
    return this.navigationMenu;
  }

  async getFooter(): Promise<Locator> {
    return this.footer;
  }

  async getLanguageSwitcherUk(): Promise<Locator> {
    return this.languageSwitcherUk;
  }

  async getLanguageSwitcherEn(): Promise<Locator> {
    return this.languageSwitcherEn;
  }

  async getCitySelector(): Promise<Locator> {
    return this.citySelector;
  }

  async getLoginButton(): Promise<Locator> {
    return this.loginButton;
  }

  async getHeader(): Promise<Locator> {
    return this.headerSection;
  }

  async getSocialLinks(): Promise<Locator> {
    return this.socialLinks;
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  async openSearch(): Promise<void> {
    await this.searchIcon.click();
  }

  async searchFor(query: string): Promise<void> {
    await this.searchIcon.click();
    await this.searchInput.fill(query);
  }

  async clickFirstEventCard(): Promise<void> {
    await this.eventCards.first().click();
  }

  async clickCategoryByText(text: string): Promise<void> {
    await this.categoryLinks.filter({ hasText: text }).first().click();
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async dismissCookieBanner(): Promise<void> {
    if (await this.cookieAcceptButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.cookieAcceptButton.click();
    }
  }
}
