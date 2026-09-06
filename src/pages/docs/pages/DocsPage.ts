import { Page } from '@playwright/test';
import { BasePage } from '../../../base/BasePage';
import { DocsLocators } from '../locators/docs.locators';

/**
 * Google Docs Page
 */
export class DocsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://docs.google.com/document/');
    await this.waitForPageLoad();
    await this.takeScreenshot('docs-opened');
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('document');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
