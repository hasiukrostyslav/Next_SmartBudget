-- Money was stored as double precision, so sums drifted
-- (100.1 + 200.2 = 300.29999999999995). numeric(14, 2) stores exact cents.
--
-- Existing values are rounded to two decimal places; every amount entered
-- through either app already had at most two.
--
-- Compatible with the Express server that shares this table: it writes amount
-- as a JS number, which PostgreSQL casts to numeric, and reads it with
-- Number(row.amount), which already handles node-postgres returning numeric
-- as a string.
ALTER TABLE "transactions"
  ALTER COLUMN "amount" SET DATA TYPE DECIMAL(14, 2)
  USING ROUND("amount"::numeric, 2);
