import { db } from './db';

export async function getUserByEmail(email: string) {
  try {
    const user = await db.users.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.users.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  try {
    await db.users.create({
      data: {
        name,
        email,
        password,
      },
    });
  } catch {
    return null;
  }
}
