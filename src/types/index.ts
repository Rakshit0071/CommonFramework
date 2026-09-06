export interface IConfig {
  baseUrl: string;
  username: string;
  password: string;
  appName: string;
  timeout?: number;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface ILocator {
  selector: string;
  description: string;
}

export type Environment = 'dev' | 'qa' | 'staging' | 'prod';

export interface IEnvironmentConfig {
  env: Environment;
  brivoBaseUrl: string;
  timeout: number;
  headless: boolean;
}

export interface ITestContext {
  brivoLoggedIn: boolean;
  currentApp?: string;
  sessionData?: any;
}