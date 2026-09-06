// App2 Locators - Update these selectors based on actual App2 UI elements
export const App2Locators = {
  login: {
    usernameInput: { selector: '#app2-username', description: 'App2 username input' },
    passwordInput: { selector: '#app2-password', description: 'App2 password input' },
    loginButton: { selector: 'button[data-testid="app2-login"]', description: 'App2 login button' },
    errorMessage: { selector: '.app2-error-message', description: 'App2 error message' },
  },
  home: {
    homeContainer: { selector: '.app2-home-container', description: 'App2 home container' },
    welcomeText: { selector: '.app2-welcome-text', description: 'App2 welcome text' },
    navigationMenu: { selector: 'nav.app2-navigation', description: 'App2 navigation menu' },
    logoutButton: { selector: 'button[data-action="app2-logout"]', description: 'App2 logout button' },
  },
};