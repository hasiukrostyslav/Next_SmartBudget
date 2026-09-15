import bcrypt from 'bcryptjs';
import { expect, it, vi } from 'vitest';

vi.mock('@/lib/db/users', () => ({ getUserByEmail: vi.fn() }));
vi.mock('@/lib/rateLimit', () => ({ isLoginAllowed: vi.fn(async () => true) }));

const { getUserByEmail } = await import('@/lib/db/users');
const { verifyCredentials } = await import('./credentials');

it('returns only the public user fields, never the password hash', async () => {
  const password = 'correct horse battery';
  vi.mocked(getUserByEmail).mockResolvedValueOnce({
    id: 'user-1',
    name: 'User',
    email: 'user@example.com',
    emailVerified: null,
    image: null,
    password: bcrypt.hashSync(password, 4),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await expect(
    verifyCredentials({ email: 'user@example.com', password }),
  ).resolves.toEqual({
    id: 'user-1',
    name: 'User',
    email: 'user@example.com',
    image: null,
  });
});
