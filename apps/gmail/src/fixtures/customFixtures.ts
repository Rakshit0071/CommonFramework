import { test as base } from '@playwright/test';
import { Logger, DataGenerator, registerScreenshotOnFailure } from '@common/test-utils';
import { AppLauncher } from '@common/ui-components';
import { GmailPage } from '../pages/pages/GmailPage';

type CustomFixtures = {
  logger: Logger;
  gmailPage: GmailPage;
  appLauncher: AppLauncher;
  dataGenerator: typeof DataGenerator;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);
    logger.info('Test completed');
  },

  gmailPage: async ({ page }, use) => {
    await use(new GmailPage(page));
  },

  appLauncher: async ({ page }, use) => {
    await use(new AppLauncher(page));
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

registerScreenshotOnFailure(test);

export { expect } from '@playwright/test';
