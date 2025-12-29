import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import betterTailwindcss from 'eslint-plugin-better-tailwindcss';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  // @ts-ignore
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  storybook.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
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
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
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
          alphabetize: { order: 'asc' },
          'newlines-between': 'always',
        },
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
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
    },
  },
  eslintConfigPrettier,
  {
    plugins: {
      'better-tailwindcss': betterTailwindcss,
    },
    rules: {
      ...betterTailwindcss.configs['recommended-warn']?.rules,
      ...betterTailwindcss.configs['recommended-error']?.rules,

      // or configure rules individually
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'styles/global.css',
      },
    },
  },
);
