// App6 Locators - Update these selectors based on actual App6 UI elements
export const App6Locators = {
  login: {
    usernameInput: { selector: '#app6-username', description: 'App6 username input' },
    passwordInput: { selector: '#app6-password', description: 'App6 password input' },
    loginButton: { selector: 'button[data-testid="app6-login"]', description: 'App6 login button' },
    errorMessage: { selector: '.app6-error-message', description: 'App6 error message' },
  },
  home: {
    homeContainer: { selector: '.app6-home-container', description: 'App6 home container' },
    welcomeText: { selector: '.app6-welcome-text', description: 'App6 welcome text' },
    navigationMenu: { selector: 'nav.app6-navigation', description: 'App6 navigation menu' },
    logoutButton: { selector: 'button[data-action="app6-logout"]', description: 'App6 logout button' },
  },
};