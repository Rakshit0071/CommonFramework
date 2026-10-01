import { Page } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

/**
 * AppLauncher models the cross-app navigation widget — Google's "waffle" grid
 * in the demo apps today, and the equivalent app-switcher the real Brivo
 * platform will expose once it ships. This is the primary mechanism for
 * moving from one app to another without a full page reload via a bookmark,
 * which is why the architecture plan treats it as a first-class shared
 * component rather than something each app's page objects reimplement.
 *
 * Note on locators: the demo apps (mail.google.com, etc.) are a third party
 * we do not control, so this component intentionally uses role/aria-label
 * selectors instead of data-testid. LOCATOR_CONTRACT.md documents this as the
 * one allowed exception to the data-testid rule — every real Brivo app must
 * still expose data-testid on its launcher.
 */
export class AppLauncher extends BaseComponent {
  private static readonly TOGGLE_SELECTOR_SL = 'a[aria-label="Google apps"], button[aria-label="Google apps"]';
  private static readonly PANEL_SELECTOR_SL = '[aria-label="Google apps"] ~ div[role="dialog"], div[data-ogsr-up]';

  constructor(page: Page) {
    // The launcher toggle lives in the global header, not inside a single
    // page's content area, so it is scoped to the document root.
    super(page, 'body');
  }

  private get toggle_L() {
    return this.page.locator(AppLauncher.TOGGLE_SELECTOR_SL).first();
  }

  private appLink_LT(appName: string) {
    return this.page.locator(`a[aria-label="${appName}" i], a[href*="${appName.toLowerCase()}"]`).first();
  }

  /**
   * Open the app launcher grid.
   */
  async open(): Promise<void> {
    this.logger.info('Opening app launcher');
    if (await this.isOpen()) {
      return;
    }
    await this.toggle_L.click();
    await this.toggle_L.waitFor({ state: 'visible' });
  }

  /**
   * Close the app launcher grid if it is open.
   */
  async close(): Promise<void> {
    if (await this.isOpen()) {
      await this.page.keyboard.press('Escape');
    }
  }

  /**
   * Whether the launcher grid is currently expanded.
   */
  async isOpen(): Promise<boolean> {
    const expanded = await this.toggle_L.getAttribute('aria-expanded').catch(() => null);
    return expanded === 'true';
  }

  /**
   * Whether a given app is listed in the launcher grid. Opens the launcher
   * first if it is not already open.
   */
  async isAppVisible(appName: string): Promise<boolean> {
    await this.open();
    return this.appLink_LT(appName).isVisible().catch(() => false);
  }

  /**
   * Navigate to another app via the launcher grid (opens a new tab, as the
   * real waffle menu does, and switches Playwright's focus to it).
   */
  async navigateToApp(appName: string, page: Page = this.page): Promise<Page> {
    this.logger.info(`Navigating to app via launcher: ${appName}`);
    await this.open();

    const [newPage] = await Promise.all([
      page.context().waitForEvent('page').catch(() => page),
      this.appLink_LT(appName).click(),
    ]);

    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
