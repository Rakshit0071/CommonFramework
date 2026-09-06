import { test, expect } from '../../fixtures/customFixtures';

test.describe('Gmail - Basic Tests', () => {
  test('should navigate to Gmail', async ({ gmailPage, logger }) => {
    logger.info('Starting Gmail navigation test');

    await gmailPage.navigate();
    const isLoaded = await gmailPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();

    await gmailPage.takeScreenshot('gmail-page');
    logger.info('✅ Gmail test completed');
  });
});
