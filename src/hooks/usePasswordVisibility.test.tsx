// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { expect, it } from 'vitest';

import { usePasswordVisibility } from './usePasswordVisibility';

it('offers "show" while hidden and "hide" while shown', () => {
  const { result } = renderHook(() => usePasswordVisibility());
  expect(result.current.buttonRole).toBe('showPassword');

  act(() => result.current.toggleVisibility());
  expect(result.current.buttonRole).toBe('hidePassword');

  act(() => result.current.toggleVisibility());
  expect(result.current.buttonRole).toBe('showPassword');
});

it('stays consistent when toggled twice in one update', () => {
  const { result } = renderHook(() => usePasswordVisibility());

  act(() => {
    result.current.toggleVisibility();
    result.current.toggleVisibility();
  });

  expect(result.current.buttonRole).toBe('showPassword');
});
