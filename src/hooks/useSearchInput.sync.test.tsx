// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSearchInput } from './useSearchInput';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard/transactions',
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

const type = (
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string,
) => handleChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>);

afterEach(() => window.history.replaceState(null, '', '/'));

describe('useSearchInput state sync', () => {
  it('empties the box when the search param is removed from the URL', () => {
    window.history.replaceState(
      null,
      '',
      '/dashboard/transactions?search=taxi',
    );
    const { result, rerender } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );
    expect(result.current.searchQuery).toBe('taxi');

    window.history.replaceState(null, '', '/dashboard/transactions');
    rerender();

    expect(result.current.searchQuery).toBe('');
  });

  it('keeps typed text when another param changes', () => {
    window.history.replaceState(null, '', '/dashboard/transactions');
    const { result, rerender } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );

    act(() => type(result.current.handleChange, 'gro'));
    window.history.replaceState(
      null,
      '',
      '/dashboard/transactions?sort=amount',
    );
    rerender();

    expect(result.current.searchQuery).toBe('gro');
  });

  it("clears a dropdown's search each time the dropdown opens", () => {
    const { result, rerender } = renderHook(
      ({ open }) => useSearchInput({ isContentExpanded: open }),
      { initialProps: { open: true } },
    );

    act(() => type(result.current.handleChange, 'pet'));
    rerender({ open: false });
    expect(result.current.searchQuery).toBe('pet');

    rerender({ open: true });
    expect(result.current.searchQuery).toBe('');
  });

  it('keeps text typed after Clear when the cleared URL arrives late', () => {
    window.history.replaceState(null, '', '/dashboard/transactions?search=ab');
    const { result, rerender } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );

    act(() => result.current.handleClear());
    act(() => type(result.current.handleChange, 'd'));

    // The navigation from Clear lands after the user typed "d".
    window.history.replaceState(null, '', '/dashboard/transactions');
    rerender();

    expect(result.current.searchQuery).toBe('d');
  });

  it('still empties the box when something else removes the search later', () => {
    vi.useFakeTimers();
    window.history.replaceState(null, '', '/dashboard/transactions?search=ab');
    const { result, rerender } = renderHook(() =>
      useSearchInput({ isUpdateSearchParam: true }),
    );

    act(() => result.current.handleClear());
    window.history.replaceState(null, '', '/dashboard/transactions');
    rerender();

    act(() => type(result.current.handleChange, 'taxi'));
    act(() => vi.advanceTimersByTime(300)); // the debounced write of "taxi"
    window.history.replaceState(
      null,
      '',
      '/dashboard/transactions?search=taxi',
    );
    rerender();

    // "Clear all" elsewhere removes the search.
    window.history.replaceState(null, '', '/dashboard/transactions');
    rerender();
    expect(result.current.searchQuery).toBe('');

    vi.useRealTimers();
  });
});
