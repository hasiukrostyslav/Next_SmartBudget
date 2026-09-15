import bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from '@/lib/constants/constants';
import { isUniqueConstraintError } from '@/lib/db/errors';
import { createUser, getUserByEmail } from '@/lib/db/users';
import { SignInSchema, SignUpSchema } from '@/lib/schemas/auth.schema';

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

// The sign-in provider's authorize(): the user, or null.
export async function verifyCredentials(credentials: unknown) {
  const validatedFields = SignInSchema.safeParse(credentials);
  if (!validatedFields.success) return null;

  const { email, password } = validatedFields.data;
  const user = await getUserByEmail(email);

  const isValidPassword = await bcrypt.compare(
    password,
    user?.password ?? DUMMY_PASSWORD_HASH,
  );

  if (!user?.password || !isValidPassword) return null;

  return toSessionUser(user);
}

// The sign-up provider's authorize(): creates the account and returns it. The
// password is hashed once and never compared; sign-up used to create the user
// and then sign in through the provider above, hashing and re-checking it.
export async function createAccount(credentials: unknown) {
  const validatedFields = SignUpSchema.safeParse(credentials);
  if (!validatedFields.success) return null;

  const { name, email, password } = validatedFields.data;

  try {
    const user = await createUser(
      name,
      email,
      await bcrypt.hash(password, SALT_ROUNDS),
    );
    return toSessionUser(user);
  } catch (error) {
    // Another sign-up for the same email won the race. A rejected sign-in is
    // reported by the action as "an account with this email already exists".
    if (isUniqueConstraintError(error)) return null;
    throw error;
  }
}
