import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import { configs as storybookConfigs } from 'eslint-plugin-storybook'
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
      'import/extensions': ['error', 'always'],
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'import/named': 'off',
    },
    settings: {
      'import/resolver': {
        node: true,
        exports: true,
      },
    },
  },
  eslintConfigPrettier,
  ...storybookConfigs['flat/recommended'],
]
