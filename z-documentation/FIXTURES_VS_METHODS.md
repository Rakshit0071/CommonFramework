# Fixtures vs Methods - Understanding the Difference

## Quick Answer

**NO, fixtures are NOT methods!**

- **Methods** = Functions you **call manually**
- **Fixtures** = Dependencies that are **automatically injected**

---

## Visual Comparison

### Methods (Functions You Call)

```typescript
test('example', async ({ page }) => {
  // You CALL methods manually:
  await page.goto('https://example.com');     // ← Calling method
  await page.click('#button');                // ← Calling method
  await page.fill('#input', 'text');          // ← Calling method
  
  const loginPage = new LoginPage(page);      // ← Creating object
  await loginPage.login();                    // ← Calling method
});
```

**Methods:**
- You **call** them: `loginPage.login()`
- You **control** when they run
- You **create** the objects first

---

### Fixtures (Auto-Injected Dependencies)

```typescript
test('example', async ({ 
  page,           // ← Fixture (auto-created by Playwright)
  loginPage       // ← Fixture (auto-created by our framework)
}) => {
  // You DON'T create them - they're ALREADY THERE!
  // Just use them directly:
  await loginPage.login();  // ← loginPage already exists!
});
```

**Fixtures:**
- You **don't call** them
- They're **automatically created** before test
- They're **injected** into your test
- You just **use** them

---

## Detailed Example

### ❌ Using Methods (Manual Way)

```typescript
test('manual test', async ({ page }) => {
  // Step 1: CREATE objects manually
  const logger = new Logger();
  const brivoLoginPage = new BrivoLoginPage(page);
  const brivoDashboardPage = new BrivoDashboardPage(page);
  const app1LoginPage = new App1LoginPage(page);
  
  // Step 2: CALL methods on those objects
  logger.info('Starting test');           // ← CALLING method
  await brivoLoginPage.login();           // ← CALLING method
  await brivoDashboardPage.navigateToApp(1);  // ← CALLING method
  await app1LoginPage.login();            // ← CALLING method
  
  // Lots of manual setup! 😓
});
```

---

### ✅ Using Fixtures (Automatic Way)

```typescript
test('fixture test', async ({ 
  logger,              // ← FIXTURE (auto-created)
  brivoLoginPage,      // ← FIXTURE (auto-created)
  brivoDashboardPage,  // ← FIXTURE (auto-created)
  app1LoginPage        // ← FIXTURE (auto-created)
}) => {
  // Objects ALREADY EXIST! Just use them:
  logger.info('Starting test');           // ← CALLING method on fixture
  await brivoLoginPage.login();           // ← CALLING method on fixture
  await brivoDashboardPage.navigateToApp(1);  // ← CALLING method on fixture
  await app1LoginPage.login();            // ← CALLING method on fixture
  
  // Much cleaner! 🎉
});
```

---

## Key Differences

| Aspect | Methods | Fixtures |
|--------|---------|----------|
| **What are they?** | Functions you call | Objects auto-created for you |
| **Creation** | You create manually | Framework creates automatically |
| **Usage** | `object.method()` | Just receive them as parameters |
| **When created** | When YOU call `new Object()` | BEFORE test runs (automatic) |
| **When destroyed** | When YOU want | AFTER test runs (automatic) |
| **Example** | `page.click()` | `{ page }` in test params |

---

## Analogy: Restaurant

### Methods = Cooking
```typescript
// You are the chef - you DO the cooking (call methods)
const chef = new Chef();
chef.chopVegetables();    // ← You CALL this
chef.cookMeat();          // ← You CALL this
chef.serveDish();         // ← You CALL this
```

### Fixtures = Ready Ingredients
```typescript
// Restaurant GIVES you ready ingredients (fixtures)
test('cook dish', async ({ 
  vegetables,   // ← Already chopped! (fixture)
  meat,         // ← Already marinated! (fixture)
  plate         // ← Already clean! (fixture)
}) => {
  // You just USE them - no prep work!
  vegetables.addToPlate();
  meat.addToPlate();
  plate.serve();
});
```

---

## Complete Example

### Fixtures Contain Objects, Objects Have Methods

```typescript
// Fixture Definition (in customFixtures.ts)
export const test = base.extend<CustomFixtures>({
  brivoLoginPage: async ({ page }, use) => {
    //                    ← This is a FIXTURE
    const brivoLoginPage = new BrivoLoginPage(page);
    await use(brivoLoginPage);  // ← Inject fixture into test
  },
});

// Using Fixture in Test
test('example', async ({ 
  brivoLoginPage    // ← FIXTURE (the object)
}) => {
  // brivoLoginPage is the FIXTURE (object)
  // login() is a METHOD on that object
  
  await brivoLoginPage.login();
  //    ↑               ↑
  //  FIXTURE        METHOD
  //  (object)       (function)
});
```

---

## Breakdown: Fixture vs Method

```typescript
test('breakdown', async ({ 
  brivoLoginPage  // ← This is a FIXTURE
  //              // (an object that was auto-created)
}) => {
  
  await brivoLoginPage.login();
  //    ↑              ↑
  //    |              |
  //    |              └─ METHOD (function to call)
  //    |
  //    └─ FIXTURE (object provided to you)
  
  // More examples:
  await brivoLoginPage.enterUsername('user@test.com');
  //    ↑              ↑
  //    FIXTURE        METHOD
  
  await brivoLoginPage.clickLoginButton();
  //    ↑              ↑
  //    FIXTURE        METHOD
});
```

---

## Think of it This Way

### Fixtures = The Tools
```typescript
test('example', async ({ 
  hammer,    // ← FIXTURE: You RECEIVE the hammer
  saw,       // ← FIXTURE: You RECEIVE the saw
  drill      // ← FIXTURE: You RECEIVE the drill
}) => {
  // Tools are already in your hands!
  
  // Now you USE the tools (call their methods):
  hammer.hit();     // ← METHOD: Action on the tool
  saw.cut();        // ← METHOD: Action on the tool
  drill.bore();     // ← METHOD: Action on the tool
});
```

### Without Fixtures = You Get the Tools Yourself
```typescript
test('example', async () => {
  // You have to GET the tools first:
  const hammer = new Hammer();   // ← Manual creation
  const saw = new Saw();         // ← Manual creation
  const drill = new Drill();     // ← Manual creation
  
  // Then use them:
  hammer.hit();
  saw.cut();
  drill.bore();
});
```

---

## Real Framework Example

### The Fixture (Auto-Created Object)
```typescript
// In customFixtures.ts
brivoLoginPage: async ({ page }, use) => {
  const brivoLoginPage = new BrivoLoginPage(page);
  await use(brivoLoginPage);  
  // ↑ This OBJECT is the fixture
},
```

### The Methods (Functions on the Object)
```typescript
// In BrivoLoginPage.ts
export class BrivoLoginPage {
  async login() { ... }              // ← METHOD
  async enterUsername() { ... }      // ← METHOD
  async enterPassword() { ... }      // ← METHOD
  async clickLoginButton() { ... }   // ← METHOD
}
```

### Using Both Together
```typescript
test('example', async ({ 
  brivoLoginPage  // ← FIXTURE (the login page object)
}) => {
  // Call METHODS on the FIXTURE:
  await brivoLoginPage.login();           // ← METHOD call
  await brivoLoginPage.enterUsername();   // ← METHOD call
  await brivoLoginPage.clickLoginButton(); // ← METHOD call
});
```

---

## Summary Table

| Concept | What It Is | How You Get It | Example |
|---------|-----------|----------------|---------|
| **Fixture** | Pre-created object | Automatically injected | `{ brivoLoginPage }` |
| **Method** | Function on object | Call it on object | `brivoLoginPage.login()` |
| **Page Object** | Class with methods | Created by fixture or manually | `new BrivoLoginPage(page)` |
| **Helper** | Utility class | Created inside page object | `new ActionHelper(page)` |

---

## Final Comparison

### Fixtures
```typescript
test('test', async ({ 
  logger,          // ← FIXTURE (already created)
  brivoLoginPage   // ← FIXTURE (already created)
}) => {
  // These are GIVEN to you (dependency injection)
});
```

### Methods
```typescript
test('test', async ({ brivoLoginPage }) => {
  await brivoLoginPage.login();        // ← METHOD (you call it)
  await brivoLoginPage.enterUsername(); // ← METHOD (you call it)
  // These you CALL (function invocation)
});
```

---

## Key Takeaway

**Fixtures = The OBJECTS you receive**
**Methods = The FUNCTIONS you call on those objects**

```typescript
test('example', async ({ 
  myFixture     // ← FIXTURE: You RECEIVE this object
}) => {
  await myFixture.myMethod();
  //    ↑         ↑
  //    |         └─ METHOD: Function you CALL
  //    └─ FIXTURE: Object you RECEIVED
});
```

---

**Think: Fixtures are the NOUNS (objects), Methods are the VERBS (actions)!** 🎯

**Last Updated:** 2026-08-30