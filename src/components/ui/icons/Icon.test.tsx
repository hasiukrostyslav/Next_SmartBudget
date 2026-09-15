// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';

import type { IconName } from '@/types/types';

import Icon from './Icon';

afterEach(cleanup);

it('renders the icon registered for a role', () => {
  const { container } = render(<Icon name="check" size={12} />);
  const svg = container.querySelector('svg');
  expect(svg?.getAttribute('class')).toContain('lucide-check');
  expect(svg?.getAttribute('width')).toBe('12');
});

it('renders nothing for an unknown role', () => {
  const { container } = render(<Icon name={'no-such-icon' as IconName} />);
  expect(container.innerHTML).toBe('');
});
it('puts only icon props on the svg', () => {
  const stray = { 'aria-checked': true, id: 'stray' } as object;
  const { container } = render(<Icon name="check" size={12} {...stray} />);
  const svg = container.querySelector('svg')!;

  expect(svg.hasAttribute('aria-checked')).toBe(false);
  expect(svg.hasAttribute('name')).toBe(false);
  expect(svg.hasAttribute('id')).toBe(false);
  expect(svg.getAttribute('width')).toBe('12');
});
