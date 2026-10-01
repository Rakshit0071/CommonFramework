import { expect, Page } from '@playwright/test';
import { Logger } from './Logger';

export class AssertionHelper {
  private page: Page;
  private logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
  }

  /**
   * Assert element is visible
   */
  async assertElementVisible(selector: string, message?: string): Promise<void> {
    this.logger.info(`Asserting element is visible: ${selector}`);
    await expect(this.page.locator(selector), message).toBeVisible({
      timeout: 30000
    });
  }

  /**
   * Assert element is hidden
   */
  async assertElementHidden(selector: string): Promise<void> {
    this.logger.info(`Asserting element is hidden: ${selector}`);
    await expect(this.page.locator(selector)).toBeHidden();
  }

  /**
   * Assert element contains text
   */
  async assertElementContainsText(selector: string, expectedText: string): Promise<void> {
    this.logger.info(`Asserting element ${selector} contains text: ${expectedText}`);
    await expect(this.page.locator(selector)).toContainText(expectedText);
  }

  /**
   * Assert element has exact text
   */
  async assertElementHasText(selector: string, expectedText: string): Promise<void> {
    this.logger.info(`Asserting element ${selector} has text: ${expectedText}`);
    await expect(this.page.locator(selector)).toHaveText(expectedText);
  }

  /**
   * Assert URL contains
   */
  async assertUrlContains(expectedUrl: string): Promise<void> {
    this.logger.info(`Asserting URL contains: ${expectedUrl}`);
    expect(this.page.url()).toContain(expectedUrl);
  }

  /**
   * Assert URL equals
   */
  async assertUrlEquals(expectedUrl: string): Promise<void> {
    this.logger.info(`Asserting URL equals: ${expectedUrl}`);
    expect(this.page.url()).toBe(expectedUrl);
  }

  /**
   * Assert page title
   */
  async assertTitle(expectedTitle: string): Promise<void> {
    this.logger.info(`Asserting page title: ${expectedTitle}`);
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert element is enabled
   */
  async assertElementEnabled(selector: string): Promise<void> {
    this.logger.info(`Asserting element is enabled: ${selector}`);
    await expect(this.page.locator(selector)).toBeEnabled();
  }

  /**
   * Assert element is disabled
   */
  async assertElementDisabled(selector: string): Promise<void> {
    this.logger.info(`Asserting element is disabled: ${selector}`);
    await expect(this.page.locator(selector)).toBeDisabled();
  }

  /**
   * Assert element is checked
   */
  async assertElementChecked(selector: string): Promise<void> {
    this.logger.info(`Asserting element is checked: ${selector}`);
    await expect(this.page.locator(selector)).toBeChecked();
  }

  /**
   * Assert element count
   */
  async assertElementCount(selector: string, expectedCount: number): Promise<void> {
    this.logger.info(`Asserting element count for ${selector}: ${expectedCount}`);
    await expect(this.page.locator(selector)).toHaveCount(expectedCount);
  }

  /**
   * Assert element has attribute
   */
  async assertElementHasAttribute(
    selector: string,
    attributeName: string,
    expectedValue: string
  ): Promise<void> {
    this.logger.info(
      `Asserting element ${selector} has attribute ${attributeName}: ${expectedValue}`
    );
    await expect(this.page.locator(selector)).toHaveAttribute(attributeName, expectedValue);
  }
}