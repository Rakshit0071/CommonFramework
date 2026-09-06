import { Page } from '@playwright/test';
import { BasePage } from '../../../base/BasePage';
import { ChatLocators } from '../locators/chat.locators';

/**
 * Google Chat Page
 */
export class ChatPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://chat.google.com/');
    await this.waitForPageLoad();
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('chat.google.com');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
