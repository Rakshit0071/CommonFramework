/**
 * Gmail Locators
 * Centralized locators for Gmail application
 */

export const GmailLoginLocators = {
  // Login page
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  nextButton: '#identifierNext, #passwordNext',
  errorMessage: '[role="alert"]',
  loginForm: 'form'
};

export const GmailInboxLocators = {
  // Inbox page
  composeButton: '//div[text()="Compose"]',
  googleAppsButton: 'a[aria-label="Google apps"]',
  searchBox: 'input[aria-label="Search mail"]',
  profileButton: 'a[aria-label*="Google Account"]',
  inboxLabel: '[data-tooltip="Inbox"]',

  // Navigation
  calendarLink: 'a[href*="calendar.google.com"]',
  driveLink: 'a[href*="drive.google.com"]',

  // Email list
  emailRow: '[role="main"] tr',
  checkbox: '[role="checkbox"]'
};
