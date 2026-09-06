import { test, expect } from '../../fixtures/customFixtures';
import { FileHelper } from '../../utils/FileHelper';
import * as path from 'path';

// Load EEN test users
const eenUsersPath = path.resolve(__dirname, '../../testdata/een-users.json');
const eenUsers = FileHelper.readJSON<any>(eenUsersPath);

test.describe('Eagle Eye Networks - User Tests', () => {
  test('should login with default end user', async ({
    brivoLoginPage,
    brivoDashboardPage,
    app1LoginPage,
    app1HomePage
  }) => {
    // Login to Brivo
    await brivoLoginPage.login();

    // Navigate to EEN
    await brivoDashboardPage.navigateToApp(1);

    // Login to EEN with default end user
    const defaultUser = eenUsers.users.defaultEndUser;
    await app1LoginPage.login({
      username: defaultUser.email,
      password: defaultUser.password
    });

    // Verify login successful
    const isLoggedIn = await app1HomePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should login with admin user', async ({
    brivoLoginPage,
    brivoDashboardPage,
    app1LoginPage,
    app1HomePage
  }) => {
    await brivoLoginPage.login();
    await brivoDashboardPage.navigateToApp(1);

    // Login with admin user
    const adminUser = eenUsers.users.ts01Admin;
    await app1LoginPage.login({
      username: adminUser.email,
      password: adminUser.password
    });

    const isLoggedIn = await app1HomePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should test with CRUD users', async ({
    brivoLoginPage,
    brivoDashboardPage,
    app1LoginPage,
    app1HomePage
  }) => {
    await brivoLoginPage.login();
    await brivoDashboardPage.navigateToApp(1);

    // Get CRUD users group
    const crudUserKeys = eenUsers.userGroups.crudUsers;

    // Test with first CRUD user
    const firstCrudUser = eenUsers.users[crudUserKeys[0]];
    await app1LoginPage.login({
      username: firstCrudUser.email,
      password: firstCrudUser.password
    });

    const isLoggedIn = await app1HomePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should test branding with reseller user', async ({
    brivoLoginPage,
    brivoDashboardPage,
    app1LoginPage,
    app1HomePage
  }) => {
    await brivoLoginPage.login();
    await brivoDashboardPage.navigateToApp(1);

    // Login with branding reseller
    const brandingUser = eenUsers.users.brandingReseller;
    await app1LoginPage.login({
      username: brandingUser.email,
      password: brandingUser.password
    });

    const isLoggedIn = await app1HomePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test.describe('Data-Driven Tests - All End Users', () => {
    // Get all end users
    const endUserKeys = eenUsers.userGroups.allEndUsers;

    endUserKeys.forEach((userKey: string) => {
      const user = eenUsers.users[userKey];

      test(`should login with ${user.description}`, async ({
        brivoLoginPage,
        brivoDashboardPage,
        app1LoginPage,
        app1HomePage
      }) => {
        await brivoLoginPage.login();
        await brivoDashboardPage.navigateToApp(1);

        await app1LoginPage.login({
          username: user.email,
          password: user.password
        });

        const isLoggedIn = await app1HomePage.isUserLoggedIn();
        expect(isLoggedIn).toBeTruthy();
      });
    });
  });
});