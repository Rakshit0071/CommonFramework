import { chromium, FullConfig } from '@playwright/test';
import * as path from 'path';

/**
 * Authentication Setup
 * Run this ONCE to save your Gmail authentication state
 *
 * How to use:
 * 1. Make sure you're logged into Gmail in your default browser
 * 2. Run: npm run auth:setup
 * 3. A browser will open - login to Gmail if not already
 * 4. Wait for inbox to load
 * 5. Authentication state will be saved
 * 6. All future tests will reuse this login!
 */

async function globalSetup(config: FullConfig) {
  console.log('🔐 Starting Gmail Authentication Setup...');

  const authFile = path.join(__dirname, '../../.auth/gmail-user.json');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('📧 Opening Gmail...');
    await page.goto('https://mail.google.com');

    // Wait for user to login manually (if not already logged in)
    console.log('⏳ Waiting for Gmail inbox to load...');
    console.log('💡 If you see login page, please login manually');
    console.log('💡 If you see inbox, you\'re already logged in!');

    // Wait for inbox to be visible (this means user is logged in)
    await page.waitForURL('**/mail.google.com/**', { timeout: 120000 });

    // Extra wait to ensure everything is loaded
    await page.waitForTimeout(5000);

    console.log('✅ Gmail inbox detected!');

    // Save signed-in state to 'authFile'
    await context.storageState({ path: authFile });
    console.log(`✅ Authentication state saved to: ${authFile}`);
    console.log('🎉 Setup complete! All tests will now reuse this login.');

  } catch (error) {
    console.error('❌ Authentication setup failed:', error);
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
