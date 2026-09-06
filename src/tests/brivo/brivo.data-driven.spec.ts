import { test, expect } from '../../fixtures/customFixtures';
import { FileHelper } from '../../utils/FileHelper';
import * as path from 'path';

// Load test data
const testDataPath = path.resolve(__dirname, '../../testdata/test-scenarios.json');
const testData = FileHelper.readJSON<any>(testDataPath);

test.describe('Brivo Data-Driven Login Tests', () => {
  testData.loginScenarios.forEach((scenario: any) => {
    test(`${scenario.description}`, async ({ brivoLoginPage, brivoDashboardPage }) => {
      // Navigate to login page
      await brivoLoginPage.navigate();

      // Verify login page is loaded
      const isLoaded = await brivoLoginPage.isPageLoaded();
      expect(isLoaded).toBeTruthy();

      // Perform login with test data
      await brivoLoginPage.login({
        username: scenario.username,
        password: scenario.password,
      });

      // Verify expected result
      if (scenario.expectedResult === 'success') {
        // Should navigate to dashboard
        const isDashboardLoaded = await brivoDashboardPage.isPageLoaded();
        expect(isDashboardLoaded).toBeTruthy();
      } else if (scenario.expectedResult === 'error') {
        // Should show error message
        const isErrorDisplayed = await brivoLoginPage.isErrorDisplayed();
        expect(isErrorDisplayed).toBeTruthy();

        // Verify error message content if specified
        if (scenario.expectedMessage) {
          const errorMessage = await brivoLoginPage.getErrorMessage();
          expect(errorMessage).toContain(scenario.expectedMessage);
        }
      }
    });
  });
});