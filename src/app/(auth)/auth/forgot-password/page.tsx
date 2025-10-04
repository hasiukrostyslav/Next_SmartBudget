import type { Metadata } from 'next';
import Link from 'next/link';
import AuthFormContainer from '@/_components/AuthFormContainer';
import ForgotPasswordForm from '@/_components/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <AuthFormContainer heading="Forgot Password?">
      <ForgotPasswordForm />
      <Link
        className="outline-round-sm mt-3 text-sm text-slate-900 hover:text-slate-800 dark:text-slate-300 hover:dark:text-slate-400"
        href="/auth/login"
      >
        Back to Login
      </Link>
    </AuthFormContainer>
  );
}
