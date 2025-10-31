import { auth } from '@/auth/auth';
import SignOutForm from '../forms/SignOutForm';
import ButtonIcon from './ButtonIcon';

export default async function UserPanel() {
  const session = await auth();
  const userName = session?.user?.name;

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
        <span>{userName}</span>
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
