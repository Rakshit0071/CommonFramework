/**
 * Gmail Locators
 * Centralized locators for Gmail application.
 * Suffix convention (see LOCATOR_CONTRACT.md): _L static, _LT template, _SL scope container.
 */

export const GmailLocators = {
  // Login page
  emailInput_L: 'input[type="email"]',
  passwordInput_L: 'input[type="password"]',
  nextButton_L: '#identifierNext, #passwordNext',
  errorMessage_L: '[role="alert"]',
  loginForm_SL: 'form',

  // Inbox page
  composeButton_L: '//div[text()="Compose"]',
  googleAppsButton_L: 'a[aria-label="Google apps"]',
  searchBox_L: 'input[aria-label="Search mail"]',
  profileButton_L: 'a[aria-label*="Google Account"]',
  inboxLabel_L: '[data-tooltip="Inbox"]',

  // Navigation
  calendarLink_L: 'a[href*="calendar.google.com"]',
  driveLink_L: 'a[href*="drive.google.com"]',

  // Email list
  emailRow_SL: '[role="main"] tr',
  checkbox_L: '[role="checkbox"]',
};
