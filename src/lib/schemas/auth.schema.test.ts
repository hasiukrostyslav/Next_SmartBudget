import { describe, expect, it } from 'vitest';

import { SignInSchema, SignUpSchema } from './auth.schema';

// A password from before the complexity policy: no digit, no symbol.
const LEGACY_PASSWORD = 'correcthorse';

describe('SignInSchema', () => {
  it('accepts a password that predates the sign-up policy', () => {
    expect(
      SignInSchema.safeParse({
        email: 'user@example.com',
        password: LEGACY_PASSWORD,
      }).success,
    ).toBe(true);
  });

  it('only requires the password to be present', () => {
    const result = SignInSchema.safeParse({
      email: 'user@example.com',
      password: '',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toHaveLength(1);
    expect(result.error?.issues[0].message).toBe('Password is required.');
  });
});

describe('SignUpSchema', () => {
  it('still enforces the complexity policy for new passwords', () => {
    expect(
      SignUpSchema.safeParse({
        name: 'New User',
        email: 'user@example.com',
        password: LEGACY_PASSWORD,
      }).success,
    ).toBe(false);
  });
});
