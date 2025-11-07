import { icons } from '@/lib/constants/icons';
import type { IconName } from '@/types/types';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export default function Icon({ name, className, color, size }: IconProps) {
  const Icon = icons[name];

  return <Icon name={name} size={size} color={color} className={className} />;
}
