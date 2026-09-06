import { test, expect } from '../../fixtures/customFixtures';

test('Slides - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting Slides test');

  await page.goto('https://docs.google.com/presentation');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/slides-opened.png', fullPage: true });

  logger.info('✅ Slides test completed');
});
