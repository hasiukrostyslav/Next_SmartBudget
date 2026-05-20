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
  updateTransactionCategoryMany,
} from '../db/transactions';
import { SearchParamsSchema, TransactionCreateSchema } from '../schemas/schema';
import { TRANSACTION_CATEGORIES, transactionStatus } from '../constants/ui';
import { TransactionCreateInput, TransactionUpdate } from '@/types/types';
import { revalidatePath } from 'next/cache';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

// Get Transactions
export async function getTransactions(props?: SearchParamsType) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const data = await findTransactionsByUserId(userId, props);
    return { success: true, status: 200, data };
  } catch (error) {
    console.error('[getTransactions]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to fetch transactions',
    };
  }
}

export async function getTransaction(id: string) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const data = await findTransactionById(id, userId);
    if (!data)
      return { success: false, status: 404, error: 'Transaction not found' };
    return { success: true, status: 200, data };
  } catch (error) {
    console.error('[getTransaction]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to fetch transaction',
    };
  }
}

// Create Transaction
export async function createTransaction(
  transaction: z.infer<typeof TransactionCreateSchema>,
) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  const parsed = TransactionCreateSchema.safeParse(transaction);
  if (!parsed.success)
    return {
      success: false,
      status: 422,
      error: parsed.error.flatten().fieldErrors,
    };

  try {
    const data = await create(userId, parsed.data as TransactionCreateInput);
    return { success: true, status: 201, data };
  } catch (error) {
    console.error('[createTransaction]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to create transaction',
    };
  }
}

// Edit Transactions
export async function editTransaction(id: string, data: TransactionUpdate) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const result = await updateTransactionById(id, userId, data);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[editTransaction]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to update transaction',
    };
  }
}

export async function changeTransactionStatus(
  transactionIds: string[],
  status: keyof typeof transactionStatus,
) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const result = await updateTransactionStatusMany(
      transactionIds,
      userId,
      status,
    );
    revalidatePath('/dashboard/transactions');
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[changeTransactionStatus]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to update transaction status',
    };
  }
}

export async function changeTransactionCategory(
  transactionIds: string[],
  category: keyof typeof TRANSACTION_CATEGORIES,
) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const result = await updateTransactionCategoryMany(
      transactionIds,
      userId,
      category,
    );
    revalidatePath('/dashboard/transactions');
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[changeTransactionCategory]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to update transaction category',
    };
  }
}

// Delete transactions
export async function deleteTransaction(transactionId: string) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const result = await deleteTransactionById(transactionId, userId);
    revalidatePath('/dashboard/transactions');
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[deleteTransaction]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to delete transaction',
    };
  }
}

export async function deleteManyTransaction(transactionId: string[]) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const result = await deleteTransactionsMany(transactionId, userId);
    revalidatePath('/dashboard/transactions');
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[deleteManyTransaction]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to delete transactions',
    };
  }
}

export async function deleteAllTransaction() {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: 'Unauthorized. Please sign in!',
    };

  try {
    const result = await deleteTransactionsAll(userId);
    revalidatePath('/dashboard/transactions');
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[deleteAllTransaction]', error);
    return {
      success: false,
      status: 500,
      error: 'Failed to delete transactions',
    };
  }
}
