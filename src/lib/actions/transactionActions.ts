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
//
// Each action validates its input first, so malformed input is rejected
// without a session lookup or a query, and then hands one database call to
// mutate(), which owns authentication, revalidation and error reporting.

type CreatedTransaction = Awaited<ReturnType<typeof create>>;
type WriteResult = Awaited<ReturnType<typeof updateTransactionById>>;

const invalidInput = (
  fieldErrors?: ActionFailure['fieldErrors'],
): ActionFailure => ({
  success: false,
  status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
  error: ERROR_MESSAGES.transaction.INVALID,
  ...(fieldErrors && { fieldErrors }),
});

// Runs one write for the signed-in user: 401 without a session; the list page
// is revalidated only after the write succeeds; a thrown error is logged under
// `label` and reported as 500 with `failureMessage`.
async function mutate<T>(
  label: string,
  failureMessage: string,
  write: (userId: string) => Promise<T>,
  successStatus: number = HTTP_STATUS.OK,
): Promise<ActionResult<T>> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId)
    return {
      success: false,
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const data = await write(userId);
    revalidatePath(TRANSACTIONS_PATH);
    return { success: true, status: successStatus, data };
  } catch (error) {
    console.error(`[${label}]`, error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
      error: failureMessage,
    };
  }
}

export async function createTransaction(
  transaction: z.input<typeof TransactionSchema>,
): Promise<ActionResult<CreatedTransaction>> {
  const parsed = TransactionSchema.safeParse(transaction);
  if (!parsed.success)
    return invalidInput(z.flattenError(parsed.error).fieldErrors);

  return mutate(
    'createTransaction',
    ERROR_MESSAGES.transaction.CREATE,
    (userId) => create(userId, parsed.data),
    HTTP_STATUS.CREATED,
  );
}

export async function editTransaction(
  id: string,
  data: z.input<typeof UpdateTransactionSchema>,
): Promise<ActionResult<WriteResult>> {
  const parsedData = UpdateTransactionSchema.safeParse(data);
  if (!parsedData.success)
    return invalidInput(z.flattenError(parsedData.error).fieldErrors);

  const parsedId = IdSchema.safeParse(id);
  if (!parsedId.success) return invalidInput();

  return mutate(
    'editTransaction',
    ERROR_MESSAGES.transaction.UPDATE,
    (userId) => updateTransactionById(parsedId.data, userId, parsedData.data),
  );
}

export async function changeTransactionStatus(
  transactionIds: string[],
  status: Status,
): Promise<ActionResult<WriteResult>> {
  const parsedIds = IdListSchema.safeParse(transactionIds);
  const parsedStatus = StatusSchema.safeParse(status);
  if (!parsedIds.success || !parsedStatus.success) return invalidInput();

  return mutate(
    'changeTransactionStatus',
    ERROR_MESSAGES.transaction.UPDATE_STATUS,
    (userId) =>
      updateTransactionStatusMany(parsedIds.data, userId, parsedStatus.data),
  );
}

export async function changeTransactionCategory(
  transactionIds: string[],
  category: TransactionCategories,
): Promise<ActionResult<WriteResult>> {
  const parsedIds = IdListSchema.safeParse(transactionIds);
  const parsedCategory = CategorySchema.safeParse(category);
  if (!parsedIds.success || !parsedCategory.success) return invalidInput();

  return mutate(
    'changeTransactionCategory',
    ERROR_MESSAGES.transaction.UPDATE_CATEGORY,
    (userId) =>
      updateTransactionCategoryMany(
        parsedIds.data,
        userId,
        parsedCategory.data,
      ),
  );
}

export async function deleteTransaction(
  transactionId: string,
): Promise<ActionResult<WriteResult>> {
  const parsedId = IdSchema.safeParse(transactionId);
  if (!parsedId.success) return invalidInput();

  return mutate(
    'deleteTransaction',
    ERROR_MESSAGES.transaction.DELETE,
    (userId) => deleteTransactionById(parsedId.data, userId),
  );
}

export async function deleteManyTransaction(
  transactionId: string[],
): Promise<ActionResult<WriteResult>> {
  const parsedIds = IdListSchema.safeParse(transactionId);
  if (!parsedIds.success) return invalidInput();

  return mutate(
    'deleteManyTransaction',
    ERROR_MESSAGES.transaction.DELETE_MANY,
    (userId) => deleteTransactionsMany(parsedIds.data, userId),
  );
}
