-- Reorder the remaining enums alphabetically so their DB sort order matches
-- alphabetical order (Postgres sorts enum values by their declaration order,
-- not alphabetically). Enum values are the stored (@map) values.

-- TransactionType
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
CREATE TYPE "TransactionType" AS ENUM ('Expenses', 'Income');
ALTER TABLE "transactions"
  ALTER COLUMN "transaction_type" TYPE "TransactionType"
  USING "transaction_type"::text::"TransactionType";
DROP TYPE "TransactionType_old";

-- Currency
ALTER TYPE "Currency" RENAME TO "Currency_old";
CREATE TYPE "Currency" AS ENUM ('EUR', 'GBP', 'HUF', 'PLN', 'UAH', 'USD');
ALTER TABLE "transactions"
  ALTER COLUMN "currency" TYPE "Currency"
  USING "currency"::text::"Currency";
DROP TYPE "Currency_old";

-- TransactionCategory
ALTER TYPE "TransactionCategory" RENAME TO "TransactionCategory_old";
CREATE TYPE "TransactionCategory" AS ENUM (
  'advertisement', 'appliance', 'books', 'cafe', 'car', 'clothes',
  'currency exchange', 'delivery', 'donations', 'electricity', 'entertainment',
  'flowers', 'gas', 'groceries', 'healthcare', 'income', 'insurance', 'internet',
  'investments', 'jewelry', 'loan', 'mobile phone', 'movies', 'others',
  'personal care', 'pet care', 'prize', 'repair', 'sport', 'taxes', 'taxi',
  'transfer', 'travel', 'utilities', 'water'
);
ALTER TABLE "transactions"
  ALTER COLUMN "transaction_category" TYPE "TransactionCategory"
  USING "transaction_category"::text::"TransactionCategory";
DROP TYPE "TransactionCategory_old";
