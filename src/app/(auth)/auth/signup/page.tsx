import type { Metadata } from 'next';

import { LOGIN_PATH } from '@/routes';
import { METADATA_TEXT } from '@/lib/constants/messages';

import SignUpForm from '@/components/forms/SignUpForm';
import AuthFormContainer from '@/components/layouts/AuthFormContainer';
import AuthLink from '@/components/ui/links/AuthLink';

export const metadata: Metadata = {
  title: METADATA_TEXT.SIGN_UP,
};

export default function SignUpPage() {
  return (
    <AuthFormContainer heading="Create an account">
      <SignUpForm />
      <p className="mt-3 text-xs text-slate-400">
        Already have an account? <AuthLink href={LOGIN_PATH}>Sign In</AuthLink>
      </p>
    </AuthFormContainer>
  );
}
