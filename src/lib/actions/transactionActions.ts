'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { TransactionCreateInput, TransactionUpdate } from '@/types/types';

import { TRANSACTIONS_PATH } from '@/routes';
import { auth } from '@/auth/auth';

import { Status, TransactionCategories } from '../constants/enums';
import { ERROR_MESSAGES } from '../constants/messages';
import {
  createTransaction as create,
  deleteTransactionById,
  deleteTransactionsAll,
  deleteTransactionsMany,
  findTransactionById,
  findTransactionsByUserId,
  updateTransactionById,
  updateTransactionCategoryMany,
  updateTransactionStatusMany,
} from '../db/transactions';
import { SearchParamsSchema, TransactionCreateSchema } from '../schemas/schema';

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
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const data = await findTransactionsByUserId(userId, props);
    return { success: true, status: 200, data };
  } catch (error) {
    console.error('[getTransactions]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.FETCH_MANY,
    };
  }
}

export async function getTransaction(id: string) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const data = await findTransactionById(id, userId);
    if (!data)
      return {
        success: false,
        status: 404,
        error: ERROR_MESSAGES.transaction.NOT_FOUND,
      };
    return { success: true, status: 200, data };
  } catch (error) {
    console.error('[getTransaction]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.FETCH_ONE,
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
      error: ERROR_MESSAGES.UNAUTHORIZED,
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
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 201, data };
  } catch (error) {
    console.error('[createTransaction]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.CREATE,
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
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const result = await updateTransactionById(id, userId, data);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[editTransaction]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.UPDATE,
    };
  }
}

export async function changeTransactionStatus(
  transactionIds: string[],
  status: Status,
) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const result = await updateTransactionStatusMany(
      transactionIds,
      userId,
      status,
    );
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[changeTransactionStatus]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.UPDATE_STATUS,
    };
  }
}

export async function changeTransactionCategory(
  transactionIds: string[],
  category: TransactionCategories,
) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const result = await updateTransactionCategoryMany(
      transactionIds,
      userId,
      category,
    );
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[changeTransactionCategory]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.UPDATE_CATEGORY,
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
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const result = await deleteTransactionById(transactionId, userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[deleteTransaction]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.DELETE,
    };
  }
}

export async function deleteManyTransaction(transactionId: string[]) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const result = await deleteTransactionsMany(transactionId, userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[deleteManyTransaction]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.DELETE_MANY,
    };
  }
}

export async function deleteAllTransaction() {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: 401,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const result = await deleteTransactionsAll(userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: 200, data: result };
  } catch (error) {
    console.error('[deleteAllTransaction]', error);
    return {
      success: false,
      status: 500,
      error: ERROR_MESSAGES.transaction.DELETE_MANY,
    };
  }
}
