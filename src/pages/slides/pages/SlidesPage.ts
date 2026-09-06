import { Page } from '@playwright/test';
import { BasePage } from '../../../base/BasePage';
import { SlidesLocators } from '../locators/slides.locators';

/**
 * Google Slides Page
 */
export class SlidesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.navigateTo('https://docs.google.com/presentation/');
    await this.waitForPageLoad();
  }

  async isPageLoaded(): Promise<boolean> {
    return this.page.url().includes('presentation');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `test-outputs/screenshots/${name}.png`, fullPage: true });
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
