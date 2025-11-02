'use client';

import Link from 'next/link';
import clsx from 'clsx';
import Logo from '../ui/Logo';
import Navbar from './Navbar';
import ThemeButton from '../ui/ThemeButton';
import Icon from '../ui/Icon';
import { useState } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <aside
      className={clsx(
        'relative row-span-full flex flex-col items-center px-4 py-2.5',
        'border-r-2 border-blue-400 bg-slate-100 dark:bg-slate-800',
        isCollapsed ? 'w-32' : 'w-58',
      )}
    >
      <Link className="outline-round-md flex justify-center" href="/">
        {!isCollapsed && <Logo className="h-10" type="lg" />}
        {isCollapsed && <Logo className="h-10" type="sm" />}
      </Link>
      <Navbar isCollapsed={isCollapsed} />
      <ThemeButton className="mt-auto self-center justify-self-center" />

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={clsx(
          'outline-round-sm absolute -right-9 bottom-2.5 rounded-r-lg p-2',
          'border-2 border-l-0 border-blue-400 text-blue-400 hover:text-blue-500 dark:text-blue-200',
        )}
      >
        <Icon
          className={clsx(
            'transform transition-transform duration-500 ease-in-out',
            isCollapsed ? 'rotate-180' : 'rotate-0',
          )}
          name="chevrons-left"
          size={18}
        />
      </button>
    </aside>
  );
}
