import { signOut } from '@/auth/auth';
import ButtonIcon from '../ui/ButtonIcon';

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/auth/login' });
      }}
    >
      <ButtonIcon
        size={18}
        iconName="log-out"
        shape="square"
        variant="outline"
        className="rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
      />
    </form>
  );
}
