import { test as base, Page, Browser } from '@playwright/test';
import { Logger } from '../core/Logger';
import { ITestContext } from '../types';

export abstract class BaseTest {
  protected page!: Page;
  protected browser!: Browser;
  protected logger: Logger;
  protected testContext: ITestContext;

  constructor() {
    this.logger = new Logger();
    this.testContext = {
      brivoLoggedIn: false,
    };
  }

  /**
   * Setup method - called before each test
   */
  async setup(page: Page): Promise<void> {
    this.page = page;
    this.logger.info('Test setup started');
  }

  /**
   * Teardown method - called after each test
   */
  async teardown(): Promise<void> {
    this.logger.info('Test teardown started');
    // Add cleanup logic here
  }

  /**
   * Abstract method for Brivo login - must be implemented
   */
  abstract loginToBrivo(): Promise<void>;

  /**
   * Abstract method for app-specific login - must be implemented
   */
  abstract loginToApp(appName: string): Promise<void>;
}