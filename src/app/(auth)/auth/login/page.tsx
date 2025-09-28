import type { Metadata } from 'next';
import AuthForm from '@/_components/AuthForm';
import LoginForm from '@/_components/LoginForm';
import AuthLink from '@/_components/AuthLink';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <AuthForm heading='Login to account'>
      <LoginForm />
      <p className='text-xs mt-3 text-slate-400'>
        Don&apos;t have an account?{' '}
        <AuthLink href='/auth/signup'>Sign Up</AuthLink>
      </p>
    </AuthForm>
  );
}
