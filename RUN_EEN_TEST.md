# Run Eagle Eye Networks Test

## Quick Start

### Test Details
- **URL:** https://webapp.ta.eagleeyenetworks.com
- **Username:** een.web3.auto+static@gmail.com
- **Password:** 7zBJrbnSCQNDuwG
- **User Type:** Static user (for regression testing)

---

## Run the Tests

### Option 1: Run All EEN Tests
```bash
npm test -- src/tests/app1/
```

### Option 2: Run Static User Test
```bash
npm test -- src/tests/app1/een.static-user.spec.ts
```

### Option 3: Run Direct Login Test
```bash
npm test -- src/tests/app1/een.direct-login.spec.ts
```

### Option 4: Run in Headed Mode (See Browser)
```bash
npx playwright test src/tests/app1/een.direct-login.spec.ts --headed
```

### Option 5: Run with Debug
```bash
npx playwright test src/tests/app1/een.direct-login.spec.ts --debug
```

---

## Test Files Created

### 1. `een.static-user.spec.ts`
**Tests:**
- ✅ Successful login with static user
- ✅ Login page elements display correctly
- ✅ Invalid password handling
- ✅ Dashboard loads after login
- ✅ Page title verification
- ✅ Automatic screenshot on failure

**Uses:** Fixtures and helpers from framework

---

### 2. `een.direct-login.spec.ts`
**Tests:**
- ✅ Complete login workflow
- ✅ Login page loads correctly
- ✅ Screenshot capture of login flow

**Uses:** Direct Playwright (no fixtures) - simpler approach

---

## What Each Test Does

### Test 1: Successful Login
```
1. Navigate to https://webapp.ta.eagleeyenetworks.com
2. Enter username: een.web3.auto+static@gmail.com
3. Enter password: 7zBJrbnSCQNDuwG
4. Click login button
5. Wait for dashboard to load
6. Verify URL changed (not on /login anymore)
✅ PASS
```

### Test 2: Login Page Elements
```
1. Navigate to EEN login page
2. Verify username field exists and visible
3. Verify password field exists and visible
4. Verify login button exists and visible
✅ PASS
```

### Test 3: Invalid Password
```
1. Enter valid username
2. Enter INVALID password
3. Click login
4. Verify error shown OR still on login page
✅ PASS
```

### Test 4: Dashboard Verification
```
1. Login successfully
2. Wait for dashboard to load
3. Take screenshot of dashboard
4. Verify page title is not empty
5. Verify URL is not /login
✅ PASS
```

---

## Expected Output

### When Tests Pass:
```
Running 5 tests using 1 worker

  ✓ [chromium] › een.static-user.spec.ts:14:3 › should successfully login
  ✓ [chromium] › een.static-user.spec.ts:45:3 › should display login elements
  ✓ [chromium] › een.static-user.spec.ts:62:3 › should handle invalid password
  ✓ [chromium] › een.static-user.spec.ts:85:3 › should login and verify dashboard
  ✓ [chromium] › een.static-user.spec.ts:110:3 › should login and check page title

  5 passed (45s)
```

---

## Screenshots Generated

After running tests, check:
```
app/screenshots/
├── een-before-login.png          # Before clicking login
├── een-after-login.png           # After successful login
├── een-dashboard-static-user.png # Dashboard view
├── een-login-page.png            # Login page
├── een-credentials-filled.png    # Credentials entered
└── een-logged-in.png            # Logged in state
```

---

## View Test Report

After tests complete:
```bash
npx playwright show-report
```

This opens an HTML report showing:
- ✅ Which tests passed
- ❌ Which tests failed
- 📸 Screenshots
- 🎥 Videos (if enabled)
- ⏱️ Execution time

---

## Troubleshooting

### If Username Field Not Found:
```
Error: Username field not found!
```
**Fix:** Update locator in test file - inspect EEN page and copy actual selector

### If Login Fails:
```
Error: Timeout waiting for navigation
```
**Possible reasons:**
1. Credentials incorrect
2. EEN site slow to respond
3. Login button selector wrong

**Fix:** Run in headed mode to see what's happening:
```bash
npx playwright test --headed
```

### If Screenshots Not Saved:
**Check:** `app/screenshots/` folder exists
**Create manually if needed:**
```bash
mkdir -p app/screenshots
```

---

## Quick Commands

```bash
# Run all tests
npm test

# Run only EEN tests
npm test -- src/tests/app1/

# Run specific test
npm test -- een.direct-login.spec.ts

# See browser while testing
npm test -- een.direct-login.spec.ts --headed

# Debug mode
npm test -- een.direct-login.spec.ts --debug

# View report
npx playwright show-report
```

---

## Test Execution Flow

```
Start
  ↓
Navigate to https://webapp.ta.eagleeyenetworks.com
  ↓
Wait for page load
  ↓
Find username field
  ↓
Enter: een.web3.auto+static@gmail.com
  ↓
Find password field
  ↓
Enter: 7zBJrbnSCQNDuwG
  ↓
Find login button
  ↓
Click login button
  ↓
Wait for navigation (30s timeout)
  ↓
Verify URL changed
  ↓
Take screenshot
  ↓
✅ Test Pass
```

---

## Next Steps

1. **Run the test:**
   ```bash
   npx playwright test src/tests/app1/een.direct-login.spec.ts --headed
   ```

2. **Check results:**
   - Look for ✅ green checkmarks
   - Check screenshots in `app/screenshots/`

3. **View detailed report:**
   ```bash
   npx playwright show-report
   ```

4. **If test passes:**
   - Update locators with actual selectors from EEN
   - Add more test scenarios
   - Integrate with other tests

---

## Important Notes

⚠️ **First Run:** Test might fail if:
- Locators need updating (EEN UI changed)
- Network is slow
- Credentials expired

✅ **Solution:** Run in headed mode and watch what happens, then update locators

📸 **Screenshots:** Automatically saved to `app/screenshots/` for debugging

🔄 **Retry:** Tests retry automatically on failure (configured in playwright.config.ts)

---

**Ready to run!** Execute the test and see it in action! 🚀
