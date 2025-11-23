import { db } from './db';

export async function getAllUserTransactions(
  userId: string,
  limit: number,
  // page: number,
) {
  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      take: limit,

      orderBy: {
        createdAt: 'desc',
      },
    });

    return transactions;
  } catch {
    return null;
  }
}
