'use server';

import { auth } from '@/auth/auth';
import { getAllUserTransactions } from '../db/transaction';

interface searchParams {
  limit: number;
  // page: number;
}

export async function getAllTransactions({ limit }: searchParams) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await getAllUserTransactions(session.user.id, limit);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}
