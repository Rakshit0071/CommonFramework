import { test, expect } from '../../fixtures/customFixtures';

test('Chat - should navigate and take screenshot', async ({ page, logger }) => {
  logger.info('Starting Chat test');

  await page.goto('https://chat.google.com');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'test-outputs/screenshots/chat-opened.png', fullPage: true });

  logger.info('✅ Chat test completed');
});
