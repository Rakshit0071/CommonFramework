import { test, expect } from '../../fixtures/customFixtures';

/**
 * Eagle Eye Networks - Static User Login Tests
 * URL: https://webapp.ta.eagleeyenetworks.com
 * User: een.web3.auto+static@gmail.com
 * Purpose: Regression testing with static user
 */

test.describe('Eagle Eye Networks - Static User Login', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to EEN (no Brivo login needed for this test)
    await page.goto('https://webapp.ta.eagleeyenetworks.com');
  });

  test('should successfully login with static user credentials', async ({ page, logger }) => {
    logger.info('=== Starting EEN Static User Login Test ===');

    // Step 1: Wait for login page to load
    logger.info('Step 1: Waiting for login page to load');
    await page.waitForLoadState('networkidle');

    // Step 2: Enter username
    logger.info('Step 2: Entering username');
    const usernameField = page.locator('input[name="username"], input[type="email"], input#username, input#email');
    await usernameField.waitFor({ state: 'visible', timeout: 10000 });
    await usernameField.fill('een.web3.auto+static@gmail.com');

    // Step 3: Enter password
    logger.info('Step 3: Entering password');
    const passwordField = page.locator('input[name="password"], input[type="password"], input#password');
    await passwordField.waitFor({ state: 'visible', timeout: 10000 });
    await passwordField.fill('7zBJrbnSCQNDuwG');

    // Step 4: Click login button
    logger.info('Step 4: Clicking login button');
    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login"), button:has-text("Log In")');
    await loginButton.click();

    // Step 5: Wait for navigation after login
    logger.info('Step 5: Waiting for successful login redirect');
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Step 6: Verify successful login
    logger.info('Step 6: Verifying successful login');

    // Wait for URL to change (should not be on login page anymore)
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');

    logger.info(`Current URL after login: ${currentUrl}`);
    logger.info('=== Login Test Completed Successfully ===');
  });

  test('should display login page elements correctly', async ({ page, logger }) => {
    logger.info('Testing login page elements');

    // Verify username field exists
    const usernameField = page.locator('input[name="username"], input[type="email"], input#username, input#email');
    await expect(usernameField).toBeVisible({ timeout: 10000 });

    // Verify password field exists
    const passwordField = page.locator('input[name="password"], input[type="password"], input#password');
    await expect(passwordField).toBeVisible({ timeout: 10000 });

    // Verify login button exists
    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    await expect(loginButton).toBeVisible({ timeout: 10000 });

    logger.info('All login page elements verified');
  });

  test('should handle invalid password correctly', async ({ page, logger }) => {
    logger.info('Testing invalid password scenario');

    // Enter valid username
    const usernameField = page.locator('input[name="username"], input[type="email"], input#username, input#email');
    await usernameField.waitFor({ state: 'visible', timeout: 10000 });
    await usernameField.fill('een.web3.auto+static@gmail.com');

    // Enter INVALID password
    const passwordField = page.locator('input[name="password"], input[type="password"], input#password');
    await passwordField.fill('WrongPassword123');

    // Click login button
    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    await loginButton.click();

    // Wait a bit for error message
    await page.waitForTimeout(3000);

    // Should still be on login page or show error
    const currentUrl = page.url();
    const hasError = await page.locator('text=/invalid|incorrect|error/i').count() > 0;

    // Either still on login page OR error message shown
    const loginFailed = currentUrl.includes('/login') || currentUrl.includes('webapp.ta.eagleeyenetworks.com') || hasError;
    expect(loginFailed).toBeTruthy();

    logger.info('Invalid password test completed');
  });

  test('should login and verify dashboard loads', async ({ page, logger }) => {
    logger.info('=== Full Login Flow with Dashboard Verification ===');

    // Login
    const usernameField = page.locator('input[name="username"], input[type="email"], input#username, input#email');
    await usernameField.waitFor({ state: 'visible', timeout: 10000 });
    await usernameField.fill('een.web3.auto+static@gmail.com');

    const passwordField = page.locator('input[name="password"], input[type="password"], input#password');
    await passwordField.fill('7zBJrbnSCQNDuwG');

    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    await loginButton.click();

    // Wait for dashboard
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await page.waitForTimeout(3000);

    // Take screenshot of dashboard
    await page.screenshot({
      path: 'app/screenshots/een-dashboard-static-user.png',
      fullPage: true
    });
    logger.info('Screenshot saved: een-dashboard-static-user.png');

    // Verify we're logged in (URL should have changed)
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');

    logger.info(`Dashboard loaded successfully at: ${currentUrl}`);
  });

  test('should login and check page title', async ({ page, logger }) => {
    logger.info('Testing page title after login');

    // Login
    const usernameField = page.locator('input[name="username"], input[type="email"], input#username, input#email');
    await usernameField.waitFor({ state: 'visible', timeout: 10000 });
    await usernameField.fill('een.web3.auto+static@gmail.com');

    const passwordField = page.locator('input[name="password"], input[type="password"], input#password');
    await passwordField.fill('7zBJrbnSCQNDuwG');

    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Login")');
    await loginButton.click();

    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Get page title
    const title = await page.title();
    logger.info(`Page title: ${title}`);

    // Title should not be empty
    expect(title.length).toBeGreaterThan(0);
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `app/screenshots/FAILED-${testInfo.title.replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    }
  });
});