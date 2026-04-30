import z from 'zod';
import { db } from './db';
import { SearchParamsSchema } from '../schemas/schema';
import { pageSizeOptions } from '../constants/constants';
import { TRANSACTION_SORT_FIELD_MAP, transactionStatus } from '../constants/ui';
import { TransactionCreateInput, TransactionUpdate } from '@/types/types';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

// Find Transactions
export async function findTransactionsByUserId(
  userId: string,
  props?: SearchParamsType,
) {
  const sortField =
    props?.sort && TRANSACTION_SORT_FIELD_MAP[props.sort]
      ? TRANSACTION_SORT_FIELD_MAP[props.sort]
      : 'createdAt';

  const order = props?.order ? props.order : 'desc';

  const [transactions, transactionCount] = await Promise.all([
    db.transactions.findMany({
      skip:
        Number(props?.limit ?? pageSizeOptions[0]) *
        (Number(props?.page ?? 1) - 1),
      take: Number(props?.limit ?? pageSizeOptions[0]),

      where: { userId },

      orderBy: {
        [sortField]: order,
      },
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
  transaction: TransactionCreateInput,
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
  data: TransactionUpdate,
) {
  return db.transactions.updateMany({
    where: { transactionId: id, userId },
    data,
  });
}

export async function updateTransactionStatusMany(
  transactionIds: string[],
  userId: string,
  status: keyof typeof transactionStatus,
) {
  return db.transactions.updateMany({
    where: {
      transactionId: { in: transactionIds },
      userId,
    },
    data: { status },
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
