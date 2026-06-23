import z from 'zod';

import { UpdateTransactionData } from '@/types/types';

import { PAGE_SIZE_OPTIONS } from '../constants/constants';
import { Status, TransactionCategories } from '../constants/enums';
import {
  TRANSACTION_CATEGORIES_CONFIG,
  TRANSACTION_SORT_FIELD_MAP,
} from '../constants/transactions';
import {
  CreateTransactionSchema,
  SearchParamsSchema,
} from '../schemas/transaction.schema';
import { db } from './db';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;
type CreateTransactionDataType = z.infer<typeof CreateTransactionSchema>;

// Find Transactions
export async function findTransactionsByUserId(
  userId: string,
  props?: SearchParamsType,
) {
  const sortField =
    props?.sort && TRANSACTION_SORT_FIELD_MAP[props.sort]
      ? TRANSACTION_SORT_FIELD_MAP[props.sort]
      : 'createdAt';

  const order = props?.order ?? 'desc';
  const limit = Number(props?.limit ?? PAGE_SIZE_OPTIONS[0]);
  const skip = limit * (Number(props?.page ?? 1) - 1);

  if (sortField === 'amount') {
    const all = await db.transactions.findMany({ where: { userId } });
    const sorted = all.sort((a, b) => {
      const signedA = a.transactionType === 'Expenses' ? -a.amount : a.amount;
      const signedB = b.transactionType === 'Expenses' ? -b.amount : b.amount;
      return order === 'asc' ? signedA - signedB : signedB - signedA;
    });
    return {
      transactions: sorted.slice(skip, skip + limit),
      transactionCount: all.length,
    };
  }

  if (sortField === 'transactionCategory') {
    const all = await db.transactions.findMany({ where: { userId } });
    const sorted = all.sort((a, b) => {
      const labelA =
        TRANSACTION_CATEGORIES_CONFIG[
          a.transactionCategory as keyof typeof TRANSACTION_CATEGORIES_CONFIG
        ]?.text.header ?? a.transactionCategory;
      const labelB =
        TRANSACTION_CATEGORIES_CONFIG[
          b.transactionCategory as keyof typeof TRANSACTION_CATEGORIES_CONFIG
        ]?.text.header ?? b.transactionCategory;
      return order === 'asc'
        ? labelA.localeCompare(labelB)
        : labelB.localeCompare(labelA);
    });
    return {
      transactions: sorted.slice(skip, skip + limit),
      transactionCount: all.length,
    };
  }

  const [transactions, transactionCount] = await Promise.all([
    db.transactions.findMany({
      skip,
      take: limit,
      where: { userId },
      orderBy: { [sortField]: order },
    }),
    db.transactions.count({ where: { userId } }),
  ]);
  return { transactions, transactionCount };
}

export async function findTransactionById(id: string, userId: string) {
  return db.transactions.findFirst({
    where: { transactionId: id, userId },
  });
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
  } = transaction;

  return db.transactions.create({
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
    },
  });
}

// Edit Transactions
export async function updateTransactionById(
  id: string,
  userId: string,
  data: UpdateTransactionData,
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
