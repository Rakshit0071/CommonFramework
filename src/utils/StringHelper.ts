export class StringHelper {
  /**
   * Generate random string
   */
  static generateRandomString(length: number = 10): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(domain: string = 'test.com'): string {
    const randomString = this.generateRandomString(8);
    return `${randomString}@${domain}`;
  }

  /**
   * Capitalize first letter
   */
  static capitalizeFirst(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Convert to title case
   */
  static toTitleCase(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => this.capitalizeFirst(word))
      .join(' ');
  }

  /**
   * Truncate string
   */
  static truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - suffix.length) + suffix;
  }

  /**
   * Remove special characters
   */
  static removeSpecialCharacters(text: string): string {
    return text.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  /**
   * Slugify text
   */
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }

  /**
   * Check if string is email
   */
  static isEmail(text: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  }

  /**
   * Mask sensitive data
   */
  static maskData(text: string, visibleChars: number = 4): string {
    if (text.length <= visibleChars) return '*'.repeat(text.length);
    const visible = text.slice(-visibleChars);
    const masked = '*'.repeat(text.length - visibleChars);
    return masked + visible;
  }

  /**
   * Extract numbers from string
   */
  static extractNumbers(text: string): string {
    return text.replace(/\D/g, '');
  }

  /**
   * Count words
   */
  static countWords(text: string): number {
    return text.trim().split(/\s+/).length;
  }
}