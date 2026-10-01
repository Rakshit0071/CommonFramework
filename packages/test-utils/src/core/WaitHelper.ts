import { Page } from '@playwright/test';
import { Logger } from './Logger';

export class WaitHelper {
  private page: Page;
  private logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElementVisible(selector: string, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for element to be visible: ${selector}`);
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(selector: string, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for element to be hidden: ${selector}`);
    await this.page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for element to be attached to DOM
   */
  async waitForElementAttached(selector: string, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for element to be attached: ${selector}`);
    await this.page.locator(selector).waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for page navigation
   */
  async waitForNavigation(timeout: number = 60000): Promise<void> {
    this.logger.info('Waiting for navigation');
    await this.page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for specific URL
   */
  async waitForUrl(url: string | RegExp, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for URL: ${url}`);
    await this.page.waitForURL(url, { timeout });
  }

  /**
   * Wait for timeout
   */
  async waitForTimeout(milliseconds: number): Promise<void> {
    this.logger.info(`Waiting for ${milliseconds}ms`);
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Wait for selector with custom condition
   */
  async waitForCondition(
    condition: () => Promise<boolean>,
    timeout: number = 30000,
    message: string = 'Condition not met'
  ): Promise<void> {
    this.logger.info(`Waiting for condition: ${message}`);
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await this.page.waitForTimeout(500);
    }

    throw new Error(`Timeout waiting for condition: ${message}`);
  }
}
