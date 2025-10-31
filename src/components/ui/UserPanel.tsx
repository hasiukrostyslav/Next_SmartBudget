import SignOutForm from '../forms/SignOutForm';
import ButtonIcon from './ButtonIcon';

export default function UserPanel() {
  return (
    <div className="ml-10 flex items-center">
      <div className="mr-6 flex items-center gap-3">
        <ButtonIcon
          size={16}
          iconName="message-circle-more"
          shape="round"
          variant="solid"
        />
        <ButtonIcon size={16} iconName="bell" shape="round" variant="solid" />
      </div>
      <div className="mr-4 flex items-center gap-2">
        <span>Rostyslav Hasiuk</span>
        <ButtonIcon
          size={18}
          iconName="user-round"
          shape="round"
          variant="outline"
        />
      </div>
      <SignOutForm />
    </div>
  );
}
