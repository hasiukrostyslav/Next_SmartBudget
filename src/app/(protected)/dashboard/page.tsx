import { auth, signOut } from '@/auth/auth';

export default async function page() {
  const session = await auth();

  return (
    <div>
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/auth/login' });
        }}
      >
        <h1 className="text-3xl">Hello {session?.user?.name}</h1>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
