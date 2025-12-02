'use server';

import z from 'zod';
import { auth } from '@/auth/auth';
import {
  getAllTransactions as getAll,
  deleteTransaction as deleteOne,
  deleteManyTransactions as deleteMany,
  deleteAllTransactions as deleteAll,
} from '../db/transaction';
import { SearchParamsSchema } from '../schemas/schema';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

export async function getAllTransactions(props?: SearchParamsType) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await getAll(session.user.id, props);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

export async function deleteTransaction(transactionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteOne(transactionId);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

export async function deleteManyTransaction(transactionId: string[]) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteMany(transactionId);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

export async function deleteAllTransaction() {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteAll();
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}
