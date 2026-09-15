// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import PaginationButton from '../pagination/PaginationButton';
import Button from './Button';
import ButtonLink from './ButtonLink';

afterEach(cleanup);

describe('link-styled buttons', () => {
  it('renders a disabled Button with an href as inert text', () => {
    const { container } = render(
      <Button color="blue" size="sm" href="/somewhere" disabled>
        Go
      </Button>,
    );
    expect(container.querySelector('a')).toBeNull();
    expect(screen.getByText('Go').getAttribute('aria-disabled')).toBe('true');
  });

  it('keeps an enabled Button with an href a link', () => {
    render(
      <Button color="blue" size="sm" href="/somewhere">
        Go
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Go' }).getAttribute('href')).toBe(
      '/somewhere',
    );
  });

  it('renders a disabled ButtonLink as inert text', () => {
    const { container } = render(
      <ButtonLink color="blue" iconName="undo" href="/" disabled>
        Home
      </ButtonLink>,
    );
    expect(container.querySelector('a')).toBeNull();
  });

  it('gives the current and unavailable pages no href', () => {
    render(
      <>
        <PaginationButton href="?page=1" page="prev" disabled />
        <PaginationButton href="?page=2" page={2} active />
        <PaginationButton href="?page=3" page="next" />
      </>,
    );

    const previous = screen.getByRole('link', { name: 'Previous page' });
    expect(previous.hasAttribute('href')).toBe(false);
    expect(previous.getAttribute('aria-disabled')).toBe('true');

    const current = screen.getByRole('link', { name: 'Page 2' });
    expect(current.hasAttribute('href')).toBe(false);
    expect(current.getAttribute('aria-current')).toBe('page');

    expect(
      screen.getByRole('link', { name: 'Next page' }).getAttribute('href'),
    ).toBe('?page=3');
  });
});
