# Fixtures Guide - Complete Explanation

## What are Fixtures?

**Fixtures** are a Playwright testing feature that provides a way to set up and share test dependencies, page objects, and test context across multiple tests.

Think of fixtures as **"test ingredients"** that are automatically prepared and injected into your tests.

## Why Use Fixtures?

### Benefits:
✅ **Automatic Setup/Teardown** - No manual initialization
✅ **Dependency Injection** - Clean, organized test code
✅ **Reusability** - Share page objects across tests
✅ **Isolation** - Each test gets fresh instances
✅ **Type Safety** - Full TypeScript support
✅ **Clean Tests** - Less boilerplate code

### Without Fixtures (Manual Setup):
```typescript
test('login test', async ({ page }) => {
  // Manual setup - repetitive!
  const brivoLoginPage = new BrivoLoginPage(page);
  const brivoDashboardPage = new BrivoDashboardPage(page);
  const logger = new Logger();
  
  logger.info('Test started');
  await brivoLoginPage.login();
  await brivoDashboardPage.isPageLoaded();
  
  // Test code...
});

test('another test', async ({ page }) => {
  // Same setup again - code duplication!
  const brivoLoginPage = new BrivoLoginPage(page);
  const brivoDashboardPage = new BrivoDashboardPage(page);
  const logger = new Logger();
  
  // Test code...
});
```

### With Fixtures (Automatic Injection):
```typescript
test('login test', async ({ 
  brivoLoginPage,      // ✨ Automatically available!
  brivoDashboardPage,  // ✨ Automatically available!
  logger               // ✨ Automatically available!
}) => {
  logger.info('Test started');
  await brivoLoginPage.login();
  await brivoDashboardPage.isPageLoaded();
  
  // Test code - clean and focused!
});

test('another test', async ({ brivoLoginPage, logger }) => {
  // Same fixtures available - no duplication!
  // Test code...
});
```

---

## How Fixtures Work in This Framework

### Location
**File:** `src/fixtures/customFixtures.ts`

### Current Fixtures

```typescript
type CustomFixtures = {
  logger: Logger;
  brivoLoginPage: BrivoLoginPage;
  brivoDashboardPage: BrivoDashboardPage;
  app1LoginPage: App1LoginPage;
  app1HomePage: App1HomePage;
};
```

### Fixture Definitions

```typescript
export const test = base.extend<CustomFixtures>({
  // Logger fixture
  logger: async ({}, use) => {
    const logger = new Logger();
    logger.info('Test started');
    await use(logger);  // ← Inject into test
    logger.info('Test completed');
  },

  // Brivo Login Page fixture
  brivoLoginPage: async ({ page }, use) => {
    const brivoLoginPage = new BrivoLoginPage(page);
    await use(brivoLoginPage);  // ← Inject into test
  },

  // More fixtures...
});
```

---

## Fixture Lifecycle

### 1. Test Starts
```
Test begins → Fixtures are created
```

### 2. Setup Phase
```typescript
logger: async ({}, use) => {
  const logger = new Logger();      // ← SETUP
  logger.info('Test started');
  
  await use(logger);  // ← Fixture is available in test
  
  // Teardown happens after test...
}
```

### 3. Test Execution
```typescript
test('example', async ({ logger, brivoLoginPage }) => {
  // ← Fixtures are injected here
  logger.info('Doing something');
  await brivoLoginPage.login();
});
```

### 4. Teardown Phase
```typescript
logger: async ({}, use) => {
  const logger = new Logger();
  logger.info('Test started');
  
  await use(logger);
  
  logger.info('Test completed');  // ← TEARDOWN
}
```

### 5. Test Ends
```
Test completes → Fixtures are cleaned up
```

---

## Using Fixtures in Tests

### Example 1: Basic Usage

```typescript
import { test, expect } from '../../fixtures/customFixtures';

test('should login to Brivo', async ({ 
  brivoLoginPage,      // ← Request fixtures you need
  brivoDashboardPage 
}) => {
  await brivoLoginPage.login();
  
  const isLoaded = await brivoDashboardPage.isPageLoaded();
  expect(isLoaded).toBeTruthy();
});
```

### Example 2: Using Multiple Fixtures

```typescript
test('should access Eagle Eye Networks', async ({ 
  logger,              // ← All fixtures available
  brivoLoginPage,
  brivoDashboardPage,
  app1LoginPage,
  app1HomePage
}) => {
  logger.info('Starting EEN test');
  
  // Login to Brivo
  await brivoLoginPage.login();
  
  // Navigate to EEN
  await brivoDashboardPage.navigateToApp(1);
  
  // Login to EEN
  await app1LoginPage.login();
  
  // Verify EEN loaded
  const isLoaded = await app1HomePage.isPageLoaded();
  expect(isLoaded).toBeTruthy();
  
  logger.info('EEN test completed');
});
```

### Example 3: Using Only What You Need

```typescript
test('simple logger test', async ({ logger }) => {
  // ← Only request logger, ignore other fixtures
  logger.info('This is a simple test');
  expect(true).toBeTruthy();
});
```

---

## Fixture Dependencies

Fixtures can depend on other fixtures:

```typescript
export const test = base.extend<CustomFixtures>({
  // page is a built-in Playwright fixture
  brivoLoginPage: async ({ page }, use) => {
    //                     ↑ depends on 'page'
    const brivoLoginPage = new BrivoLoginPage(page);
    await use(brivoLoginPage);
  },
  
  logger: async ({}, use) => {
    //           ↑ no dependencies
    const logger = new Logger();
    await use(logger);
  },
});
```

---

## Adding New Fixtures

### Step 1: Update Type Definition

```typescript
type CustomFixtures = {
  logger: Logger;
  brivoLoginPage: BrivoLoginPage;
  brivoDashboardPage: BrivoDashboardPage;
  app1LoginPage: App1LoginPage;
  app1HomePage: App1HomePage;
  
  // Add new fixture type
  app2LoginPage: App2LoginPage;  // ← NEW
};
```

### Step 2: Implement Fixture

```typescript
export const test = base.extend<CustomFixtures>({
  // ... existing fixtures ...
  
  // Add new fixture implementation
  app2LoginPage: async ({ page }, use) => {
    const app2LoginPage = new App2LoginPage(page);
    await use(app2LoginPage);
  },
});
```

### Step 3: Use in Tests

```typescript
test('test with App2', async ({ 
  brivoLoginPage,
  app2LoginPage  // ← New fixture available!
}) => {
  await brivoLoginPage.login();
  await app2LoginPage.login();
});
```

---

## Real-World Examples

### Example: Complete Test Flow

```typescript
import { test, expect } from '../../fixtures/customFixtures';

test.describe('Eagle Eye Networks Tests', () => {
  test('should complete full EEN workflow', async ({ 
    logger,
    brivoLoginPage,
    brivoDashboardPage,
    app1LoginPage,
    app1HomePage
  }) => {
    logger.info('=== Test: Full EEN Workflow ===');
    
    // Step 1: Login to Brivo
    logger.info('Step 1: Logging into Brivo');
    await brivoLoginPage.login();
    
    // Step 2: Verify Brivo dashboard
    logger.info('Step 2: Verifying Brivo dashboard');
    const brivoLoaded = await brivoDashboardPage.isPageLoaded();
    expect(brivoLoaded).toBeTruthy();
    
    // Step 3: Navigate to EEN
    logger.info('Step 3: Navigating to Eagle Eye Networks');
    await brivoDashboardPage.navigateToApp(1);
    
    // Step 4: Login to EEN
    logger.info('Step 4: Logging into Eagle Eye Networks');
    await app1LoginPage.login();
    
    // Step 5: Verify EEN dashboard
    logger.info('Step 5: Verifying EEN dashboard');
    const eenLoaded = await app1HomePage.isPageLoaded();
    expect(eenLoaded).toBeTruthy();
    
    // Step 6: Check cameras
    logger.info('Step 6: Checking cameras list');
    const hasCameras = await app1HomePage.getCamerasList();
    expect(hasCameras).toBeTruthy();
    
    logger.info('=== Test Completed Successfully ===');
  });
});
```

### Example: beforeEach with Fixtures

```typescript
test.describe('EEN Dashboard Tests', () => {
  test.beforeEach(async ({ 
    brivoLoginPage,
    brivoDashboardPage,
    app1LoginPage
  }) => {
    // Setup runs before each test
    await brivoLoginPage.login();
    await brivoDashboardPage.navigateToApp(1);
    await app1LoginPage.login();
  });

  test('should display cameras', async ({ app1HomePage }) => {
    // EEN already logged in from beforeEach!
    const hasCameras = await app1HomePage.getCamerasList();
    expect(hasCameras).toBeTruthy();
  });

  test('should display live view', async ({ app1HomePage }) => {
    // EEN already logged in from beforeEach!
    await app1HomePage.clickLiveView();
    const isVisible = await app1HomePage.isCameraGridVisible();
    expect(isVisible).toBeTruthy();
  });
});
```

---

## Advanced Fixture Patterns

### Pattern 1: Fixture with Setup and Teardown

```typescript
customHelper: async ({ page }, use) => {
  // SETUP
  const helper = new CustomHelper(page);
  await helper.initialize();
  console.log('Helper initialized');
  
  // USE
  await use(helper);
  
  // TEARDOWN
  await helper.cleanup();
  console.log('Helper cleaned up');
},
```

### Pattern 2: Conditional Fixture

```typescript
apiClient: async ({}, use) => {
  const env = process.env.NODE_ENV;
  const apiUrl = env === 'prod' 
    ? 'https://api.prod.com' 
    : 'https://api.test.com';
  
  const client = new APIClient(apiUrl);
  await use(client);
},
```

### Pattern 3: Fixture with Data Loading

```typescript
testData: async ({}, use) => {
  // Load test data
  const data = FileHelper.readJSON('testdata/users.json');
  await use(data);
},
```

---

## Comparison: With vs Without Fixtures

### Without Fixtures (Old Way)
```typescript
test('test 1', async ({ page }) => {
  const login = new BrivoLoginPage(page);
  const dashboard = new BrivoDashboardPage(page);
  const logger = new Logger();
  
  logger.info('Test 1');
  await login.login();
  await dashboard.isPageLoaded();
});

test('test 2', async ({ page }) => {
  const login = new BrivoLoginPage(page);  // Duplicate!
  const dashboard = new BrivoDashboardPage(page);  // Duplicate!
  const logger = new Logger();  // Duplicate!
  
  logger.info('Test 2');
  await login.login();
  await dashboard.isPageLoaded();
});
```

### With Fixtures (New Way)
```typescript
test('test 1', async ({ brivoLoginPage, brivoDashboardPage, logger }) => {
  logger.info('Test 1');
  await brivoLoginPage.login();
  await brivoDashboardPage.isPageLoaded();
});

test('test 2', async ({ brivoLoginPage, brivoDashboardPage, logger }) => {
  logger.info('Test 2');
  await brivoLoginPage.login();
  await brivoDashboardPage.isPageLoaded();
});
```

**Result:**
- ✅ Less code
- ✅ No duplication
- ✅ Cleaner tests
- ✅ Automatic cleanup
- ✅ Type-safe

---

## Best Practices

### ✅ DO:
- Use fixtures for page objects
- Use fixtures for shared utilities
- Keep fixture names descriptive
- Only request fixtures you need
- Use fixtures for setup/teardown

### ❌ DON'T:
- Don't put test logic in fixtures
- Don't create circular dependencies
- Don't request unused fixtures
- Don't modify shared fixture state

---

## Common Questions

**Q: Do I have to use all fixtures in every test?**
A: No! Only request the fixtures you need:
```typescript
test('simple test', async ({ logger }) => {
  // Only using logger, ignoring other fixtures
});
```

**Q: Are fixtures created for each test?**
A: Yes! Each test gets fresh fixture instances, ensuring isolation.

**Q: Can I add my own fixtures?**
A: Yes! Follow the "Adding New Fixtures" section above.

**Q: Where do I import test from?**
A: Always from your custom fixtures:
```typescript
import { test, expect } from '../../fixtures/customFixtures';
```

**Q: Can fixtures depend on other fixtures?**
A: Yes! Example:
```typescript
dashboard: async ({ page, logger }, use) => {
  //                ↑ depends on page and logger
  logger.info('Creating dashboard');
  const dash = new Dashboard(page);
  await use(dash);
}
```

---

## Summary

### What Fixtures Provide:
1. **Automatic Page Object Creation** - No manual `new PageObject(page)`
2. **Dependency Injection** - Clean, organized code
3. **Setup/Teardown** - Automatic lifecycle management
4. **Reusability** - Share across all tests
5. **Type Safety** - Full TypeScript support

### Current Available Fixtures:
- `logger` - Logger instance
- `brivoLoginPage` - Brivo login page object
- `brivoDashboardPage` - Brivo dashboard page object
- `app1LoginPage` - Eagle Eye Networks login page
- `app1HomePage` - Eagle Eye Networks home page

### How to Use:
```typescript
import { test, expect } from '../../fixtures/customFixtures';

test('my test', async ({ 
  logger,
  brivoLoginPage,
  app1HomePage 
}) => {
  // Fixtures are ready to use!
});
```

---

**Fixtures make your tests cleaner, more maintainable, and easier to write!** 🎉

**Last Updated:** 2026-08-30