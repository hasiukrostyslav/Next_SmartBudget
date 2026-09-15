import z from 'zod';

import { Prisma, type Transaction } from '../../../generated/client';
import { PAGE_SIZE_OPTIONS } from '../constants/constants';
import { Status, TransactionCategories } from '../constants/enums';
import {
  SearchParamsSchema,
  TransactionSchema,
  UpdateTransactionSchema,
} from '../schemas/transaction.schema';
import { db } from './db';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;
type CreateTransactionDataType = z.infer<typeof TransactionSchema>;
type UpdateTransactionDataType = z.infer<typeof UpdateTransactionSchema>;

// Prisma returns amount as a Decimal, which cannot be passed to a Client
// Component or returned from a Server Action. Convert here, at the data
// boundary; numeric(14, 2) values round-trip through a JS number exactly.
function toTransactionItem(row: Transaction) {
  return { ...row, amount: row.amount.toNumber() };
}

// ORDER BY expression per sort key. Every fragment is hardcoded here and
// selected by key, never built from user input. Sorting runs in the database
// so only one page of rows is ever loaded:
// - amount is signed (expenses negative), matching the displayed balance impact
// - name and note compare case-insensitively
// - rows without a note sort last in both directions
const ORDER_BY_SQL: Record<string, { expression: string; nullsLast?: true }> = {
  name: { expression: 'lower(transaction_name)' },
  category: { expression: 'transaction_category' },
  account: { expression: 'payment_method' },
  date: { expression: 'created_at' },
  amount: {
    expression: `CASE WHEN transaction_type = 'Expenses' THEN -amount ELSE amount END`,
  },
  note: { expression: 'lower(description)', nullsLast: true },
  status: { expression: 'status' },
};

// The URL and the app use the enum names; four categories are stored in the
// database with a space instead (see @map in schema.prisma).
const SPACED_CATEGORIES = new Set([
  'currency_exchange',
  'mobile_phone',
  'personal_care',
  'pet_care',
]);

function toDbCategory(category: string) {
  return SPACED_CATEGORIES.has(category)
    ? category.replace('_', ' ')
    : category;
}

// Match the search term literally: % and _ typed by the user are text, not
// LIKE wildcards.
function escapeLike(term: string) {
  return term.replace(/[\\%_]/g, (char) => `\\${char}`);
}

// Find Transactions
export async function findTransactionsByUserId(
  userId: string,
  params?: SearchParamsType,
) {
  const sort = ORDER_BY_SQL[params?.sort ?? 'date'] ?? ORDER_BY_SQL.date;
  const direction = params?.order === 'asc' ? 'ASC' : 'DESC';
  const limit = Number(params?.limit ?? PAGE_SIZE_OPTIONS[0]);
  const skip = limit * (Number(params?.page ?? 1) - 1);
  const search = params?.search?.replaceAll('-', ' ').trim() ?? '';

  const conditions = [Prisma.sql`user_id = ${userId}`];
  // Name or note, as in the Express API (docs/transactions-query.md).
  if (search) {
    const pattern = `%${escapeLike(search)}%`;
    conditions.push(
      Prisma.sql`(transaction_name ILIKE ${pattern} ESCAPE '\\' OR description ILIKE ${pattern} ESCAPE '\\')`,
    );
  }

  // Values are already validated against their enums by SearchParamsSchema and
  // are bound as a parameter; the column names are fixed here. Several values
  // for one filter match any of them; different filters must all match.
  const listFilters: [column: string, values: readonly string[]][] = [
    ['transaction_category', (params?.category ?? []).map(toDbCategory)],
    ['transaction_type', params?.type ?? []],
    ['status', params?.status ?? []],
    ['currency', params?.currency ?? []],
    ['payment_method', params?.account ?? []],
  ];
  for (const [column, values] of listFilters) {
    if (values.length > 0) {
      conditions.push(
        Prisma.sql`${Prisma.raw(column)}::text = ANY(${[...values]})`,
      );
    }
  }

  const where = Prisma.join(conditions, ' AND ');

  // transaction_id breaks ties, so rows with equal sort values keep a stable
  // order and never repeat or vanish between pages.
  const orderBy = Prisma.raw(
    `${sort.expression} ${direction}${sort.nullsLast ? ' NULLS LAST' : ''}, transaction_id ${direction}`,
  );

  // One snapshot for all three reads. They used to run as separate queries,
  // two of them in parallel on different connections, so a row deleted in
  // between could drop out of the page after its id was found, or leave a
  // count that disagreed with the rows shown.
  const { ids, count, rows } = await db.$transaction(
    async (tx) => {
      const page = await tx.$queryRaw<{ transaction_id: string }[]>`
        SELECT transaction_id FROM transactions
        WHERE ${where}
        ORDER BY ${orderBy}
        LIMIT ${limit} OFFSET ${skip}`;
      const [{ count }] = await tx.$queryRaw<{ count: number }[]>`
        SELECT COUNT(*)::int AS count FROM transactions WHERE ${where}`;

      const ids = page.map((row) => row.transaction_id);
      const rows = ids.length
        ? await tx.transaction.findMany({
            where: { userId, transactionId: { in: ids } },
          })
        : [];

      return { ids, count, rows };
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
  );
  const rowsById = new Map(rows.map((row) => [row.transactionId, row]));

  return {
    transactions: ids.flatMap((id) => {
      const row = rowsById.get(id);
      return row ? [toTransactionItem(row)] : [];
    }),
    transactionCount: count,
  };
}

export async function findTransactionById(id: string, userId: string) {
  const row = await db.transaction.findFirst({
    where: { transactionId: id, userId },
  });
  return row ? toTransactionItem(row) : null;
}

// Create Transaction
export async function createTransaction(
  userId: string,
  transaction: CreateTransactionDataType,
) {
  const {
    transactionType,
    transactionName,
    transactionCategory,
    paymentMethod,
    status,
    amount,
    currency,
    description,
    createdAt,
  } = transaction;

  const row = await db.transaction.create({
    data: {
      userId,
      transactionCategory,
      transactionName,
      transactionType,
      paymentMethod,
      description,
      status,
      amount,
      currency,
      createdAt,
    },
  });

  return toTransactionItem(row);
}

// Edit Transactions
export async function updateTransactionById(
  id: string,
  userId: string,
  data: UpdateTransactionDataType,
) {
  return db.transaction.updateMany({
    where: { transactionId: id, userId },
    data,
  });
}

export async function updateTransactionStatusMany(
  transactionIds: string[],
  userId: string,
  status: Status,
) {
  return db.transaction.updateMany({
    where: {
      transactionId: { in: transactionIds },
      userId,
    },
    data: { status },
  });
}

export async function updateTransactionCategoryMany(
  transactionIds: string[],
  userId: string,
  category: TransactionCategories,
) {
  return db.transaction.updateMany({
    where: {
      transactionId: { in: transactionIds },
      userId,
    },
    data: { transactionCategory: category },
  });
}

// Delete transactions
export async function deleteTransactionById(
  transactionId: string,
  userId: string,
) {
  return db.transaction.deleteMany({
    where: { transactionId, userId },
  });
}

export async function deleteTransactionsMany(
  transactionId: string[],
  userId: string,
) {
  return db.transaction.deleteMany({
    where: {
      transactionId: { in: transactionId },
      userId,
    },
  });
}
