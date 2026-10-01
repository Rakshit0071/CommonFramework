import { test as base } from '@playwright/test';
import { Logger, DataGenerator, registerScreenshotOnFailure } from '@common/test-utils';
import { CalendarPage } from '../pages/pages/CalendarPage';

type CustomFixtures = {
  logger: Logger;
  calendarPage: CalendarPage;
  dataGenerator: typeof DataGenerator;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);
    logger.info('Test completed');
  },

  calendarPage: async ({ page }, use) => {
    await use(new CalendarPage(page));
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

registerScreenshotOnFailure(test);

export { expect } from '@playwright/test';
