import { parseEnv } from './envSchema';

// Validated when the server first imports it, so a missing DATABASE_URL or
// AUTH_SECRET stops startup with the variable's name instead of failing at the
// first request (pg silently targets localhost without a URL).
export const env = parseEnv();
