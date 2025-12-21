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
} from '../db/transaction';
import { SearchParamsSchema } from '../schemas/schema';
import { transactionStatus } from '../constants/ui';
import { TransactionUpdate, type TransactionCreateInput } from '@/types/types';
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

  const result = await findTransactionById(id);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

// Create Transaction
export async function createTransaction(transaction: TransactionCreateInput) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await create(session?.user?.id, transaction);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

// Edit Transactions
export async function editTransaction(id: string, data: TransactionUpdate) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await updateTransactionById(id, data);
  if (!result) return { success: false, error: 'Something went wrong' };

  return { success: true, data: result };
}

export async function changeTransactionStatus(
  transactionIds: string[],
  status: keyof typeof transactionStatus,
) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await updateTransactionStatusMany(transactionIds, status);
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}

// Delete transactions
export async function deleteTransaction(transactionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteTransactionById(transactionId);
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}

export async function deleteManyTransaction(transactionId: string[]) {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteTransactionsMany(transactionId);
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}

export async function deleteAllTransaction() {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorize user. Please sign in!' };

  const result = await deleteTransactionsAll();
  if (!result) return { success: false, error: 'Something went wrong' };

  revalidatePath('/dashboard/transactions');

  return { success: true, data: result };
}
