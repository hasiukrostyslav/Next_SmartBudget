// Replays prisma/migrations, in order, into a fresh in-process PostgreSQL
// (PGlite) and exits non-zero on the first failure.
//
// `prisma migrate status` only compares the _prisma_migrations table with the
// folder; it never applies anything, so it cannot tell whether the history
// still builds a working database. This does, without a database server.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { PGlite } from '@electric-sql/pglite';

const dir = join(import.meta.dirname, '..', 'prisma', 'migrations');
const migrations = readdirSync(dir)
  .filter((name) => /^\d{14}_/.test(name))
  .sort();

const db = new PGlite();

for (const name of migrations) {
  const sql = readFileSync(join(dir, name, 'migration.sql'), 'utf8');
  try {
    await db.exec(sql);
    console.log(`  ok    ${name}`);
  } catch (error) {
    console.error(`  FAIL  ${name}\n        ${error.message}`);
    process.exit(1);
  }
}

console.log(`\n${migrations.length} migrations applied to a fresh database.`);
