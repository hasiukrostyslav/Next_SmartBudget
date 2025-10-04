import type { Metadata } from 'next';
import AuthFormContainer from '@/_components/AuthFormContainer';
import SignUpForm from '@/_components/SignUpForm';
import AuthLink from '@/_components/AuthLink';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <AuthFormContainer heading="Create an account">
      <SignUpForm />
      <p className="mt-3 text-xs text-slate-400">
        Already have an account? <AuthLink href="/auth/login">Sign In</AuthLink>
      </p>
    </AuthFormContainer>
  );
}
