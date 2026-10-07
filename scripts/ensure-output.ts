#!/usr/bin/env ts-node
import * as fs from 'fs';
import * as path from 'path';

/**
 * CI guard: fails the job if the expected test result file is missing.
 *
 * Without this, a crashed Playwright process (OOM, a hung browser, a
 * killed container) can produce no output at all — and most CI systems
 * then report that step as green, because nothing *failed*, nothing ran.
 * Run this as the final step of every app's CI job, after `playwright
 * test`, so a crashed runner fails the pipeline instead of silently
 * reporting success. Mirrors the EEN RF framework's ensure_output.py.
 *
 * Usage: ts-node scripts/ensure-output.ts <appDir> [<appDir> ...]
 *   ts-node scripts/ensure-output.ts apps/gmail apps/een
 */
function checkApp(appDir: string): string | null {
  const resultFile = path.join(appDir, 'test-outputs', 'reports', 'junit.xml');

  if (!fs.existsSync(resultFile)) {
    return `Missing result file: ${resultFile}`;
  }

  const stats = fs.statSync(resultFile);
  if (stats.size === 0) {
    return `Result file is empty (likely a crashed runner): ${resultFile}`;
  }

  return null;
}

function main() {
  const appDirs = process.argv.slice(2);

  if (appDirs.length === 0) {
    console.error('Usage: ts-node scripts/ensure-output.ts <appDir> [<appDir> ...]');
    process.exit(2);
  }

  const failures = appDirs.map(checkApp).filter((error): error is string => error !== null);

  if (failures.length > 0) {
    console.error('ensure-output: CI guard failed —');
    failures.forEach((failure) => console.error(`  - ${failure}`));
    process.exit(1);
  }

  console.log(`ensure-output: all ${appDirs.length} app(s) produced a result file.`);
}

main();
