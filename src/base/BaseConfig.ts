import { IConfig } from '../types';

export abstract class BaseConfig implements IConfig {
  abstract baseUrl: string;
  abstract username: string;
  abstract password: string;
  abstract appName: string;
  timeout: number = 30000;

  /**
   * Get full URL by appending path
   */
  getFullUrl(path: string = ''): string {
    return `${this.baseUrl}${path}`;
  }

  /**
   * Validate configuration
   */
  validateConfig(): boolean {
    if (!this.baseUrl || !this.username || !this.password) {
      throw new Error(`Invalid configuration for ${this.appName}`);
    }
    return true;
  }
}