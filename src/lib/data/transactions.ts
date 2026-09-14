import z from 'zod';

import { auth } from '@/auth/auth';

import { HTTP_STATUS } from '../constants/http';
import { ERROR_MESSAGES } from '../constants/messages';
import { findTransactionsByUserId } from '../db/transactions';
import { SearchParamsSchema } from '../schemas/transaction.schema';

type SearchParamsType = z.infer<typeof SearchParamsSchema>;

// Reads for Server Components. Deliberately not a 'use server' module: every
// export of one becomes a POST endpoint any signed-in client can call, and a
// read has no reason to be one.
export async function getTransactions(params?: SearchParamsType) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId)
    return {
      success: false,
      status: HTTP_STATUS.UNAUTHORIZED,
      error: ERROR_MESSAGES.UNAUTHORIZED,
    };

  try {
    const data = await findTransactionsByUserId(userId, params);
    return { success: true, status: HTTP_STATUS.OK, data };
  } catch (error) {
    console.error('[getTransactions]', error);
    return {
      success: false,
      status: HTTP_STATUS.SERVER_ERROR,
      error: ERROR_MESSAGES.transaction.FETCH_MANY,
    };
  }
}
