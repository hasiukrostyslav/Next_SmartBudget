// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useCheckbox } from './useCheckbox';

describe('useCheckbox', () => {
  it('toggles rows and selects or clears the whole page', () => {
    const { result } = renderHook(() => useCheckbox(['a', 'b']));

    act(() => result.current.toggleSelect('a'));
    expect([...result.current.selectedIds]).toEqual(['a']);
    expect(result.current.isAllSelected).toBe(false);

    act(() => result.current.toggleSelectAll());
    expect(result.current.isAllSelected).toBe(true);

    act(() => result.current.toggleSelectAll());
    expect(result.current.selectedIds.size).toBe(0);
  });

  it('forgets rows that are no longer on the page', () => {
    const { result, rerender } = renderHook(({ ids }) => useCheckbox(ids), {
      initialProps: { ids: ['a', 'b', 'c'] },
    });

    act(() => result.current.selectAll());
    rerender({ ids: ['c'] });

    expect([...result.current.selectedIds]).toEqual(['c']);
    expect(result.current.isAllSelected).toBe(true);
  });
});
