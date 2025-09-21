import type { Metadata } from 'next';
import Logo from '@/_components/Logo';
import LoginForm from '@/_components/LoginForm';
import AuthLink from '@/_components/AuthLink';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <div className='w-5/12 flex items-center justify-center flex-col gap-2'>
      <Logo />
      <LoginForm />
      <p className='text-xs mt-3 text-slate-400'>
        Don&apos;t have an account? <AuthLink href='/signup'>Sign Up</AuthLink>
      </p>
    </div>
  );
}
