import { auth } from '@/auth/auth';

import SignOutForm from '../forms/SignOutForm';
import ButtonIcon from './buttons/ButtonIcon';

export default async function UserPanel() {
  const session = await auth();
  const userName = session?.user?.name;

  return (
    <div className="ml-auto flex items-center">
      <div className="mr-10 flex items-center gap-3">
        <ButtonIcon
          size={16}
          iconName="chat"
          label="Messages"
          shape="round"
          variant="solid"
        />
        <ButtonIcon
          size={16}
          iconName="message"
          label="Notifications"
          shape="round"
          variant="solid"
        />
      </div>
      <div className="mr-6 flex items-center gap-2">
        <span>{userName}</span>
        <ButtonIcon
          size={16}
          iconName="user"
          label="Account"
          shape="round"
          variant="outline"
        />
      </div>
      <SignOutForm />
    </div>
  );
}
