// App7 Locators - Update these selectors based on actual App7 UI elements
export const App7Locators = {
  login: {
    usernameInput: { selector: '#app7-username', description: 'App7 username input' },
    passwordInput: { selector: '#app7-password', description: 'App7 password input' },
    loginButton: { selector: 'button[data-testid="app7-login"]', description: 'App7 login button' },
    errorMessage: { selector: '.app7-error-message', description: 'App7 error message' },
  },
  home: {
    homeContainer: { selector: '.app7-home-container', description: 'App7 home container' },
    welcomeText: { selector: '.app7-welcome-text', description: 'App7 welcome text' },
    navigationMenu: { selector: 'nav.app7-navigation', description: 'App7 navigation menu' },
    logoutButton: { selector: 'button[data-action="app7-logout"]', description: 'App7 logout button' },
  },
};