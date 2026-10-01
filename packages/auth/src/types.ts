/**
 * The three roles the architecture plan calls out for role-based access
 * control testing. Not every app has a meaningful distinction between all
 * three today (e.g. a personal Gmail account has no "role" concept) — apps
 * that don't should only configure the roles that are real for them.
 */
export type AuthRole = 'admin' | 'standard' | 'readonly';

export interface IRoleCredentials {
  username: string;
  password: string;
}

export interface IStorageStateOptions {
  /** Used in log lines and the saved file name: .auth/user-<role>.json */
  appName: string;
  role: AuthRole;
  loginUrl: string;
  credentials: IRoleCredentials;
  /** Directory the storage state file is written to, e.g. apps/<app>/.auth */
  authDir: string;
  /**
   * App-specific login steps. Receives a fresh page already navigated to
   * loginUrl and must leave the page in a logged-in state when it resolves.
   */
  performLogin: (page: import('@playwright/test').Page, credentials: IRoleCredentials) => Promise<void>;
  headless?: boolean;
  timeoutMs?: number;
}
