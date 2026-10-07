/**
 * Calendar Page Locators
 *
 * Contains all locators for Google Calendar.
 * Suffix convention (see LOCATOR_CONTRACT.md): _L static, _LT template, _SL scope container.
 */

export const CalendarLocators = {
  // Main view
  calendarGrid_SL: '[role="main"]',
  createButton_L: 'button[aria-label*="Create"]',
  searchBox_L: 'input[aria-label*="Search"]',

  // Navigation
  todayButton_L: 'button[aria-label*="Today"]',
  nextButton_L: 'button[aria-label*="Next"]',
  previousButton_L: 'button[aria-label*="Previous"]',
};
