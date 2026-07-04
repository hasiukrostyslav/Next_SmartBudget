import { LOGIN_PATH } from '@/routes';
import { signOut } from '@/auth/auth';

import ButtonIcon from '../ui/buttons/ButtonIcon';

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: LOGIN_PATH });
      }}
    >
      <ButtonIcon
        size={18}
        iconName="log-out"
        shape="square"
        variant="ghost"
        type="submit"
      />
    </form>
  );
}
