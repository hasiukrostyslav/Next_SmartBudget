import { db } from './db';

export async function getAllUserTransactions(userId?: string) {
  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
    });

    return transactions;
  } catch {
    return null;
  }
}
