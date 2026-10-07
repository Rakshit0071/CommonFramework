import { BaseConfig, brivoConfig } from '@common/test-utils';
import * as dotenv from 'dotenv';

dotenv.config();

class App2Config extends BaseConfig {
  baseUrl: string;
  username: string;
  password: string;
  appName: string;
  timeout: number;
  appUrl: string;
  appLoginUrl: string;

  constructor() {
    super();
    this.baseUrl = brivoConfig.baseUrl;
    this.username = process.env.APP2_USERNAME || '';
    this.password = process.env.APP2_PASSWORD || '';
    this.appName = 'Application 2';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
    this.appUrl = `${this.baseUrl}/app2`;
    this.appLoginUrl = `${this.baseUrl}/app2/login`;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getAppLoginUrl(): string {
    return this.appLoginUrl;
  }
}

export const app2Config = new App2Config();