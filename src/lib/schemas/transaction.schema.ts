import * as z from 'zod';

import { PAGE_SIZE_OPTIONS } from '../constants/constants';
import {
  CURRENCIES,
  STATUSES,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '../constants/enums';
import {
  PAYMENT_METHODS,
  TRANSACTION_SORT_OPTIONS,
} from '../constants/transactions';

// Field rules without defaults. Kept separate because Zod's .partial() keeps
// .default(): a partial built from TransactionSchema fills currency and status
// back in, so an edit that changes only the name would reset both.
const TransactionFields = z.object({
  // Trim before checking the length: the other order accepted "   " and
  // stored an empty name.
  transactionName: z
    .string()
    .trim()
    .min(1, { message: 'Transaction name is required.' }),
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
    .positive({ message: 'Amount must be a positive number.' })
    // numeric(14, 2) holds at most 999 999 999 999.99.
    .max(999_999_999_999.99, { message: 'Amount is too large.' }),
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

// A list filter can repeat (?status=PENDING&status=FAILED) or be
// comma-separated (?status=PENDING,FAILED — the Express server's form). Values
// outside the allowed set are dropped rather than failing the page.
function listParam<T extends string>(allowed: readonly T[]) {
  return z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((value) => {
      const entries = [value ?? []]
        .flat()
        .flatMap((entry) => entry.split(','))
        .map((entry) => entry.trim());
      return [...new Set(entries)].filter((entry): entry is T =>
        (allowed as readonly string[]).includes(entry),
      );
    })
    .catch([]);
}

// URL params are hand-editable. Each field falls back to its default on a bad
// value (.catch) instead of failing the whole parse, so ?page=abc renders page 1
// with every other param intact, and the query below never sees NaN, a
// negative offset or an unbounded page size. Server and client parse the URL
// with this same schema, so the controls always describe the page rendered.
export const SearchParamsSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).catch(PAGE_SIZE_OPTIONS[0]),
  page: z.coerce.number().int().min(1).max(1_000_000).catch(1),
  sort: z.enum(TRANSACTION_SORT_OPTIONS.map((opt) => opt.label)).catch('date'),
  order: z.enum(['asc', 'desc']).catch('desc'),
  search: z.string().catch(''),
  category: listParam(TRANSACTION_CATEGORIES),
  account: listParam(PAYMENT_METHODS),
  currency: listParam(CURRENCIES),
  status: listParam(STATUSES),
  type: listParam(TRANSACTION_TYPES),
});

export const FilterParamsSchema = SearchParamsSchema.pick({
  search: true,
  category: true,
  account: true,
  currency: true,
  status: true,
  type: true,
});
