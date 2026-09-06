import { BaseConfig } from '../base/BaseConfig';
import * as dotenv from 'dotenv';

dotenv.config();

class BrivoConfig extends BaseConfig {
  baseUrl: string;
  username: string;
  password: string;
  appName: string;
  timeout: number;

  // Brivo-specific settings
  loginUrl: string;
  dashboardUrl: string;

  constructor() {
    super();
    this.baseUrl = process.env.BRIVO_BASE_URL || 'https://brivo.com';
    this.username = process.env.BRIVO_USERNAME || '';
    this.password = process.env.BRIVO_PASSWORD || '';
    this.appName = 'Brivo';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');

    // Brivo-specific URLs
    this.loginUrl = `${this.baseUrl}/login`;
    this.dashboardUrl = `${this.baseUrl}/dashboard`;
  }

  /**
   * Get login URL
   */
  getLoginUrl(): string {
    return this.loginUrl;
  }

  /**
   * Get dashboard URL
   */
  getDashboardUrl(): string {
    return this.dashboardUrl;
  }
}

export const brivoConfig = new BrivoConfig();