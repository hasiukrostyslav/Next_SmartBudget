'use server';

import z from 'zod';
import { auth } from '@/auth/auth';
import {
  findTransactionsByUserId,
  findTransactionById,
  createTransaction as create,
  updateTransactionById,
  updateTransactionStatusMany,
  deleteTransactionById,
  deleteTransactionsMany,
  deleteTransactionsAll,
} from '../db/transactions';
import { SearchParamsSchema, TransactionCreateSchema } from '../schemas/schema';
import { transactionStatus } from '../constants/ui';
import { TransactionUpdate } from '@/types/types';
import { revalidatePath } from 'next/cache';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

// Get Transactions
export async function getTransactions(props?: SearchParamsType) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await findTransactionsByUserId(session.user.id, props);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

export async function getTransaction(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await findTransactionById(id, session.user.id);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

// Create Transaction
export async function createTransaction(
  transaction: z.infer<typeof TransactionCreateSchema>,
) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const parsed = TransactionCreateSchema.safeParse(transaction);
  if (!parsed.success)
    return { success: false, error: parsed.error.flatten().fieldErrors };

  const result = await create(session.user.id, parsed.data);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

// Edit Transactions
export async function editTransaction(id: string, data: TransactionUpdate) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await updateTransactionById(id, session.user.id, data);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

export async function changeTransactionStatus(
  transactionIds: string[],
  status: keyof typeof transactionStatus,
) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await updateTransactionStatusMany(
    transactionIds,
    session.user.id,
    status,
  );
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}

// Delete transactions
export async function deleteTransaction(transactionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteTransactionById(transactionId, session.user.id);
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}

export async function deleteManyTransaction(transactionId: string[]) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteTransactionsMany(transactionId, session.user.id);
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}

export async function deleteAllTransaction() {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteTransactionsAll(session.user.id);
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}
