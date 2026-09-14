import bcrypt from 'bcryptjs';

import { SALT_ROUNDS } from '@/lib/constants/constants';
import { getUserByEmail } from '@/lib/db/users';
import { SignInSchema } from '@/lib/schemas/auth.schema';

// Compared against when the email has no account, or the account has no
// password, so every attempt costs exactly one bcrypt comparison. Returning
// early answered unknown emails tens of milliseconds sooner: a timing oracle
// for which addresses have accounts.
const DUMMY_PASSWORD_HASH = bcrypt.hashSync('timing-equalizer', SALT_ROUNDS);

// The Credentials provider's authorize(): the signed-in user, or null.
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

  return user;
}
