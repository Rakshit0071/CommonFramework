/**
 * Utility Functions Index
 * Import all utilities from one place
 */

// Export all utility classes
export { DataGenerator } from './DataGenerator';
export { TestHelpers } from './TestHelpers';
export { DateHelper } from './DateHelper';
export { StringHelper } from './StringHelper';
export { FileHelper } from './FileHelper';

// Export core helpers
export { ActionHelper } from '../core/ActionHelper';
export { WaitHelper } from '../core/WaitHelper';
export { AssertionHelper } from '../core/AssertionHelper';
export { Logger } from '../core/Logger';
export { EENHelper } from '../core/EENHelper';
export { BrowserManager } from '../core/BrowserManager';

/**
 * Usage Example:
 *
 * import { DataGenerator, TestHelpers, EENHelper } from '../utils';
 *
 * // Generate test data
 * const email = DataGenerator.generateEmail();
 * const password = DataGenerator.generatePassword();
 *
 * // Use test helpers
 * await TestHelpers.takeScreenshot(page, 'login');
 * await TestHelpers.waitForPageLoad(page);
 *
 * // Use EEN helper
 * const eenHelper = new EENHelper(page);
 * await eenHelper.login(email, password);
 */
