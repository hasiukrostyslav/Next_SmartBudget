import { db } from './db';

// These deliberately do not catch. A missing row is `null`; a failing query is
// an exception. Collapsing both into `null` made a database outage look like
// "Invalid email or password!" and let sign-up carry on after a failed INSERT.

// Case-insensitive, so an account stored with capitals before emails were
// normalised is still found. New accounts are stored lowercased.
export async function getUserByEmail(email: string) {
  return db.users.findFirst({
    where: { email: { equals: email, mode: 'insensitive' } },
  });
}

export async function getUserById(id: string) {
  return db.users.findUnique({ where: { id } });
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  return db.users.create({
    data: {
      name,
      email,
      password,
    },
  });
}
