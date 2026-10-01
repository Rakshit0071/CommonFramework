import { Page } from '@playwright/test';
import { BasePage, AppLauncher } from '@common/ui-components';

/**
 * Gmail Page
 */
export class GmailPage extends BasePage {
  readonly appLauncher: AppLauncher;

  constructor(page: Page) {
    super(page);
    this.appLauncher = new AppLauncher(page);
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

  /**
   * Cross-app navigation via the waffle menu, e.g. navigateToApp('Calendar').
   * Returns the new tab Google opens for the target app.
   */
  async navigateToApp(appName: string): Promise<Page> {
    return this.appLauncher.navigateToApp(appName);
  }
}
