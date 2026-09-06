import { Page } from '@playwright/test';
import { Logger } from './Logger';
import { ActionHelper } from './ActionHelper';
import { WaitHelper } from './WaitHelper';

/**
 * EEN-Specific Helper Functions
 * Reusable functions for Eagle Eye Networks application
 */
export class EENHelper {
  private page: Page;
  private logger: Logger;
  private actionHelper: ActionHelper;
  private waitHelper: WaitHelper;

  // EEN Locators
  private locators = {
    username: '//input[@name="email"]',
    password: '//input[@name="password"]',
    nextButton: '//button[@id="next"]',
    loginButton: 'button[type="submit"]',
    dashboard: '[data-testid="dashboard"]',
    logout: '[data-testid="logout"]',
  };

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
    this.actionHelper = new ActionHelper(page);
    this.waitHelper = new WaitHelper(page);
  }

  /**
   * Complete EEN Login Flow
   * @param username - User email
   * @param password - User password
   * @param baseUrl - EEN URL (optional)
   */
  async login(
    username: string,
    password: string,
    baseUrl: string = process.env.EEN_BASE_URL || 'https://webapp.eagleeyenetworks.com'
  ): Promise<void> {
    this.logger.info(`Starting EEN login for user: ${username}`);

    // Navigate to EEN
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('domcontentloaded');

    // Enter username
    await this.actionHelper.fill(this.locators.username, username);
    this.logger.info('Username entered');

    // Click Next button
    await this.actionHelper.click(this.locators.nextButton);
    this.logger.info('Clicked Next button');

    // Wait for password field
    await this.waitHelper.waitForElementVisible(this.locators.password, 10000);

    // Enter password
    await this.actionHelper.fill(this.locators.password, password);
    this.logger.info('Password entered');

    // Click Login
    await this.actionHelper.click(this.locators.loginButton);
    this.logger.info('Clicked Login button');

    // Wait for dashboard
    await this.waitHelper.waitForNavigation();
    this.logger.info('✅ Login successful');
  }

  /**
   * Quick login using environment credentials
   */
  async quickLogin(): Promise<void> {
    const username = process.env.EEN_USERNAME || '';
    const password = process.env.EEN_PASSWORD || '';
    await this.login(username, password);
  }

  /**
   * Logout from EEN
   */
  async logout(): Promise<void> {
    this.logger.info('Logging out from EEN');
    await this.actionHelper.click(this.locators.logout);
    await this.waitHelper.waitForUrl(/login/);
    this.logger.info('✅ Logout successful');
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    try {
      await this.page.locator(this.locators.dashboard).waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Navigate to specific EEN section
   */
  async navigateTo(section: string): Promise<void> {
    this.logger.info(`Navigating to: ${section}`);
    await this.page.goto(`${process.env.EEN_BASE_URL}/${section}`);
    await this.waitHelper.waitForNavigation();
  }

  /**
   * Take screenshot with EEN-specific naming
   */
  async takeScreenshot(name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `een-${name}-${timestamp}.png`;
    await this.page.screenshot({
      path: `test-outputs/screenshots/${filename}`,
      fullPage: true,
    });
    this.logger.info(`Screenshot saved: ${filename}`);
  }

  /**
   * Wait for EEN page to be fully loaded
   */
  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    await this.waitHelper.waitForTimeout(1000); // Additional buffer
    this.logger.info('Page ready');
  }

  /**
   * Get current user info (if displayed on page)
   */
  async getCurrentUser(): Promise<string> {
    const userElement = this.page.locator('[data-testid="current-user"]');
    return await userElement.textContent() || 'Unknown';
  }

  /**
   * Verify login success by checking URL
   */
  async verifyLoginSuccess(): Promise<boolean> {
    const currentUrl = this.page.url();
    const isSuccess = !currentUrl.includes('/login');
    this.logger.info(`Login verification: ${isSuccess ? 'SUCCESS' : 'FAILED'}`);
    return isSuccess;
  }
}
