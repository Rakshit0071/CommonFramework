import { Page } from '@playwright/test';
import { BasePage } from '../../base/BasePage';
import { BrivoDashboardLocators } from './locators/dashboard.locators';
import { brivoConfig } from '../../config/brivo.config';

export class BrivoDashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Brivo dashboard
   */
  async navigate(): Promise<void> {
    await this.navigateTo(brivoConfig.getDashboardUrl());
    await this.waitForPageLoad();
  }

  /**
   * Get welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    return await this.actionHelper.getText(BrivoDashboardLocators.welcomeMessage.selector);
  }

  /**
   * Navigate to specific application
   */
  async navigateToApp(appNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7): Promise<void> {
    this.logger.info(`Navigating to Application ${appNumber}`);

    const appLinkMap: Record<number, string> = {
      1: BrivoDashboardLocators.app1Link.selector,
      2: BrivoDashboardLocators.app2Link.selector,
      3: BrivoDashboardLocators.app3Link.selector,
      4: BrivoDashboardLocators.app4Link.selector,
      5: BrivoDashboardLocators.app5Link.selector,
      6: BrivoDashboardLocators.app6Link.selector,
      7: BrivoDashboardLocators.app7Link.selector,
    };

    const appLinkSelector = appLinkMap[appNumber];
    await this.actionHelper.click(appLinkSelector);
    await this.waitForPageLoad();
  }

  /**
   * Click user profile icon
   */
  async clickUserProfile(): Promise<void> {
    await this.actionHelper.click(BrivoDashboardLocators.userProfileIcon.selector);
  }

  /**
   * Logout from Brivo
   */
  async logout(): Promise<void> {
    this.logger.info('Logging out from Brivo');
    await this.clickUserProfile();
    await this.actionHelper.click(BrivoDashboardLocators.logoutButton.selector);
    await this.waitForPageLoad();
  }

  /**
   * Verify page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(BrivoDashboardLocators.dashboardContainer.selector);
  }

  /**
   * Verify user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(BrivoDashboardLocators.userProfileIcon.selector);
  }
}