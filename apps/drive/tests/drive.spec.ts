import { test, expect } from '../src/fixtures/customFixtures';

test('Drive - should navigate and load @parallel', async ({ drivePage, logger }) => {
  logger.info('Starting Drive test');

  await drivePage.navigate();
  expect(await drivePage.isPageLoaded()).toBeTruthy();

  logger.info('Drive test completed');
});
