import eslint from '@eslint/js';
// @ts-ignore
import nextPlugin from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
// @ts-ignore
import importPlugin from 'eslint-plugin-import';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
// @ts-ignore
import tailwind from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  // @ts-ignore
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  ...tailwind.configs['flat/recommended'],
  {
    // 全体の設定
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
    ignores: ['./.next/*'],
  },
  {
    // eslint-plugin-react
    rules: { 'react/prop-types': 'off' },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    // eslint-plugin-react-hooks
    plugins: { 'react-hooks': reactHooksPlugin },
    rules: { ...reactHooksPlugin.configs.recommended.rules },
  },
  {
    // eslint-plugin-import
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [{ pattern: '@alias/**', group: 'parent', position: 'before' }],
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  {
    // eslint-plugin-no-relative-import-paths
    plugins: { 'no-relative-import-paths': noRelativeImportPaths },
    rules: {
      'no-relative-import-paths/no-relative-import-paths': ['off', { allowSameFolder: true }],
    },
  },
  {
    // eslint-plugin-unused-imports
    plugins: { 'unused-imports': unusedImports },
    rules: { 'unused-imports/no-unused-imports': 'error' },
  },
  {
    // @next/eslint-plugin-next
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-img-element': 'error',
    },
  },
  eslintConfigPrettier,
);
