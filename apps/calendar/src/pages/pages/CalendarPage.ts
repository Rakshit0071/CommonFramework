import { Page } from '@playwright/test';
import { BasePage } from '@common/ui-components';

/**
 * Google Calendar Page
 *
 * This page handles all calendar operations
 *
 * Responsibilities:
 * - Navigate to calendar
 * - View calendar
 * - Create events
 * - Manage settings
 *
 * Locators: ../locators/calendar.locators.ts
 */
export class CalendarPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    this.logger.info('Navigating to Calendar');
    await this.navigateTo('https://calendar.google.com');
    await this.waitForPageLoad();
    await this.takeScreenshot('calendar-opened');
  }

  async isPageLoaded(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('calendar.google.com');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-outputs/screenshots/${name}.png`,
      fullPage: true
    });
    this.logger.info(`Screenshot saved: ${name}.png`);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
