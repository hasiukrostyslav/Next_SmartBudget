import { NextRequest } from 'next/server';

import { describe, expect, it, vi } from 'vitest';

// The proxy is next-auth's auth() wrapper around a handler; the mock hands the
// handler back, so it can be called with any session.
vi.mock('next-auth', () => ({
  default: vi.fn(() => ({ auth: (handler: unknown) => handler })),
}));

const { default: proxy } = await import('./proxy');

type Handler = (request: NextRequest & { auth: unknown }) => Promise<Response>;
const handle = proxy as unknown as Handler;

const request = (path: string, auth: unknown) =>
  Object.assign(new NextRequest(new URL(path, 'http://app.example')), { auth });

const signedIn = { user: { id: 'user-1' } };
const location = (response: Response) => response.headers.get('location');

describe('proxy', () => {
  it.each([
    '/.//evil.example',
    '/dashboard/..//evil.example/login',
    '/%2e//evil.example',
  ])(
    'keeps a signed-in redirect on this site for callbackUrl=%s',
    async (callbackUrl) => {
      const response = await handle(
        request(
          `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
          signedIn,
        ),
      );
      expect(new URL(location(response)!).host).toBe('app.example');
    },
  );

  it('sends a signed-in user on to a safe callbackUrl', async () => {
    const response = await handle(
      request(
        '/auth/login?callbackUrl=%2Fdashboard%2Ftransactions%3Fpage%3D2',
        signedIn,
      ),
    );
    expect(location(response)).toBe(
      'http://app.example/dashboard/transactions?page=2',
    );
  });

  it('treats an auth object without a user id as signed out', async () => {
    const response = await handle(
      request('/dashboard', { message: 'Configuration error' }),
    );
    expect(location(response)).toBe(
      'http://app.example/auth/login?callbackUrl=%2Fdashboard',
    );
  });
});
