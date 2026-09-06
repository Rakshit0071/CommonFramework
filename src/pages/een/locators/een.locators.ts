// Eagle Eye Networks (EEN) Locators
export const App1Locators = {
  // Eagle Eye Networks Login Page Locators
  login: {
    usernameInput: {
      selector: '#een-username',
      description: 'Eagle Eye Networks username input field',
    },
    passwordInput: {
      selector: '#een-password',
      description: 'Eagle Eye Networks password input field',
    },
    loginButton: {
      selector: 'button[data-testid="een-login"]',
      description: 'Eagle Eye Networks login button',
    },
    errorMessage: {
      selector: '.een-error-message',
      description: 'Eagle Eye Networks login error message',
    },
    rememberMe: {
      selector: '#een-remember-me',
      description: 'Eagle Eye Networks remember me checkbox',
    },
  },

  // Eagle Eye Networks Dashboard/Home Locators
  home: {
    homeContainer: {
      selector: '.een-dashboard-container',
      description: 'Eagle Eye Networks dashboard container',
    },
    welcomeText: {
      selector: '.een-welcome-text',
      description: 'Eagle Eye Networks welcome text',
    },
    navigationMenu: {
      selector: 'nav.een-navigation',
      description: 'Eagle Eye Networks navigation menu',
    },
    logoutButton: {
      selector: 'button[data-action="een-logout"]',
      description: 'Eagle Eye Networks logout button',
    },
    camerasList: {
      selector: '.een-cameras-list',
      description: 'Eagle Eye Networks cameras list',
    },
    liveViewButton: {
      selector: 'button[data-action="live-view"]',
      description: 'Eagle Eye Networks live view button',
    },
  },

  // Eagle Eye Networks specific features
  cameras: {
    cameraGrid: {
      selector: '.een-camera-grid',
      description: 'Camera grid view',
    },
    videoPlayer: {
      selector: '.een-video-player',
      description: 'Video player container',
    },
    playbackControls: {
      selector: '.een-playback-controls',
      description: 'Video playback controls',
    },
  },

  // Common Locators
  common: {
    loadingSpinner: {
      selector: '.een-loading-spinner',
      description: 'Eagle Eye Networks loading spinner',
    },
    notificationToast: {
      selector: '.een-notification-toast',
      description: 'Eagle Eye Networks notification toast',
    },
    errorBanner: {
      selector: '.een-error-banner',
      description: 'Eagle Eye Networks error banner',
    },
  },
};