import type { Metadata } from 'next';

import { SIGN_UP_PATH } from '@/routes';
import { METADATA_TEXT } from '@/lib/constants/messages';
import { safeCallbackPath } from '@/lib/utils/callbackUrl';

import LoginForm from '@/components/forms/LoginForm';
import AuthFormContainer from '@/components/layouts/AuthFormContainer';
import AuthLink from '@/components/ui/links/AuthLink';

export const metadata: Metadata = {
  title: METADATA_TEXT.SIGN_IN,
};

export default async function LoginPage({
  searchParams,
}: PageProps<'/auth/login'>) {
  const { callbackUrl } = await searchParams;

  return (
    <AuthFormContainer heading="Login to account">
      <LoginForm
        callbackUrl={safeCallbackPath(
          typeof callbackUrl === 'string' ? callbackUrl : undefined,
        )}
      />
      <p className="mt-3 text-xs text-slate-400">
        Don&apos;t have an account?{' '}
        <AuthLink href={SIGN_UP_PATH}>Sign Up</AuthLink>
      </p>
    </AuthFormContainer>
  );
}
