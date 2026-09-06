import { BaseConfig } from '../base/BaseConfig';
import { brivoConfig } from './brivo.config';
import * as dotenv from 'dotenv';

dotenv.config();

class App5Config extends BaseConfig {
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
    this.username = process.env.APP5_USERNAME || '';
    this.password = process.env.APP5_PASSWORD || '';
    this.appName = 'Application 5';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
    this.appUrl = `${this.baseUrl}/app5`;
    this.appLoginUrl = `${this.baseUrl}/app5/login`;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getAppLoginUrl(): string {
    return this.appLoginUrl;
  }
}

export const app5Config = new App5Config();