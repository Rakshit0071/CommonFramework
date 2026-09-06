import { Page } from '@playwright/test';
import { BasePage } from '../../base/BasePage';
import { App1Locators } from './locators/app1.locators';
import { app1Config } from '../../config/app1.config';
import { ILoginCredentials } from '../../types';

/**
 * Eagle Eye Networks Login Page
 * Handles login functionality for EEN application
 */
export class App1LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Eagle Eye Networks login page
   */
  async navigate(): Promise<void> {
    await this.navigateTo(app1Config.getAppLoginUrl());
    await this.waitForPageLoad();
  }

  /**
   * Enter Eagle Eye Networks username/email
   */
  async enterUsername(username: string): Promise<void> {
    this.logger.info(`Entering Eagle Eye Networks username: ${username}`);
    await this.actionHelper.fill(App1Locators.login.usernameInput.selector, username);
  }

  /**
   * Enter Eagle Eye Networks password
   */
  async enterPassword(password: string): Promise<void> {
    this.logger.info('Entering Eagle Eye Networks password');
    await this.actionHelper.fill(App1Locators.login.passwordInput.selector, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    this.logger.info('Clicking Eagle Eye Networks login button');
    await this.actionHelper.click(App1Locators.login.loginButton.selector);
  }

  /**
   * Check remember me option
   */
  async checkRememberMe(): Promise<void> {
    this.logger.info('Checking remember me option');
    await this.actionHelper.check(App1Locators.login.rememberMe.selector);
  }

  /**
   * Complete login process for Eagle Eye Networks
   */
  async login(credentials?: ILoginCredentials): Promise<void> {
    const username = credentials?.username || app1Config.username;
    const password = credentials?.password || app1Config.password;

    this.logger.info('Starting Eagle Eye Networks login process');
    await this.navigate();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.waitForPageLoad();
    this.logger.info('Eagle Eye Networks login completed');
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.actionHelper.getText(App1Locators.login.errorMessage.selector);
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isElementVisible(App1Locators.login.errorMessage.selector);
  }

  /**
   * Verify page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(App1Locators.login.loginButton.selector);
  }
}