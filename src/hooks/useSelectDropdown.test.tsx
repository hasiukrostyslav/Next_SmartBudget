// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSelectDropdown } from './useSelectDropdown';

describe('useSelectDropdown', () => {
  it('toggles from the latest state when called twice in one update', () => {
    const { result } = renderHook(() => useSelectDropdown());

    act(() => {
      result.current.handleToggleExpanded();
      result.current.handleToggleExpanded();
    });

    // Reading the closed-over value made both calls open it.
    expect(result.current.isContentExpanded).toBe(false);
  });

  it('opens on a single toggle', () => {
    const { result } = renderHook(() => useSelectDropdown());
    act(() => result.current.handleToggleExpanded());
    expect(result.current.isContentExpanded).toBe(true);
  });
});
