import * as path from 'path';
import { createStorageState } from '@common/auth';

/**
 * Gmail authentication setup.
 *
 * Note on roles: the multi-role StorageState pattern (user-admin.json,
 * user-standard.json, user-readonly.json) only makes sense for apps that
 * actually have roles. A personal Google account has no role concept, so
 * this intentionally saves a single state under the "standard" role rather
 * than fabricating admin/readonly variants that don't exist for Gmail. See
 * apps/een/src/setup/auth.setup.ts for a real multi-role example.
 *
 * Run once via `pnpm --filter @app/gmail auth:setup`.
 */
async function main() {
  await createStorageState({
    appName: 'gmail',
    role: 'standard',
    loginUrl: 'https://mail.google.com',
    credentials: {
      username: process.env.GMAIL_USERNAME || process.env.GMAIL_EMAIL || '',
      password: process.env.GMAIL_PASSWORD || '',
    },
    authDir: path.join(__dirname, '../../.auth'),
    headless: false,
    performLogin: async (page) => {
      // Gmail's login flow supports both an already-authenticated browser
      // profile and a manual interactive login; either way we just wait for
      // the inbox to render.
      await page.waitForURL('**/mail.google.com/**', { timeout: 120000 });
      await page.waitForTimeout(5000);
    },
  });
}

main().catch((error) => {
  console.error('Gmail auth setup failed:', error);
  process.exit(1);
});
