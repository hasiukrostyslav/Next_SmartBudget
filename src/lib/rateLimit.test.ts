import { describe, expect, it, vi } from 'vitest';

vi.mock('./db/db', () => ({
  db: {
    $queryRaw: vi.fn(async () => {
      throw new Error('relation "rate_limits" does not exist');
    }),
  },
}));

const { consumeRateLimit } = await import('./rateLimit');

describe('consumeRateLimit', () => {
  it('fails open, and logs, when the counter cannot be read', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      consumeRateLimit('login:email:user@example.com', {
        limit: 1,
        windowSeconds: 60,
      }),
    ).resolves.toBe(true);
    expect(log).toHaveBeenCalled();

    log.mockRestore();
  });
});
