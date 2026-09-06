# Application Mapping

## Brivo Sub-Applications

This framework tests **Brivo** (main application) and its **7 sub-applications**.

### Main Application
**Brivo** - Access control and security management platform
- Configuration: `src/config/brivo.config.ts`
- Pages: `src/pages/brivo/`
- Tests: `src/tests/brivo/`

---

## Sub-Applications

### App1: Eagle Eye Networks (EEN) ✅
**Description:** Cloud-based video surveillance platform

**Application URL:** `https://webapp.ta.eagleeyenetworks.com`

**Configuration:** `src/config/app1.config.ts`

**Environment Variables:**
```env
EEN_BASE_URL=https://webapp.ta.eagleeyenetworks.com
EEN_USERNAME=your_een_email@example.com
EEN_PASSWORD=your_een_password
EEN_API_URL=https://api.eagleeyenetworks.com
```

**Features:**
- Video surveillance management
- Camera grid view
- Live video streaming
- Playback controls
- Recording management

**Pages:**
- `App1LoginPage.ts` - EEN login functionality
- `App1HomePage.ts` - EEN dashboard/main page

**Locators:** `src/pages/app1/locators/app1.locators.ts`
- Login locators (username, password, login button)
- Dashboard locators (cameras list, live view, navigation)
- Camera-specific locators (grid, video player, controls)

**Tests:** `src/tests/app1/`
- `app1.login.spec.ts` - Login tests for EEN

**API Endpoint:** `https://api.eagleeyenetworks.com`

---

### App2: [Application Name] ⏳
**Description:** To be configured

**Configuration:** `src/config/app2.config.ts`

**Locators:** `src/pages/app2/locators/app2.locators.ts` (placeholder)

**Status:** Placeholder - Ready for implementation

---

### App3: [Application Name] ⏳
**Description:** To be configured

**Configuration:** `src/config/app3.config.ts`

**Locators:** `src/pages/app3/locators/app3.locators.ts` (placeholder)

**Status:** Placeholder - Ready for implementation

---

### App4: [Application Name] ⏳
**Description:** To be configured

**Configuration:** `src/config/app4.config.ts`

**Locators:** `src/pages/app4/locators/app4.locators.ts` (placeholder)

**Status:** Placeholder - Ready for implementation

---

### App5: [Application Name] ⏳
**Description:** To be configured

**Configuration:** `src/config/app5.config.ts`

**Locators:** `src/pages/app5/locators/app5.locators.ts` (placeholder)

**Status:** Placeholder - Ready for implementation

---

### App6: [Application Name] ⏳
**Description:** To be configured

**Configuration:** `src/config/app6.config.ts`

**Locators:** `src/pages/app6/locators/app6.locators.ts` (placeholder)

**Status:** Placeholder - Ready for implementation

---

### App7: [Application Name] ⏳
**Description:** To be configured

**Configuration:** `src/config/app7.config.ts`

**Locators:** `src/pages/app7/locators/app7.locators.ts` (placeholder)

**Status:** Placeholder - Ready for implementation

---

## Test Flow

### Standard Test Flow
```
1. Login to Brivo (main application)
   ↓
2. Navigate to Sub-Application (App1-7)
   ↓
3. Login to Sub-Application
   ↓
4. Perform test actions
   ↓
5. Verify results
   ↓
6. Logout
```

### Eagle Eye Networks (App1) Example
```typescript
test('should access Eagle Eye Networks from Brivo', async ({
  brivoLoginPage,
  brivoDashboardPage,
  app1LoginPage,
  app1HomePage
}) => {
  // Step 1: Login to Brivo
  await brivoLoginPage.login();
  
  // Step 2: Navigate to Eagle Eye Networks
  await brivoDashboardPage.navigateToApp(1);
  
  // Step 3: Login to Eagle Eye Networks
  await app1LoginPage.login();
  
  // Step 4: Verify EEN dashboard loaded
  const isLoaded = await app1HomePage.isPageLoaded();
  expect(isLoaded).toBeTruthy();
  
  // Step 5: Verify cameras list visible
  const hasCameras = await app1HomePage.getCamerasList();
  expect(hasCameras).toBeTruthy();
});
```

## Adding New Applications

To configure App2-App7, follow the Eagle Eye Networks (App1) pattern:

### 1. Update Configuration
Edit `src/config/appX.config.ts`:
```typescript
this.appName = 'Your Application Name';
this.appUrl = `${this.baseUrl}/your-app`;
this.appLoginUrl = `${this.baseUrl}/your-app/login`;
```

### 2. Update Environment Variables
Edit `.env`:
```env
APPX_USERNAME=your_username
APPX_PASSWORD=your_password
```

### 3. Update Locators
Edit `src/pages/appX/locators/appX.locators.ts` with actual selectors

### 4. Create Page Objects
Create `AppXLoginPage.ts` and `AppXHomePage.ts` following App1 pattern

### 5. Create Tests
Create test files in `src/tests/appX/`

### 6. Update This Document
Add application details to this mapping

---

## Quick Reference

| App | Name | Config | Pages | Tests | Status |
|-----|------|--------|-------|-------|--------|
| **Brivo** | Brivo | `brivo.config.ts` | `pages/brivo/` | `tests/brivo/` | ✅ Complete |
| **App1** | Eagle Eye Networks | `app1.config.ts` | `pages/app1/` | `tests/app1/` | ✅ Complete |
| **App2** | TBD | `app2.config.ts` | `pages/app2/` | `tests/app2/` | ⏳ Placeholder |
| **App3** | TBD | `app3.config.ts` | `pages/app3/` | `tests/app3/` | ⏳ Placeholder |
| **App4** | TBD | `app4.config.ts` | `pages/app4/` | `tests/app4/` | ⏳ Placeholder |
| **App5** | TBD | `app5.config.ts` | `pages/app5/` | `tests/app5/` | ⏳ Placeholder |
| **App6** | TBD | `app6.config.ts` | `pages/app6/` | `tests/app6/` | ⏳ Placeholder |
| **App7** | TBD | `app7.config.ts` | `pages/app7/` | `tests/app7/` | ⏳ Placeholder |

---

**Last Updated:** 2026-08-30
**Version:** 2.1