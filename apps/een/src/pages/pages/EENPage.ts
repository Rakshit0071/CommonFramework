import { Page } from '@playwright/test';
import { BasePage } from '@common/ui-components';

/**
 * EEN Page
 */
export class EENPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://login.eagleeyenetworks.com/');
    await this.waitForPageLoad();
    await this.takeScreenshot('een-opened');
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('eagleeyenetworks.com');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
