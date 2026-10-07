import { Page, Locator } from '@playwright/test';
import { WaitHelper, ActionHelper, Logger } from '@common/test-utils';

/**
 * BaseComponent represents a reusable widget that appears *within* a page
 * (a header, a dialog, a dropdown, a data table) as opposed to BasePage,
 * which represents a full navigable page.
 *
 * Every concrete component is scoped to a root Locator (`this.root`), so all
 * element lookups inside it are automatically constrained to that container
 * and won't accidentally match a same-named element elsewhere on the page.
 */
export abstract class BaseComponent {
  protected page: Page;
  protected root: Locator;
  protected waitHelper: WaitHelper;
  protected actionHelper: ActionHelper;
  protected logger: Logger;

  /**
   * @param page - the Playwright page the component lives on
   * @param rootSelector - selector (or pre-built Locator) that scopes this component
   */
  constructor(page: Page, rootSelector: string | Locator) {
    this.page = page;
    this.root = typeof rootSelector === 'string' ? page.locator(rootSelector) : rootSelector;
    this.waitHelper = new WaitHelper(page);
    this.actionHelper = new ActionHelper(page);
    this.logger = new Logger();
  }

  /**
   * Locate an element scoped to this component's root container.
   */
  protected locate(selector: string): Locator {
    return this.root.locator(selector);
  }

  /**
   * Whether the component's root container is currently visible.
   */
  async isVisible(): Promise<boolean> {
    try {
      return await this.root.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Wait for the component's root container to become visible.
   */
  async waitUntilVisible(timeout = 10000): Promise<void> {
    await this.root.waitFor({ state: 'visible', timeout });
  }
}
