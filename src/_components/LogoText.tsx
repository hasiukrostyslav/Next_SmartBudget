'use client';

import useTheme from '@/_hooks/useTheme';

export default function LogoText() {
  const { theme } = useTheme();

  return (
    <svg
      viewBox='0 0 200 50'
      xmlns='http://www.w3.org/2000/svg'
      width={200}
      height={52}
      role='img'
      aria-label='SmartBudget logo'
    >
      <text
        x={0}
        y={32}
        fontSize={32}
        fontWeight={600}
        fill={
          theme === 'light'
            ? 'var(--color-slate-900)'
            : 'var(--color-slate-200)'
        }
      >
        <tspan fill='var(--color-blue-600)'>{'S'}</tspan>
        {'mart'}
        <tspan fill='var(--color-blue-600)'>{'B'}</tspan>
        {'udget\n'}
      </text>
    </svg>
  );
}
