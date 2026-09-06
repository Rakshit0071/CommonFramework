# Helper Classes Guide

## Overview

The framework provides two types of helper classes:
1. **Core Helpers** (`src/core/`) - Framework core utilities
2. **Utility Helpers** (`src/utils/`) - General utility functions

---

## Core Helper Classes (`src/core/`)

### 1. ActionHelper.ts
**Location:** `src/core/ActionHelper.ts`

**Purpose:** Provides common UI action methods for interacting with web elements

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `click()` | selector, options? | Click on an element |
| `doubleClick()` | selector | Double click on an element |
| `type()` | selector, text, options? | Type text with delay |
| `fill()` | selector, text | Fill text (faster than type) |
| `clear()` | selector | Clear input field |
| `selectByValue()` | selector, value | Select dropdown by value |
| `selectByLabel()` | selector, label | Select dropdown by label |
| `check()` | selector | Check checkbox/radio |
| `uncheck()` | selector | Uncheck checkbox |
| `getText()` | selector | Get element text content |
| `getAttribute()` | selector, attributeName | Get attribute value |
| `hover()` | selector | Hover over element |
| `pressKey()` | key | Press keyboard key |
| `uploadFile()` | selector, filePath | Upload file |
| `scrollToElement()` | selector | Scroll to element |
| `executeScript()` | script, args | Execute JavaScript |

**Usage Example:**
```typescript
import { ActionHelper } from '../core/ActionHelper';

const actionHelper = new ActionHelper(page);

// Click button
await actionHelper.click('#submit-button');

// Fill input
await actionHelper.fill('#username', 'user@example.com');

// Select dropdown
await actionHelper.selectByLabel('#country', 'United States');

// Get text
const message = await actionHelper.getText('.welcome-message');
```

---

### 2. WaitHelper.ts
**Location:** `src/core/WaitHelper.ts`

**Purpose:** Provides smart wait strategies for synchronization

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `waitForElementVisible()` | selector, timeout? | Wait for element to be visible |
| `waitForElementHidden()` | selector, timeout? | Wait for element to be hidden |
| `waitForElementAttached()` | selector, timeout? | Wait for element in DOM |
| `waitForNavigation()` | timeout? | Wait for page navigation |
| `waitForUrl()` | url, timeout? | Wait for specific URL |
| `waitForTimeout()` | milliseconds | Wait for fixed time |
| `waitForCondition()` | condition, timeout?, message? | Wait for custom condition |

**Usage Example:**
```typescript
import { WaitHelper } from '../core/WaitHelper';

const waitHelper = new WaitHelper(page);

// Wait for element to be visible
await waitHelper.waitForElementVisible('.dashboard', 30000);

// Wait for URL
await waitHelper.waitForUrl(/dashboard/, 10000);

// Wait for custom condition
await waitHelper.waitForCondition(
  async () => await page.locator('.data-loaded').isVisible(),
  30000,
  'Data not loaded'
);
```

---

### 3. AssertionHelper.ts
**Location:** `src/core/AssertionHelper.ts`

**Purpose:** Provides custom assertion methods for test verification

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `assertElementVisible()` | selector, message? | Assert element is visible |
| `assertElementHidden()` | selector | Assert element is hidden |
| `assertElementContainsText()` | selector, expectedText | Assert element contains text |
| `assertElementHasText()` | selector, expectedText | Assert element has exact text |
| `assertUrlContains()` | expectedUrl | Assert URL contains string |
| `assertUrlEquals()` | expectedUrl | Assert URL equals |
| `assertTitle()` | expectedTitle | Assert page title |
| `assertElementEnabled()` | selector | Assert element is enabled |
| `assertElementDisabled()` | selector | Assert element is disabled |
| `assertElementChecked()` | selector | Assert element is checked |
| `assertElementCount()` | selector, expectedCount | Assert element count |
| `assertElementHasAttribute()` | selector, attribute, value | Assert attribute value |

**Usage Example:**
```typescript
import { AssertionHelper } from '../core/AssertionHelper';

const assertionHelper = new AssertionHelper(page);

// Assert element is visible
await assertionHelper.assertElementVisible('.dashboard');

// Assert text content
await assertionHelper.assertElementContainsText('.welcome', 'Welcome');

// Assert URL
await assertionHelper.assertUrlContains('/dashboard');

// Assert element count
await assertionHelper.assertElementCount('.camera-item', 5);
```

---

### 4. Logger.ts
**Location:** `src/core/Logger.ts`

**Purpose:** Provides logging functionality using Winston

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `info()` | message, meta? | Log info message |
| `error()` | message, meta? | Log error message |
| `warn()` | message, meta? | Log warning message |
| `debug()` | message, meta? | Log debug message |

**Log Files:**
- `app/logfiles/combined.log` - All logs
- `app/logfiles/error.log` - Errors only

**Usage Example:**
```typescript
import { Logger } from '../core/Logger';

const logger = new Logger();

logger.info('Test started');
logger.warn('Warning: slow response');
logger.error('Login failed', { username: 'user@test.com' });
logger.debug('Debug info', { response: data });
```

---

### 5. BrowserManager.ts
**Location:** `src/core/BrowserManager.ts`

**Purpose:** Manages browser lifecycle (launch, context, pages)

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `launchBrowser()` | browserType?, options? | Launch browser |
| `createContext()` | options? | Create browser context |
| `createPage()` | | Create new page |
| `getCurrentPage()` | | Get current page |
| `closePage()` | | Close current page |
| `closeContext()` | | Close browser context |
| `closeBrowser()` | | Close browser |
| `cleanup()` | | Close all (page, context, browser) |

**Usage Example:**
```typescript
import { BrowserManager } from '../core/BrowserManager';

const browserManager = new BrowserManager();

// Launch browser
await browserManager.launchBrowser('chromium', { headless: true });

// Create context
await browserManager.createContext({ 
  viewport: { width: 1920, height: 1080 } 
});

// Create page
const page = await browserManager.createPage();

// Cleanup
await browserManager.cleanup();
```

---

## Utility Helper Classes (`src/utils/`)

### 6. DateHelper.ts
**Location:** `src/utils/DateHelper.ts`

**Purpose:** Date manipulation and formatting utilities

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `getCurrentDate()` | | Get current date (YYYY-MM-DD) |
| `getCurrentTimestamp()` | | Get current timestamp |
| `formatDate()` | date, format? | Format date to custom format |
| `addDays()` | date, days | Add days to date |
| `subtractDays()` | date, days | Subtract days from date |
| `getDifferenceInDays()` | date1, date2 | Get difference in days |
| `isToday()` | date | Check if date is today |
| `parseDate()` | dateString | Parse date string |

**Usage Example:**
```typescript
import { DateHelper } from '../utils/DateHelper';

// Get current date
const today = DateHelper.getCurrentDate(); // "2026-08-30"

// Format date
const formatted = DateHelper.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');

// Add days
const futureDate = DateHelper.addDays(new Date(), 7);

// Check if today
const isTodayDate = DateHelper.isToday(new Date());
```

---

### 7. StringHelper.ts
**Location:** `src/utils/StringHelper.ts`

**Purpose:** String manipulation and generation utilities

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `generateRandomString()` | length? | Generate random string |
| `generateRandomEmail()` | domain? | Generate random email |
| `capitalizeFirst()` | text | Capitalize first letter |
| `toTitleCase()` | text | Convert to title case |
| `truncate()` | text, maxLength, suffix? | Truncate string |
| `removeSpecialCharacters()` | text | Remove special characters |
| `slugify()` | text | Convert to slug format |
| `isEmail()` | text | Check if valid email |
| `maskData()` | text, visibleChars? | Mask sensitive data |
| `extractNumbers()` | text | Extract numbers from string |
| `countWords()` | text | Count words in text |

**Usage Example:**
```typescript
import { StringHelper } from '../utils/StringHelper';

// Generate random email
const email = StringHelper.generateRandomEmail('test.com');
// "aBcD1234@test.com"

// Generate random string
const randomStr = StringHelper.generateRandomString(10);

// Title case
const title = StringHelper.toTitleCase('hello world'); // "Hello World"

// Mask sensitive data
const masked = StringHelper.maskData('password123', 3); // "*********123"

// Validate email
const isValid = StringHelper.isEmail('user@test.com'); // true
```

---

### 8. FileHelper.ts
**Location:** `src/utils/FileHelper.ts`

**Purpose:** File I/O operations

**Methods:**

| Method | Parameters | Description |
|--------|-----------|-------------|
| `readJSON()` | filePath | Read JSON file |
| `writeJSON()` | filePath, data | Write JSON file |
| `fileExists()` | filePath | Check if file exists |
| `ensureDirectory()` | dirPath | Create directory if not exists |
| `deleteFile()` | filePath | Delete file |
| `readTextFile()` | filePath | Read text file |
| `writeTextFile()` | filePath, content | Write text file |
| `getFileExtension()` | filePath | Get file extension |
| `getFileName()` | filePath | Get file name |
| `listFiles()` | dirPath, extension? | List files in directory |
| `copyFile()` | source, destination | Copy file |

**Usage Example:**
```typescript
import { FileHelper } from '../utils/FileHelper';

// Read JSON
const users = FileHelper.readJSON('src/testdata/users.json');

// Write JSON
FileHelper.writeJSON('output.json', { result: 'success' });

// Check if file exists
const exists = FileHelper.fileExists('config.json');

// Read text file
const content = FileHelper.readTextFile('notes.txt');

// List files
const files = FileHelper.listFiles('src/testdata', '.json');
```

---

## How Helpers are Used in Framework

### In BasePage
```typescript
export abstract class BasePage {
  protected actionHelper: ActionHelper;
  protected waitHelper: WaitHelper;
  protected logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.actionHelper = new ActionHelper(page);
    this.waitHelper = new WaitHelper(page);
    this.logger = new Logger();
  }
}
```

### In Your Page Objects
```typescript
export class App1LoginPage extends BasePage {
  async login(username: string, password: string) {
    this.logger.info('Starting login');
    
    // Using ActionHelper
    await this.actionHelper.fill('#username', username);
    await this.actionHelper.fill('#password', password);
    await this.actionHelper.click('#login-button');
    
    // Using WaitHelper
    await this.waitHelper.waitForNavigation();
    
    this.logger.info('Login completed');
  }
}
```

### In Your Tests
```typescript
test('should perform actions', async ({ page }) => {
  const actionHelper = new ActionHelper(page);
  const assertionHelper = new AssertionHelper(page);
  
  await actionHelper.click('#submit');
  await assertionHelper.assertElementVisible('.success-message');
});
```

---

## Quick Reference

### Core Helpers Location
```
src/core/
├── ActionHelper.ts      # UI actions (click, type, fill, etc.)
├── WaitHelper.ts        # Wait strategies
├── AssertionHelper.ts   # Assertions
├── Logger.ts            # Logging
└── BrowserManager.ts    # Browser management
```

### Utility Helpers Location
```
src/utils/
├── DateHelper.ts        # Date operations
├── StringHelper.ts      # String operations
└── FileHelper.ts        # File I/O
```

### Import Examples
```typescript
// Core helpers
import { ActionHelper } from '../core/ActionHelper';
import { WaitHelper } from '../core/WaitHelper';
import { AssertionHelper } from '../core/AssertionHelper';
import { Logger } from '../core/Logger';
import { BrowserManager } from '../core/BrowserManager';

// Utility helpers
import { DateHelper } from '../utils/DateHelper';
import { StringHelper } from '../utils/StringHelper';
import { FileHelper } from '../utils/FileHelper';
```

---

**Last Updated:** 2026-08-30  
**Total Helper Classes:** 8  
**Core Helpers:** 5  
**Utility Helpers:** 3