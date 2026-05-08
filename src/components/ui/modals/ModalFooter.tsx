import clsx from 'clsx';
import Icon from '../Icon';
import Button from '../buttons/Button';
import { ItemType } from '@/types/types';
import { MODAL_CONFIG } from '@/lib/constants/ui';

interface ModalFooterProps {
  itemType: ItemType;
  itemsCount?: number;
  disabled?: boolean;
  operationType: keyof typeof MODAL_CONFIG.footer;
  handleClose: () => void;
}

export default function ModalFooter({
  itemsCount,
  itemType,
  disabled,
  operationType,
  handleClose,
}: ModalFooterProps) {
  const footerConfig = MODAL_CONFIG.footer[operationType];

  const submitButtonText =
    operationType !== 'edit'
      ? ` ${itemsCount && itemsCount > 1 ? `${itemsCount} ${itemType}s` : itemType}`
      : '';

  return (
    <footer
      className={clsx(
        'flex items-center justify-between gap-8 rounded-b-md px-6 py-5 text-base',
        'border-t border-slate-300 bg-slate-100',
        'dark:border-slate-600 dark:bg-slate-900',
      )}
    >
      <div className={clsx('flex gap-1', footerConfig.infoColor)}>
        <Icon name={footerConfig.infoIcon} size={12} />
        <span className="text-xs">{footerConfig.infoText}</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button type="button" color="outline" size="md" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          color={footerConfig.buttonColor}
          size="md"
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <Icon name={footerConfig.buttonIcon} size={16} />
          {footerConfig.buttonText + submitButtonText}
        </Button>
      </div>
    </footer>
  );
}
