import { test, expect } from '../../fixtures/customFixtures';

test('Calendar - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting Calendar test');

  await page.goto('https://calendar.google.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/calendar-opened.png', fullPage: true });

  logger.info('✅ Calendar test completed');
});
