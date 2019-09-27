module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-use-before-define': 0
  },
  overrides: [
    {
      files: ['test/mocks/**/*.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': 0
      }
    }
  ],
};
