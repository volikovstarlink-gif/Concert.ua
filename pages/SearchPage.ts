import { type Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for concert.ua search functionality.
 * NOTE: concert.ua has NO dedicated search page (/search returns 404).
 * Search is a header overlay with autocomplete suggestions.
 * The search input is #searchform-search, activated by clicking .js-header-search-btn SVG icon.
 */
export class SearchPage extends BasePage {
  private readonly searchIcon: Locator;
  private readonly searchInput: Locator;
  private readonly searchContainer: Locator;
  private readonly searchSuggestions: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.searchIcon = page.locator('.js-header-search-btn').first();
    this.searchInput = page.locator('#searchform-search').first();
    this.searchContainer = page.locator('.header-search').first();
    this.searchSuggestions = page.locator('.header-search__results, .search-results, .autocomplete-suggestions').first();
  }

  async getSearchInput(): Promise<Locator> {
    return this.searchInput;
  }

  async getSearchIcon(): Promise<Locator> {
    return this.searchIcon;
  }

  async getSearchContainer(): Promise<Locator> {
    return this.searchContainer;
  }

  async getSearchSuggestions(): Promise<Locator> {
    return this.searchSuggestions;
  }

  async openSearch(): Promise<void> {
    await this.searchIcon.click();
  }

  async searchFor(query: string): Promise<void> {
    await this.searchIcon.click();
    await this.searchInput.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    await this.searchInput.fill(query);
  }

  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  async typeInSearch(query: string): Promise<void> {
    await this.searchIcon.click();
    await this.searchInput.waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
    await this.searchInput.type(query, { delay: 50 });
  }
}
