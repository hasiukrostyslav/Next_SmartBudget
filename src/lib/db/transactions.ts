import z from 'zod';

import type { Transactions } from '../../../generated/client';
import { PAGE_SIZE_OPTIONS } from '../constants/constants';
import { Status, TransactionCategories } from '../constants/enums';
import { TRANSACTION_SORT_FIELD_MAP } from '../constants/transactions';
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
function toTransactionItem(row: Transactions) {
  return { ...row, amount: row.amount.toNumber() };
}

// Find Transactions
export async function findTransactionsByUserId(
  userId: string,
  params?: SearchParamsType,
) {
  const sortedField =
    params?.sort && TRANSACTION_SORT_FIELD_MAP[params.sort]
      ? TRANSACTION_SORT_FIELD_MAP[params.sort]
      : 'createdAt';

  const order = params?.order ?? 'desc';
  const limit = Number(params?.limit ?? PAGE_SIZE_OPTIONS[0]);
  const skip = limit * (Number(params?.page ?? 1) - 1);
  const search = params?.search.replaceAll('-', ' ').trim();

  if (
    sortedField === 'amount' ||
    sortedField === 'transactionName' ||
    sortedField === 'description'
  ) {
    const transactions = (
      await db.transactions.findMany({
        where: {
          userId,
          transactionName: { contains: search, mode: 'insensitive' },
        },
      })
    ).map(toTransactionItem);
    const sorted = transactions.sort((a, b) => {
      if (sortedField === 'amount') {
        const signedA = a.transactionType === 'Expenses' ? -a.amount : a.amount;
        const signedB = b.transactionType === 'Expenses' ? -b.amount : b.amount;
        return order === 'asc' ? signedA - signedB : signedB - signedA;
      }

      const valueA = a[sortedField];
      const valueB = b[sortedField];

      if (!valueA && !valueB) return 0;
      if (!valueA) return 1;
      if (!valueB) return -1;

      return order === 'asc'
        ? valueA?.localeCompare(valueB)
        : valueB?.localeCompare(valueA);
    });
    return {
      transactions: sorted.slice(skip, skip + limit),
      transactionCount: transactions.length,
    };
  }

  const [transactions, transactionCount] = await Promise.all([
    db.transactions.findMany({
      skip,
      take: limit,
      where: {
        userId,
        transactionName: { contains: search, mode: 'insensitive' },
      },
      orderBy: { [sortedField]: order },
    }),
    db.transactions.count({
      where: {
        userId,
        transactionName: { contains: search, mode: 'insensitive' },
      },
    }),
  ]);
  return {
    transactions: transactions.map(toTransactionItem),
    transactionCount,
  };
}

export async function findTransactionById(id: string, userId: string) {
  const row = await db.transactions.findFirst({
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

  const row = await db.transactions.create({
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
  return db.transactions.updateMany({
    where: { transactionId: id, userId },
    data,
  });
}

export async function updateTransactionStatusMany(
  transactionIds: string[],
  userId: string,
  status: Status,
) {
  return db.transactions.updateMany({
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
  return db.transactions.updateMany({
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
  return db.transactions.deleteMany({
    where: { transactionId, userId },
  });
}

export async function deleteTransactionsMany(
  transactionId: string[],
  userId: string,
) {
  return db.transactions.deleteMany({
    where: {
      transactionId: { in: transactionId },
      userId,
    },
  });
}

export async function deleteTransactionsAll(userId: string) {
  return db.transactions.deleteMany({ where: { userId } });
}
