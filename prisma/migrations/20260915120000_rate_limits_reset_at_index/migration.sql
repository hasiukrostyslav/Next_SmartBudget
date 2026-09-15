-- The limiter sweeps expired windows with DELETE ... WHERE reset_at < now.
-- Without an index that is a full scan of a table that grows with attack
-- traffic. The table is new and not yet deployed, so a plain CREATE INDEX is
-- fine.
SET LOCAL lock_timeout = '5s';

CREATE INDEX "rate_limits_reset_at_idx" ON "rate_limits"("reset_at");
