import { db } from './db';

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
}
