import { describe, expect, it } from 'vitest';

import { SignInSchema, SignUpSchema } from './auth.schema';

describe('email normalisation', () => {
  it('trims and lowercases the email on sign-in and sign-up', () => {
    expect(
      SignInSchema.parse({ email: '  Foo@Example.COM ', password: 'x' }).email,
    ).toBe('foo@example.com');
    expect(
      SignUpSchema.parse({
        name: 'Foo',
        email: 'Foo@Example.com',
        password: 'Str0ng!pass',
      }).email,
    ).toBe('foo@example.com');
  });

  it('still rejects an invalid address with the same message', () => {
    const result = SignInSchema.safeParse({
      email: 'not-an-email',
      password: 'x',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('Please enter a valid email.');
  });
});
