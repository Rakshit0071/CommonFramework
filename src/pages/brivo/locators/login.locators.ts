export const BrivoLoginLocators = {
  usernameInput: {
    selector: '#username',
    description: 'Brivo username input field',
  },
  passwordInput: {
    selector: '#password',
    description: 'Brivo password input field',
  },
  loginButton: {
    selector: 'button[type="submit"]',
    description: 'Brivo login submit button',
  },
  rememberMeCheckbox: {
    selector: '#rememberMe',
    description: 'Remember me checkbox',
  },
  forgotPasswordLink: {
    selector: 'a[href*="forgot-password"]',
    description: 'Forgot password link',
  },
  errorMessage: {
    selector: '.error-message',
    description: 'Login error message',
  },
  loginForm: {
    selector: 'form#loginForm',
    description: 'Login form container',
  },
};