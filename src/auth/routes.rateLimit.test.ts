// Drives the real Auth.js route handlers from auth.ts in-process, the way a
// script would call /api/auth/* directly. Only the database, the limiter and
// the env module are mocked.
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const users = vi.hoisted(() => ({
  getUserByEmail: vi.fn(),
  getUserById: vi.fn(),
  createUser: vi.fn(),
}));
const limits = vi.hoisted(() => ({
  isLoginAllowed: vi.fn(async () => false),
  isSignUpAllowed: vi.fn(async () => false),
}));

vi.mock('@/lib/db/users', () => users);
vi.mock('@/lib/rateLimit', () => limits);
vi.mock('@/lib/env', () => ({
  env: {
    AUTH_SECRET: 'route-test-secret-not-used-anywhere-else-0123',
    DATABASE_URL: 'postgres://u:p@127.0.0.1:1/none?sslmode=disable',
  },
}));

const BASE = 'http://localhost:3000/api/auth';

type Handler = (request: Request) => Promise<Response>;
let handlers: { GET: Handler; POST: Handler };
let csrfToken = '';
let cookie = '';

beforeAll(async () => {
  ({ handlers } = (await import('./auth')) as unknown as {
    handlers: { GET: Handler; POST: Handler };
  });
  const response = await handlers.GET(new Request(`${BASE}/csrf`));
  csrfToken = ((await response.json()) as { csrfToken: string }).csrfToken;
  cookie = response.headers
    .getSetCookie()
    .map((value) => value.split(';')[0])
    .join('; ');
});

beforeEach(() => vi.clearAllMocks());

const post = (provider: string, fields: Record<string, string>) =>
  handlers.POST(
    new Request(`${BASE}/callback/${provider}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        cookie,
      },
      body: new URLSearchParams({
        ...fields,
        csrfToken,
        callbackUrl: '/dashboard',
      }),
    }),
  );

describe('the Auth.js routes', () => {
  it('apply the sign-in limit to a direct POST', async () => {
    const response = await post('credentials', {
      email: 'victim@example.com',
      password: 'guess-1',
    });
    const location = new URL(response.headers.get('location')!, BASE);

    expect(location.pathname).toBe('/auth/login');
    expect(location.searchParams.get('code')).toBe('rate_limited');
    expect(limits.isLoginAllowed).toHaveBeenCalledWith('victim@example.com');
    expect(users.getUserByEmail).not.toHaveBeenCalled();
  });

  it('apply the sign-up limit to a direct POST', async () => {
    const response = await post('signup', {
      name: 'Spam',
      email: 'spam@example.com',
      password: 'Str0ng!pass',
    });

    expect(
      new URL(response.headers.get('location')!, BASE).searchParams.get('code'),
    ).toBe('rate_limited');
    expect(limits.isSignUpAllowed).toHaveBeenCalled();
    expect(users.createUser).not.toHaveBeenCalled();
  });

  it("send Auth.js's own sign-in page to the app's login page", async () => {
    const response = await handlers.GET(new Request(`${BASE}/signin`));
    expect(new URL(response.headers.get('location')!, BASE).pathname).toBe(
      '/auth/login',
    );
  });
});
