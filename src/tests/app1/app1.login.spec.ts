import { test, expect } from '../../fixtures/customFixtures';

test.describe('App1 Login Tests', () => {
  test.beforeEach(async ({ brivoLoginPage, brivoDashboardPage }) => {
    // First login to Brivo (prerequisite for App1)
    await brivoLoginPage.login();

    // Verify Brivo login successful
    const isBrivoLoggedIn = await brivoDashboardPage.isUserLoggedIn();
    expect(isBrivoLoggedIn).toBeTruthy();

    // Navigate to App1 from Brivo dashboard
    await brivoDashboardPage.navigateToApp(1);
  });

  
});