import * as dotenv from 'dotenv';
import { IConfig } from '@common/test-utils';

dotenv.config();

class GmailConfig implements IConfig {
  baseUrl: string;
  username: string;
  password: string;
  appName: string;
  timeout: number;

  constructor() {
    this.baseUrl = process.env.GMAIL_BASE_URL || 'https://accounts.google.com';
    this.username = process.env.GMAIL_USERNAME || '';
    this.password = process.env.GMAIL_PASSWORD || '';
    this.appName = 'Gmail';
    this.timeout = 30000;
  }

  getLoginUrl(): string {
    return `${this.baseUrl}/signin`;
  }

  getInboxUrl(): string {
    return 'https://mail.google.com/mail/u/0/#inbox';
  }
}

export const gmailConfig = new GmailConfig();
