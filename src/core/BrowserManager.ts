import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';
import { Logger } from './Logger';

export class BrowserManager {
  private logger: Logger;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  constructor() {
    this.logger = new Logger();
  }

  /**
   * Launch browser
   */
  async launchBrowser(
    browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium',
    options?: {
      headless?: boolean;
      slowMo?: number;
    }
  ): Promise<Browser> {
    this.logger.info(`Launching ${browserType} browser`);

    switch (browserType) {
      case 'chromium':
        this.browser = await chromium.launch({
          headless: options?.headless ?? true,
          slowMo: options?.slowMo ?? 0,
        });
        break;
      case 'firefox':
        this.browser = await firefox.launch({
          headless: options?.headless ?? true,
          slowMo: options?.slowMo ?? 0,
        });
        break;
      case 'webkit':
        this.browser = await webkit.launch({
          headless: options?.headless ?? true,
          slowMo: options?.slowMo ?? 0,
        });
        break;
    }

    return this.browser;
  }

  /**
   * Create browser context
   */
  async createContext(options?: {
    viewport?: { width: number; height: number };
    userAgent?: string;
  }): Promise<BrowserContext> {
    if (!this.browser) {
      throw new Error('Browser is not launched. Call launchBrowser() first.');
    }

    this.logger.info('Creating browser context');
    this.context = await this.browser.newContext({
      viewport: options?.viewport ?? { width: 1920, height: 1080 },
      userAgent: options?.userAgent,
    });

    return this.context;
  }

  /**
   * Create new page
   */
  async createPage(): Promise<Page> {
    if (!this.context) {
      throw new Error('Browser context is not created. Call createContext() first.');
    }

    this.logger.info('Creating new page');
    this.page = await this.context.newPage();
    return this.page;
  }

  /**
   * Get current page
   */
  getCurrentPage(): Page {
    if (!this.page) {
      throw new Error('No page is available. Call createPage() first.');
    }
    return this.page;
  }

  /**
   * Close page
   */
  async closePage(): Promise<void> {
    if (this.page) {
      this.logger.info('Closing page');
      await this.page.close();
      this.page = null;
    }
  }

  /**
   * Close browser context
   */
  async closeContext(): Promise<void> {
    if (this.context) {
      this.logger.info('Closing browser context');
      await this.context.close();
      this.context = null;
    }
  }

  /**
   * Close browser
   */
  async closeBrowser(): Promise<void> {
    if (this.browser) {
      this.logger.info('Closing browser');
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * Cleanup all
   */
  async cleanup(): Promise<void> {
    await this.closePage();
    await this.closeContext();
    await this.closeBrowser();
  }
}