-- The transactions list filters by user_id and orders by created_at by
-- default. (user_id, created_at) serves both; its leading column covers every
-- lookup the user_id-only index did.
-- Give up after 5 seconds instead of making both apps queue behind a lock
-- another session holds. A timeout rolls this migration back; retry it.
SET LOCAL lock_timeout = '5s';

DROP INDEX IF EXISTS "transactions_user_id_idx";

CREATE INDEX "transactions_user_id_created_at_idx" ON "transactions"("user_id", "created_at");
