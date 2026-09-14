import * as z from 'zod';

import {
  CURRENCIES,
  STATUSES,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '../constants/enums';
import { TRANSACTION_SORT_OPTIONS } from '../constants/transactions';

// Field rules without defaults. Kept separate because Zod's .partial() keeps
// .default(): a partial built from TransactionSchema fills currency and status
// back in, so an edit that changes only the name would reset both.
const TransactionFields = z.object({
  transactionName: z
    .string()
    .min(1, { message: 'Transaction name is required.' })
    .trim(),
  transactionCategory: z.enum(TRANSACTION_CATEGORIES, {
    message: 'Category is required.',
  }),
  transactionType: z.enum(TRANSACTION_TYPES, {
    error: 'Transaction type is required.',
  }),
  paymentMethod: z.string().min(1, { message: 'Payment method is required.' }),
  currency: z.enum(CURRENCIES),
  amount: z.coerce
    .number()
    .positive({ message: 'Amount must be a positive number.' }),
  // Absent stays absent: a partial edit that omits the note must not clear it.
  // Empty or whitespace-only becomes null, which does clear it.
  description: z
    .string()
    .nullish()
    .transform((v) => (v === undefined ? undefined : v?.trim() || null))
    .optional(),
  status: z.enum(STATUSES),
  createdAt: z.date(),
});

export const TransactionSchema = TransactionFields.extend({
  currency: z.enum(CURRENCIES).default('UAH'),
  status: z.enum(STATUSES).default('COMPLETED'),
});

// Unknown keys (userId, transactionId, updatedAt) are stripped by z.object.
export const UpdateTransactionSchema = TransactionFields.partial();

// Two id formats live in these columns: Prisma's cuid() for rows created here
// and cuid2 for rows created by the Express server, so no .cuid() check.
export const IdSchema = z.string().min(1).max(64);

// One page of the list is the most a bulk action can select.
export const IdListSchema = z.array(IdSchema).min(1).max(100);

export const StatusSchema = z.enum(STATUSES);
export const CategorySchema = z.enum(TRANSACTION_CATEGORIES);

export const CopyTransactionSchema = TransactionSchema.pick({
  createdAt: true,
  amount: true,
  currency: true,
  description: true,
});

export const SearchParamsSchema = z.object({
  limit: z.string().optional().default('10'),
  page: z.string().optional().default('1'),
  sort: z
    .enum(TRANSACTION_SORT_OPTIONS.map((opt) => opt.label))
    .optional()
    .default('date'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  search: z.string().optional().default(''),
  category: z.string().optional().default(''),
  account: z.string().optional().default(''),
  date: z.string().optional().default(''),
  amount: z.string().optional().default(''),
  currency: z.string().optional().default(''),
  status: z.string().optional().default(''),
  type: z.string().optional().default(''),
});

export const FilterParamsSchema = SearchParamsSchema.pick({
  search: true,
  category: true,
  account: true,
  date: true,
  amount: true,
  currency: true,
  status: true,
  type: true,
});
