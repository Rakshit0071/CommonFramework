/**
 * Data Generator - Create random test data
 * Reusable across all tests
 */
export class DataGenerator {
  /**
   * Generate random email
   */
  static generateEmail(prefix: string = 'test'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}+${timestamp}${random}@test.com`;
  }

  /**
   * Generate random username
   */
  static generateUsername(length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < length; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `user_${username}`;
  }

  /**
   * Generate random password
   */
  static generatePassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    const all = lowercase + uppercase + numbers + special;

    let password = '';
    // Ensure at least one of each type
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += special.charAt(Math.floor(Math.random() * special.length));

    // Fill remaining length
    for (let i = password.length; i < length; i++) {
      password += all.charAt(Math.floor(Math.random() * all.length));
    }

    // Shuffle password
    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }

  /**
   * Generate random phone number
   */
  static generatePhoneNumber(format: string = 'US'): string {
    if (format === 'US') {
      const area = Math.floor(Math.random() * 900) + 100;
      const prefix = Math.floor(Math.random() * 900) + 100;
      const line = Math.floor(Math.random() * 9000) + 1000;
      return `(${area}) ${prefix}-${line}`;
    }
    return '1234567890';
  }

  /**
   * Generate random string
   */
  static generateString(length: number = 10, uppercase: boolean = false): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return uppercase ? result.toUpperCase() : result;
  }

  /**
   * Generate random number within range
   */
  static generateNumber(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random date
   */
  static generateDate(start?: Date, end?: Date): Date {
    const startDate = start || new Date(2020, 0, 1);
    const endDate = end || new Date();
    return new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );
  }

  /**
   * Generate future date
   */
  static generateFutureDate(daysAhead: number = 30): Date {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date;
  }

  /**
   * Generate past date
   */
  static generatePastDate(daysAgo: number = 30): Date {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  }

  /**
   * Generate random boolean
   */
  static generateBoolean(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Select random item from array
   */
  static selectRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Generate random array
   */
  static generateArray<T>(generator: () => T, length: number): T[] {
    return Array.from({ length }, generator);
  }

  /**
   * Generate test user object
   */
  static generateTestUser() {
    return {
      username: this.generateUsername(),
      email: this.generateEmail(),
      password: this.generatePassword(),
      firstName: this.generateString(6, true),
      lastName: this.generateString(8, true),
      phone: this.generatePhoneNumber(),
      age: this.generateNumber(18, 80),
      active: this.generateBoolean(),
    };
  }

  /**
   * Generate UUID (simple version)
   */
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
