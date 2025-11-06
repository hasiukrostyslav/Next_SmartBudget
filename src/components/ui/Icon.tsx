import { icons } from '@/lib/constants/icons';
import type { IconName } from '@/types/types';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({
  name,
  className,
  color,
  size,
  strokeWidth,
}: IconProps) {
  const Icon = icons[name];

  return (
    <Icon
      name={name}
      strokeWidth={strokeWidth}
      size={size}
      color={color}
      className={className}
    />
  );
}
