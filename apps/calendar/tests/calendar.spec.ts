import { test, expect } from '../src/fixtures/customFixtures';

test('Calendar - should navigate and load @parallel', async ({ calendarPage, logger }) => {
  logger.info('Starting Calendar test');

  await calendarPage.navigate();
  expect(await calendarPage.isPageLoaded()).toBeTruthy();

  logger.info('Calendar test completed');
});
