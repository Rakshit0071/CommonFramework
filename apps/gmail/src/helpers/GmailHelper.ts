import { Page } from '@playwright/test';
import { Logger } from '@common/test-utils';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Gmail Helper
 * Provides reusable Gmail-specific functions
 */
export class GmailHelper {
  private page: Page;
  private logger: Logger;
  private authFile: string;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
    this.authFile = path.join(__dirname, '../../.auth/gmail-user.json');
  }

  /**
   * Check if authentication state exists
   */
  hasAuthState(): boolean {
    return fs.existsSync(this.authFile);
  }

  /**
   * Navigate to Gmail inbox (assumes already authenticated)
   */
  async goToInbox(): Promise<void> {
    this.logger.info('Navigating to Gmail inbox');
    await this.page.goto('https://mail.google.com/mail/u/0/#inbox');
    await this.page.waitForLoadState('networkidle');
    this.logger.info('Gmail inbox loaded');
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      const composeButton = this.page.locator('//div[text()="Compose"]');
      return await composeButton.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Navigate to Google service
   */
  async navigateToService(service: 'calendar' | 'sheets' | 'docs' | 'drive' | 'slides' | 'chat'): Promise<void> {
    this.logger.info(`Navigating to ${service}`);

    const serviceUrls: { [key: string]: string } = {
      calendar: 'https://calendar.google.com',
      sheets: 'https://sheets.google.com',
      docs: 'https://docs.google.com',
      drive: 'https://drive.google.com',
      slides: 'https://slides.google.com',
      chat: 'https://chat.google.com'
    };

    await this.page.goto(serviceUrls[service]);
    await this.page.waitForLoadState('networkidle');
    this.logger.info(`${service} loaded successfully`);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    const screenshotPath = `test-outputs/screenshots/${name}.png`;
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    this.logger.info(`Screenshot saved: ${screenshotPath}`);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 30000): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click Compose button
   */
  async clickCompose(): Promise<void> {
    this.logger.info('Clicking Compose button');
    await this.page.click('//div[text()="Compose"]');
    this.logger.info('Compose dialog opened');
  }

  /**
   * Search in Gmail
   */
  async search(query: string): Promise<void> {
    this.logger.info(`Searching for: ${query}`);
    const searchBox = this.page.locator('input[aria-label="Search mail"]');
    await searchBox.fill(query);
    await searchBox.press('Enter');
    await this.page.waitForLoadState('networkidle');
    this.logger.info('Search completed');
  }

  /**
   * Logout from Gmail
   */
  async logout(): Promise<void> {
    this.logger.info('Logging out from Gmail');

    // Click profile button
    await this.page.click('a[aria-label*="Google Account"]');
    await this.page.waitForTimeout(1000);

    // Click Sign out
    await this.page.click('text=Sign out');
    await this.page.waitForLoadState('networkidle');

    this.logger.info('Logged out successfully');
  }
}
