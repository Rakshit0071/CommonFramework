import { APIRequestContext, request } from '@playwright/test';
import { Logger } from '@common/test-utils';

export class BaseAPI {
  protected apiContext!: APIRequestContext;
  protected baseUrl: string;
  protected logger: Logger;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.logger = new Logger();
  }

  /**
   * Initialize API context
   */
  async init(options?: {
    headers?: Record<string, string>;
    extraHTTPHeaders?: Record<string, string>;
  }): Promise<void> {
    this.apiContext = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: options?.extraHTTPHeaders || {},
      ...options,
    });
  }

  /**
   * GET request
   */
  async get(endpoint: string, options?: { headers?: Record<string, string> }): Promise<any> {
    this.logger.info(`GET request to: ${endpoint}`);
    const response = await this.apiContext.get(endpoint, {
      headers: options?.headers,
    });

    this.logger.info(`Response status: ${response.status()}`);
    return response.json();
  }

  /**
   * POST request
   */
  async post(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<any> {
    this.logger.info(`POST request to: ${endpoint}`);
    const response = await this.apiContext.post(endpoint, {
      data,
      headers: options?.headers,
    });

    this.logger.info(`Response status: ${response.status()}`);
    return response.json();
  }

  /**
   * PUT request
   */
  async put(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<any> {
    this.logger.info(`PUT request to: ${endpoint}`);
    const response = await this.apiContext.put(endpoint, {
      data,
      headers: options?.headers,
    });

    this.logger.info(`Response status: ${response.status()}`);
    return response.json();
  }

  /**
   * DELETE request
   */
  async delete(endpoint: string, options?: { headers?: Record<string, string> }): Promise<any> {
    this.logger.info(`DELETE request to: ${endpoint}`);
    const response = await this.apiContext.delete(endpoint, {
      headers: options?.headers,
    });

    this.logger.info(`Response status: ${response.status()}`);
    return response.json();
  }

  /**
   * PATCH request
   */
  async patch(
    endpoint: string,
    data?: any,
    options?: { headers?: Record<string, string> }
  ): Promise<any> {
    this.logger.info(`PATCH request to: ${endpoint}`);
    const response = await this.apiContext.patch(endpoint, {
      data,
      headers: options?.headers,
    });

    this.logger.info(`Response status: ${response.status()}`);
    return response.json();
  }

  /**
   * Get raw response
   */
  async getRaw(endpoint: string, options?: { headers?: Record<string, string> }) {
    this.logger.info(`GET raw request to: ${endpoint}`);
    return await this.apiContext.get(endpoint, {
      headers: options?.headers,
    });
  }

  /**
   * Dispose API context
   */
  async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }
}
