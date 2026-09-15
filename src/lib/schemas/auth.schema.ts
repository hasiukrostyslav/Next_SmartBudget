import * as z from 'zod';

// Emails are trimmed and lowercased before validation, so "Foo@Example.com "
// and "foo@example.com" are one account.
const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, { message: 'Please enter a valid email.' })
  .pipe(z.email({ message: 'Please enter a valid email.' }));

export const SignUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(100, { message: 'Name must be 100 characters or fewer.' })
    .trim(),
  email: EmailSchema,
  password: z
    .string()
    .min(8, { message: 'Password should be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, {
      message: 'Password should contain at least one letter.',
    })
    .regex(/[0-9]/, { message: 'Password should contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password should contain at least one special character.',
    })
    // bcrypt uses only the first 72 bytes of a password.
    .max(72, { message: 'Password must be 72 characters or fewer.' })
    .trim(),
});

// Sign-in checks presence only. Complexity rules belong to sign-up and to
// password changes: enforcing them here locked out every account whose
// password predates the policy, and showed the policy to anyone at the door.
export const SignInSchema = z.object({
  email: EmailSchema,
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    // Only a guard against oversized input: no account has a longer password.
    .max(1000),
});
