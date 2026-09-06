import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
  /**
   * Read JSON file
   */
  static readJSON<T>(filePath: string): T {
    const absolutePath = path.resolve(filePath);
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(content) as T;
  }

  /**
   * Write JSON file
   */
  static writeJSON(filePath: string, data: any): void {
    const absolutePath = path.resolve(filePath);
    const content = JSON.stringify(data, null, 2);
    fs.writeFileSync(absolutePath, content, 'utf-8');
  }

  /**
   * Check if file exists
   */
  static fileExists(filePath: string): boolean {
    const absolutePath = path.resolve(filePath);
    return fs.existsSync(absolutePath);
  }

  /**
   * Create directory if not exists
   */
  static ensureDirectory(dirPath: string): void {
    const absolutePath = path.resolve(dirPath);
    if (!fs.existsSync(absolutePath)) {
      fs.mkdirSync(absolutePath, { recursive: true });
    }
  }

  /**
   * Delete file
   */
  static deleteFile(filePath: string): void {
    const absolutePath = path.resolve(filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }

  /**
   * Read text file
   */
  static readTextFile(filePath: string): string {
    const absolutePath = path.resolve(filePath);
    return fs.readFileSync(absolutePath, 'utf-8');
  }

  /**
   * Write text file
   */
  static writeTextFile(filePath: string, content: string): void {
    const absolutePath = path.resolve(filePath);
    fs.writeFileSync(absolutePath, content, 'utf-8');
  }

  /**
   * Get file extension
   */
  static getFileExtension(filePath: string): string {
    return path.extname(filePath);
  }

  /**
   * Get file name without extension
   */
  static getFileName(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
  }

  /**
   * List files in directory
   */
  static listFiles(dirPath: string, extension?: string): string[] {
    const absolutePath = path.resolve(dirPath);
    const files = fs.readdirSync(absolutePath);

    if (extension) {
      return files.filter((file) => path.extname(file) === extension);
    }

    return files;
  }

  /**
   * Copy file
   */
  static copyFile(source: string, destination: string): void {
    const absoluteSource = path.resolve(source);
    const absoluteDestination = path.resolve(destination);
    fs.copyFileSync(absoluteSource, absoluteDestination);
  }
}
