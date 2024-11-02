import react from 'eslint-plugin-react';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
    'plugin:tailwindcss/recommended',
  ),
  {
    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      prettier,
      'unused-imports': unusedImports,
      'no-relative-import-paths': noRelativeImportPaths,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        project: './tsconfig.json',
        useJSXTextNode: true,
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'unused-imports/no-unused-imports': 'error',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'no-relative-import-paths/no-relative-import-paths': ['off', { allowSameFolder: true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],

          pathGroups: [
            {
              pattern: '@alias/**',
              group: 'parent',
              position: 'before',
            },
          ],

          alphabetize: {
            order: 'asc',
          },

          'newlines-between': 'always',
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
    },
  },
];
