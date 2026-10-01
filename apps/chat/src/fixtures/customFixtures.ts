import { test as base } from '@playwright/test';
import { Logger, DataGenerator, registerScreenshotOnFailure } from '@common/test-utils';
import { ChatPage } from '../pages/pages/ChatPage';

type CustomFixtures = {
  logger: Logger;
  chatPage: ChatPage;
  dataGenerator: typeof DataGenerator;
};

export const test = base.extend<CustomFixtures>({
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);
    logger.info('Test completed');
  },

  chatPage: async ({ page }, use) => {
    await use(new ChatPage(page));
  },

  dataGenerator: async ({}, use) => {
    await use(DataGenerator);
  },
});

registerScreenshotOnFailure(test);

export { expect } from '@playwright/test';
