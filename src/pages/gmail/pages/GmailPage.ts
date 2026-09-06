import { Page } from '@playwright/test';
import { BasePage } from '../../../base/BasePage';
import { GmailLocators } from '../locators/gmail.locators';

/**
 * Gmail Page
 */
export class GmailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://mail.google.com/');
    await this.waitForPageLoad();
    await this.takeScreenshot('gmail-opened');
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('mail.google.com');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
