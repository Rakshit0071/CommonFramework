import { test, expect } from '../../fixtures/customFixtures';

test('EEN - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting EEN test');

  await page.goto('https://login.eagleeyenetworks.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/een-opened.png', fullPage: true });

  logger.info('✅ EEN test completed');
});
