import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

// Next.js's own flat configs: React, React Hooks (including the React Compiler
// rules), jsx-a11y, import, @next/next and typescript-eslint's recommended
// rules. Prettier's config comes after them, so no rule fights the formatter.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Command-line scripts (the migration replay and the seed) report progress
    // on stdout.
    files: ['scripts/**', 'prisma/**'],
    rules: { 'no-console': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    'generated/**',
  ]),
]);
