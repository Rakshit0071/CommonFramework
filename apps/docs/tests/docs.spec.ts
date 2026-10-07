import { test, expect } from '../src/fixtures/customFixtures';

test('Docs - should navigate and load @parallel', async ({ docsPage, logger }) => {
  logger.info('Starting Docs test');

  await docsPage.navigate();
  expect(await docsPage.isPageLoaded()).toBeTruthy();

  logger.info('Docs test completed');
});
