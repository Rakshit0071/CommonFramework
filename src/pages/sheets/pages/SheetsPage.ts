import { Page } from '@playwright/test';
import { BasePage } from '../../../base/BasePage';
import { SheetsLocators } from '../locators/sheets.locators';

/**
 * Google Sheets Page
 */
export class SheetsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://docs.google.com/spreadsheets/');
    await this.waitForPageLoad();
    await this.takeScreenshot('sheets-opened');
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('spreadsheets');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
