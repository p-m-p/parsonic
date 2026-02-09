import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import-x'
// TODO: Re-enable once eslint-plugin-storybook supports ESLint 10
// Currently disabled because it depends on @typescript-eslint/utils v8,
// which is not compatible with ESLint 10. The p-m-p/slider repo uses ESLint v9.
// import { configs as storybookConfigs } from 'eslint-plugin-storybook'
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
  // TODO: Re-enable once eslint-plugin-storybook supports ESLint 10
  // ...storybookConfigs['flat/recommended'],
]
