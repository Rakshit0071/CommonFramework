// @ts-check
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/test-outputs/**', '**/*.config.js'],
  },
  {
    rules: {
      // Locator/helper files intentionally take `any` from Playwright's
      // untyped API response shapes (BaseAPI.get/post/etc return Promise<any>).
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // Playwright's fixture signature is ({}, use) => ... when a fixture has
      // no dependencies - that's the documented idiom, not a mistake.
      'no-empty-pattern': 'off',
    },
  }
);
