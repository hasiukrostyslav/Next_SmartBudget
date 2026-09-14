import { describe, expect, it } from 'vitest';

import { parseEnv } from './envSchema';

const valid = {
  DATABASE_URL:
    'postgresql://user:pass@db.example.com:5432/app?sslmode=require',
  AUTH_SECRET: 'x'.repeat(44),
};

describe('parseEnv', () => {
  it('accepts a complete environment', () => {
    expect(parseEnv(valid)).toEqual(valid);
  });

  it('names every missing variable in one error', () => {
    expect(() => parseEnv({})).toThrow(
      /DATABASE_URL is required[\s\S]*AUTH_SECRET is required/,
    );
  });

  it('rejects a short secret and a non-postgres URL', () => {
    expect(() => parseEnv({ ...valid, AUTH_SECRET: 'short' })).toThrow(
      /AUTH_SECRET must be at least 32 characters/,
    );
    expect(() =>
      parseEnv({ ...valid, DATABASE_URL: 'mysql://localhost/app' }),
    ).toThrow(/DATABASE_URL must be a postgres/);
  });
});
