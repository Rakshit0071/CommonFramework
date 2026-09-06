import { defineConfig, devices } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const authFile = path.join(__dirname, '.auth/gmail-user.json');
const useStorageState = fs.existsSync(authFile) ? authFile : undefined;

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['html', { outputFolder: 'test-outputs/reports' }],
    ['list'],
    ['json', { outputFile: 'test-outputs/reports/results.json' }],
    ['allure-playwright', {
      outputFolder: 'test-outputs/allure-results',
      detail: true,
      suiteTitle: true
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://brivo.com',
    trace: 'on-first-retry',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },

  outputDir: 'test-outputs/traces',

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: useStorageState, // Use auth if available
      },
    },
    // Temporarily disabled - run only on Chrome
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     storageState: useStorageState,
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     storageState: useStorageState,
    //   },
    // },
  ],

  timeout: 120000,
  expect: {
    timeout: 10000
  },
});