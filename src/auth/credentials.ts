import bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from '@/lib/constants/constants';
import { isUniqueConstraintError } from '@/lib/db/errors';
import { createUser, getUserByEmail } from '@/lib/db/users';
import {
  isLoginAllowed,
  isSignUpAllowed,
  recordLoginFailure,
} from '@/lib/rateLimit';
import { SignInSchema, SignUpSchema } from '@/lib/schemas/auth.schema';

import { RateLimitedSignIn } from './errors';

// Compared against when the email has no account, or the account has no
// password, so every attempt costs exactly one bcrypt comparison. Returning
// early answered unknown emails tens of milliseconds sooner: a timing oracle
// for which addresses have accounts.
const DUMMY_PASSWORD_HASH = bcrypt.hashSync('timing-equalizer', SALT_ROUNDS);

// Only what the session needs. Auth.js passes this object to every callback
// and event, so the password hash must never be part of it.
function toSessionUser(user: {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}) {
  return { id: user.id, name: user.name, email: user.email, image: user.image };
}

// Rate limits are checked here, in each provider's authorize(), because both
// providers can be reached two ways: through the login and sign-up Server
// Actions, and by a POST straight to /api/auth/callback/<provider>. Checking
// only in the actions left the second way unlimited.

// The sign-in provider's authorize(): the user, or null.
export async function verifyCredentials(credentials: unknown) {
  const validatedFields = SignInSchema.safeParse(credentials);
  if (!validatedFields.success) return null;

  const { email, password } = validatedFields.data;
  if (!(await isLoginAllowed(email))) throw new RateLimitedSignIn();

  const user = await getUserByEmail(email);

  const isValidPassword = await bcrypt.compare(
    password,
    user?.password ?? DUMMY_PASSWORD_HASH,
  );

  if (!user?.password || !isValidPassword) {
    // Only failures count, so a successful sign-in never uses up the owner's
    // allowance.
    await recordLoginFailure(email);
    return null;
  }

  return toSessionUser(user);
}

// The sign-up provider's authorize(): creates the account and returns it. The
// password is hashed once and never compared; sign-up used to create the user
// and then sign in through the provider above, hashing and re-checking it.
export async function createAccount(credentials: unknown) {
  const validatedFields = SignUpSchema.safeParse(credentials);
  if (!validatedFields.success) return null;

  // Before hashing, so a flood of sign-ups can't spend bcrypt time.
  if (!(await isSignUpAllowed())) throw new RateLimitedSignIn();

  const { name, email, password } = validatedFields.data;

  try {
    const user = await createUser(
      name,
      email,
      await bcrypt.hash(password, SALT_ROUNDS),
    );
    return toSessionUser(user);
  } catch (error) {
    // The email already has an account (the unique index), possibly created a
    // moment ago by a concurrent sign-up. The action reports a rejected
    // sign-up as "an account with this email already exists".
    if (isUniqueConstraintError(error)) return null;
    throw error;
  }
}
