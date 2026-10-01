/**
 * Eagle Eye Networks (EEN) Locators
 * Suffix convention (see LOCATOR_CONTRACT.md): _L static, _LT template, _SL scope container.
 */
export const EENLocators = {
  // Login page
  login: {
    usernameInput_L: {
      selector: '#een-username',
      description: 'Eagle Eye Networks username input field',
    },
    passwordInput_L: {
      selector: '#een-password',
      description: 'Eagle Eye Networks password input field',
    },
    loginButton_L: {
      selector: 'button[data-testid="een-login"]',
      description: 'Eagle Eye Networks login button',
    },
    errorMessage_L: {
      selector: '.een-error-message',
      description: 'Eagle Eye Networks login error message',
    },
    rememberMe_L: {
      selector: '#een-remember-me',
      description: 'Eagle Eye Networks remember me checkbox',
    },
  },

  // Dashboard/Home
  home: {
    homeContainer_SL: {
      selector: '.een-dashboard-container',
      description: 'Eagle Eye Networks dashboard container',
    },
    welcomeText_L: {
      selector: '.een-welcome-text',
      description: 'Eagle Eye Networks welcome text',
    },
    navigationMenu_SL: {
      selector: 'nav.een-navigation',
      description: 'Eagle Eye Networks navigation menu',
    },
    logoutButton_L: {
      selector: 'button[data-action="een-logout"]',
      description: 'Eagle Eye Networks logout button',
    },
    camerasList_SL: {
      selector: '.een-cameras-list',
      description: 'Eagle Eye Networks cameras list',
    },
    liveViewButton_L: {
      selector: 'button[data-action="live-view"]',
      description: 'Eagle Eye Networks live view button',
    },
  },

  // Camera features
  cameras: {
    cameraGrid_SL: {
      selector: '.een-camera-grid',
      description: 'Camera grid view',
    },
    videoPlayer_SL: {
      selector: '.een-video-player',
      description: 'Video player container',
    },
    playbackControls_SL: {
      selector: '.een-playback-controls',
      description: 'Video playback controls',
    },
  },

  // Common
  common: {
    loadingSpinner_L: {
      selector: '.een-loading-spinner',
      description: 'Eagle Eye Networks loading spinner',
    },
    notificationToast_L: {
      selector: '.een-notification-toast',
      description: 'Eagle Eye Networks notification toast',
    },
    errorBanner_L: {
      selector: '.een-error-banner',
      description: 'Eagle Eye Networks error banner',
    },
  },
};
