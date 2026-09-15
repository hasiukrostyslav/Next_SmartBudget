// @vitest-environment jsdom
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

import AuthLink from './links/AuthLink';
import Modal from './modals/Modal';

vi.mock('next/link', () => ({
  default: ({ className, href, children }: React.ComponentProps<'a'>) => (
    <a className={className} href={href}>
      {children}
    </a>
  ),
}));

afterEach(cleanup);

it('does not render the class "undefined" when no className is passed', () => {
  const { container } = render(
    <>
      <AuthLink href="/auth/signup">Sign Up</AuthLink>
      <Modal ref={{ current: null }}>content</Modal>
    </>,
  );

  for (const element of container.querySelectorAll('[class]')) {
    expect(element.getAttribute('class')).not.toMatch(/\bundefined\b/);
  }
});
