import { db } from './db';

// These deliberately do not catch. A missing row is `null`; a failing query is
// an exception. Collapsing both into `null` made a database outage look like
// "Invalid email or password!" and let sign-up carry on after a failed INSERT.

// Case-insensitive, so an account stored with capitals before emails were
// normalised is still found. New accounts are stored lowercased.
//
// Compared with lower() rather than Prisma's insensitive `equals`, which
// compiles to ILIKE: "_" and "%" in the address acted as wildcards, so
// "j_hn@example.com" found "john@example.com". When rows differ only by case
// (the Express server stores emails as typed), the exact-case row wins, then
// the oldest.
export async function getUserByEmail(email: string) {
  const [match] = await db.$queryRaw<{ id: string }[]>`
    SELECT id FROM users
    WHERE lower(email) = lower(${email})
    ORDER BY (email = ${email}) DESC, created_at ASC
    LIMIT 1`;

  return match ? db.user.findUnique({ where: { id: match.id } }) : null;
}

export async function getUserById(id: string) {
  return db.user.findUnique({ where: { id } });
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  return db.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}
