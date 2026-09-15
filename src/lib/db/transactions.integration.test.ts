// Runs against a real PostgreSQL with the migrations applied. Skipped unless
// TEST_DATABASE_URL is set, so `npm test` works without a database; CI sets it.
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  SearchParamsSchema,
  TransactionSchema,
} from '@/lib/schemas/transaction.schema';

vi.mock('./db', async () => {
  const { PrismaClient } = await import('../../../generated/client');
  const { PrismaPg } = await import('@prisma/adapter-pg');
  return {
    db: new PrismaClient({
      adapter: new PrismaPg({
        connectionString: process.env.TEST_DATABASE_URL,
      }),
    }),
  };
});

const { db } = await import('./db');
const { createTransaction, findTransactionById, findTransactionsByUserId } =
  await import('./transactions');

const userId = `test-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const newTransaction = (amount: number, transactionName = 'Item') =>
  TransactionSchema.parse({
    transactionName,
    transactionCategory: 'cafe',
    transactionType: 'Income',
    paymentMethod: 'Card',
    amount,
    createdAt: new Date(),
  });

describe.skipIf(!process.env.TEST_DATABASE_URL)(
  'transactions data layer',
  () => {
    beforeAll(async () => {
      await db.user.create({
        data: { id: userId, email: `${userId}@test.local` },
      });
    });

    afterAll(async () => {
      // Cascades to the user's transactions.
      await db.user.deleteMany({ where: { id: userId } });
      await db.$disconnect();
    });

    it('stores amounts as exact decimals', async () => {
      await createTransaction(userId, newTransaction(100.1));
      await createTransaction(userId, newTransaction(200.2));

      const { _sum } = await db.transaction.aggregate({
        where: { userId },
        _sum: { amount: true },
      });
      expect(_sum.amount?.toString()).toBe('300.3');
    });

    it('returns plain numbers that can cross into Client Components', async () => {
      const created = await createTransaction(
        userId,
        newTransaction(12.5, 'Coffee'),
      );
      expect(created.amount).toBe(12.5);

      const found = await findTransactionById(created.transactionId, userId);
      expect(typeof found?.amount).toBe('number');

      const { transactions } = await findTransactionsByUserId(
        userId,
        SearchParamsSchema.parse({ sort: 'amount' }),
      );
      expect(transactions.every((t) => typeof t.amount === 'number')).toBe(
        true,
      );
    });
  },
);
