import { Page, Locator } from '@playwright/test';
import { WaitHelper } from '../core/WaitHelper';
import { ActionHelper } from '../core/ActionHelper';
import { Logger } from '../core/Logger';

export abstract class BasePage {
  protected page: Page;
  protected waitHelper: WaitHelper;
  protected actionHelper: ActionHelper;
  protected logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page);
    this.actionHelper = new ActionHelper(page);
    this.logger = new Logger();
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    this.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `app/screenshots/${name}.png`, fullPage: true });
    this.logger.info(`Screenshot saved: ${name}.png`);
  }

  /**
   * Get element by selector
   */
  protected getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      return await this.getElement(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Abstract method - must be implemented by child classes
   * Verifies if the page is loaded correctly
   */
  abstract isPageLoaded(): Promise<boolean>;
}