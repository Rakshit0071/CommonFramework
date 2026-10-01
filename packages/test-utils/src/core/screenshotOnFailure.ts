import type { TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions } from '@playwright/test';

/**
 * Registers an afterEach hook that screenshots on failure, unless
 * NO_SCREENSHOT_ON_FAILURE is set — lets you suppress screenshots locally
 * for speed while always keeping them on in CI for debugging.
 *
 * Call once per app's fixtures module: registerScreenshotOnFailure(test).
 */
export function registerScreenshotOnFailure(
  test: TestType<PlaywrightTestArgs & PlaywrightTestOptions, PlaywrightWorkerArgs & PlaywrightWorkerOptions>
): void {
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus && !process.env.NO_SCREENSHOT_ON_FAILURE) {
      await page.screenshot({
        path: `test-outputs/screenshots/${testInfo.title.replace(/\s+/g, '-')}.png`,
        fullPage: true,
      });
    }
  });
}
