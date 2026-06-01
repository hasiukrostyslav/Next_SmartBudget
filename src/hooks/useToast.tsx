import { toast, ToastPosition, Zoom } from 'react-toastify';

import { TOAST_CONFIG } from '@/lib/constants/ui';

import Toast from '@/components/ui/feedback/Toast';

import { useTheme } from './useTheme';

export function useToast() {
  const { theme } = useTheme();
  const config = {
    position: 'bottom-center' as ToastPosition,
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme,
    transition: Zoom,
  };

  const toastSuccess = (
    operation: keyof typeof TOAST_CONFIG.success.header,
    entity: string,
  ) =>
    toast(
      <Toast role="success" operation={operation} entity={entity} />,
      config,
    );

  const toastError = (
    operation: keyof typeof TOAST_CONFIG.success.header,
    entity: string,
  ) =>
    toast(<Toast role="error" operation={operation} entity={entity} />, config);

  return { toastSuccess, toastError };
}
