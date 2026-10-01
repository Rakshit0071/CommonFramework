import * as path from 'path';
import { createStorageState, AuthRole, IRoleCredentials } from '@common/auth';
import { Page } from '@playwright/test';

const EEN_LOGIN_URL = process.env.EEN_BASE_URL || 'https://webapp.eagleeyenetworks.com';

async function performLogin(page: Page, credentials: IRoleCredentials): Promise<void> {
  await page.locator('//input[@name="email"]').fill(credentials.username);
  await page.locator('//button[@id="next"]').click();
  await page.locator('//input[@name="password"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('//input[@name="password"]').fill(credentials.password);
  await page.locator('button[type="submit"]').click();
  await page.waitForLoadState('networkidle');
}

const ROLE_CREDENTIALS: Record<AuthRole, IRoleCredentials> = {
  admin: {
    username: process.env.EEN_ADMIN_USERNAME || '',
    password: process.env.EEN_ADMIN_PASSWORD || '',
  },
  standard: {
    username: process.env.EEN_STANDARD_USERNAME || process.env.EEN_USERNAME || '',
    password: process.env.EEN_STANDARD_PASSWORD || process.env.EEN_PASSWORD || '',
  },
  readonly: {
    username: process.env.EEN_READONLY_USERNAME || '',
    password: process.env.EEN_READONLY_PASSWORD || '',
  },
};

/**
 * EEN authentication setup — one storageState per role, each saved to
 * .auth/user-<role>.json. Unlike Gmail, EEN has real role-based access
 * control, so all three roles are meaningful here.
 *
 * Run via `pnpm --filter @app/een auth:setup`. Roles whose credentials
 * aren't configured are skipped rather than failing the whole run, so you
 * can set up just the roles you have test accounts for.
 */
async function main() {
  const authDir = path.join(__dirname, '../../.auth');
  const roles = Object.keys(ROLE_CREDENTIALS) as AuthRole[];

  for (const role of roles) {
    const credentials = ROLE_CREDENTIALS[role];
    if (!credentials.username || !credentials.password) {
      console.warn(`Skipping EEN role "${role}": no credentials configured.`);
      continue;
    }

    await createStorageState({
      appName: 'een',
      role,
      loginUrl: EEN_LOGIN_URL,
      credentials,
      authDir,
      headless: false,
      performLogin,
    });
  }
}

main().catch((error) => {
  console.error('EEN auth setup failed:', error);
  process.exit(1);
});
