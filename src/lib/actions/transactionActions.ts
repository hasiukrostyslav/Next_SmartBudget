'use server';

import { auth } from '@/auth/auth';
import { getAllUserTransactions } from '../db/transaction';

export async function getAllTransactions() {
  const session = await auth();
  if (!session) return { error: 'Unauthorize user. Please sign in!' };

  const result = await getAllUserTransactions(session.user?.id);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}
