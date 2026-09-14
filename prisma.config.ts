import { defineConfig, env } from '@prisma/config';

import 'dotenv/config';

export default defineConfig({
  datasource: {
    url: env('DATABASE_URL'),
    // Required by `prisma migrate diff --from-migrations`, which CI runs.
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
});
