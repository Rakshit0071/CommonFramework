import { test as base } from '@playwright/test';
import { Logger, DataGenerator, registerScreenshotOnFailure } from '@common/test-utils';
import { EENPage } from '../pages/pages/EENPage';
import { EENHelper } from '../helpers/EENHelper';

type CustomFixtures = {
  logger: Logger;
  eenPage: EENPage;
  eenHelper: EENHelper;
  dataGenerator: typeof DataGenerator;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);
    logger.info('Test completed');
  },

  eenPage: async ({ page }, use) => {
    await use(new EENPage(page));
  },

  eenHelper: async ({ page }, use) => {
    await use(new EENHelper(page));
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

registerScreenshotOnFailure(test);

export { expect } from '@playwright/test';
