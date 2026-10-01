#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

/**
 * Strips credentials out of Playwright HAR files and Winston logs before
 * they're uploaded as CI artifacts. HAR files capture every request header
 * and cookie verbatim, including Authorization headers and session cookies
 * from the StorageState-backed auth — uploading that unredacted would leak
 * live, replayable credentials into CI artifact storage.
 *
 * Usage: ts-node scripts/sanitize-logs.ts <dir> [<dir> ...]
 *   ts-node scripts/sanitize-logs.ts apps/gmail/test-outputs apps/een/test-outputs
 */
const SENSITIVE_HEADER_NAMES = ['authorization', 'cookie', 'set-cookie', 'x-api-key'];
const SENSITIVE_JSON_KEYS = ['password', 'token', 'accessToken', 'refreshToken', 'authorization'];
const REDACTED = '***REDACTED***';

function redactHarText(raw: string): string {
  const har = JSON.parse(raw);
  const entries = har?.log?.entries ?? [];

  for (const entry of entries) {
    for (const message of [entry.request, entry.response]) {
      if (!message?.headers) continue;
      for (const header of message.headers) {
        if (SENSITIVE_HEADER_NAMES.includes(String(header.name).toLowerCase())) {
          header.value = REDACTED;
        }
      }
      if (message.cookies) {
        for (const cookie of message.cookies) {
          cookie.value = REDACTED;
        }
      }
    }
  }

  return JSON.stringify(har);
}

function redactLogLine(line: string): string {
  let redacted = line;
  for (const key of SENSITIVE_JSON_KEYS) {
    const pattern = new RegExp(`("${key}"\\s*:\\s*)"[^"]*"`, 'gi');
    redacted = redacted.replace(pattern, `$1"${REDACTED}"`);
  }
  return redacted;
}

function sanitizeFile(filePath: string): void {
  const raw = fs.readFileSync(filePath, 'utf-8');

  if (filePath.endsWith('.har')) {
    try {
      fs.writeFileSync(filePath, redactHarText(raw));
      console.log(`sanitized HAR: ${filePath}`);
    } catch (error) {
      console.warn(`sanitize-logs: could not parse HAR ${filePath}, skipping (${(error as Error).message})`);
    }
    return;
  }

  if (filePath.endsWith('.log')) {
    const redacted = raw.split('\n').map(redactLogLine).join('\n');
    fs.writeFileSync(filePath, redacted);
    console.log(`sanitized log: ${filePath}`);
  }
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return entry.name.endsWith('.har') || entry.name.endsWith('.log') ? [fullPath] : [];
  });
}

function main() {
  const dirs = process.argv.slice(2);
  if (dirs.length === 0) {
    console.error('Usage: ts-node scripts/sanitize-logs.ts <dir> [<dir> ...]');
    process.exit(2);
  }

  const files = dirs.flatMap(walk);
  files.forEach(sanitizeFile);
  console.log(`sanitize-logs: processed ${files.length} file(s) across ${dirs.length} director${dirs.length === 1 ? 'y' : 'ies'}.`);
}

main();
