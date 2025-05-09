// @ts-check

import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import stylistic from '@stylistic/eslint-plugin';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.strictTypeChecked,
  prettier,
  stylistic.configs.recommended,
  {
    rules: {
      'prettier/prettier': [
        'off',
        {
          singleQuote: true,
          semi: true,
        },
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'comma',
            requireLast: true,
          },
          singleline: {
            delimiter: 'comma',
            requireLast: true,
          },
          overrides: {
            interface: {
              multiline: {
                delimiter: 'semi',
                requireLast: true,
              },
            },
          },
        },
      ],
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
