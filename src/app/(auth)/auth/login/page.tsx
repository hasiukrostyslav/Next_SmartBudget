import type { Metadata } from 'next';
import AuthFormContainer from '@/_components/AuthFormContainer';
import LoginForm from '@/_components/LoginForm';
import AuthLink from '@/_components/AuthLink';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function LoginPage() {
  return (
    <AuthFormContainer heading="Login to account">
      <LoginForm />
      <p className="mt-3 text-xs text-slate-400">
        Don&apos;t have an account?{' '}
        <AuthLink href="/auth/signup">Sign Up</AuthLink>
      </p>
    </AuthFormContainer>
  );
}
