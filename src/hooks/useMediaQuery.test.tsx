// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from './useMediaQuery';

function mockMatchMedia(initial: boolean) {
  let matches = initial;
  const listeners = new Set<() => void>();
  window.matchMedia = vi.fn().mockImplementation(() => ({
    get matches() {
      return matches;
    },
    addEventListener: (_: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) =>
      listeners.delete(listener),
  }));
  return (next: boolean) => {
    matches = next;
    listeners.forEach((listener) => listener());
  };
}

afterEach(() => vi.restoreAllMocks());

describe('useMediaQuery', () => {
  it('reports the current match and follows changes', () => {
    const setMatches = mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-width: 1023px)'));

    expect(result.current).toBe(true);
    act(() => setMatches(false));
    expect(result.current).toBe(false);
  });
});
