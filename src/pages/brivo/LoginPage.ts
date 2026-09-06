import { Page } from '@playwright/test';
import { BasePage } from '../../base/BasePage';
import { BrivoLoginLocators } from './locators/login.locators';
import { brivoConfig } from '../../config/brivo.config';
import { ILoginCredentials } from '../../types';

export class BrivoLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Brivo login page
   */
  async navigate(): Promise<void> {
    await this.navigateTo(brivoConfig.getLoginUrl());
    await this.waitForPageLoad();
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    this.logger.info(`Entering username: ${username}`);
    await this.actionHelper.fill(BrivoLoginLocators.usernameInput.selector, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    this.logger.info('Entering password');
    await this.actionHelper.fill(BrivoLoginLocators.passwordInput.selector, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    this.logger.info('Clicking login button');
    await this.actionHelper.click(BrivoLoginLocators.loginButton.selector);
  }

  /**
   * Check remember me checkbox
   */
  async checkRememberMe(): Promise<void> {
    this.logger.info('Checking remember me checkbox');
    await this.actionHelper.check(BrivoLoginLocators.rememberMeCheckbox.selector);
  }

  /**
   * Complete login process
   */
  async login(credentials?: ILoginCredentials): Promise<void> {
    const username = credentials?.username || brivoConfig.username;
    const password = credentials?.password || brivoConfig.password;

    this.logger.info('Starting Brivo login process');
    await this.navigate();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    await this.waitForPageLoad();
    this.logger.info('Brivo login completed');
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.actionHelper.getText(BrivoLoginLocators.errorMessage.selector);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isElementVisible(BrivoLoginLocators.errorMessage.selector);
  }

  /**
   * Verify page is loaded
   */
  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(BrivoLoginLocators.loginForm.selector);
  }
}