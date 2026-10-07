import { defineConfig, devices } from '@playwright/test';
import { resolveStorageState } from '@common/auth';
import * as path from 'path';

const authDir = path.join(__dirname, '.auth');
const storageState = resolveStorageState(authDir, 'standard');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['html', { outputFolder: 'test-outputs/reports' }],
    ['list'],
    ['json', { outputFile: 'test-outputs/reports/results.json' }],
    ['junit', { outputFile: 'test-outputs/reports/junit.xml' }],
    ['allure-playwright', { outputFolder: 'test-outputs/allure-results', detail: true, suiteTitle: true }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: { mode: 'only-on-failure', fullPage: true },
    video: 'retain-on-failure',
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
  outputDir: 'test-outputs/traces',
  projects: [
    {
      name: 'parallel-chromium',
      grep: /@parallel/,
      use: { ...devices['Desktop Chrome'], storageState },
    },
    {
      name: 'serial-chromium',
      grep: /@serial/,
      fullyParallel: false,
      workers: 1,
      use: { ...devices['Desktop Chrome'], storageState },
    },
  ],
  timeout: 120000,
  expect: { timeout: 10000 },
});
