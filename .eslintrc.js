module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "airbnb-base",
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'always-multiline',
      'enums': 'always-multiline',
      'tuples': 'always-multiline'
    }],
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error', { 'before': false, 'after': true }],
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error', {
      'before': true,
      'after': true,
      'overrides': {
        'return': { 'after': true },
        'throw': { 'after': true },
        'case': { 'after': true }
      }
    }],
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': 'error',
    'no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': true
    }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterOverload': true, 'exceptAfterSingleLine': true }
    ],

    'class-methods-use-this': 'off',
    'dot-notation': 'off',
    'function-paren-newline': ['error', 'multiline-arguments'],
    'import/extensions': 'off',
    'import/no-default-export': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'indent': ['error', 2],
    'new-cap': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-void': ['error', { 'allowAsStatement': true }],
    'padding-line-between-statements': [
      'error',
      { 'blankLine': 'always', 'prev': 'directive', 'next': '*' },
      { 'blankLine': 'any', 'prev': 'directive', 'next': 'directive' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'export' },
      { 'blankLine': 'always', 'prev': 'import', 'next': '*' },
      { 'blankLine': 'any', 'prev': 'import', 'next': 'import' },
      { 'blankLine': 'always', 'prev': '*', 'next': 'return' }
    ]
  }
};
