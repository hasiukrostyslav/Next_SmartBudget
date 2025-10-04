'use client';

import Button from './Button';
import Input from './Input';

export default function ForgotPasswordForm() {
  return (
    <form autoComplete="off" className="mt-6 flex w-full flex-col gap-5">
      <Input label="Email address" name="email" />
      <Button type="submit">Reset Password</Button>
    </form>
  );
}
