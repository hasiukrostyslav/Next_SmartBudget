'use server';

import { revalidatePath } from 'next/cache';

import z from 'zod';

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
import type { ActionFailure, ActionResult } from './types';

// Only mutations belong in this module: every export of a 'use server' file is
// a public POST endpoint. Reads live in lib/data.

type CreatedTransaction = Awaited<ReturnType<typeof create>>;
type WriteResult = Awaited<ReturnType<typeof updateTransactionById>>;

const unauthorized = (): ActionFailure => ({
  success: false,
  status: HTTP_STATUS.UNAUTHORIZED,
  error: ERROR_MESSAGES.UNAUTHORIZED,
});

// Server Actions are public POST endpoints: TypeScript parameter types do not
// exist at runtime, so every mutation parses its input before touching the DB.
const invalidInput = (
  fieldErrors?: ActionFailure['fieldErrors'],
): ActionFailure => ({
  success: false,
  status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
  error: ERROR_MESSAGES.transaction.INVALID,
  ...(fieldErrors && { fieldErrors }),
});

const serverError = (
  label: string,
  error: unknown,
  message: string,
): ActionFailure => {
  console.error(`[${label}]`, error);
  return {
    success: false,
    status: HTTP_STATUS.SERVER_ERROR,
    error: message,
  };
};

async function getUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

// Create Transaction
export async function createTransaction(
  transaction: z.input<typeof TransactionSchema>,
): Promise<ActionResult<CreatedTransaction>> {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  const parsed = TransactionSchema.safeParse(transaction);
  if (!parsed.success)
    return invalidInput(z.flattenError(parsed.error).fieldErrors);

  try {
    const data = await create(userId, parsed.data);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.CREATED, data };
  } catch (error) {
    return serverError(
      'createTransaction',
      error,
      ERROR_MESSAGES.transaction.CREATE,
    );
  }
}

// Edit Transactions
export async function editTransaction(
  id: string,
  data: z.input<typeof UpdateTransactionSchema>,
): Promise<ActionResult<WriteResult>> {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  const parsedId = IdSchema.safeParse(id);
  const parsedData = UpdateTransactionSchema.safeParse(data);
  if (!parsedData.success)
    return invalidInput(z.flattenError(parsedData.error).fieldErrors);
  if (!parsedId.success) return invalidInput();

  try {
    const result = await updateTransactionById(
      parsedId.data,
      userId,
      parsedData.data,
    );
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    return serverError(
      'editTransaction',
      error,
      ERROR_MESSAGES.transaction.UPDATE,
    );
  }
}

export async function changeTransactionStatus(
  transactionIds: string[],
  status: Status,
): Promise<ActionResult<WriteResult>> {
  const userId = await getUserId();
  if (!userId) return unauthorized();

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
    return serverError(
      'changeTransactionStatus',
      error,
      ERROR_MESSAGES.transaction.UPDATE_STATUS,
    );
  }
}

export async function changeTransactionCategory(
  transactionIds: string[],
  category: TransactionCategories,
): Promise<ActionResult<WriteResult>> {
  const userId = await getUserId();
  if (!userId) return unauthorized();

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
    return serverError(
      'changeTransactionCategory',
      error,
      ERROR_MESSAGES.transaction.UPDATE_CATEGORY,
    );
  }
}

// Delete transactions
export async function deleteTransaction(
  transactionId: string,
): Promise<ActionResult<WriteResult>> {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  const parsedId = IdSchema.safeParse(transactionId);
  if (!parsedId.success) return invalidInput();

  try {
    const result = await deleteTransactionById(parsedId.data, userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    return serverError(
      'deleteTransaction',
      error,
      ERROR_MESSAGES.transaction.DELETE,
    );
  }
}

export async function deleteManyTransaction(
  transactionId: string[],
): Promise<ActionResult<WriteResult>> {
  const userId = await getUserId();
  if (!userId) return unauthorized();

  const parsedIds = IdListSchema.safeParse(transactionId);
  if (!parsedIds.success) return invalidInput();

  try {
    const result = await deleteTransactionsMany(parsedIds.data, userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: HTTP_STATUS.OK, data: result };
  } catch (error) {
    return serverError(
      'deleteManyTransaction',
      error,
      ERROR_MESSAGES.transaction.DELETE_MANY,
    );
  }
}
