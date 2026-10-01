import { BaseConfig } from '@common/test-utils';
import * as dotenv from 'dotenv';

dotenv.config();

class App1Config extends BaseConfig {
  baseUrl: string;
  username: string;
  password: string;
  appName: string;
  timeout: number;

  // Eagle Eye Networks specific settings
  appUrl: string;
  appLoginUrl: string;
  eenApiUrl: string;

  constructor() {
    super();
    // Eagle Eye Networks - accessed from Brivo dashboard
    this.baseUrl = process.env.EEN_BASE_URL || 'https://webapp.ta.eagleeyenetworks.com';
    this.username = process.env.EEN_USERNAME || process.env.APP1_USERNAME || '';
    this.password = process.env.EEN_PASSWORD || process.env.APP1_PASSWORD || '';
    this.appName = 'Eagle Eye Networks';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');

    // Eagle Eye Networks specific URLs
    this.appUrl = this.baseUrl;
    this.appLoginUrl = `${this.baseUrl}/login`;
    this.eenApiUrl = process.env.EEN_API_URL || 'https://api.eagleeyenetworks.com';
  }

  /**
   * Get Eagle Eye Networks URL
   */
  getAppUrl(): string {
    return this.appUrl;
  }

  /**
   * Get Eagle Eye Networks login URL
   */
  getAppLoginUrl(): string {
    return this.appLoginUrl;
  }

  /**
   * Get Eagle Eye Networks API URL
   */
  getEENApiUrl(): string {
    return this.eenApiUrl;
  }
}

export const app1Config = new App1Config();