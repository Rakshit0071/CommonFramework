import { test, expect } from '../../fixtures/customFixtures';

test('Docs - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting Docs test');

  await page.goto('https://docs.google.com/document');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/docs-opened.png', fullPage: true });

  logger.info('✅ Docs test completed');
});
