# TypeScript Playwright Test Automation Framework

**Professional test automation framework using TypeScript + Playwright with Gmail/Google Services as demonstration**

---

## 🎯 Quick Overview

This framework demonstrates a **scalable, maintainable test automation architecture** using:
- **Main Application:** Gmail (login portal)
- **Sub-Applications:** Calendar, Sheets, Docs, Drive, Slides, Chat
- **Pattern:** Page Object Model (POM)
- **Authentication:** StorageState (no repeated logins)

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
npx playwright install
```

### 2. Setup Authentication (One Time)
```bash
npm run auth:setup
```
- Browser opens
- Login to Gmail
- Auth saved automatically

### 3. Run Tests
```bash
# Run all tests
npm test

# Run specific app
npm run test:gmail
npm run test:calendar
npm run test:sheets
```

### 4. View Results
```bash
# View beautiful Allure report
npm run test:allure          # Run tests + generate + open report

# Or step-by-step:
npm run allure:generate      # Generate report
npm run allure:open          # Open at http://localhost:45678

# Check logs
cat test-outputs/logs/combined.log
```

---

## 📁 Framework Structure

```
TypescriptFramework/
├── src/
│   ├── tests/          # Test files (Gmail, Calendar, etc.)
│   ├── pages/          # Page Objects (POM)
│   ├── core/           # Helper classes
│   ├── fixtures/       # Playwright fixtures
│   ├── config/         # Configuration files
│   └── utils/          # Utility functions
│
├── test-outputs/       # Test results
│   ├── reports/        # HTML & JSON reports
│   ├── screenshots/    # Screenshots
│   ├── videos/         # Test videos
│   ├── logs/           # Execution logs
│   └── traces/         # Debug traces
│
├── .auth/              # Authentication state
└── z-documents/FRAMEWORK_DOCUMENTATION.md  # Complete guide
```

---

## 🧪 Available Tests

| Application | Command | Test File |
|-------------|---------|-----------|
| Gmail | `npm run test:gmail` | gmail.spec.ts |
| Calendar | `npm run test:calendar` | calendar.spec.ts |
| Sheets | `npm run test:sheets` | sheets.spec.ts |
| Docs | `npm run test:docs` | docs.spec.ts |
| Drive | `npm run test:drive` | drive.spec.ts |
| Slides | `npm run test:slides` | slides.spec.ts |
| Chat | `npm run test:chat` | chat.spec.ts |

---

## 🎯 Key Features

✅ **Page Object Model** - Clean separation of test logic and page elements  
✅ **StorageState Auth** - 10x faster (no login UI)  
✅ **Auto-Injection** - Fixtures provide ready-to-use objects  
✅ **Complete Logging** - Track every step  
✅ **Screenshot Capture** - Auto-capture on failure  
✅ **Type Safety** - Full TypeScript support  
✅ **Scalable Structure** - Easy to add new apps/tests  

---

## 📖 Documentation

**Complete Framework Documentation:** [z-documents/FRAMEWORK_DOCUMENTATION.md](z-documents/FRAMEWORK_DOCUMENTATION.md)

Covers:
- Framework architecture
- How it works
- How to adapt for Brivo
- Complete structure guide
- Design patterns used
- Best practices

---

## 🚀 Test Commands

```bash
# Authentication
npm run auth:setup          # Setup Gmail auth (one time)

# Run Tests
npm test                    # All tests
npm run test:headed         # With browser visible
npm run test:debug          # Debug mode
npm run ui                  # Playwright UI mode

# Reports
npm run report              # View HTML report
```

---

## 🎨 Framework Pattern

**Main App + Sub-Apps Pattern**

```
Gmail (Main - Login Portal)
   ↓ After login, access:
   ├── Calendar
   ├── Sheets
   ├── Docs
   ├── Drive
   ├── Slides
   └── Chat
```

**Mirrors Real-World Structure:**
```
Brivo (Main - Access Control Portal)
   ↓ After login, access:
   ├── EEN (Eagle Eye Networks)
   ├── App 2
   ├── App 3
   └── ...
```

---

## 🔄 Adapting for Your Project

This framework uses **Gmail/Google** as a demonstration.

To adapt for **Brivo** or any other application:
1. Replace `gmail` with your main app name
2. Update sub-app folders (calendar → een, sheets → app2, etc.)
3. Update page objects with your app's locators
4. Update config files with your URLs
5. Keep the same structure!

**See:** [z-documents/FRAMEWORK_DOCUMENTATION.md](z-documents/FRAMEWORK_DOCUMENTATION.md) for detailed migration guide

---

## 📊 Test Results Location

```
test-outputs/
├── reports/index.html          # ← Open in browser
├── screenshots/                # Test screenshots
├── videos/                     # Test recordings
├── logs/combined.log           # Complete logs
└── traces/                     # Debug traces
```

---

## 🛠️ Tech Stack

- **Playwright** - Browser automation
- **TypeScript** - Type safety
- **Node.js** - Runtime
- **Winston** - Logging
- **Page Object Model** - Design pattern
- **Fixtures** - Dependency injection

---

## 📧 Author

**Jeevan Kumar**  
Email: jeevan.g@een.com

---

## 📄 License

ISC

---

**🎉 Ready to start testing!**

**See [z-documents/FRAMEWORK_DOCUMENTATION.md](z-documents/FRAMEWORK_DOCUMENTATION.md) for complete guide.**
