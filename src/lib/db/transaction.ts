import z from 'zod';
import { db } from './db';
import { SearchParamsSchema } from '../schemas/schema';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

export async function getAllUserTransactions(
  userId: string,
  props?: SearchParamsType,
) {
  try {
    const [transactions, transactionCount] = await Promise.all([
      db.transaction.findMany({
        skip: Number(props?.limit ?? 10) * (Number(props?.page ?? 1) - 1),
        take: Number(props?.limit ?? 10),

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
