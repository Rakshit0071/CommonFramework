import { test as base, Page } from '@playwright/test';
import { BrivoLoginPage } from '../pages/brivo/LoginPage';
import { BrivoDashboardPage } from '../pages/brivo/DashboardPage';
import { App1LoginPage } from '../pages/app1/App1LoginPage';
import { App1HomePage } from '../pages/app1/App1HomePage';
import { Logger } from '../core/Logger';

type CustomFixtures = {
  logger: Logger;
  brivoLoginPage: BrivoLoginPage;
  brivoDashboardPage: BrivoDashboardPage;
  app1LoginPage: App1LoginPage;
  app1HomePage: App1HomePage;
};

/**
 * Custom test fixtures that provide page objects and utilities
 */
export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);
    logger.info('Test completed');
  },

  brivoLoginPage: async ({ page }, use) => {
    const brivoLoginPage = new BrivoLoginPage(page);
    await use(brivoLoginPage);
  },

  brivoDashboardPage: async ({ page }, use) => {
    const brivoDashboardPage = new BrivoDashboardPage(page);
    await use(brivoDashboardPage);
  },

  app1LoginPage: async ({ page }, use) => {
    const app1LoginPage = new App1LoginPage(page);
    await use(app1LoginPage);
  },

  app1HomePage: async ({ page }, use) => {
    const app1HomePage = new App1HomePage(page);
    await use(app1HomePage);
  },
});

export { expect } from '@playwright/test';