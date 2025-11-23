import { db } from './db';

export async function getAllUserTransactions(
  userId: string,
  limit: number,
  // page: number,
) {
  try {
    const [transactions, transactionCount] = await Promise.all([
      db.transaction.findMany({
        where: { userId },
        take: limit,

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
