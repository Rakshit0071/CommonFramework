import { test as base } from '@playwright/test';
import { Logger, DataGenerator, registerScreenshotOnFailure } from '@common/test-utils';
import { DrivePage } from '../pages/pages/DrivePage';

type CustomFixtures = {
  logger: Logger;
  drivePage: DrivePage;
  dataGenerator: typeof DataGenerator;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);
    logger.info('Test completed');
  },

  drivePage: async ({ page }, use) => {
    await use(new DrivePage(page));
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

registerScreenshotOnFailure(test);

export { expect } from '@playwright/test';
