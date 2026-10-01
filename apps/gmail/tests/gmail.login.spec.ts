import { test, expect } from '../src/fixtures/customFixtures';
import { LayoutAssertions, CSSAssertions } from '@common/ui-components';
import { GmailLocators } from '../src/pages/locators/gmail.locators';

test.describe('Gmail - Basic Tests', () => {
  test('should navigate to Gmail @parallel', async ({ gmailPage, logger }) => {
    logger.info('Starting Gmail navigation test');

    await gmailPage.navigate();
    const isLoaded = await gmailPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();

    await gmailPage.takeScreenshot('gmail-page');
    logger.info('Gmail test completed');
  });

  test('cross-app navigation via AppLauncher @parallel', async ({ gmailPage, appLauncher, logger }) => {
    logger.info('Starting AppLauncher test');

    await gmailPage.navigate();
    const calendarVisible = await appLauncher.isAppVisible('Calendar');
    expect(calendarVisible).toBeTruthy();

    logger.info('AppLauncher test completed');
  });

  test('inbox toolbar layout is structurally sound @parallel', async ({ gmailPage, page, logger }) => {
    logger.info('Starting LayoutAssertions/CSSAssertions demo');

    await gmailPage.navigate();
    const search = page.locator(GmailLocators.searchBox_L);
    const apps = page.locator(GmailLocators.googleAppsButton_L);

    // Tier 1: structural layout - the waffle menu sits to the right of search, same row.
    await LayoutAssertions.assertAligned(search, apps, 'top', 20);
    // Tier 2: CSS compliance - search box should not render with zero width.
    const width = await search.evaluate((el) => window.getComputedStyle(el).width);
    expect(parseFloat(width)).toBeGreaterThan(0);
    void CSSAssertions; // demonstrates the import surface; see CSSAssertions.assertCssProperty for usage

    logger.info('LayoutAssertions/CSSAssertions demo completed');
  });

  test('inbox visual baseline @parallel', async ({ gmailPage, page, logger }) => {
    logger.info('Starting visual regression baseline test');

    await gmailPage.navigate();
    // Tier 3: pixel regression. First run creates the baseline under
    // gmail.login.spec.ts-snapshots/; review and commit it, then every
    // subsequent run diffs against it. Update intentionally with
    // `playwright test --update-snapshots`.
    await expect(page).toHaveScreenshot('gmail-inbox.png', {
      maxDiffPixelRatio: 0.02,
      mask: [page.locator(GmailLocators.emailRow_SL)], // inbox content changes per account/run
    });

    logger.info('Visual regression baseline test completed');
  });

  test('profile control is visible @serial', async ({ gmailPage, page, logger }) => {
    // Tagged @serial purely to demonstrate the two-phase execution
    // convention (see LOCATOR_CONTRACT.md / playwright.config.ts projects).
    // A *real* @serial candidate is one that mutates shared state, e.g.
    // archiving or starring an email — this one just reads, so it is safe
    // to run against the real account without side effects.
    logger.info('Starting serial-tagged demo test');

    await gmailPage.navigate();
    await expect(page.locator(GmailLocators.profileButton_L)).toBeVisible();

    logger.info('Serial-tagged demo test completed');
  });
});
