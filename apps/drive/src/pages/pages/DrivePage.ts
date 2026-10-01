import { Page } from '@playwright/test';
import { BasePage } from '@common/ui-components';

/**
 * Google Drive Page
 */
export class DrivePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://drive.google.com/');
    await this.waitForPageLoad();
    await this.takeScreenshot('drive-opened');
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('drive.google.com');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
