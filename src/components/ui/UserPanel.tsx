import { auth } from '@/auth/auth';

import SignOutForm from '../forms/SignOutForm';

// Only controls that do something. Messages, notifications and an account
// page don't exist yet; their buttons were focusable, named, and inert.
export default async function UserPanel() {
  const session = await auth();
  const userName = session?.user?.name;

  return (
    <div className="ml-auto flex items-center gap-4">
      <span>{userName}</span>
      <SignOutForm />
    </div>
  );
}
