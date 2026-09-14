'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/buttons/Button';
import ErrorState from '@/components/ui/feedback/Error';
import Icon from '@/components/ui/icons/Icon';

// Catches render errors inside the dashboard so the sidebar, header and footer
// stay on screen and the user can retry in place.
export default function ProtectedError({
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
    <div className="flex flex-col items-center gap-6">
      <ErrorState type="server" />
      <Button color="blue" size="md" onClick={reset}>
        <Icon name="refresh" size={16} />
        Try again
      </Button>
    </div>
  );
}
