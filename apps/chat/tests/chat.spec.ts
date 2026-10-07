import { test, expect } from '../src/fixtures/customFixtures';

test('Chat - should navigate and load @parallel', async ({ chatPage, logger }) => {
  logger.info('Starting Chat test');

  await chatPage.navigate();
  expect(await chatPage.isPageLoaded()).toBeTruthy();

  logger.info('Chat test completed');
});
