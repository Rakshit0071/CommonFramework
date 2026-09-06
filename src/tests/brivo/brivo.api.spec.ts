import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../api/AuthAPI';
import { brivoConfig } from '../../config/brivo.config';
import { FileHelper } from '../../utils/FileHelper';
import * as path from 'path';

// Load credentials
const credentialsPath = path.resolve(__dirname, '../../testdata/credentials.json');
const credentials = FileHelper.readJSON<any>(credentialsPath);

test.describe('Brivo API Tests', () => {
  let authAPI: AuthAPI;

  test.beforeAll(async () => {
    authAPI = new AuthAPI(brivoConfig.baseUrl);
    await authAPI.init();
  });

  test.afterAll(async () => {
    await authAPI.dispose();
  });

  test('should login successfully via API', async () => {
    const response = await authAPI.login(
      credentials.brivo.validUser.username,
      credentials.brivo.validUser.password
    );

    // Verify response
    expect(response).toBeTruthy();
    // Add more assertions based on actual API response structure
    // expect(response.token).toBeTruthy();
    // expect(response.user).toBeTruthy();
  });

  test('should fail login with invalid credentials via API', async () => {
    try {
      await authAPI.login(
        credentials.brivo.invalidUser.username,
        credentials.brivo.invalidUser.password
      );
      // If we reach here, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      // Expect login to fail
      expect(error).toBeTruthy();
    }
  });

  test('should get session via API', async () => {
    // First login
    await authAPI.login(
      credentials.brivo.validUser.username,
      credentials.brivo.validUser.password
    );

    // Get session
    const session = await authAPI.getSession();
    expect(session).toBeTruthy();
  });

  test('should logout via API', async () => {
    // First login
    await authAPI.login(
      credentials.brivo.validUser.username,
      credentials.brivo.validUser.password
    );

    // Logout
    const response = await authAPI.logout();
    expect(response).toBeTruthy();
  });
});