import { Prisma } from '../../../generated/client';

// P2002: a unique constraint rejected the write — here, an email that another
// sign-up inserted between our existence check and our INSERT.
export function isUniqueConstraintError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}
