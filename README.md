# Brivo Test Automation Framework

## Overview
TypeScript + Playwright test automation framework for testing Brivo and its 7 sub-applications using the Page Object Model (POM) design pattern and OOP principles.

## Architecture

### Design Patterns
- **Page Object Model (POM)**: Separates page structure from test logic
- **Object-Oriented Programming (OOP)**: Uses inheritance, abstraction, and encapsulation
- **Base Classes**: Abstract base classes for common functionality
- **Helper Classes**: Reusable utility functions for actions, waits, and assertions

### Framework Structure

```
TypescriptFramework/
├── app/                               # Application output (matches Robot Framework)
│   ├── logfiles/                      # Test execution logs
│   ├── screenshots/                   # Test screenshots
│   └── reports/                       # Test reports
│
├── src/
│   ├── api/                           # API testing layer
│   │   ├── BaseAPI.ts
│   │   ├── AuthAPI.ts
│   │   └── UsersAPI.ts
│   │
│   ├── base/                          # Abstract base classes
│   │   ├── BasePage.ts               # Base page with common methods
│   │   ├── BaseTest.ts               # Base test setup/teardown
│   │   └── BaseConfig.ts             # Base configuration interface
│   │
│   ├── core/                          # Core utilities & helpers
│   │   ├── BrowserManager.ts         # Browser initialization
│   │   ├── Logger.ts                 # Logging utility
│   │   ├── WaitHelper.ts             # Wait strategies
│   │   ├── ActionHelper.ts           # Common actions (click, type, etc.)
│   │   └── AssertionHelper.ts        # Custom assertions
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
│   │   ├── brivo.config.ts           # Brivo main app config
│   │   ├── app1.config.ts - app7.config.ts  # Sub-apps configs
│   │   └── environment.config.ts     # Environment settings
│   │
│   ├── pages/                         # Page Objects
│   │   ├── brivo/                    # Brivo main application pages
│   │   │   ├── LoginPage.ts
│   │   │   ├── DashboardPage.ts
│   │   │   └── locators/
│   │   │       ├── login.locators.ts
│   │   │       └── dashboard.locators.ts
│   │   │
│   │   └── app1-7/                   # Sub-applications 1-7
│   │       ├── LoginPage.ts
│   │       ├── HomePage.ts
│   │       └── locators/
│   │
│   ├── tests/                         # Test files
│   │   ├── brivo/
│   │   │   ├── brivo.login.spec.ts
│   │   │   ├── brivo.data-driven.spec.ts
│   │   │   └── brivo.api.spec.ts
│   │   └── app1-7/
│   │
│   ├── fixtures/                      # Playwright fixtures
│   │   └── customFixtures.ts         # Custom test fixtures
│   │
│   └── types/                         # TypeScript types
│       └── index.ts
│
├── test-results/                      # Playwright test results
├── playwright.config.ts               # Playwright configuration
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TypescriptFramework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Set up environment variables:
```bash
cp .env.example .env
```

5. Update the `.env` file with your credentials:
```env
# Brivo Credentials
BRIVO_BASE_URL=https://brivo.com
BRIVO_USERNAME=your_username
BRIVO_PASSWORD=your_password

# Sub-Application Credentials
APP1_USERNAME=app1_user
APP1_PASSWORD=app1_pass
# ... and so on for APP2-APP7
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode:
```bash
npm run test:headed
```

### Run specific application tests:
```bash
npm run test:brivo      # Run only Brivo tests
npm run test:app1       # Run only App1 tests
npm run test:app2       # Run only App2 tests
# ... and so on
```

### Debug mode:
```bash
npm run test:debug
```

### UI mode (Playwright Test UI):
```bash
npm run ui
```

### View test report:
```bash
npm run report
```

## Configuration

### Environment Configuration
- **Development**: Set `NODE_ENV=dev` in `.env`
- **QA**: Set `NODE_ENV=qa` in `.env`
- **Staging**: Set `NODE_ENV=staging` in `.env`
- **Production**: Set `NODE_ENV=prod` in `.env`

### Playwright Configuration
Edit [playwright.config.ts](playwright.config.ts) to modify:
- Browser types (chromium, firefox, webkit)
- Timeouts
- Retries
- Parallel execution
- Screenshot and video settings

## Writing Tests

### Test Flow
1. **Login to Brivo** (main application)
2. **Navigate to specific sub-application** (App1-App7)
3. **Login to sub-application**
4. **Perform test actions**
5. **Assert results**

### Example Test:

```typescript
import { test, expect } from '../../fixtures/customFixtures';

test.describe('App1 Tests', () => {
  test.beforeEach(async ({ brivoLoginPage, brivoDashboardPage }) => {
    // Login to Brivo first
    await brivoLoginPage.login();
    
    // Navigate to App1
    await brivoDashboardPage.navigateToApp(1);
  });

  test('should login to App1 successfully', async ({ app1LoginPage, app1HomePage }) => {
    await app1LoginPage.login();
    
    const isLoggedIn = await app1HomePage.isUserLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });
});
```

## Creating New Page Objects

### 1. Create Locators File:
```typescript
// src/pages/appX/locators/appX.locators.ts
export const AppXLocators = {
  login: {
    usernameInput: { selector: '#username', description: 'Username input' },
    passwordInput: { selector: '#password', description: 'Password input' },
    loginButton: { selector: 'button[type="submit"]', description: 'Login button' },
  },
};
```

### 2. Create Page Object:
```typescript
// src/pages/appX/AppXLoginPage.ts
import { Page } from '@playwright/test';
import { BasePage } from '../../base/BasePage';
import { AppXLocators } from './locators/appX.locators';

export class AppXLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string): Promise<void> {
    await this.actionHelper.fill(AppXLocators.login.usernameInput.selector, username);
    await this.actionHelper.fill(AppXLocators.login.passwordInput.selector, password);
    await this.actionHelper.click(AppXLocators.login.loginButton.selector);
  }

  async isPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(AppXLocators.login.loginButton.selector);
  }
}
```

## Helper Classes

### ActionHelper
- `click(selector)` - Click on element
- `fill(selector, text)` - Fill input field
- `type(selector, text)` - Type text with delay
- `select(selector, value)` - Select dropdown option
- `check(selector)` - Check checkbox
- `hover(selector)` - Hover over element
- `getText(selector)` - Get element text

### WaitHelper
- `waitForElementVisible(selector)` - Wait for element to be visible
- `waitForElementHidden(selector)` - Wait for element to be hidden
- `waitForNavigation()` - Wait for page navigation
- `waitForUrl(url)` - Wait for specific URL
- `waitForCondition(condition)` - Wait for custom condition

### AssertionHelper
- `assertElementVisible(selector)` - Assert element is visible
- `assertElementContainsText(selector, text)` - Assert element contains text
- `assertUrlContains(url)` - Assert URL contains string
- `assertTitle(title)` - Assert page title

## Logging

Framework uses Winston for logging. Logs are stored in:
- `app/logfiles/combined.log` - All logs
- `app/logfiles/error.log` - Error logs only

Logs are also displayed in the console with color coding.

## Output Directories

All test outputs follow the Robot Framework pattern:
- **app/logfiles/** - Test execution logs
- **app/screenshots/** - Test screenshots (on failure or manual)
- **app/reports/** - HTML and JSON test reports

## Best Practices

1. **Follow POM Pattern**: Keep page structure separate from test logic
2. **Use Locators Files**: Store all selectors in locator files
3. **Inherit from Base Classes**: All pages should extend `BasePage`
4. **Use Helper Methods**: Utilize `ActionHelper`, `WaitHelper`, and `AssertionHelper`
5. **Add Descriptive Logs**: Use logger for important actions
6. **Handle Waits Properly**: Always wait for elements before interaction
7. **Write Reusable Methods**: Create methods that can be used across tests
8. **Use Custom Fixtures**: Leverage Playwright fixtures for page objects
9. **Keep Tests Independent**: Each test should be able to run independently
10. **Clean Up**: Implement proper cleanup in `afterEach` hooks

## Troubleshooting

### Tests failing with timeout errors:
- Increase timeout in `playwright.config.ts`
- Check if selectors are correct
- Verify application is accessible

### Element not found errors:
- Verify locators in locator files
- Check if page is fully loaded
- Use proper wait strategies

### Authentication issues:
- Verify credentials in `.env` file
- Check if Brivo login is successful before app login
- Ensure session is maintained

## CI/CD Integration

The framework is ready for CI/CD integration. Example GitHub Actions workflow:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 📚 Documentation

All detailed documentation is available in the [z-documentation/](z-documentation/) folder:

- **[Quick Start Guide](z-documentation/QUICK_START.md)** - Get started quickly
- **[Final Summary](z-documentation/FINAL_SUMMARY.md)** - Complete framework overview
- **[Directory Structure](z-documentation/DIRECTORY_STRUCTURE.md)** - Detailed structure guide
- **[Framework Comparison](z-documentation/FRAMEWORK_COMPARISON.md)** - Robot Framework comparison
- **[Enhanced Features](z-documentation/ENHANCED_FEATURES.md)** - New features guide
- **[Structure Update](z-documentation/STRUCTURE_UPDATE.md)** - Recent structural changes

See [z-documentation/README.md](z-documentation/README.md) for complete documentation index.

## Support

For issues or questions, contact: jeevan.g@een.com

## License

ISC
