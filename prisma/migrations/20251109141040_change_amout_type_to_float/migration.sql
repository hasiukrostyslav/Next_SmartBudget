/*
  Warnings:

  - Made the column `currency` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transaction" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "currency" SET NOT NULL;
