import { test, expect } from '../src/fixtures/customFixtures';

test('Sheets - should navigate and load @parallel', async ({ sheetsPage, logger }) => {
  logger.info('Starting Sheets test');

  await sheetsPage.navigate();
  expect(await sheetsPage.isPageLoaded()).toBeTruthy();

  logger.info('Sheets test completed');
});
