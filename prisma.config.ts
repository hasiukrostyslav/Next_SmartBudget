import { defineConfig, env } from '@prisma/config';

import 'dotenv/config';

export default defineConfig({
  migrations: {
    // Sample data for local development; see prisma/seed.mjs.
    seed: 'node prisma/seed.mjs',
  },
  datasource: {
    url: env('DATABASE_URL'),
    // Required by `prisma migrate diff --from-migrations`, which CI runs.
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
