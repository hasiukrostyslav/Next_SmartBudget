// Icon names
export type IconName =
  | 'eye'
  | 'eye-off'
  | 'mail'
  | 'lock'
  | 'user'
  | 'user-round'
  | 'sun'
  | 'moon'
  | 'check'
  | 'circle-check-big'
  | 'x'
  | 'info'
  | 'circle-alert'
  | 'triangle-alert'
  | 'loader-circle'
  | 'layout-grid'
  | 'credit-card'
  | 'arrow-left-right'
  | 'wallet-cards'
  | 'piggy-bank'
  | 'percent'
  | 'banknote-arrow-up'
  | 'settings'
  | 'chevrons-right'
  | 'chevrons-left'
  | 'search'
  | 'bell'
  | 'message-circle-more'
  | 'log-out';

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
