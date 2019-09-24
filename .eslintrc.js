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
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/camelcase': [
      2,
      {
        allow: ['per_page', 'allow_merge_commit', 'ssh_url', 'clone_url', 'team_id', 'archive_format'],
      },
    ],
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
