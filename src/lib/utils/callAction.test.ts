import { redirect } from 'next/navigation';

import { describe, expect, it, vi } from 'vitest';

import { callAction } from './callAction';

describe('callAction', () => {
  it('returns the action result unchanged', async () => {
    await expect(callAction(async () => ({ success: true }))).resolves.toEqual({
      success: true,
    });
  });

  it('turns a transport failure into a failure result instead of throwing', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = await callAction(async () => {
      throw new TypeError('Failed to fetch');
    });
    expect(result).toEqual({ success: false, error: expect.any(String) });
  });

  it('rethrows router errors so a redirect from an action still navigates', async () => {
    await expect(
      callAction(async () => {
        redirect('/dashboard');
      }),
    ).rejects.toMatchObject({
      digest: expect.stringContaining('NEXT_REDIRECT'),
    });
  });
});
