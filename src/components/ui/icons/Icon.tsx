import type { IconName } from '@/types/types';

import { icons } from '@/lib/constants/icons';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

type RenderIcon = (props: IconProps) => React.ReactElement;

// Built once. Finding an icon used to scan the whole 90-entry list on every
// render of every icon. The map holds render functions rather than
// components, so Icon never picks a component type during render, which the
// React Compiler cannot prove stable.
const RENDER_BY_ROLE = new Map<string, RenderIcon>(
  icons.map(({ role, component: Component }) => [
    role,
    // Only the icon's own props reach the <svg>. Spreading every prop put
    // `name` and any stray attribute on it: a row checkbox's aria-checked made
    // axe report an invalid ARIA attribute on every row.
    ({ size, color, className, strokeWidth }) => (
      <Component
        size={size}
        color={color}
        className={className}
        strokeWidth={strokeWidth}
      />
    ),
  ]),
);

export default function Icon(props: IconProps) {
  return RENDER_BY_ROLE.get(props.name)?.(props) ?? null;
}
