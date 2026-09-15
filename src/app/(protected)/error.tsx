'use client';

import { useEffect } from 'react';

import Button from '@/components/ui/buttons/Button';
import ErrorState from '@/components/ui/feedback/ErrorState';
import Icon from '@/components/ui/icons/Icon';

// Catches render errors inside the dashboard so the sidebar, header and footer
// stay on screen and the user can retry in place. retry() re-fetches the
// segment before re-rendering it; reset() re-rendered without fetching, so an
// error from a failed server request came straight back.
export default function ProtectedError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-6">
      <ErrorState type="server" />
      <Button color="blue" size="md" onClick={retry}>
        <Icon name="refresh" size={16} />
        Try again
      </Button>
    </div>
  );
}
