import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'node',
    // Database tests share one PostgreSQL. The local `prisma dev` server (PGlite)
    // interleaves queries from concurrent connections, so test files run one
    // at a time; the suite is small enough that this costs little.
    fileParallelism: false,
    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
  },
});
