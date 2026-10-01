import { IEnvironmentConfig, Environment } from '../types';
import * as dotenv from 'dotenv';

dotenv.config();

class EnvironmentConfig implements IEnvironmentConfig {
  env: Environment;
  brivoBaseUrl: string;
  eenBaseUrl: string;
  timeout: number;
  headless: boolean;

  constructor() {
    this.env = (process.env.NODE_ENV as Environment) || 'qa';
    this.brivoBaseUrl = process.env.BRIVO_BASE_URL || 'https://brivo.com';
    this.eenBaseUrl = process.env.EEN_BASE_URL || 'https://webapp.eagleeyenetworks.com';
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
      eenBaseUrl: this.eenBaseUrl,
      timeout: this.timeout,
      headless: this.headless,
    };
  }
}

export const environmentConfig = new EnvironmentConfig();