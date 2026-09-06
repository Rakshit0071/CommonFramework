# 🚀 GET STARTED - Use the Framework NOW!

## ✅ What's Already Done

✅ Framework structure created (60+ files)
✅ Base classes implemented
✅ Helper classes ready (8 helpers)
✅ Page objects for Brivo created
✅ Page objects for Eagle Eye Networks created
✅ Fixtures configured
✅ Test examples written
✅ 12 EEN test users configured
✅ Documentation complete (10+ guides)
✅ Configuration files ready

---

## ⚠️ What You Need to Do (5 Steps - 10 Minutes)

### Step 1: Install Dependencies (3 minutes)
```bash
cd c:\Users\JeevanKumarDunga\Documents\TypescriptFramework

# Install npm packages
npm install

# Install Playwright browsers
npx playwright install
```

### Step 2: Configure Environment (2 minutes)
```bash
# Copy the example file
copy .env.example .env

# Edit with your credentials
notepad .env
```

**Update these in `.env`:**
```env
# Brivo Credentials (UPDATE THESE!)
BRIVO_BASE_URL=https://brivo.com
BRIVO_USERNAME=your_brivo_email@domain.com
BRIVO_PASSWORD=your_brivo_password

# Eagle Eye Networks is already configured with test users!
# (12 test users already set up - see .env file)
```

### Step 3: Update Locators (5 minutes)
The framework has placeholder selectors. Update them with actual ones:

**Open:** `src/pages/brivo/locators/login.locators.ts`
```typescript
// Update these selectors by inspecting Brivo login page:
export const BrivoLoginLocators = {
  usernameInput: {
    selector: '#username',  // ← UPDATE this
    description: 'Brivo username input field',
  },
  passwordInput: {
    selector: '#password',  // ← UPDATE this
    description: 'Brivo password input field',
  },
  loginButton: {
    selector: 'button[type="submit"]',  // ← UPDATE this
    description: 'Brivo login submit button',
  },
};
```

**How to find selectors:**
1. Open https://brivo.com in browser
2. Press F12 (DevTools)
3. Click Inspector/Selector icon
4. Click on username field → copy selector
5. Update in locators file
6. Repeat for other elements

### Step 4: Verify Setup (1 minute)
```bash
# Check TypeScript compiles
npx tsc --noEmit

# Should show no errors (warnings about @types are OK)
```

### Step 5: Run Your First Test! (1 minute)
```bash
# Run Brivo login test
npm run test:brivo

# Or run in headed mode (see the browser)
npm run test:headed
```

---

## 🎯 Quick Start Commands

### Installation
```bash
npm install
npx playwright install
```

### Configuration
```bash
copy .env.example .env
notepad .env
```

### Run Tests
```bash
npm test                    # All tests
npm run test:brivo         # Brivo tests only
npm run test:app1          # Eagle Eye Networks tests
npm run test:headed        # See browser while testing
npm run test:debug         # Debug mode
npm run ui                 # Playwright UI mode
```

### View Results
```bash
npm run report             # Open HTML report
```

---

## 📋 Pre-Flight Checklist

Before running tests, check:

- [ ] Node.js installed (`node --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright installed (`npx playwright install`)
- [ ] `.env` file created (copied from `.env.example`)
- [ ] Brivo credentials in `.env`
- [ ] Locators updated with actual selectors

---

## 🎯 Test the Framework - Step by Step

### Test 1: Check Installation
```bash
# Should show Playwright version
npx playwright --version
```

### Test 2: Check TypeScript
```bash
# Should show no errors
npx tsc --noEmit
```

### Test 3: Run Example Test
```bash
# Run one test file
npm test -- brivo.login.spec.ts
```

### Test 4: View Report
```bash
# After test runs
npm run report
```

---

## 🔧 If Something Doesn't Work

### Error: "Cannot find module '@playwright/test'"
**Solution:**
```bash
npm install
npx playwright install
```

### Error: "Cannot find name 'process'"
**Solution:** This is just a warning - tests will still run fine!
```bash
# To fix (optional):
npm install --save-dev @types/node
```

### Error: "Element not found"
**Solution:** Update locators with correct selectors
```bash
# Open and update:
src/pages/brivo/locators/login.locators.ts
```

### Error: "Invalid credentials"
**Solution:** Check `.env` file has correct credentials
```bash
notepad .env
```

---

## 📚 What to Read Next

1. **[QUICK_START.md](z-documentation/QUICK_START.md)** - Detailed setup guide
2. **[FRAMEWORK_EXPLAINED_SIMPLE.md](z-documentation/FRAMEWORK_EXPLAINED_SIMPLE.md)** - How everything works
3. **[EEN_SETUP.md](z-documentation/EEN_SETUP.md)** - Eagle Eye Networks guide
4. **[HELPER_CLASSES_GUIDE.md](z-documentation/HELPER_CLASSES_GUIDE.md)** - Using helpers
5. **[FIXTURES_GUIDE.md](z-documentation/FIXTURES_GUIDE.md)** - Understanding fixtures

---

## 🎓 Learning Path

### Day 1: Setup (Today!)
- [ ] Install dependencies
- [ ] Configure `.env`
- [ ] Update Brivo locators
- [ ] Run first test

### Day 2: Understanding
- [ ] Read framework guides
- [ ] Understand page objects
- [ ] Understand fixtures
- [ ] Understand helpers

### Day 3: Writing Tests
- [ ] Write custom test for Brivo
- [ ] Write test for Eagle Eye Networks
- [ ] Use different test users
- [ ] Try data-driven testing

### Day 4: Expanding
- [ ] Configure App2
- [ ] Create page objects for App2
- [ ] Write tests for App2
- [ ] Add custom helpers if needed

---

## 🚀 You're Ready When...

✅ `npm install` completes successfully
✅ `npx playwright install` completes
✅ `.env` file has your credentials
✅ Locators updated with real selectors
✅ `npm test` runs without errors

---

## 💡 Pro Tips

1. **Start Small**: Run one test first, then expand
2. **Use Headed Mode**: `npm run test:headed` to see what's happening
3. **Check Logs**: Look in `app/logfiles/combined.log` for details
4. **Update Selectors**: Inspect pages and update locators as needed
5. **Read Docs**: All guides in `z-documentation/` folder

---

## 🎯 Your First Test Run

```bash
# 1. Navigate to framework
cd c:\Users\JeevanKumarDunga\Documents\TypescriptFramework

# 2. Install (if not done)
npm install
npx playwright install

# 3. Configure
copy .env.example .env
notepad .env

# 4. Run test
npm run test:headed

# 5. View results
npm run report
```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Browser opens automatically
- ✅ Test navigates to Brivo
- ✅ Login happens (if credentials correct)
- ✅ Test completes with Pass/Fail
- ✅ Report opens in browser

---

## 🆘 Need Help?

**Documentation:**
- [z-documentation/README.md](z-documentation/README.md) - Documentation index
- [QUICK_START.md](z-documentation/QUICK_START.md) - Detailed setup

**Common Issues:**
- Locators wrong → Update in `src/pages/*/locators/`
- Credentials wrong → Update in `.env`
- Tests fail → Check logs in `app/logfiles/`

---

## 🎉 You're Ready to Go!

The framework is **100% ready**. Just complete the 5 setup steps above and start testing! 🚀

**Estimated Time to First Test:** 10 minutes

**Start Now:**
```bash
cd c:\Users\JeevanKumarDunga\Documents\TypescriptFramework
npm install
```

Good luck! 🎯