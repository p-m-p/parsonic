import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import-x'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['.wireit'],
  },
  pluginJs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'import-x/extensions': ['error', 'always'],
      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'import-x/named': 'off',
    },
    settings: {
      'import-x/resolver': {
        node: true,
        exports: true,
      },
    },
  },
  eslintConfigPrettier,
  // Storybook-specific configuration
  ...storybook.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.stories.js'],
  })),
]
