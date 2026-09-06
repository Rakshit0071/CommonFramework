/**
 * TypeScript Type Definitions
 * Central location for all framework types
 */

// ==================== Config Types ====================

export interface IConfig {
  baseUrl: string;
  username: string;
  password: string;
  appName: string;
  timeout?: number;
}

export interface IEnvironmentConfig {
  env: Environment;
  brivoBaseUrl: string;
  eenBaseUrl: string;
  timeout: number;
  headless: boolean;
  slowMo?: number;
  video?: boolean;
  screenshot?: 'on' | 'off' | 'only-on-failure';
}

export type Environment = 'dev' | 'qa' | 'staging' | 'prod';

// ==================== User & Credentials ====================

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: UserRole;
  active?: boolean;
  createdAt?: Date;
}

export type UserRole = 'admin' | 'user' | 'viewer' | 'tester';

// ==================== EEN Specific Types ====================

export interface IEENUser extends IUser {
  accountId?: string;
  permissions?: string[];
  isBranded?: boolean;
}

export interface IEENLoginOptions {
  username: string;
  password: string;
  baseUrl?: string;
  rememberMe?: boolean;
  timeout?: number;
}

export interface IEENDashboard {
  cameraCount: number;
  recordingCount: number;
  alertCount: number;
  devices: IDevice[];
}

export interface IDevice {
  id: string;
  name: string;
  type: 'camera' | 'recorder' | 'sensor';
  status: 'online' | 'offline' | 'error';
  location?: string;
}

// ==================== Locator Types ====================

export interface ILocator {
  selector: string;
  description: string;
  timeout?: number;
}

export interface ILocatorMap {
  [key: string]: ILocator | string;
}

// ==================== Test Context ====================

export interface ITestContext {
  brivoLoggedIn: boolean;
  eenLoggedIn: boolean;
  currentApp?: string;
  currentUser?: IUser;
  sessionData?: Record<string, any>;
  testStartTime?: Date;
}

// ==================== Helper Options ====================

export interface IClickOptions {
  force?: boolean;
  timeout?: number;
  delay?: number;
  button?: 'left' | 'right' | 'middle';
  clickCount?: number;
}

export interface IFillOptions {
  timeout?: number;
  force?: boolean;
  noWaitAfter?: boolean;
}

export interface IWaitOptions {
  timeout?: number;
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
}

export interface IScreenshotOptions {
  path?: string;
  fullPage?: boolean;
  quality?: number;
  type?: 'png' | 'jpeg';
}

// ==================== API Types ====================

export interface IApiResponse<T = any> {
  status: number;
  data: T;
  message?: string;
  error?: string;
}

export interface IApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
  timeout?: number;
}

// ==================== Test Data Types ====================

export interface ITestData {
  id: string;
  name: string;
  description?: string;
  data: Record<string, any>;
  createdAt: Date;
}

export interface ITestScenario {
  name: string;
  description: string;
  steps: ITestStep[];
  expectedResult: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ITestStep {
  step: number;
  action: string;
  data?: any;
  expected?: string;
}

// ==================== Page Object Types ====================

export interface IPageObject {
  navigate(url?: string): Promise<void>;
  isPageLoaded(): Promise<boolean>;
  getTitle(): Promise<string>;
  getCurrentUrl(): string;
}

export interface ILoginPage extends IPageObject {
  login(username: string, password: string): Promise<void>;
  fillUsername(username: string): Promise<void>;
  fillPassword(password: string): Promise<void>;
  clickLogin(): Promise<void>;
  getErrorMessage(): Promise<string>;
}

// ==================== Report Types ====================

export interface ITestReport {
  testName: string;
  status: TestStatus;
  duration: number;
  startTime: Date;
  endTime: Date;
  error?: string;
  screenshots?: string[];
  logs?: string[];
}

export type TestStatus = 'passed' | 'failed' | 'skipped' | 'pending';

// ==================== Logger Types ====================

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface ILogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

// ==================== Utility Types ====================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// ==================== Function Types ====================

export type AsyncFunction<T = void> = () => Promise<T>;
export type CallbackFunction<T = void> = (data?: T) => void;
export type PredicateFunction<T> = (item: T) => boolean;

// ==================== Fixture Types ====================

export interface ICustomFixtures {
  logger: any; // Logger instance
  eenHelper: any; // EENHelper instance
  dataGenerator: any; // DataGenerator instance
  testHelpers: any; // TestHelpers instance
}

// ==================== Export All ====================

export type {
  // Re-export all types for easy access
};
