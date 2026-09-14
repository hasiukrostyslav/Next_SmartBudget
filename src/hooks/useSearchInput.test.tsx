// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SEARCH_DEBOUNCE_MS, useSearchInput } from './useSearchInput';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/transactions',
  useRouter: () => ({ replace }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

const type = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
) => handleChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);

describe('useSearchInput with the URL', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState(
      null,
      '',
      '/dashboard/transactions?sort=amount',
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    replace.mockReset();
  });

  it('writes the search param once typing pauses, not per keystroke', () => {
    const { result } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );

    act(() => {
      type(result.current.handleChange, 'g');
      type(result.current.handleChange, 'gr');
      type(result.current.handleChange, 'gro');
    });

    expect(result.current.searchQuery).toBe('gro');
    expect(replace).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS));

    expect(replace).toHaveBeenCalledTimes(1);
    const url = new URL(replace.mock.calls[0][0], 'http://localhost');
    expect(url.searchParams.get('search')).toBe('gro');
    // Params already in the URL are kept.
    expect(url.searchParams.get('sort')).toBe('amount');
  });

  it('clears immediately and cancels a pending write', () => {
    const { result } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );

    act(() => type(result.current.handleChange, 'taxi'));
    act(() => result.current.handleClear());

    expect(result.current.searchQuery).toBe('');
    expect(replace).toHaveBeenCalledTimes(1);
    expect(
      new URL(replace.mock.calls[0][0], 'http://localhost').searchParams.has(
        'search',
      ),
    ).toBe(false);

    act(() => vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS));
    expect(replace).toHaveBeenCalledTimes(1);
  });

  it('does not navigate after unmounting mid-debounce', () => {
    const { result, unmount } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );

    act(() => type(result.current.handleChange, 'car'));
    unmount();
    vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS);

    expect(replace).not.toHaveBeenCalled();
  });
});

describe('useSearchInput without the URL', () => {
  it('filters locally and never navigates', () => {
    const { result } = renderHook(() => useSearchInput({}));

    act(() => type(result.current.handleChange, 'pet'));

    expect(result.current.searchQuery).toBe('pet');
    expect(replace).not.toHaveBeenCalled();
  });
});
