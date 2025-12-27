-- RenameEnum
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('COMPLETED', 'FAILED', 'PENDING');

-- DropDefault
ALTER TABLE "transaction" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transaction" 
  ALTER COLUMN "status" TYPE "TransactionStatus" 
  USING "status"::text::"TransactionStatus";

-- SetDefault
ALTER TABLE "transaction" ALTER COLUMN "status" SET DEFAULT 'COMPLETED'::"TransactionStatus";

-- DropType
DROP TYPE "TransactionStatus_old";