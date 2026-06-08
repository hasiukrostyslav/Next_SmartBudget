import type { Metadata } from 'next';

import { SIGN_UP_PATH } from '@/routes';
import { METADATA_TEXT } from '@/lib/constants/messages';

import LoginForm from '@/components/forms/LoginForm';
import AuthFormContainer from '@/components/layouts/AuthFormContainer';
import AuthLink from '@/components/ui/links/AuthLink';

export const metadata: Metadata = {
  title: METADATA_TEXT.SIGN_IN,
};

export default function LoginPage() {
  return (
    <AuthFormContainer heading="Login to account">
      <LoginForm />
      <p className="mt-3 text-xs text-slate-400">
        Don&apos;t have an account?{' '}
        <AuthLink href={SIGN_UP_PATH}>Sign Up</AuthLink>
      </p>
    </AuthFormContainer>
  );
}
