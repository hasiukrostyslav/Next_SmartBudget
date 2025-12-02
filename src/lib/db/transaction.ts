import z from 'zod';
import { db } from './db';
import { SearchParamsSchema } from '../schemas/schema';
import { pageSizeOptions } from '../constants/constants';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

export async function getAllTransactions(
  userId: string,
  props?: SearchParamsType,
) {
  try {
    const [transactions, transactionCount] = await Promise.all([
      db.transaction.findMany({
        skip:
          Number(props?.limit ?? pageSizeOptions[0]) *
          (Number(props?.page ?? 1) - 1),
        take: Number(props?.limit ?? pageSizeOptions[0]),

        where: { userId },

        orderBy: {
          createdAt: 'desc',
        },
      }),

      db.transaction.count({ where: { userId } }),
    ]);

    return { transactions, transactionCount };
  } catch {
    return null;
  }
}

export async function deleteTransaction(transactionId: string) {
  try {
    const result = await db.transaction.delete({
      where: {
        transactionId,
      },
    });

    return { success: true, result };
  } catch {
    return null;
  }
}

export async function deleteManyTransactions(transactionId: string[]) {
  try {
    const result = await db.transaction.deleteMany({
      where: {
        transactionId: {
          in: transactionId,
        },
      },
    });

    return { success: true, result };
  } catch {
    return null;
  }
}

export async function deleteAllTransactions() {
  try {
    const result = await db.transaction.deleteMany({});

    return { success: true, result };
  } catch {
    return null;
  }
}
