import { test, expect } from '../src/fixtures/customFixtures';

test('Slides - should navigate and load @parallel', async ({ slidesPage, logger }) => {
  logger.info('Starting Slides test');

  await slidesPage.navigate();
  expect(await slidesPage.isPageLoaded()).toBeTruthy();

  logger.info('Slides test completed');
});
