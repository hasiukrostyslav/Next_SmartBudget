import { icons } from '@/lib/constants/icons';

export type IconName = keyof typeof icons;

// Toast Component types
interface ToastStyleProps<I extends IconName> {
  icon: I;
  bgIcon: string;
  border: string;
  bg: string;
}

export interface ToastRoles {
  success: ToastStyleProps<'check'>;
  error: ToastStyleProps<'x'>;
  info: ToastStyleProps<'info'>;
  warning: ToastStyleProps<'circle-alert'>;
}

// Auth input with icons types
export interface InputIcons {
  name: Extract<IconName, 'user'>;
  email: Extract<IconName, 'mail'>;
  password: Extract<IconName, 'lock'>;
}
