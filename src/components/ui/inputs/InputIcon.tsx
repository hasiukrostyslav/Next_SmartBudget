import { IconName } from '@/types/types';
import Icon from '../Icon';
import { INPUT_CONFIG } from '@/lib/constants/ui';
import { clsx } from 'clsx';

interface InputIconProps {
  name: IconName;
  padding: keyof typeof INPUT_CONFIG.padding;
}

const ICON_Y_POSITION = {
  xs: 'bottom-2 left-2',
  sm: 'bottom-2 left-2',
  md: 'bottom-2.5 left-2',
  lg: 'bottom-3.5 left-3',
};

export default function InputIcon({ name, padding }: InputIconProps) {
  return (
    <span className={clsx('absolute', ICON_Y_POSITION[padding])}>
      <Icon
        className="text-slate-400 dark:text-slate-400"
        size={padding === 'xs' ? 16 : 18}
        name={name}
      />
    </span>
  );
}
