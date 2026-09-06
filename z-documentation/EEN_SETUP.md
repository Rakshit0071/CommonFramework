# Eagle Eye Networks (EEN) Setup Guide

## Overview

Eagle Eye Networks is the **first sub-application** (App1) in the Brivo test automation framework. This guide explains how to configure and test EEN.

## Application Details

- **Name:** Eagle Eye Networks
- **Type:** Cloud-based video surveillance platform
- **URL:** https://webapp.ta.eagleeyenetworks.com
- **API URL:** https://api.eagleeyenetworks.com

## Configuration

### 1. Environment Variables

The framework includes pre-configured Eagle Eye Networks test users. Update your `.env` file:

```env
# Eagle Eye Networks Configuration
EEN_BASE_URL=https://webapp.ta.eagleeyenetworks.com
EEN_API_URL=https://api.eagleeyenetworks.com

# EEN API Authentication
AUTO_TEST_CLIENT_SECRET=QVVUTy1URVNUOkJ4IzlLNG1hRiF3bXdfJEhOUUxL

# Default Test User
EEN_USERNAME=een.web3.auto+empty@gmail.com
EEN_PASSWORD=7zBJrbnSCQNDuwG
```

### 2. Test Users

The framework includes multiple EEN test users in `src/testdata/een-users.json`:

**User Categories:**
- **Default End User** - General testing
- **Admin User** (ts01Admin) - Admin functionality testing
- **CRUD Users** (crud1, crud2, crud3, ultl) - CRUD operations testing
- **Branding Users** (reseller, end user) - Branding feature testing
- **Static Users** - Regression testing
- **Swap User** - Device swap testing

**Common Password:** `7zBJrbnSCQNDuwG`

### 2. Configuration File

The EEN configuration is located at: `src/config/app1.config.ts`

```typescript
export const app1Config = {
  baseUrl: 'https://webapp.ta.eagleeyenetworks.com',
  username: process.env.EEN_USERNAME,
  password: process.env.EEN_PASSWORD,
  appName: 'Eagle Eye Networks',
  eenApiUrl: 'https://api.eagleeyenetworks.com'
};
```

## Page Objects

### EEN Login Page
**File:** `src/pages/app1/App1LoginPage.ts`

**Methods:**
- `navigate()` - Navigate to EEN login page
- `enterUsername(username)` - Enter EEN email
- `enterPassword(password)` - Enter EEN password
- `clickLoginButton()` - Click login button
- `checkRememberMe()` - Check remember me option
- `login(credentials?)` - Complete login process

**Usage:**
```typescript
import { App1LoginPage } from './pages/app1/App1LoginPage';

const eenLoginPage = new App1LoginPage(page);
await eenLoginPage.login({
  username: 'user@example.com',
  password: 'password123'
});
```

### EEN Dashboard/Home Page
**File:** `src/pages/app1/App1HomePage.ts`

**Methods:**
- `navigate()` - Navigate to EEN dashboard
- `getWelcomeText()` - Get welcome message
- `clickLiveView()` - Open live view
- `getCamerasList()` - Check if cameras list is visible
- `isCameraGridVisible()` - Check if camera grid is displayed
- `logout()` - Logout from EEN

**Usage:**
```typescript
import { App1HomePage } from './pages/app1/App1HomePage';

const eenHomePage = new App1HomePage(page);
await eenHomePage.clickLiveView();
const hasCameras = await eenHomePage.getCamerasList();
```

## Locators

### EEN Locators File
**File:** `src/pages/app1/locators/app1.locators.ts`

**Locator Groups:**

1. **Login Locators:**
   - `usernameInput` - Email input field
   - `passwordInput` - Password input field
   - `loginButton` - Login button
   - `errorMessage` - Error message display
   - `rememberMe` - Remember me checkbox

2. **Dashboard Locators:**
   - `homeContainer` - Main dashboard container
   - `welcomeText` - Welcome message
   - `navigationMenu` - Navigation menu
   - `logoutButton` - Logout button
   - `camerasList` - Cameras list
   - `liveViewButton` - Live view button

3. **Camera Locators:**
   - `cameraGrid` - Camera grid view
   - `videoPlayer` - Video player container
   - `playbackControls` - Playback controls

4. **Common Locators:**
   - `loadingSpinner` - Loading spinner
   - `notificationToast` - Notification messages
   - `errorBanner` - Error banner

**Update Required:** Replace placeholder selectors with actual EEN selectors:

```typescript
export const App1Locators = {
  login: {
    usernameInput: {
      selector: '#een-username',  // ← Update with actual selector
      description: 'Eagle Eye Networks username input field',
    },
    // ... update other selectors
  },
};
```

## Test Flow

### Standard EEN Test Flow

```
1. Login to Brivo (main application)
   ↓
2. Navigate to Eagle Eye Networks from Brivo dashboard
   ↓
3. Login to Eagle Eye Networks
   ↓
4. Verify EEN dashboard loaded
   ↓
5. Perform EEN-specific actions (view cameras, playback, etc.)
   ↓
6. Verify results
   ↓
7. Logout
```

### Example Test

**File:** `src/tests/app1/app1.login.spec.ts`

```typescript
import { test, expect } from '../../fixtures/customFixtures';

test.describe('Eagle Eye Networks Tests', () => {
  test.beforeEach(async ({ brivoLoginPage, brivoDashboardPage }) => {
    // Login to Brivo first
    await brivoLoginPage.login();
    
    // Navigate to Eagle Eye Networks
    await brivoDashboardPage.navigateToApp(1);
  });

  test('should login to Eagle Eye Networks', async ({
    app1LoginPage,
    app1HomePage
  }) => {
    // Login to EEN
    await app1LoginPage.login();
    
    // Verify dashboard loaded
    const isLoaded = await app1HomePage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
    
    // Verify cameras list visible
    const hasCameras = await app1HomePage.getCamerasList();
    expect(hasCameras).toBeTruthy();
  });

  test('should display camera grid', async ({
    app1LoginPage,
    app1HomePage
  }) => {
    await app1LoginPage.login();
    await app1HomePage.clickLiveView();
    
    const isCameraGridVisible = await app1HomePage.isCameraGridVisible();
    expect(isCameraGridVisible).toBeTruthy();
  });
});
```

## Running EEN Tests

### Run all EEN tests:
```bash
npm run test:app1
```

### Run specific EEN test:
```bash
npm test -- app1.login.spec.ts
```

### Run in headed mode (see browser):
```bash
npm run test:headed -- app1.login.spec.ts
```

### Debug mode:
```bash
npm run test:debug -- app1.login.spec.ts
```

## Updating EEN Locators

### Step 1: Inspect Eagle Eye Networks UI
1. Open https://webapp.ta.eagleeyenetworks.com
2. Open browser DevTools (F12)
3. Use Inspector to find element selectors

### Step 2: Update Locators File
Update `src/pages/app1/locators/app1.locators.ts` with actual selectors:

```typescript
export const App1Locators = {
  login: {
    usernameInput: {
      selector: '#actual-username-id',  // ← Replace with real selector
      description: 'Eagle Eye Networks username input field',
    },
    passwordInput: {
      selector: '#actual-password-id',  // ← Replace with real selector
      description: 'Eagle Eye Networks password input field',
    },
    loginButton: {
      selector: 'button[type="submit"]',  // ← Replace with real selector
      description: 'Eagle Eye Networks login button',
    },
  },
};
```

### Step 3: Verify Locators
Run the test to verify locators work:
```bash
npm test -- app1.login.spec.ts
```

## Common Issues

### Issue 1: Login Fails
**Problem:** EEN login doesn't work

**Solutions:**
- Verify credentials in `.env` file
- Check if EEN URL is correct
- Update login button selector
- Check for CAPTCHA or 2FA requirements

### Issue 2: Elements Not Found
**Problem:** Test fails with "element not found"

**Solutions:**
- Inspect EEN page and update selectors
- Add wait for element to load
- Check if element is in iframe

### Issue 3: Timeout Errors
**Problem:** Test times out

**Solutions:**
- Increase timeout in `app1.config.ts`
- Add explicit waits for slow-loading elements
- Check network connectivity

## EEN-Specific Features to Test

1. **Authentication**
   - Login with valid credentials
   - Login with invalid credentials
   - Remember me functionality
   - Logout

2. **Camera Management**
   - View cameras list
   - Open live view
   - Switch between cameras
   - Camera grid display

3. **Video Playback**
   - Play recorded video
   - Pause/resume playback
   - Seek to specific time
   - Playback controls

4. **Dashboard**
   - Dashboard loads correctly
   - Navigation menu works
   - User settings accessible
   - Notifications display

## Next Steps

1. ✅ Update `.env` with your EEN credentials
2. ✅ Inspect EEN UI and update locators
3. ✅ Run initial login test
4. ✅ Add more EEN-specific tests
5. ✅ Integrate with CI/CD pipeline

---

**Application:** Eagle Eye Networks
**Framework Version:** 2.1
**Last Updated:** 2026-08-30