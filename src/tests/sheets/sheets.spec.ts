import { test, expect } from '../../fixtures/customFixtures';

test('Sheets - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting Sheets test');

  await page.goto('https://docs.google.com/spreadsheets');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/sheets-opened.png', fullPage: true });

  logger.info('✅ Sheets test completed');
});
