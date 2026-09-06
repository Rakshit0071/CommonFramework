import { BaseConfig } from '../base/BaseConfig';
import { brivoConfig } from './brivo.config';
import * as dotenv from 'dotenv';

dotenv.config();

class App3Config extends BaseConfig {
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
    this.username = process.env.APP3_USERNAME || '';
    this.password = process.env.APP3_PASSWORD || '';
    this.appName = 'Application 3';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
    this.appUrl = `${this.baseUrl}/app3`;
    this.appLoginUrl = `${this.baseUrl}/app3/login`;
  }

  getAppUrl(): string {
    return this.appUrl;
  }

  getAppLoginUrl(): string {
    return this.appLoginUrl;
  }
}

export const app3Config = new App3Config();