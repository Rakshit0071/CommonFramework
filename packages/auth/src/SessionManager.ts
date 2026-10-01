import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '@common/test-utils';

interface ICachedToken {
  token: string;
  fetchedAt: number;
}

const logger = new Logger();

/**
 * Caches API auth tokens per username so a test run makes one login/token
 * call per role, not one per test — mirroring the EEN RF framework's token
 * dictionary pattern.
 *
 * Playwright workers are separate Node processes, so an in-memory Map alone
 * only dedupes calls within a single worker. SessionManager backs itself
 * with a small JSON file under `<cacheDir>/.session-cache.json` so the first
 * worker to need a token fetches it and every other worker (and every other
 * test in the same worker) reuses it for the rest of the run.
 */
export class SessionManager {
  private static memoryCache = new Map<string, ICachedToken>();
  private static pending = new Map<string, Promise<string>>();

  private static cacheFile(cacheDir: string): string {
    return path.join(cacheDir, '.session-cache.json');
  }

  private static readFileCache(cacheDir: string): Record<string, ICachedToken> {
    try {
      return JSON.parse(fs.readFileSync(this.cacheFile(cacheDir), 'utf-8'));
    } catch {
      return {};
    }
  }

  private static writeFileCache(cacheDir: string, cache: Record<string, ICachedToken>): void {
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(this.cacheFile(cacheDir), JSON.stringify(cache, null, 2));
  }

  /**
   * Get a cached token for `username`, fetching it via `fetchToken` only on
   * a cache miss (or once it is older than `ttlMs`).
   */
  static async getToken(
    username: string,
    fetchToken: () => Promise<string>,
    options: { cacheDir: string; ttlMs?: number } = { cacheDir: path.join(process.cwd(), '.auth') }
  ): Promise<string> {
    const { cacheDir, ttlMs = 50 * 60 * 1000 } = options;
    const now = Date.now();

    const inMemory = this.memoryCache.get(username);
    if (inMemory && now - inMemory.fetchedAt < ttlMs) {
      return inMemory.token;
    }

    const fileCache = this.readFileCache(cacheDir);
    const onDisk = fileCache[username];
    if (onDisk && now - onDisk.fetchedAt < ttlMs) {
      this.memoryCache.set(username, onDisk);
      return onDisk.token;
    }

    const alreadyFetching = this.pending.get(username);
    if (alreadyFetching) {
      return alreadyFetching;
    }

    const fetchPromise = (async () => {
      logger.info(`SessionManager: fetching fresh token for ${username} (one call per run)`);
      const token = await fetchToken();
      const entry: ICachedToken = { token, fetchedAt: now };
      this.memoryCache.set(username, entry);
      const updated = { ...this.readFileCache(cacheDir), [username]: entry };
      this.writeFileCache(cacheDir, updated);
      return token;
    })();

    this.pending.set(username, fetchPromise);
    try {
      return await fetchPromise;
    } finally {
      this.pending.delete(username);
    }
  }

  /** Clear every cached token (in-memory and on disk) for `cacheDir`. */
  static clear(cacheDir: string): void {
    this.memoryCache.clear();
    try {
      fs.rmSync(this.cacheFile(cacheDir), { force: true });
    } catch {
      // nothing to clean up
    }
  }
}
