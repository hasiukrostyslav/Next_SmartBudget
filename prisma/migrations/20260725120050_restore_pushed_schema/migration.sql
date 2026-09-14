-- Restores, in the migration history, schema that exists on the live database
-- but was only ever applied with `prisma db push`:
--   * the TransactionType, Currency and TransactionCategory enum types, and the
--     three columns typed with them (the history left them as TEXT);
--   * the CURRENT_TIMESTAMP defaults on users.updated_at and
--     transactions.updated_at, which the Express server relies on — its
--     INSERTs omit updated_at;
--   * the transactions(user_id) index declared by @@index([userId]).
--
-- Without this, `prisma migrate deploy` on a fresh database stops at
-- 20260725120100_reorder_enums_alphabetical ("type TransactionType does not
-- exist"). It is ordered before that migration for exactly that reason.
--
-- Every statement is guarded, so on a database that already has these objects
-- — the live Neon database — this migration changes nothing.

DO $$
BEGIN
  IF to_regtype('"TransactionType"') IS NULL THEN
    CREATE TYPE "TransactionType" AS ENUM ('Expenses', 'Income');
  END IF;

  IF to_regtype('"Currency"') IS NULL THEN
    CREATE TYPE "Currency" AS ENUM ('EUR', 'GBP', 'HUF', 'PLN', 'UAH', 'USD');
  END IF;

  IF to_regtype('"TransactionCategory"') IS NULL THEN
    CREATE TYPE "TransactionCategory" AS ENUM (
      'advertisement', 'appliance', 'books', 'cafe', 'car', 'clothes',
      'currency exchange', 'delivery', 'donations', 'electricity', 'entertainment',
      'flowers', 'gas', 'groceries', 'healthcare', 'income', 'insurance', 'internet',
      'investments', 'jewelry', 'loan', 'mobile phone', 'movies', 'others',
      'personal care', 'pet care', 'prize', 'repair', 'sport', 'taxes', 'taxi',
      'transfer', 'travel', 'utilities', 'water'
    );
  END IF;
END $$;

DO $$
DECLARE
  column_type text;
BEGIN
  SELECT data_type INTO column_type FROM information_schema.columns
   WHERE table_schema = current_schema()
     AND table_name = 'transactions' AND column_name = 'transaction_type';
  IF column_type = 'text' THEN
    ALTER TABLE "transactions"
      ALTER COLUMN "transaction_type" TYPE "TransactionType"
      USING "transaction_type"::"TransactionType";
  END IF;

  SELECT data_type INTO column_type FROM information_schema.columns
   WHERE table_schema = current_schema()
     AND table_name = 'transactions' AND column_name = 'currency';
  IF column_type = 'text' THEN
    ALTER TABLE "transactions"
      ALTER COLUMN "currency" TYPE "Currency"
      USING "currency"::"Currency";
  END IF;

  SELECT data_type INTO column_type FROM information_schema.columns
   WHERE table_schema = current_schema()
     AND table_name = 'transactions' AND column_name = 'transaction_category';
  IF column_type = 'text' THEN
    ALTER TABLE "transactions"
      ALTER COLUMN "transaction_category" TYPE "TransactionCategory"
      USING "transaction_category"::"TransactionCategory";
  END IF;
END $$;

-- Idempotent: setting a default that is already set is a no-op.
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "transactions" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS "transactions_user_id_idx" ON "transactions"("user_id");
