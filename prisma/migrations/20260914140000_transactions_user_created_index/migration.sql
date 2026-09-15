-- The transactions list filters by user_id and orders by created_at by
-- default. (user_id, created_at) serves both; its leading column covers every
-- lookup the user_id-only index did.
DROP INDEX IF EXISTS "transactions_user_id_idx";

CREATE INDEX "transactions_user_id_created_at_idx" ON "transactions"("user_id", "created_at");
