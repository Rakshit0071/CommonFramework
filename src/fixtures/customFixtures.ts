import { test as base, Page } from '@playwright/test';
import { GmailPage } from '../pages/gmail/pages/GmailPage';
import { EENPage } from '../pages/een/pages/EENPage';
import { Logger } from '../core/Logger';
import { EENHelper } from '../core/EENHelper';
import { GmailHelper } from '../core/GmailHelper';
import { ActionHelper } from '../core/ActionHelper';
import { WaitHelper } from '../core/WaitHelper';
import { DataGenerator } from '../utils/DataGenerator';

type CustomFixtures = {
  logger: Logger;
  gmailPage: GmailPage;
  eenPage: EENPage;
  gmailHelper: GmailHelper;
  eenHelper: EENHelper;
  actionHelper: ActionHelper;
  waitHelper: WaitHelper;
  dataGenerator: typeof DataGenerator;
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

  gmailPage: async ({ page }, use) => {
    const gmailPage = new GmailPage(page);
    await use(gmailPage);
  },

  eenPage: async ({ page }, use) => {
    const eenPage = new EENPage(page);
    await use(eenPage);
  },

  gmailHelper: async ({ page }, use) => {
    const gmailHelper = new GmailHelper(page);
    await use(gmailHelper);
  },

  eenHelper: async ({ page }, use) => {
    const eenHelper = new EENHelper(page);
    await use(eenHelper);
  },

  actionHelper: async ({ page }, use) => {
    const actionHelper = new ActionHelper(page);
    await use(actionHelper);
  },

  waitHelper: async ({ page }, use) => {
    const waitHelper = new WaitHelper(page);
    await use(waitHelper);
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

export { expect } from '@playwright/test';