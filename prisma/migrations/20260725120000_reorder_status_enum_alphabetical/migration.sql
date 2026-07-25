-- Reorder TransactionStatus enum alphabetically so `status` sorts correctly
-- when ordered directly in the database (Postgres sorts enums by their
-- declaration order, not alphabetically).

-- RenameEnum
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('CANCELED', 'COMPLETED', 'FAILED', 'PENDING');

-- DropDefault
ALTER TABLE "transactions" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transactions"
  ALTER COLUMN "status" TYPE "TransactionStatus"
  USING "status"::text::"TransactionStatus";

-- SetDefault
ALTER TABLE "transactions" ALTER COLUMN "status" SET DEFAULT 'COMPLETED'::"TransactionStatus";

-- DropType
DROP TYPE "TransactionStatus_old";
