# Directory Structure (Updated)

## Complete Framework Structure

```
TypescriptFramework/
├── app/                               # Application output directory (like Robot Framework)
│   ├── logfiles/                      # 📝 Test execution logs
│   │   ├── error.log                  # Error logs only
│   │   ├── combined.log               # All logs
│   │   └── playwright-log.txt         # Playwright specific logs
│   │
│   ├── screenshots/                   # 📸 Test screenshots
│   │   ├── failure-*.png              # Failure screenshots
│   │   └── step-*.png                 # Step screenshots
│   │
│   └── reports/                       # 📊 Test reports
│       ├── index.html                 # Playwright HTML report
│       ├── results.json               # JSON results
│       └── custom-report.html         # Custom reports
│
├── src/                               # Source code
│   ├── api/                           # API testing layer
│   │   ├── BaseAPI.ts
│   │   ├── AuthAPI.ts
│   │   └── UsersAPI.ts
│   │
│   ├── base/                          # Abstract base classes
│   │   ├── BasePage.ts
│   │   ├── BaseTest.ts
│   │   └── BaseConfig.ts
│   │
│   ├── core/                          # Core utilities
│   │   ├── ActionHelper.ts
│   │   ├── WaitHelper.ts
│   │   ├── AssertionHelper.ts
│   │   ├── BrowserManager.ts
│   │   └── Logger.ts
│   │
│   ├── utils/                         # Utility helpers
│   │   ├── DateHelper.ts
│   │   ├── StringHelper.ts
│   │   └── FileHelper.ts
│   │
│   ├── testdata/                      # Test data
│   │   ├── credentials.json
│   │   ├── test-scenarios.json
│   │   └── users.json
│   │
│   ├── config/                        # Configuration files
│   │   ├── environment.config.ts
│   │   ├── brivo.config.ts
│   │   └── app1-7.config.ts
│   │
│   ├── pages/                         # Page objects
│   │   ├── brivo/
│   │   │   ├── locators/
│   │   │   │   ├── login.locators.ts
│   │   │   │   └── dashboard.locators.ts
│   │   │   ├── LoginPage.ts
│   │   │   └── DashboardPage.ts
│   │   │
│   │   └── app1-7/
│   │       ├── locators/
│   │       ├── LoginPage.ts
│   │       └── HomePage.ts
│   │
│   ├── tests/                         # Test suites
│   │   ├── brivo/
│   │   │   ├── brivo.login.spec.ts
│   │   │   ├── brivo.data-driven.spec.ts
│   │   │   └── brivo.api.spec.ts
│   │   │
│   │   └── app1-7/
│   │       └── *.spec.ts
│   │
│   ├── fixtures/                      # Playwright fixtures
│   │   └── customFixtures.ts
│   │
│   └── types/                         # TypeScript types
│       └── index.ts
│
├── test-results/                      # Playwright test results (auto-generated)
├── node_modules/                      # Dependencies
│
├── .env.example                       # Environment variables template
├── .env                               # Environment variables (not in git)
├── .gitignore                         # Git ignore rules
├── package.json                       # NPM package configuration
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json                      # TypeScript configuration
│
└── Documentation/
    ├── README.md                      # Main documentation
    ├── QUICK_START.md                 # Quick start guide
    ├── FRAMEWORK_SUMMARY.md           # Framework summary
    ├── FRAMEWORK_COMPARISON.md        # Robot Framework comparison
    ├── ENHANCED_FEATURES.md           # Enhanced features guide
    ├── FINAL_SUMMARY.md               # Final summary
    └── DIRECTORY_STRUCTURE.md         # This file
```

## Directory Mapping: Robot Framework → TypeScript

| Robot Framework | TypeScript Framework | Purpose |
|----------------|---------------------|---------|
| `app/logfiles/` | `app/logfiles/` | ✅ Test logs |
| `app/reports/` | `app/reports/` | ✅ Test reports |
| `app/resources/pages/` | `src/pages/` | ✅ Page objects |
| `app/resources/locators/` | `src/pages/*/locators/` | ✅ Locators |
| `app/resources/api/` | `src/api/` | ✅ API helpers |
| `app/resources/testdata/` | `src/testdata/` | ✅ Test data |
| `app/libraries/` | `src/core/` + `src/utils/` | ✅ Utilities |
| `app/tests/` | `src/tests/` | ✅ Test suites |

## Output Directory Details

### `app/logfiles/`
**Purpose:** All test execution logs

**Contents:**
- `error.log` - Error-level logs only
- `combined.log` - All log levels (info, warn, error, debug)
- `playwright-log.txt` - Playwright specific logs (optional)

**Configuration:** Managed by Winston logger in `src/core/Logger.ts`

### `app/screenshots/`
**Purpose:** Test screenshots for debugging and evidence

**Contents:**
- Automatic screenshots on test failure
- Manual screenshots taken during test execution
- Named with timestamp for easy identification

**Usage:**
```typescript
// Manual screenshot
await page.screenshot({ path: 'app/screenshots/step-name.png' });

// Via BasePage
await basePage.takeScreenshot('login-success');
```

### `app/reports/`
**Purpose:** Test execution reports

**Contents:**
- `index.html` - Playwright HTML report (main)
- `results.json` - JSON format results for CI/CD
- Custom reports (if added)

**View Report:**
```bash
npm run report    # Opens HTML report in browser
```

## Key Features

### ✅ Matches Robot Framework Structure
The `app/` directory structure matches your existing Robot Framework setup, making it familiar and consistent.

### ✅ Centralized Output
All test outputs (logs, screenshots, reports) are in one place under `app/`

### ✅ Easy Cleanup
Clear the output directories before new test runs:
```bash
# Clean all outputs
Remove-Item app/logfiles/*.log
Remove-Item app/screenshots/*.png
Remove-Item app/reports/* -Recurse
```

### ✅ Git Ignored
Output files are ignored in git but directory structure is preserved with `.gitkeep` files

### ✅ CI/CD Ready
All outputs in predictable locations for CI/CD artifact collection

## Access Patterns

### Logs
```typescript
import { Logger } from './core/Logger';

const logger = new Logger();
logger.info('Test started');
logger.error('Error occurred');
```

Logs written to: `app/logfiles/combined.log` and `app/logfiles/error.log`

### Screenshots
```typescript
import { BasePage } from './base/BasePage';

const page = new BasePage(page);
await page.takeScreenshot('test-step-1');
```

Screenshots saved to: `app/screenshots/test-step-1.png`

### Reports
Automatically generated by Playwright after test execution in: `app/reports/`

## Best Practices

1. **Clean before runs:** Clear output directories before running tests
2. **Archive results:** Archive app/ directory after important test runs
3. **CI/CD artifacts:** Configure CI/CD to save entire `app/` directory
4. **Review logs:** Check `app/logfiles/error.log` for failures
5. **Screenshot naming:** Use descriptive names with timestamps

## File Retention

**Local Development:**
- Manually clean as needed
- Keep recent failures for debugging

**CI/CD:**
- Archive as build artifacts
- Retention policy: 30 days or as configured
- Store only on failure (to save space)

---

**Structure matches Robot Framework:** 100% aligned! 🎯