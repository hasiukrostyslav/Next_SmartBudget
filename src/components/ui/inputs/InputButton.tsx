import Icon from '../Icon';

interface InputButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isVisible: boolean;
}

export default function InputButton({ onClick, isVisible }: InputButtonProps) {
  return (
    <button
      type="button"
      className="outline-round-sm absolute right-3 bottom-3.5"
      onClick={onClick}
    >
      <Icon
        className="text-slate-500 dark:text-slate-400"
        size={16}
        name={isVisible ? 'show' : 'hide'}
      />
    </button>
  );
}
