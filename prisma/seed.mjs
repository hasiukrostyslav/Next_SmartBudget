// Adds one sample transaction per category to an existing account, for local
// development. Run with `npx prisma db seed`. SEED_USER_EMAIL names the
// account; the script never creates users or passwords.
import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

import prismaClient from '../generated/client/index.js';

const { PrismaClient, TransactionCategory } = prismaClient;

const INCOME_CATEGORIES = new Set([
  'income',
  'investments',
  'prize',
  'currency_exchange',
]);

const email = process.env.SEED_USER_EMAIL;
const url = process.env.DATABASE_URL;
if (!email || !url) {
  console.error('Set DATABASE_URL and SEED_USER_EMAIL (see .env.example).');
  process.exit(1);
}

// The same TLS rules as src/lib/db/db.ts.
const sslDisabled = /[?&]sslmode=disable(&|$)/.test(url);
const pool = new pg.Pool({
  connectionString: sslDisabled
    ? url
    : url.replace(/sslmode=(prefer|require|verify-ca)/, 'sslmode=verify-full'),
  ssl: sslDisabled ? false : { rejectUnauthorized: true },
});
const db = new PrismaClient({ adapter: new PrismaPg(pool) });

try {
  const user = await db.users.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
  });
  if (!user) throw new Error(`No account with the email ${email}.`);

  const { count } = await db.transactions.createMany({
    data: Object.values(TransactionCategory).map((category) => ({
      userId: user.id,
      transactionName: category
        .replace('_', ' ')
        .replace(/^./, (c) => c.toUpperCase()),
      transactionCategory: category,
      transactionType: INCOME_CATEGORIES.has(category) ? 'Income' : 'Expenses',
      paymentMethod: 'Card',
      currency: 'USD',
      amount: 100,
      status: 'COMPLETED',
    })),
  });
  console.log(`Added ${count} transactions to ${email}.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await db.$disconnect();
  await pool.end();
}
