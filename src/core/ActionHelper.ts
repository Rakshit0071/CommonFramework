import { Page, Locator } from '@playwright/test';
import { Logger } from './Logger';
import { WaitHelper } from './WaitHelper';

export class ActionHelper {
  private page: Page;
  private logger: Logger;
  private waitHelper: WaitHelper;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
    this.waitHelper = new WaitHelper(page);
  }

  /**
   * Click on an element
   */
  async click(selector: string, options?: { force?: boolean; timeout?: number }): Promise<void> {
    this.logger.info(`Clicking on element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector, options?.timeout);
    await this.page.locator(selector).click({ force: options?.force });
  }

  /**
   * Double click on an element
   */
  async doubleClick(selector: string): Promise<void> {
    this.logger.info(`Double clicking on element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).dblclick();
  }

  /**
   * Type text into an input field
   */
  async type(selector: string, text: string, options?: { delay?: number }): Promise<void> {
    this.logger.info(`Typing text into element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).fill('');
    await this.page.locator(selector).type(text, { delay: options?.delay || 50 });
  }

  /**
   * Fill text into an input field (faster than type)
   */
  async fill(selector: string, text: string): Promise<void> {
    this.logger.info(`Filling text into element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).fill(text);
  }

  /**
   * Clear input field
   */
  async clear(selector: string): Promise<void> {
    this.logger.info(`Clearing element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).clear();
  }

  /**
   * Select option from dropdown by value
   */
  async selectByValue(selector: string, value: string): Promise<void> {
    this.logger.info(`Selecting option by value: ${value} in ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).selectOption({ value });
  }

  /**
   * Select option from dropdown by label
   */
  async selectByLabel(selector: string, label: string): Promise<void> {
    this.logger.info(`Selecting option by label: ${label} in ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).selectOption({ label });
  }

  /**
   * Check a checkbox or radio button
   */
  async check(selector: string): Promise<void> {
    this.logger.info(`Checking element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).check();
  }

  /**
   * Uncheck a checkbox
   */
  async uncheck(selector: string): Promise<void> {
    this.logger.info(`Unchecking element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).uncheck();
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string): Promise<string> {
    this.logger.info(`Getting text from element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    const text = await this.page.locator(selector).textContent();
    return text || '';
  }

  /**
   * Get attribute value of an element
   */
  async getAttribute(selector: string, attributeName: string): Promise<string | null> {
    this.logger.info(`Getting attribute ${attributeName} from element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    return await this.page.locator(selector).getAttribute(attributeName);
  }

  /**
   * Hover over an element
   */
  async hover(selector: string): Promise<void> {
    this.logger.info(`Hovering over element: ${selector}`);
    await this.waitHelper.waitForElementVisible(selector);
    await this.page.locator(selector).hover();
  }

  /**
   * Press a key
   */
  async pressKey(key: string): Promise<void> {
    this.logger.info(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  /**
   * Upload file
   */
  async uploadFile(selector: string, filePath: string): Promise<void> {
    this.logger.info(`Uploading file to element: ${selector}`);
    await this.page.locator(selector).setInputFiles(filePath);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string): Promise<void> {
    this.logger.info(`Scrolling to element: ${selector}`);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Execute JavaScript
   */
  async executeScript(script: string, ...args: any[]): Promise<any> {
    this.logger.info('Executing JavaScript');
    return await this.page.evaluate(script, ...args);
  }
}