import { test, expect } from '../../fixtures/customFixtures';
import { brivoConfig } from '../../config/brivo.config';

test.describe('Brivo Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Any setup before each test
  });

  test('should successfully login to Brivo with valid credentials', async ({
    brivoLoginPage,
    brivoDashboardPage,
  }) => {
    // Navigate to Brivo login page
    await brivoLoginPage.navigate();

    // Verify login page is loaded
    const isLoaded = await brivoLoginPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Perform login
    await brivoLoginPage.login();

    // Verify successful login by checking dashboard
    const isDashboardLoaded = await brivoDashboardPage.isPageLoaded();
    expect(isDashboardLoaded).toBeTruthy();

    // Verify user is logged in
    const isLoggedIn = await brivoDashboardPage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should display error message with invalid credentials', async ({
    brivoLoginPage,
  }) => {
    // Navigate to login page
    await brivoLoginPage.navigate();

    // Attempt login with invalid credentials
    await brivoLoginPage.login({
      username: 'invalid_user',
      password: 'invalid_password',
    });

    // Verify error message is displayed
    const isErrorDisplayed = await brivoLoginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
  });

  test('should navigate to dashboard after successful login', async ({
    brivoLoginPage,
    brivoDashboardPage,
    page,
  }) => {
    // Login to Brivo
    await brivoLoginPage.login();

    // Wait for navigation to dashboard
    await page.waitForURL(`**/${brivoConfig.getDashboardUrl()}/**`, { timeout: 30000 });

    // Verify dashboard URL
    const currentUrl = page.url();
    expect(currentUrl).toContain('dashboard');
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});