# Eagle Eye Networks Test Users Guide

## Overview

This document describes all Eagle Eye Networks test users available in the framework.

## Test Users File

**Location:** `src/testdata/een-users.json`

This file contains all EEN test users organized by role and purpose.

## Authentication

### API Client Secret
```
AUTO_TEST_CLIENT_SECRET=QVVUTy1URVNUOkJ4IzlLNG1hRiF3bXdfJEhOUUxL
```

## Test Users

### 1. Default End User
**Email:** `een.web3.auto+empty@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** End User  
**Purpose:** General testing, default login tests

**Usage:**
```typescript
const defaultUser = eenUsers.users.defaultEndUser;
await app1LoginPage.login({
  username: defaultUser.email,
  password: defaultUser.password
});
```

---

### 2. Admin User (TS01)
**Email:** `een.web3.auto+ts01@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** Admin  
**Purpose:** Admin functionality testing

**Usage:**
```typescript
const adminUser = eenUsers.users.ts01Admin;
await app1LoginPage.login({
  username: adminUser.email,
  password: adminUser.password
});
```

---

### 3. CRUD Test Users

#### CRUD User 1
**Email:** `een.web3.auto+crud1@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Purpose:** CRUD operations testing

#### CRUD User 2
**Email:** `een.web3.auto+crud2@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Purpose:** CRUD operations testing

#### CRUD User 3
**Email:** `een.web3.auto+crud3@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Purpose:** CRUD operations testing

#### ULTL User
**Email:** `een.web3.auto+crudultl@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Purpose:** CRUD/ULTL testing

**Usage:**
```typescript
// Get all CRUD users
const crudUserKeys = eenUsers.userGroups.crudUsers;
const crudUser = eenUsers.users[crudUserKeys[0]];
```

---

### 4. Branding Test Users

#### Branding Reseller
**Email:** `een.web3.auto+branding@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** Reseller  
**Purpose:** Branding feature testing (reseller perspective)

#### Branding End User
**Email:** `een.web3.auto+enduserbranding@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** End User  
**Purpose:** Branding feature testing (end user perspective)

**Usage:**
```typescript
const brandingUsers = eenUsers.userGroups.brandingUsers;
const resellerUser = eenUsers.users.brandingReseller;
```

---

### 5. Static Test Users

#### Static Non-Admin Default
**Email:** `een.web3.auto+static_nonadmindefault@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** Non-Admin  
**Purpose:** Static non-admin testing

#### Static End User
**Email:** `een.web3.auto+static@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** End User  
**Purpose:** Regression testing

---

### 6. Swap Test User
**Email:** `een.web3.auto+swap@gmail.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** End User  
**Purpose:** Device swap testing scenarios

---

### 7. General Test User
**Email:** `lszczepaniuk+web2endusercrudultl@een.com`  
**Password:** `7zBJrbnSCQNDuwG`  
**Role:** End User  
**Purpose:** General testing

---

## User Groups

The `een-users.json` file organizes users into groups:

### All End Users
```json
"allEndUsers": [
  "defaultEndUser",
  "swapEndUser",
  "ultlEndUser",
  "brandingEndUser",
  "staticEndUser",
  "crud1EndUser",
  "crud2EndUser",
  "crud3EndUser",
  "testUser"
]
```

### CRUD Users
```json
"crudUsers": [
  "crud1EndUser",
  "crud2EndUser",
  "crud3EndUser",
  "ultlEndUser"
]
```

### Branding Users
```json
"brandingUsers": [
  "brandingReseller",
  "brandingEndUser"
]
```

### Admin Users
```json
"adminUsers": [
  "ts01Admin"
]
```

### Static Users
```json
"staticUsers": [
  "staticNonAdminDefault",
  "staticEndUser"
]
```

## Test Scenarios

### Scenario Mapping
```json
"testScenarios": {
  "login": "defaultEndUser",
  "crud": "crudUsers",
  "branding": "brandingUsers",
  "swap": "swapEndUser",
  "admin": "ts01Admin",
  "regression": "staticEndUser"
}
```

## Usage Examples

### Example 1: Login with Default User
```typescript
import { FileHelper } from '../../utils/FileHelper';

const eenUsers = FileHelper.readJSON('src/testdata/een-users.json');
const user = eenUsers.users.defaultEndUser;

await app1LoginPage.login({
  username: user.email,
  password: user.password
});
```

### Example 2: Data-Driven Testing with All End Users
```typescript
const endUserKeys = eenUsers.userGroups.allEndUsers;

endUserKeys.forEach((userKey) => {
  const user = eenUsers.users[userKey];
  
  test(`should login as ${user.description}`, async () => {
    await app1LoginPage.login({
      username: user.email,
      password: user.password
    });
    
    expect(await app1HomePage.isUserLoggedIn()).toBeTruthy();
  });
});
```

### Example 3: Test CRUD Operations with CRUD Users
```typescript
const crudUserKeys = eenUsers.userGroups.crudUsers;

for (const userKey of crudUserKeys) {
  const user = eenUsers.users[userKey];
  
  test(`CRUD operations with ${user.email}`, async () => {
    await app1LoginPage.login({
      username: user.email,
      password: user.password
    });
    
    // Perform CRUD operations
    // ...
  });
}
```

### Example 4: Branding Tests
```typescript
test('should test branding features', async () => {
  // Test as reseller
  const reseller = eenUsers.users.brandingReseller;
  await app1LoginPage.login({
    username: reseller.email,
    password: reseller.password
  });
  
  // Verify branding settings
  // ...
  
  await app1HomePage.logout();
  
  // Test as end user
  const endUser = eenUsers.users.brandingEndUser;
  await app1LoginPage.login({
    username: endUser.email,
    password: endUser.password
  });
  
  // Verify branding display
  // ...
});
```

## Running Tests

### Run tests with specific users:
```bash
# Run all EEN user tests
npm test -- een.users.spec.ts

# Run specific user test
npm test -- een.users.spec.ts -g "default end user"

# Run CRUD user tests
npm test -- een.users.spec.ts -g "CRUD"

# Run branding tests
npm test -- een.users.spec.ts -g "branding"
```

## Adding New Test Users

To add new EEN test users:

1. **Update `.env` file:**
   ```env
   NEW_USER_LOGIN=email@example.com
   NEW_USER_PASSWORD=password123
   ```

2. **Add to `een-users.json`:**
   ```json
   "newUser": {
     "email": "email@example.com",
     "password": "password123",
     "role": "end_user",
     "description": "Description of user purpose"
   }
   ```

3. **Add to appropriate user group:**
   ```json
   "userGroups": {
     "allEndUsers": [
       "defaultEndUser",
       "newUser"  // Add here
     ]
   }
   ```

4. **Use in tests:**
   ```typescript
   const newUser = eenUsers.users.newUser;
   await app1LoginPage.login({
     username: newUser.email,
     password: newUser.password
   });
   ```

## Security Note

⚠️ **Important:** The test users and passwords in this framework are for TEST ENVIRONMENTS ONLY. Never use these credentials in production.

---

**Environment:** Test/Staging Only  
**Last Updated:** 2026-08-30  
**Total Test Users:** 12