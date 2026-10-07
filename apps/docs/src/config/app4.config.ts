import { BaseConfig, brivoConfig } from '@common/test-utils';
import * as dotenv from 'dotenv';

dotenv.config();

class App4Config extends BaseConfig {
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
    this.username = process.env.APP4_USERNAME || '';
    this.password = process.env.APP4_PASSWORD || '';
    this.appName = 'Application 4';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
    this.appUrl = `${this.baseUrl}/app4`;
    this.appLoginUrl = `${this.baseUrl}/app4/login`;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getAppLoginUrl(): string {
    return this.appLoginUrl;
  }
}

export const app4Config = new App4Config();