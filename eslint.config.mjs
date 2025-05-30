// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'packages/*/*.js',
      '!packages/create-component',
      '!packages/esbuild-plugin',
      '.wireit',
    ],
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
  },
  eslintConfigPrettier,
  ...storybook.configs['flat/recommended'],
]
