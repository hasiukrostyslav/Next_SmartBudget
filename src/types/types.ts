import { icons } from '@/lib/constants/icons';

export type IconName = (typeof icons)[number]['role'];

// Toast Component types
interface ToastStyleProps<I extends IconName> {
  icon: I;
  bgIcon: string;
  border: string;
  bg: string;
}

export interface ToastRoles {
  success: ToastStyleProps<'check'>;
  error: ToastStyleProps<'close'>;
  info: ToastStyleProps<'info'>;
  warning: ToastStyleProps<'warning'>;
}

// Auth input with icons types
export interface InputIcons {
  name: Extract<IconName, 'name'>;
  email: Extract<IconName, 'email'>;
  password: Extract<IconName, 'password'>;
}
