'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/buttons/Button';
import ErrorState from '@/components/ui/feedback/ErrorState';
import Icon from '@/components/ui/icons/Icon';

// Catches render errors outside the dashboard (the auth pages).
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6">
      <ErrorState type="server" page="outer" />
      <Button color="blue" size="md" onClick={reset}>
        <Icon name="refresh" size={16} />
        Try again
      </Button>
    </section>
  );
}
