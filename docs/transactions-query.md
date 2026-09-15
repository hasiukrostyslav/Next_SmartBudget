# Transactions list query

Two apps serve the transactions list from the same `transactions` table:

- this Next.js app: `findTransactionsByUserId` in `src/lib/db/transactions.ts`
- the Express API in `react_smart_budget/server`: `GET /api/transactions`

This document describes what this app does, and lists every known way the
Express API still differs. The goal is for the same URL to return the same rows
in the same order from both.

## Parameters

| Param      | Type                                                                          | Default | Invalid value in this app                                                 |
| ---------- | ----------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| `limit`    | integer 1–100                                                                 | `10`    | falls back to the default                                                 |
| `page`     | integer 1–1 000 000                                                           | `1`     | falls back to the default; a page past the end redirects to the last page |
| `sort`     | `name` \| `category` \| `account` \| `date` \| `amount` \| `note` \| `status` | `date`  | falls back to the default                                                 |
| `order`    | `asc` \| `desc`                                                               | `desc`  | falls back to the default                                                 |
| `search`   | text                                                                          | none    | —                                                                         |
| `category` | list of category enum names                                                   | none    | unknown values are ignored                                                |
| `type`     | list of `Income` \| `Expenses`                                                | none    | unknown values are ignored                                                |
| `status`   | list of status enum values                                                    | none    | unknown values are ignored                                                |
| `currency` | list of currency codes                                                        | none    | unknown values are ignored                                                |
| `account`  | list of `Card` \| `Cash`                                                      | none    | unknown values are ignored                                                |

A list is either repeated (`?status=PENDING&status=FAILED`) or comma-separated
(`?status=PENDING,FAILED`). An empty value or `all` means no filter.

## Matching

- Every filter narrows the result (AND). Several values for one filter match
  any of them (OR).
- `search` matches `transaction_name` **or** `description`, case-insensitively,
  as a substring. `%`, `_` and `\` are literal characters.
- Before matching, this app cuts `search` to 100 characters, replaces every
  `-` with a space, and trims it. So `e-mail` searches for `e mail`.
- Category names in the URL are the enum names (`currency_exchange`). Four are
  stored with a space (`currency exchange`, `mobile phone`, `personal care`,
  `pet care`) and are translated before comparing.
- Rows always belong to the signed-in user.

## Ordering

| `sort`     | Orders by                                                             |
| ---------- | --------------------------------------------------------------------- |
| `date`     | `created_at`                                                          |
| `name`     | `lower(transaction_name)`, case-insensitive                           |
| `note`     | `lower(description)`, **rows without a note last in both directions** |
| `amount`   | signed amount: expenses negative, income positive                     |
| `category` | the category enum (alphabetical by stored value)                      |
| `status`   | the status enum (alphabetical)                                        |
| `account`  | `payment_method`                                                      |

Ties are broken by `transaction_id` in the same direction, so paging never
repeats or skips a row.

## Known differences in the Express API

Checked by running both apps' list SQL against the same 250 rows.

- **No tiebreaker.** Rows with equal sort values come back in no fixed order,
  so across pages they repeat and vanish. Sorting 250 rows by amount showed 76
  rows twice and never showed 76 others.
- **Wildcards in search.** `%` and `_` are LIKE wildcards and `\` is an
  escape, so searching `%` matches every row.
- **Search normalisation.** The term is trimmed before being cut to 100
  characters, and `-` is kept.
- **Invalid parameters return 400.** This applies to `limit`, `page`,
  `sort`, `order`, an unknown enum value in a filter, and a repeated key
  (`status=A&status=B`). Only the comma-separated list form is accepted.
  `page` has no upper bound, and a page past the end returns an empty page.
- `name` sorts `transaction_name` without `lower()`, so capitalised names
  group apart.
- `note` uses PostgreSQL's default null placement, which puts rows without a
  note first when sorting descending.
- `account` is free text, so `?account=Visa` filters there and is ignored here.
- `category` sorts by display header. That order is identical to the stored
  enum order, so both apps agree.
