import { test, expect } from '@playwright/test';

/**
 * Eagle Eye Networks - Direct Login Test (Without Brivo)
 * URL: https://webapp.ta.eagleeyenetworks.com
 * User: Static user for regression testing
 *
 * This test goes DIRECTLY to EEN without logging into Brivo first
 */

test.describe('Eagle Eye Networks - Direct Login (No Brivo)', () => {
  const EEN_URL = 'https://webapp.ta.eagleeyenetworks.com';
  const USERNAME = 'een.web3.auto+static@gmail.com';
  const PASSWORD = '7zBJrbnSCQNDuwG';

  test('Complete login workflow - Static User', async ({ page }) => {
    console.log('Starting EEN Direct Login Test');

    // Step 1: Navigate to EEN
    console.log(`Navigating to: ${EEN_URL}`);
    await page.goto(EEN_URL);
    await page.waitForLoadState('domcontentloaded');

    // Step 2: Find and fill username
    console.log('Looking for username field...');
    const usernameLocators = [
      'input[name="username"]',
      'input[type="email"]',
      'input[id="username"]',
      'input[id="email"]',
      'input[placeholder*="email" i]',
      'input[placeholder*="username" i]'
    ];

    let usernameField;
    for (const locator of usernameLocators) {
      const field = page.locator(locator);
      if (await field.count() > 0) {
        usernameField = field.first();
        console.log(`Username field found: ${locator}`);
        break;
      }
    }

    if (!usernameField) {
      throw new Error('Username field not found!');
    }

    await usernameField.waitFor({ state: 'visible', timeout: 10000 });
    await usernameField.fill(USERNAME);
    console.log(`Username entered: ${USERNAME}`);

    // Step 3: Find and fill password
    console.log('Looking for password field...');
    const passwordLocators = [
      'input[name="password"]',
      'input[type="password"]',
      'input[id="password"]'
    ];

    let passwordField;
    for (const locator of passwordLocators) {
      const field = page.locator(locator);
      if (await field.count() > 0) {
        passwordField = field.first();
        console.log(`Password field found: ${locator}`);
        break;
      }
    }

    if (!passwordField) {
      throw new Error('Password field not found!');
    }

    await passwordField.fill(PASSWORD);
    console.log('Password entered');

    // Step 4: Find and click login button
    console.log('Looking for login button...');
    const loginButtonLocators = [
      'button[type="submit"]',
      'button:has-text("Sign In")',
      'button:has-text("Login")',
      'button:has-text("Log In")',
      'input[type="submit"]'
    ];

    let loginButton;
    for (const locator of loginButtonLocators) {
      const button = page.locator(locator);
      if (await button.count() > 0) {
        loginButton = button.first();
        console.log(`Login button found: ${locator}`);
        break;
      }
    }

    if (!loginButton) {
      throw new Error('Login button not found!');
    }

    // Take screenshot before clicking login
    await page.screenshot({
      path: 'app/screenshots/een-before-login.png',
      fullPage: true
    });
    console.log('Screenshot saved: een-before-login.png');

    await loginButton.click();
    console.log('Login button clicked');

    // Step 5: Wait for navigation
    console.log('Waiting for login to complete...');
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    await page.waitForTimeout(3000);

    // Step 6: Verify login success
    const currentUrl = page.url();
    console.log(`Current URL: ${currentUrl}`);

    // Take screenshot after login
    await page.screenshot({
      path: 'app/screenshots/een-after-login.png',
      fullPage: true
    });
    console.log('Screenshot saved: een-after-login.png');

    // Verify we're not on login page anymore
    expect(currentUrl).not.toContain('/login');
    console.log('✅ Login successful - redirected from login page');

    // Get page title
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Test passed!
    console.log('✅ Test completed successfully!');
  });

  test('Verify login page loads correctly', async ({ page }) => {
    await page.goto(EEN_URL);

    // Check page title
    const title = await page.title();
    console.log(`Page title: ${title}`);
    expect(title).toBeTruthy();

    // Check if login form elements exist
    const usernameExists = await page.locator('input[type="email"], input[name="username"]').count() > 0;
    const passwordExists = await page.locator('input[type="password"]').count() > 0;
    const buttonExists = await page.locator('button[type="submit"], button:has-text("Sign In")').count() > 0;

    expect(usernameExists).toBeTruthy();
    expect(passwordExists).toBeTruthy();
    expect(buttonExists).toBeTruthy();

    console.log('✅ Login page loaded with all required elements');
  });

  test('Take screenshots of login flow', async ({ page }) => {
    await page.goto(EEN_URL);
    await page.waitForLoadState('domcontentloaded');

    // Screenshot 1: Login page
    await page.screenshot({
      path: 'app/screenshots/een-login-page.png',
      fullPage: true
    });
    console.log('Screenshot 1: Login page');

    // Fill credentials
    const usernameField = page.locator('input[type="email"], input[name="username"]').first();
    const passwordField = page.locator('input[type="password"]').first();

    await usernameField.fill(USERNAME);
    await passwordField.fill(PASSWORD);

    // Screenshot 2: Credentials filled
    await page.screenshot({
      path: 'app/screenshots/een-credentials-filled.png',
      fullPage: true
    });
    console.log('Screenshot 2: Credentials filled');

    // Login
    const loginButton = page.locator('button[type="submit"], button:has-text("Sign In")').first();
    await loginButton.click();
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Screenshot 3: After login
    await page.screenshot({
      path: 'app/screenshots/een-logged-in.png',
      fullPage: true
    });
    console.log('Screenshot 3: Logged in dashboard');

    console.log('✅ All screenshots captured');
  });
});