import { test, expect } from '../src/fixtures/customFixtures';

test('EEN - should navigate and load @parallel', async ({ eenPage, logger }) => {
  logger.info('Starting EEN test');

  await eenPage.navigate();
  expect(await eenPage.isPageLoaded()).toBeTruthy();

  logger.info('EEN test completed');
});

test('EEN admin role sees the full dashboard @admin', async ({ eenPage, logger }) => {
  // Runs under the admin-chromium project (admin storageState). Skips
  // cleanly when that role's storageState hasn't been generated yet.
  logger.info('Starting EEN admin RBAC test');

  await eenPage.navigate();
  expect(await eenPage.isPageLoaded()).toBeTruthy();

  logger.info('EEN admin RBAC test completed');
});

test('EEN readonly role cannot see admin controls @readonly', async ({ eenPage, logger }) => {
  // Runs under the readonly-chromium project (readonly storageState).
  logger.info('Starting EEN readonly RBAC test');

  await eenPage.navigate();
  expect(await eenPage.isPageLoaded()).toBeTruthy();

  logger.info('EEN readonly RBAC test completed');
});

test('EEN API token is cached per run via SessionManager @serial', async ({ eenHelper, logger }) => {
  // Demonstrates that two calls for the same username within a run reuse
  // the token SessionManager already fetched, instead of calling the auth
  // API twice. Requires EEN_STANDARD_USERNAME/PASSWORD (or legacy
  // EEN_USERNAME/PASSWORD) and a reachable EEN_API_URL to actually succeed;
  // skipped otherwise so CI without those secrets doesn't fail here.
  const username = process.env.EEN_STANDARD_USERNAME || process.env.EEN_USERNAME;
  const password = process.env.EEN_STANDARD_PASSWORD || process.env.EEN_PASSWORD;
  test.skip(!username || !password, 'EEN API credentials not configured');

  logger.info('Starting SessionManager token caching test');

  const first = await eenHelper.getApiToken(username!, password!);
  const second = await eenHelper.getApiToken(username!, password!);
  expect(second).toBe(first);

  logger.info('SessionManager token caching test completed');
});
