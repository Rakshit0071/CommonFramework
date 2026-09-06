// App5 Locators - Update these selectors based on actual App5 UI elements
export const App5Locators = {
  login: {
    usernameInput: { selector: '#app5-username', description: 'App5 username input' },
    passwordInput: { selector: '#app5-password', description: 'App5 password input' },
    loginButton: { selector: 'button[data-testid="app5-login"]', description: 'App5 login button' },
    errorMessage: { selector: '.app5-error-message', description: 'App5 error message' },
  },
  home: {
    homeContainer: { selector: '.app5-home-container', description: 'App5 home container' },
    welcomeText: { selector: '.app5-welcome-text', description: 'App5 welcome text' },
    navigationMenu: { selector: 'nav.app5-navigation', description: 'App5 navigation menu' },
    logoutButton: { selector: 'button[data-action="app5-logout"]', description: 'App5 logout button' },
  },
};