-- Fixed-window counters for sign-in and sign-up rate limiting
-- (src/lib/rateLimit.ts). Kept in the database, not in memory, so a limit holds
-- across server instances and survives a deploy.
CREATE TABLE "rate_limits" (
    "key" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "reset_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("key")
);
