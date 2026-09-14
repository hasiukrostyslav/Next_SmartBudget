// Ordering, paging, search and scoping of the transactions list, against a
// real PostgreSQL. Skipped unless TEST_DATABASE_URL is set.
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
const { createTransaction, findTransactionsByUserId } =
  await import('./transactions');

const run = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const userId = `query-${run}`;
const otherUserId = `query-other-${run}`;

const add = (
  owner: string,
  fields: {
    name: string;
    amount: number;
    type: 'Income' | 'Expenses';
    note?: string | null;
    day: number;
  },
) =>
  createTransaction(
    owner,
    TransactionSchema.parse({
      transactionName: fields.name,
      transactionCategory: 'cafe',
      transactionType: fields.type,
      paymentMethod: 'Card',
      amount: fields.amount,
      description: fields.note ?? null,
      createdAt: new Date(Date.UTC(2026, 0, fields.day)),
    }),
  );

const list = (query: Record<string, string>) =>
  findTransactionsByUserId(userId, SearchParamsSchema.parse(query));

const names = (result: { transactions: { transactionName: string }[] }) =>
  result.transactions.map((t) => t.transactionName);

describe.skipIf(!process.env.TEST_DATABASE_URL)(
  'findTransactionsByUserId',
  () => {
    beforeAll(async () => {
      await db.users.createMany({
        data: [
          { id: userId, email: `${userId}@test.local` },
          { id: otherUserId, email: `${otherUserId}@test.local` },
        ],
      });
      // Signed amounts: bravo +30, Alpha -5, charlie -100, Delta +10.
      await add(userId, {
        name: 'bravo',
        amount: 30,
        type: 'Income',
        note: 'b note',
        day: 1,
      });
      await add(userId, {
        name: 'Alpha',
        amount: 5,
        type: 'Expenses',
        note: null,
        day: 2,
      });
      await add(userId, {
        name: 'charlie',
        amount: 100,
        type: 'Expenses',
        note: 'A note',
        day: 3,
      });
      await add(userId, {
        name: 'Delta 50%',
        amount: 10,
        type: 'Income',
        note: null,
        day: 4,
      });
      await add(otherUserId, {
        name: 'Zulu',
        amount: 999,
        type: 'Income',
        day: 5,
      });
    });

    afterAll(async () => {
      await db.users.deleteMany({
        where: { id: { in: [userId, otherUserId] } },
      });
      await db.$disconnect();
    });

    it('defaults to newest first', async () => {
      expect(names(await list({}))).toEqual([
        'Delta 50%',
        'charlie',
        'Alpha',
        'bravo',
      ]);
    });

    it('sorts by signed amount, so expenses count as negative', async () => {
      expect(names(await list({ sort: 'amount', order: 'desc' }))).toEqual([
        'bravo',
        'Delta 50%',
        'Alpha',
        'charlie',
      ]);
      expect(names(await list({ sort: 'amount', order: 'asc' }))).toEqual([
        'charlie',
        'Alpha',
        'Delta 50%',
        'bravo',
      ]);
    });

    it('sorts names case-insensitively', async () => {
      expect(names(await list({ sort: 'name', order: 'asc' }))).toEqual([
        'Alpha',
        'bravo',
        'charlie',
        'Delta 50%',
      ]);
    });

    it('puts transactions without a note last in both directions', async () => {
      const asc = names(await list({ sort: 'note', order: 'asc' }));
      const desc = names(await list({ sort: 'note', order: 'desc' }));

      expect(asc.slice(0, 2)).toEqual(['charlie', 'bravo']);
      expect(desc.slice(0, 2)).toEqual(['bravo', 'charlie']);
      expect(asc.slice(2).sort()).toEqual(['Alpha', 'Delta 50%']);
      expect(desc.slice(2).sort()).toEqual(['Alpha', 'Delta 50%']);
    });

    it('pages through every row exactly once, with a matching count', async () => {
      const query = { sort: 'amount', order: 'desc', limit: '2' };
      const first = await list({ ...query, page: '1' });
      const second = await list({ ...query, page: '2' });

      expect(first.transactionCount).toBe(4);
      expect(second.transactionCount).toBe(4);
      expect([...names(first), ...names(second)]).toEqual([
        'bravo',
        'Delta 50%',
        'Alpha',
        'charlie',
      ]);
    });

    it('treats LIKE wildcards in the search as literal text', async () => {
      expect(names(await list({ search: '50%' }))).toEqual(['Delta 50%']);
      expect((await list({ search: '%' })).transactionCount).toBe(1);
      expect((await list({ search: '_' })).transactionCount).toBe(0);
    });

    it("never returns another user's rows", async () => {
      const all = await list({ limit: '100' });
      expect(all.transactionCount).toBe(4);
      expect(names(all)).not.toContain('Zulu');
    });
  },
);
