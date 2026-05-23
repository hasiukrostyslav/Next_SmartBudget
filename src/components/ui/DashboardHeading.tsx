'use client';

import { usePathname } from 'next/navigation';

export default function DashboardHeading() {
  const pathname = usePathname();
  const heading = pathname.split('/').at(-1);

  return (
    <h2 className="min-w-40 text-xl font-semibold tracking-wider">
      {heading ? heading[0].toUpperCase() + heading.slice(1) : ''}
    </h2>
  );
}
