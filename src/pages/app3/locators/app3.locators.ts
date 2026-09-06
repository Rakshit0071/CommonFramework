// App3 Locators - Update these selectors based on actual App3 UI elements
export const App3Locators = {
  login: {
    usernameInput: { selector: '#app3-username', description: 'App3 username input' },
    passwordInput: { selector: '#app3-password', description: 'App3 password input' },
    loginButton: { selector: 'button[data-testid="app3-login"]', description: 'App3 login button' },
    errorMessage: { selector: '.app3-error-message', description: 'App3 error message' },
  },
  home: {
    homeContainer: { selector: '.app3-home-container', description: 'App3 home container' },
    welcomeText: { selector: '.app3-welcome-text', description: 'App3 welcome text' },
    navigationMenu: { selector: 'nav.app3-navigation', description: 'App3 navigation menu' },
    logoutButton: { selector: 'button[data-action="app3-logout"]', description: 'App3 logout button' },
  },
};