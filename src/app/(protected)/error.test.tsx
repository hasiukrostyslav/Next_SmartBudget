// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn() }) }));
vi.mock('next/image', () => ({
  default: (props: { alt: string }) => (
    <span role="img" aria-label={props.alt} />
  ),
}));

const { default: ProtectedError } = await import('./error');

afterEach(cleanup);

it('"Try again" calls retry, which re-fetches the segment', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const retry = vi.fn();

  render(<ProtectedError error={new Error('boom')} retry={retry} />);
  fireEvent.click(screen.getByRole('button', { name: /try again/i }));

  expect(retry).toHaveBeenCalledOnce();
});
