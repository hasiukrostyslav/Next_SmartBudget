# Transactions list query

The transactions list is served by two apps over the same `transactions`
table: this Next.js app (`findTransactionsByUserId` in
`src/lib/db/transactions.ts`) and the Express API in
`react_smart_budget/server` (`GET /api/transactions`). The same URL must
return the same rows in the same order from both. This is the contract.

## Parameters

| Param | Type | Default | Invalid value |
|---|---|---|---|
| `limit` | integer 1–100 | `10` | falls back to the default |
| `page` | integer ≥ 1 | `1` | falls back to the default |
| `sort` | `name` \| `category` \| `account` \| `date` \| `amount` \| `note` \| `status` | `date` | falls back to the default |
| `order` | `asc` \| `desc` | `desc` | falls back to the default |
| `search` | text | none | — |
| `category` | list of category enum names | none | unknown values are ignored |
| `type` | list of `Income` \| `Expenses` | none | unknown values are ignored |
| `status` | list of status enum values | none | unknown values are ignored |
| `currency` | list of currency codes | none | unknown values are ignored |
| `account` | list of `Card` \| `Cash` | none | unknown values are ignored |

A list is either repeated (`?status=PENDING&status=FAILED`) or
comma-separated (`?status=PENDING,FAILED`). An empty value or `all` means
no filter.

## Matching

- Every filter narrows the result (AND); several values for one filter match
  any of them (OR).
- `search` matches `transaction_name` **or** `description`, case-insensitively,
  as a substring. `%` and `_` are literal characters, not wildcards.
- Category names in the URL are the enum names (`currency_exchange`); four are
  stored with a space (`currency exchange`, `mobile phone`, `personal care`,
  `pet care`) and must be translated before comparing.
- Rows always belong to the signed-in user.

## Ordering

| `sort` | Orders by |
|---|---|
| `date` | `created_at` |
| `name` | `lower(transaction_name)` — case-insensitive |
| `note` | `lower(description)`, **rows without a note last in both directions** |
| `amount` | signed amount: expenses negative, income positive |
| `category` | the category enum (alphabetical by stored value) |
| `status` | the status enum (alphabetical) |
| `account` | `payment_method` |

Ties are broken by `transaction_id` in the same direction, so paging never
repeats or skips a row.

## Known differences in the Express API (to align there)

- `name` sorts `transaction_name` without `lower()`, so capitalised names
  group apart.
- `note` uses PostgreSQL's default null placement, which puts rows without a
  note first when sorting descending.
- `category` ranks by display header rather than stored value; the two orders
  differ only around the four spaced categories.
- `account` is free text rather than `Card` | `Cash`.
- An invalid enum value in a filter returns 400 instead of being ignored.
