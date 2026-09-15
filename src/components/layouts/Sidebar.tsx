'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import ButtonIcon from '../ui/buttons/ButtonIcon';
import AnimatedLogo from '../ui/logos/AnimatedLogo';
import Navbar from './Navbar';

export default function Sidebar() {
  // Below the lg breakpoint the sidebar starts collapsed; once the user
  // toggles it, their choice wins.
  const isNarrowScreen = useMediaQuery('(max-width: 1023px)');
  const [collapsedByUser, setCollapsedByUser] = useState<boolean | null>(null);
  const isCollapsed = collapsedByUser ?? isNarrowScreen;

  return (
    <aside
      className={clsx(
        'relative row-span-full flex flex-col overflow-hidden border-r px-4 py-2.5',
        'border-blue-400 bg-slate-100 dark:bg-slate-800',
        'transition-[width] duration-1000 ease-in-out',
        isCollapsed ? 'w-18' : 'w-58',
      )}
    >
      <AnimatedLogo isCollapsed={isCollapsed} />
      <Navbar isCollapsed={isCollapsed} />

      <ButtonIcon
        onClick={() =>
          setCollapsedByUser((collapsed) => !(collapsed ?? isNarrowScreen))
        }
        iconName="chevrons-left"
        size={24}
        shape="square"
        variant="ghost"
        label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        withTooltip
        tooltipSide="right"
        className="mt-auto self-end text-blue-400 dark:text-blue-200"
        iconClassName={clsx(
          'transform transition-transform duration-500 ease-in-out',
          isCollapsed ? 'rotate-180' : 'rotate-0',
        )}
      />
    </aside>
  );
}
