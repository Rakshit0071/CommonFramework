import { Page } from '@playwright/test';
import { BasePage } from '../../base/BasePage';
import { App1Locators } from './locators/app1.locators';
import { app1Config } from '../../config/app1.config';

/**
 * Eagle Eye Networks Home/Dashboard Page
 * Handles main dashboard functionality for EEN
 */
export class App1HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Eagle Eye Networks dashboard
   */
  async navigate(): Promise<void> {
    await this.navigateTo(app1Config.getAppUrl());
    await this.waitForPageLoad();
  }

  /**
   * Get welcome text
   */
  async getWelcomeText(): Promise<string> {
    return await this.actionHelper.getText(App1Locators.home.welcomeText.selector);
  }

  /**
   * Wait for loading spinner to disappear
   */
  async waitForLoadingComplete(): Promise<void> {
    this.logger.info('Waiting for Eagle Eye Networks dashboard to load');
    await this.waitHelper.waitForElementHidden(App1Locators.common.loadingSpinner.selector);
  }

  /**
   * Click live view button
   */
  async clickLiveView(): Promise<void> {
    this.logger.info('Opening Eagle Eye Networks live view');
    await this.actionHelper.click(App1Locators.home.liveViewButton.selector);
  }

  /**
   * Get cameras list
   */
  async getCamerasList(): Promise<boolean> {
    return await this.isElementVisible(App1Locators.home.camerasList.selector);
  }

  /**
   * Verify camera grid is displayed
   */
  async isCameraGridVisible(): Promise<boolean> {
    return await this.isElementVisible(App1Locators.cameras.cameraGrid.selector);
  }

  /**
   * Logout from Eagle Eye Networks
   */
  async logout(): Promise<void> {
    this.logger.info('Logging out from Eagle Eye Networks');
    await this.actionHelper.click(App1Locators.home.logoutButton.selector);
    await this.waitForPageLoad();
  }

  /**
   * Verify page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(App1Locators.home.homeContainer.selector);
  }

  /**
   * Verify user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(App1Locators.home.welcomeText.selector);
  }

  /**
   * Get notification toast message
   */
  async getNotificationMessage(): Promise<string> {
    return await this.actionHelper.getText(App1Locators.common.notificationToast.selector);
  }
}