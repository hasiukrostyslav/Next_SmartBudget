'use client';

import Button from './Button';
import Input from './Input';

export default function ForgotPasswordForm() {
  return (
    <form autoComplete="off" className="flex w-full flex-col gap-3">
      <Input
        label="Email address"
        name="email"
        defaultValue=""
        placeholder="Please enter your password"
      />
      <Button color="black" type="submit">
        Reset Password
      </Button>
    </form>
  );
}
