# CommonFramework

**TypeScript + Playwright test automation monorepo for Brivo and its 8 applications**

Demonstrated today against Gmail/Google Workspace (Gmail, Calendar, Sheets,
Docs, Drive, Slides, Chat) and the real Eagle Eye Networks (EEN) app, mirroring
the real target: Brivo (main) + EEN + 6 more applications.

---

## Structure

```
CommonFramework/
├── packages/                 # shared, versioned-together framework code
│   ├── test-utils/           # Logger, ActionHelper, WaitHelper, AssertionHelper,
│   │                         # BrowserManager, DataGenerator and friends, shared types
│   ├── ui-components/        # BasePage, BaseComponent, AppLauncher, LayoutAssertions, CSSAssertions
│   ├── auth/                 # multi-role StorageState setup, SessionManager (API token cache)
│   └── api-helpers/          # BaseAPI, AuthAPI, UsersAPI
├── apps/                     # one package per application under test
│   ├── gmail/   ├── een/   ├── calendar/   ├── sheets/
│   └── docs/    ├── drive/ ├── slides/     └── chat/
│       package.json, tsconfig.json, playwright.config.ts, .auth/ (gitignored),
│       src/{config, pages/{locators,pages}, fixtures, helpers}, tests/
├── scripts/                  # ensure-output (CI guard), sanitize-logs, notify
├── LOCATOR_CONTRACT.md       # data-testid governance between QA and dev teams
└── .github/workflows/        # CI
```

Each app is an independent pnpm workspace package with its own
`playwright.config.ts`, so apps can run, fail, and scale independently.
Shared logic lives once in `packages/*` and is consumed via workspace
dependencies (`@common/test-utils`, `@common/ui-components`, `@common/auth`,
`@common/api-helpers`) — no copy-pasted helpers across apps.

---

## Quick Start

### 1. Install

```bash
corepack enable                 # one-time, enables pnpm via Node's built-in corepack
pnpm install
pnpm --filter @app/gmail exec playwright install --with-deps chromium
```

### 2. Set up authentication (once per app)

```bash
pnpm --filter @app/gmail auth:setup   # single personal account, no roles
pnpm --filter @app/een auth:setup     # admin/standard/readonly roles, see .env.example
```

### 3. Run tests

```bash
pnpm test                 # every app
pnpm test:gmail           # one app
pnpm --filter @app/een test:admin       # EEN's admin-role project only
pnpm --filter @app/gmail test:headed    # headed, for debugging
```

### 4. Type-check / lint everything

```bash
pnpm typecheck
pnpm lint
```

### 5. Reports

```bash
pnpm allure:generate && pnpm allure:open
# Each app also writes: apps/<app>/test-outputs/{reports,logs,screenshots,traces}
```

---

## Key features

- **Page Object Model** per app, composing shared `BaseComponent` widgets
  (e.g. `AppLauncher` for cross-app navigation) instead of reimplementing them.
- **StorageState auth**, multi-role where the app has real roles (EEN:
  admin/standard/readonly). See `packages/auth`.
- **SessionManager** caches API auth tokens per username so a run makes one
  token call per role, not one per test — safe across Playwright's parallel
  worker processes via a small file-backed cache.
- **Three-tier visual testing**: `LayoutAssertions` (structural, boundingBox),
  `CSSAssertions` (computed-style), `toHaveScreenshot()` (pixel regression) —
  see `apps/gmail/tests/gmail.login.spec.ts` for all three in use.
- **`@parallel` / `@serial` tagging** — fast parallel lane by default, a
  single-worker lane for anything that mutates shared state.
- **`NO_SCREENSHOT_ON_FAILURE=1`** — skip failure screenshots locally for
  speed; always on in CI.
- **CI**: GitHub Actions matrix over all 8 apps × shards, JUnit + Allure +
  HTML reports, a guard step that fails the job if a crashed runner produced
  no output, and credential stripping before artifact upload.

---

## Locator rules

Every locator is suffixed `_L` (static), `_LT` (template), or `_SL` (scope
container), and `data-testid` is the only contracted selector for real Brivo
apps (the third-party Google demo apps are the one documented exception).
Full rules, the dev-team forbidden list, and merge order: **[LOCATOR_CONTRACT.md](LOCATOR_CONTRACT.md)**.

---

## Adding a new application

1. `cp -r apps/calendar apps/<new-app>` as a starting skeleton (it's the
   smallest one).
2. Update its `package.json` name, `playwright.config.ts` baseURL/roles, and
   locators/page objects for the real app.
3. Add it to `.github/workflows/playwright.yml`'s matrix.
4. Add a `data-testid`-based locator file and read `LOCATOR_CONTRACT.md`
   before your first PR against the dev team's components.

---

## Further reading

- [z-documents/FRAMEWORK_DOCUMENTATION.md](z-documents/FRAMEWORK_DOCUMENTATION.md) —
  original architecture deep-dive (POM, fixtures, DI). Predates the monorepo
  conversion; paths/commands there are historical, concepts still apply.

---

## Author

**Jeevan Kumar** — jeevan.g@brivo.com

## License

ISC
