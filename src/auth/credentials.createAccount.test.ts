import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Prisma } from '../../generated/client';

vi.mock('@/lib/db/users', () => ({
  getUserByEmail: vi.fn(),
  createUser: vi.fn(),
}));

const users = await import('@/lib/db/users');
const { createAccount } = await import('./credentials');

const input = {
  name: 'New User',
  email: 'New@Example.com',
  password: 'Str0ng!pass',
};
const row = {
  id: 'user-1',
  name: 'New User',
  email: 'new@example.com',
  emailVerified: null,
  image: null,
  password: 'hash',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => vi.clearAllMocks());

describe('createAccount', () => {
  it('stores a hash of the password and returns only public fields', async () => {
    vi.mocked(users.createUser).mockResolvedValueOnce(row);

    await expect(createAccount(input)).resolves.toEqual({
      id: 'user-1',
      name: 'New User',
      email: 'new@example.com',
      image: null,
    });

    const [name, email, hash] = vi.mocked(users.createUser).mock.calls[0];
    expect([name, email]).toEqual(['New User', 'new@example.com']);
    expect(bcrypt.compareSync(input.password, hash)).toBe(true);
    expect(users.getUserByEmail).not.toHaveBeenCalled();
  });

  it('rejects the sign-in when another sign-up took the email', async () => {
    vi.mocked(users.createUser).mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
        code: 'P2002',
        clientVersion: 'test',
      }),
    );
    await expect(createAccount(input)).resolves.toBeNull();
  });

  it('lets a database failure surface', async () => {
    vi.mocked(users.createUser).mockRejectedValueOnce(new Error('timeout'));
    await expect(createAccount(input)).rejects.toThrow('timeout');
  });

  it('rejects invalid input without touching the database', async () => {
    await expect(
      createAccount({ ...input, password: 'weak' }),
    ).resolves.toBeNull();
    expect(users.createUser).not.toHaveBeenCalled();
  });
});
