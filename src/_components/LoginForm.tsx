'use client';

import { useActionState, useEffect } from 'react';
import { login } from '@/_lib/userActions';
import { toast } from 'react-toastify';
import { toastOptions } from '@/_lib/constants';
import AuthLink from './AuthLink';
import Button from './Button';
import Input from './Input';
import Toast from './Toast';
export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.success)
      toast(<Toast role="success" type="signUp" />, toastOptions);
  }, [state]);

  return (
    <form
      action={action}
      autoComplete="off"
      className="mt-6 flex w-full flex-col gap-2"
    >
      <Input
        label="Email address"
        name="email"
        defaultValue={state?.payloads?.email}
        error={state?.errors?.email?.errors.at(0)}
      />
      <Input
        label="Password"
        name="password"
        isPassword
        defaultValue={state?.payloads?.password}
        error={state?.errors?.password?.errors.at(0)}
      />
      <AuthLink href="#" className="mb-3 self-end">
        Forgot password
      </AuthLink>
      <Button disabled={isPending} type="submit">
        {!isPending ? 'Sing In' : 'Loading...'}
      </Button>
    </form>
  );
}
