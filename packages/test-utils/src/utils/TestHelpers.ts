import { Page } from '@playwright/test';
import { Logger } from '../core/Logger';

/**
 * Common Test Helper Functions
 * Reusable utilities for all tests
 */
export class TestHelpers {
  private static logger = new Logger();

  /**
   * Take screenshot with custom name
   */
  static async takeScreenshot(
    page: Page,
    name: string,
    folder: string = 'test-outputs/screenshots'
  ): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${timestamp}.png`;
    const path = `${folder}/${filename}`;

    await page.screenshot({
      path,
      fullPage: true,
    });

    this.logger.info(`Screenshot saved: ${path}`);
    return path;
  }

  /**
   * Wait for page to be fully loaded
   */
  static async waitForPageLoad(page: Page, timeout: number = 60000): Promise<void> {
    await page.waitForLoadState('domcontentloaded', { timeout });
    await page.waitForLoadState('networkidle', { timeout });
    this.logger.info('Page fully loaded');
  }

  /**
   * Scroll to element
   */
  static async scrollToElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).scrollIntoViewIfNeeded();
    this.logger.info(`Scrolled to: ${selector}`);
  }

  /**
   * Scroll to top of page
   */
  static async scrollToTop(page: Page): Promise<void> {
    await page.evaluate(() => window.scrollTo(0, 0));
    this.logger.info('Scrolled to top');
  }

  /**
   * Scroll to bottom of page
   */
  static async scrollToBottom(page: Page): Promise<void> {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    this.logger.info('Scrolled to bottom');
  }

  /**
   * Get element text
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    const text = await page.locator(selector).textContent();
    this.logger.info(`Text from ${selector}: ${text}`);
    return text || '';
  }

  /**
   * Get element attribute
   */
  static async getElementAttribute(
    page: Page,
    selector: string,
    attribute: string
  ): Promise<string> {
    const value = await page.locator(selector).getAttribute(attribute);
    this.logger.info(`Attribute ${attribute} from ${selector}: ${value}`);
    return value || '';
  }

  /**
   * Check if element exists
   */
  static async elementExists(page: Page, selector: string): Promise<boolean> {
    const count = await page.locator(selector).count();
    return count > 0;
  }

  /**
   * Check if element is visible
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  static async isElementEnabled(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.locator(selector).isEnabled();
    } catch {
      return false;
    }
  }

  /**
   * Get count of elements matching selector
   */
  static async getElementCount(page: Page, selector: string): Promise<number> {
    const count = await page.locator(selector).count();
    this.logger.info(`Count of ${selector}: ${count}`);
    return count;
  }

  /**
   * Reload page and wait
   */
  static async reloadPage(page: Page): Promise<void> {
    await page.reload();
    await this.waitForPageLoad(page);
    this.logger.info('Page reloaded');
  }

  /**
   * Go back in browser history
   */
  static async goBack(page: Page): Promise<void> {
    await page.goBack();
    await this.waitForPageLoad(page);
    this.logger.info('Navigated back');
  }

  /**
   * Go forward in browser history
   */
  static async goForward(page: Page): Promise<void> {
    await page.goForward();
    await this.waitForPageLoad(page);
    this.logger.info('Navigated forward');
  }

  /**
   * Switch to frame/iframe
   */
  static async switchToFrame(page: Page, frameSelector: string): Promise<any> {
    const frame = page.frameLocator(frameSelector);
    this.logger.info(`Switched to frame: ${frameSelector}`);
    return frame;
  }

  /**
   * Accept browser alert/confirm
   */
  static async acceptAlert(page: Page): Promise<void> {
    page.once('dialog', (dialog) => {
      this.logger.info(`Alert text: ${dialog.message()}`);
      dialog.accept();
    });
  }

  /**
   * Dismiss browser alert/confirm
   */
  static async dismissAlert(page: Page): Promise<void> {
    page.once('dialog', (dialog) => {
      this.logger.info(`Alert text: ${dialog.message()}`);
      dialog.dismiss();
    });
  }

  /**
   * Get current URL
   */
  static getCurrentUrl(page: Page): string {
    const url = page.url();
    this.logger.info(`Current URL: ${url}`);
    return url;
  }

  /**
   * Get page title
   */
  static async getPageTitle(page: Page): Promise<string> {
    const title = await page.title();
    this.logger.info(`Page title: ${title}`);
    return title;
  }

  /**
   * Wait and retry function
   */
  static async retryAction<T>(
    action: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let i = 0; i < maxRetries; i++) {
      try {
        this.logger.info(`Attempt ${i + 1}/${maxRetries}`);
        return await action();
      } catch (error) {
        lastError = error as Error;
        this.logger.warn(`Attempt ${i + 1} failed: ${lastError.message}`);
        if (i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
    }

    throw new Error(`Failed after ${maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Execute JavaScript in browser
   */
  static async executeScript(page: Page, script: string): Promise<any> {
    const result = await page.evaluate(script);
    this.logger.info('Script executed');
    return result;
  }

  /**
   * Highlight element (for debugging)
   */
  static async highlightElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).evaluate((el) => {
      el.style.border = '3px solid red';
      el.style.backgroundColor = 'yellow';
    });
    this.logger.info(`Highlighted: ${selector}`);
  }

  /**
   * Clear browser cookies
   */
  static async clearCookies(page: Page): Promise<void> {
    await page.context().clearCookies();
    this.logger.info('Cookies cleared');
  }

  /**
   * Set cookie
   */
  static async setCookie(
    page: Page,
    name: string,
    value: string,
    domain?: string
  ): Promise<void> {
    await page.context().addCookies([
      {
        name,
        value,
        domain: domain || new URL(page.url()).hostname,
        path: '/',
      },
    ]);
    this.logger.info(`Cookie set: ${name}=${value}`);
  }

  /**
   * Get cookie value
   */
  static async getCookie(page: Page, name: string): Promise<string | undefined> {
    const cookies = await page.context().cookies();
    const cookie = cookies.find((c) => c.name === name);
    return cookie?.value;
  }
}
