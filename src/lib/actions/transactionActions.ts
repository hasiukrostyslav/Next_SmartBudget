'use server';

import z from 'zod';
import { auth } from '@/auth/auth';
import { getAllUserTransactions } from '../db/transaction';
import { SearchParamsSchema } from '../schemas/schema';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

export async function getAllTransactions(props?: SearchParamsType) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await getAllUserTransactions(session.user.id, props);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}
