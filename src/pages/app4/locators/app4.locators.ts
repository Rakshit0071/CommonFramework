// App4 Locators - Update these selectors based on actual App4 UI elements
export const App4Locators = {
  login: {
    usernameInput: { selector: '#app4-username', description: 'App4 username input' },
    passwordInput: { selector: '#app4-password', description: 'App4 password input' },
    loginButton: { selector: 'button[data-testid="app4-login"]', description: 'App4 login button' },
    errorMessage: { selector: '.app4-error-message', description: 'App4 error message' },
  },
  home: {
    homeContainer: { selector: '.app4-home-container', description: 'App4 home container' },
    welcomeText: { selector: '.app4-welcome-text', description: 'App4 welcome text' },
    navigationMenu: { selector: 'nav.app4-navigation', description: 'App4 navigation menu' },
    logoutButton: { selector: 'button[data-action="app4-logout"]', description: 'App4 logout button' },
  },
};