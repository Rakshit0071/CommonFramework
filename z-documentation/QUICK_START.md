# Quick Start Guide

## Initial Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
npx playwright install
```

### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your credentials
notepad .env  # or use any editor
```

### 3. Verify Installation
```bash
# Run a simple test to verify setup
npm run test:brivo
```

## Running Your First Test

### Step 1: Update Locators
Before running tests, update the locators in:
- `src/pages/brivo/locators/login.locators.ts`
- `src/pages/brivo/locators/dashboard.locators.ts`

Example:
```typescript
export const BrivoLoginLocators = {
  usernameInput: {
    selector: '#username',  // Update with actual selector
    description: 'Brivo username input field',
  },
  // ... update other selectors
};
```

### Step 2: Configure Credentials
Update `.env` with actual credentials:
```env
BRIVO_BASE_URL=https://your-brivo-instance.com
BRIVO_USERNAME=your_actual_username
BRIVO_PASSWORD=your_actual_password
```

### Step 3: Run Tests
```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run with Playwright UI
npm run ui
```

## Creating Your First Test for App2-App7

### 1. Create Page Objects

Copy the structure from `src/pages/app1/` and create similar files for your app:

```bash
src/pages/app2/
├── locators/
│   └── app2.locators.ts
├── App2LoginPage.ts
└── App2HomePage.ts
```

### 2. Update Config
The config file `src/config/app2.config.ts` is already created. Update URLs if needed.

### 3. Add to Fixtures
Update `src/fixtures/customFixtures.ts`:

```typescript
import { App2LoginPage } from '../pages/app2/App2LoginPage';
import { App2HomePage } from '../pages/app2/App2HomePage';

type CustomFixtures = {
  // ... existing fixtures
  app2LoginPage: App2LoginPage;
  app2HomePage: App2HomePage;
};

export const test = base.extend<CustomFixtures>({
  // ... existing fixtures
  app2LoginPage: async ({ page }, use) => {
    await use(new App2LoginPage(page));
  },
  app2HomePage: async ({ page }, use) => {
    await use(new App2HomePage(page));
  },
});
```

### 4. Create Test File
Create `src/tests/app2/app2.login.spec.ts` following the pattern from `app1.login.spec.ts`.

## Common Tasks

### Add a New Helper Method
Edit `src/core/ActionHelper.ts`:
```typescript
async customAction(selector: string): Promise<void> {
  // Your custom logic
  await this.click(selector);
}
```

### Add Logging
```typescript
this.logger.info('Your message here');
this.logger.error('Error message');
this.logger.warn('Warning message');
```

### Add Custom Assertion
Edit `src/core/AssertionHelper.ts`:
```typescript
async assertCustomCondition(selector: string): Promise<void> {
  // Your assertion logic
  await expect(this.page.locator(selector)).toBeVisible();
}
```

## Debugging Tips

### 1. Run in Debug Mode
```bash
npm run test:debug
```

### 2. Use Playwright Inspector
```bash
npx playwright test --debug
```

### 3. Take Screenshots
In your test:
```typescript
await page.screenshot({ path: 'debug-screenshot.png' });
```

### 4. Check Logs
```bash
# View combined logs
cat logs/combined.log

# View error logs only
cat logs/error.log
```

### 5. Use Console Logs
```typescript
console.log('Debug info:', await element.textContent());
```

## Test Execution Flow

```
1. Start Test
   ↓
2. Login to Brivo (main app)
   ↓
3. Verify Brivo Login Successful
   ↓
4. Navigate to Sub-Application (App1-7)
   ↓
5. Login to Sub-Application
   ↓
6. Perform Test Actions
   ↓
7. Assert Results
   ↓
8. Cleanup
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Update Brivo locators with actual selectors
4. ✅ Run first test
5. ✅ Create page objects for your specific sub-apps
6. ✅ Write comprehensive tests
7. ✅ Set up CI/CD pipeline

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Review example tests in `src/tests/`
- Contact: jeevan.g@een.com