import { IEnvironmentConfig, Environment } from '../types';
import * as dotenv from 'dotenv';

dotenv.config();

class EnvironmentConfig implements IEnvironmentConfig {
  env: Environment;
  brivoBaseUrl: string;
  timeout: number;
  headless: boolean;

  constructor() {
    this.env = (process.env.NODE_ENV as Environment) || 'qa';
    this.brivoBaseUrl = process.env.BRIVO_BASE_URL || 'https://brivo.com';
    this.timeout = parseInt(process.env.TIMEOUT || '30000');
    this.headless = process.env.HEADLESS === 'true';
  }

  /**
   * Get environment-specific settings
   */
  getEnvironmentSettings() {
    return {
      env: this.env,
      brivoBaseUrl: this.brivoBaseUrl,
      timeout: this.timeout,
      headless: this.headless,
    };
  }
}

export const environmentConfig = new EnvironmentConfig();