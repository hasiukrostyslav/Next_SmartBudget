'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

import { UpdateTransactionData } from '@/types/types';

import { TRANSACTIONS_PATH } from '@/routes';
import { auth } from '@/auth/auth';

import { Status, TransactionCategories } from '../constants/enums';
import { HTTP_STATUS } from '../constants/http';
import { ERROR_MESSAGES } from '../constants/messages';
import {
  createTransaction as create,
  deleteTransactionById,
  deleteTransactionsMany,
  updateTransactionById,
  updateTransactionCategoryMany,
  updateTransactionStatusMany,
} from '../db/transactions';
import {
  CategorySchema,
  IdListSchema,
  IdSchema,
  StatusSchema,
  TransactionSchema,
  UpdateTransactionSchema,
} from '../schemas/transaction.schema';

type CreateTransactionDataType = z.infer<typeof TransactionSchema>;

// Server Actions are public POST endpoints: TypeScript parameter types do not
// exist at runtime, so every mutation parses its input before touching the DB.
const invalidInput = () => ({
  success: false,
  status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
  error: ERROR_MESSAGES.transaction.INVALID,
});

async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

// Only mutations belong in this module: every export of a 'use server' file
// is a public POST endpoint. Reads live in lib/data.

// Create Transaction
export async function createTransaction(
  transaction: z.infer<typeof TransactionSchema>,
) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  const parsed = TransactionSchema.safeParse(transaction);
  if (!parsed.success)
    return {
      success: false,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      error: parsed.error.flatten().fieldErrors,
    };

  try {
    const data = await create(userId, parsed.data as CreateTransactionDataType);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.CREATED, data };
  } catch (error) {
    console.error('[createTransaction]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
      error: ERROR_MESSAGES.transaction.CREATE,
    };
  }
}

// Edit Transactions
export async function editTransaction(id: string, data: UpdateTransactionData) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  const parsedId = IdSchema.safeParse(id);
  const parsedData = UpdateTransactionSchema.safeParse(data);
  if (!parsedId.success || !parsedData.success) return invalidInput();

  try {
    const result = await updateTransactionById(
      parsedId.data,
      userId,
      parsedData.data,
    );
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    console.error('[editTransaction]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
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
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  const parsedIds = IdListSchema.safeParse(transactionIds);
  const parsedStatus = StatusSchema.safeParse(status);
  if (!parsedIds.success || !parsedStatus.success) return invalidInput();

  try {
    const result = await updateTransactionStatusMany(
      parsedIds.data,
      userId,
      parsedStatus.data,
    );
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    console.error('[changeTransactionStatus]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
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
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  const parsedIds = IdListSchema.safeParse(transactionIds);
  const parsedCategory = CategorySchema.safeParse(category);
  if (!parsedIds.success || !parsedCategory.success) return invalidInput();

  try {
    const result = await updateTransactionCategoryMany(
      parsedIds.data,
      userId,
      parsedCategory.data,
    );
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    console.error('[changeTransactionCategory]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
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
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  const parsedId = IdSchema.safeParse(transactionId);
  if (!parsedId.success) return invalidInput();

  try {
    const result = await deleteTransactionById(parsedId.data, userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    console.error('[deleteTransaction]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
      error: ERROR_MESSAGES.transaction.DELETE,
    };
  }
}

export async function deleteManyTransaction(transactionId: string[]) {
  const userId = await getUserId();
  if (!userId)
    return {
      success: false,
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  const parsedIds = IdListSchema.safeParse(transactionId);
  if (!parsedIds.success) return invalidInput();

  try {
    const result = await deleteTransactionsMany(parsedIds.data, userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    console.error('[deleteManyTransaction]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
      error: ERROR_MESSAGES.transaction.DELETE_MANY,
    };
  }
}
