import { test, expect } from '../../fixtures/customFixtures';

test('Drive - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting Drive test');

  await page.goto('https://drive.google.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/drive-opened.png', fullPage: true });

  logger.info('✅ Drive test completed');
});
