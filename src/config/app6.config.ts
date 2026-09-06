import { BaseConfig } from '../base/BaseConfig';
import { brivoConfig } from './brivo.config';
import * as dotenv from 'dotenv';

dotenv.config();

class App6Config extends BaseConfig {
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
    this.username = process.env.APP6_USERNAME || '';
    this.password = process.env.APP6_PASSWORD || '';
    this.appName = 'Application 6';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
    this.appUrl = `${this.baseUrl}/app6`;
    this.appLoginUrl = `${this.baseUrl}/app6/login`;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getAppLoginUrl(): string {
    return this.appLoginUrl;
  }
}

export const app6Config = new App6Config();