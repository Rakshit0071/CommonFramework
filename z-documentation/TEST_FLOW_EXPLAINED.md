# Test Case Flow in the Framework - Visual Guide

## 🎯 Complete Test Execution Flow

### Test Case: Login to Eagle Eye Networks

---

## 📊 Visual Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│  1. TEST FILE STARTS                                         │
│  src/tests/app1/een.direct-login.spec.ts                    │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  2. IMPORT FIXTURES                                          │
│  import { test, expect } from '@playwright/test'             │
│                                                              │
│  Fixtures Auto-Create:                                       │
│  - page (Playwright browser page)                           │
│  - logger (Winston logger)                                  │
│  - All page objects (if using custom fixtures)              │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  3. TEST SUITE BEGINS                                        │
│  test.describe('Eagle Eye Networks - Direct Login', () => { │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  4. INDIVIDUAL TEST STARTS                                   │
│  test('Complete login workflow', async ({ page }) => {       │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  5. PLAYWRIGHT ACTIONS                                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Step 1: Navigate to URL                                │ │
│  │ await page.goto('https://webapp.ta...')               │ │
│  │                                                        │ │
│  │ → Browser opens                                        │ │
│  │ → Navigates to EEN login page                         │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  6. FIND ELEMENTS                                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ const usernameField = page.locator('input[type="email"]')│
│  │                                                        │ │
│  │ → Playwright searches DOM                             │ │
│  │ → Finds username input field                          │ │
│  │ → Waits until visible                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  7. INTERACT WITH ELEMENTS                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Step 2: Fill username                                 │ │
│  │ await usernameField.fill('een.web3.auto+static@...')  │ │
│  │                                                        │ │
│  │ Step 3: Fill password                                 │ │
│  │ await passwordField.fill('7zBJrbnSCQNDuwG')           │ │
│  │                                                        │ │
│  │ → Types into fields in browser                        │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  8. TRIGGER ACTION                                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Step 4: Click login button                            │ │
│  │ await loginButton.click()                             │ │
│  │                                                        │ │
│  │ → Clicks button in browser                            │ │
│  │ → Submits login form                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  9. WAIT FOR RESPONSE                                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ await page.waitForLoadState('networkidle')            │ │
│  │                                                        │ │
│  │ → Waits for page to load                              │ │
│  │ → Waits for network requests to complete              │ │
│  │ → Dashboard loads                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  10. ASSERTIONS / VERIFICATIONS                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ const currentUrl = page.url()                         │ │
│  │ expect(currentUrl).not.toContain('/login')            │ │
│  │                                                        │ │
│  │ → Verifies URL changed                                │ │
│  │ → Confirms login successful                           │ │
│  │ → If pass: ✅ Continue                                │ │
│  │ → If fail: ❌ Test fails                              │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  11. TAKE SCREENSHOTS                                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ await page.screenshot({                               │ │
│  │   path: 'app/screenshots/een-after-login.png'         │ │
│  │ })                                                    │ │
│  │                                                        │ │
│  │ → Captures current page                               │ │
│  │ → Saves to app/screenshots/                           │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  12. LOGGING                                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ logger.info('Login successful')                       │ │
│  │                                                        │ │
│  │ → Writes to app/logfiles/combined.log                │ │
│  │ → Console output with timestamp                       │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  13. TEST CLEANUP                                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ - Close browser page                                  │ │
│  │ - Save test results                                   │ │
│  │ - Generate report                                     │ │
│  │ - Save video (if enabled)                             │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  14. GENERATE REPORT                                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Playwright creates:                                   │ │
│  │ - HTML report (app/reports/)                          │ │
│  │ - JSON results                                        │ │
│  │ - JUnit XML                                           │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────────┐
│  15. TEST COMPLETE                                           │
│  ✅ PASS or ❌ FAIL                                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 Detailed Step-by-Step Flow

### Phase 1: Test Initialization

**What Happens:**
```typescript
// 1. Test file is loaded
import { test, expect } from '@playwright/test';

// 2. Test suite is defined
test.describe('EEN Login', () => {
  
  // 3. Individual test is defined
  test('login', async ({ page }) => {
    // Test code here
  });
});
```

**Behind the Scenes:**
- Playwright loads
- Fixtures are prepared
- Browser instance is ready
- Page object is created

---

### Phase 2: Test Execution

**Step 1: Navigate**
```typescript
await page.goto('https://webapp.ta.eagleeyenetworks.com');
```
**What happens:**
- Browser window opens
- Navigates to URL
- Waits for page to load
- DOM becomes available

**Step 2: Find Elements**
```typescript
const usernameField = page.locator('input[type="email"]');
await usernameField.waitFor({ state: 'visible' });
```
**What happens:**
- Searches DOM for selector
- Waits until element is visible
- Retries if not found (smart waiting)
- Throws error if timeout

**Step 3: Interact**
```typescript
await usernameField.fill('een.web3.auto+static@gmail.com');
await passwordField.fill('7zBJrbnSCQNDuwG');
await loginButton.click();
```
**What happens:**
- Types username character by character
- Types password
- Clicks login button
- Form is submitted

**Step 4: Wait for Response**
```typescript
await page.waitForLoadState('networkidle');
```
**What happens:**
- Waits for navigation
- Waits for network requests to finish
- New page loads (dashboard)
- DOM stabilizes

**Step 5: Verify**
```typescript
const currentUrl = page.url();
expect(currentUrl).not.toContain('/login');
```
**What happens:**
- Gets current URL
- Compares with expected
- If match: Test continues ✅
- If no match: Test fails ❌

---

### Phase 3: Test Completion

**Cleanup:**
```
1. Save screenshot (if configured)
2. Save video (if configured)
3. Write logs to app/logfiles/
4. Close browser page
5. Generate report entry
```

---

## 🏗️ Framework Layers Involved

### Layer 1: Test File (Your Code)
```
src/tests/app1/een.direct-login.spec.ts
↓
Defines WHAT to test
```

### Layer 2: Playwright (Test Framework)
```
@playwright/test
↓
Provides browser automation
```

### Layer 3: Fixtures (Dependency Injection)
```
customFixtures.ts
↓
Auto-creates page objects
```

### Layer 4: Page Objects (POM Pattern)
```
src/pages/app1/App1LoginPage.ts
↓
Methods like login(), enterUsername()
```

### Layer 5: Helpers (Reusable Actions)
```
src/core/ActionHelper.ts
src/core/WaitHelper.ts
↓
Methods like click(), wait(), fill()
```

### Layer 6: Locators (Element Selectors)
```
src/pages/app1/locators/app1.locators.ts
↓
CSS selectors for elements
```

### Layer 7: Browser (Actual UI)
```
Chromium/Firefox/WebKit
↓
Real browser where test runs
```

---

## 📸 What Gets Created During Test

### Files Generated:

```
app/
├── logfiles/
│   ├── combined.log         ← All log messages
│   └── error.log           ← Error messages only
│
├── screenshots/
│   ├── een-before-login.png  ← Before clicking login
│   └── een-after-login.png   ← After successful login
│
└── reports/
    ├── index.html           ← HTML test report
    └── results.json         ← JSON test results
```

---

## 🔍 Example: Complete Flow for EEN Login

```
USER RUNS: npm test

1. Playwright starts
   └─> Reads playwright.config.ts
       └─> Gets test directory: src/tests/
   
2. Finds test files
   └─> src/tests/app1/een.direct-login.spec.ts
   
3. For each test:
   
   A. SETUP PHASE
      ├─> Create browser instance
      ├─> Create page (tab)
      ├─> Initialize fixtures
      │   ├─> logger ready
      │   └─> page ready
      └─> Start logging
   
   B. EXECUTION PHASE
      ├─> Navigate to URL
      │   └─> https://webapp.ta.eagleeyenetworks.com
      │
      ├─> Find username field
      │   └─> page.locator('input[type="email"]')
      │       └─> DOM search
      │       └─> Wait for visible
      │       └─> Element found ✅
      │
      ├─> Fill username
      │   └─> usernameField.fill('een.web3.auto+static@gmail.com')
      │       └─> Types each character
      │       └─> Value entered ✅
      │
      ├─> Find password field
      │   └─> page.locator('input[type="password"]')
      │       └─> Element found ✅
      │
      ├─> Fill password
      │   └─> passwordField.fill('7zBJrbnSCQNDuwG')
      │       └─> Password entered ✅
      │
      ├─> Find login button
      │   └─> page.locator('button[type="submit"]')
      │       └─> Button found ✅
      │
      ├─> Click login
      │   └─> loginButton.click()
      │       └─> Form submitted
      │       └─> Navigation starts
      │
      ├─> Wait for navigation
      │   └─> page.waitForLoadState('networkidle')
      │       └─> Page loads
      │       └─> Network requests complete
      │       └─> Dashboard loaded ✅
      │
      ├─> Verify URL changed
      │   └─> expect(url).not.toContain('/login')
      │       └─> URL: https://webapp.ta.eagleeyenetworks.com/dashboard
      │       └─> Assertion PASSED ✅
      │
      └─> Take screenshot
          └─> page.screenshot()
              └─> Saved: app/screenshots/een-after-login.png ✅
   
   C. CLEANUP PHASE
      ├─> Write logs
      │   └─> app/logfiles/combined.log
      │
      ├─> Save test result
      │   └─> PASS ✅
      │
      ├─> Close browser page
      │   └─> Browser tab closes
      │
      └─> Add to report
          └─> app/reports/index.html
   
4. Generate final report
   └─> All tests complete
   └─> Report ready to view

5. Show summary:
   ✅ 1 passed (15s)
```

---

## 🎯 Real Test Output

```bash
$ npm test -- een.direct-login.spec.ts

Running 1 test using 1 worker

Starting EEN Direct Login Test
Navigating to: https://webapp.ta.eagleeyenetworks.com
Looking for username field...
Username field found: input[type="email"]
Username entered: een.web3.auto+static@gmail.com
Looking for password field...
Password field found: input[type="password"]
Password entered
Looking for login button...
Login button found: button[type="submit"]
Screenshot saved: een-before-login.png
Login button clicked
Waiting for login to complete...
Current URL: https://webapp.ta.eagleeyenetworks.com/dashboard
Screenshot saved: een-after-login.png
✅ Login successful - redirected from login page
Page title: Eagle Eye Networks - Dashboard
✅ Test completed successfully!

  ✅ [chromium] › een.direct-login.spec.ts:15:3 › Complete login workflow

  1 passed (15s)
```

---

## ✅ Summary

### Test Execution Path:
```
Test File → Playwright → Browser → Web Page → Actions → Verifications → Results → Report
```

### Framework Components Used:
```
1. Test file (your code)
2. Fixtures (auto-injection)
3. Playwright (automation)
4. Browser (execution)
5. Helpers (actions)
6. Logger (logging)
7. Reporter (results)
```

### Artifacts Created:
```
1. Logs (app/logfiles/)
2. Screenshots (app/screenshots/)
3. Reports (app/reports/)
4. Test results (JSON)
```

---

**This is how your test flows through the entire framework!** 🎯