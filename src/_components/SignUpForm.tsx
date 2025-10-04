'use client';

import { useActionState, useEffect } from 'react';
import { signUp } from '@/_lib/userActions';
import { toast } from 'react-toastify';
import { toastOptions } from '@/_lib/constants';
import Button from './Button';
import Input from './Input';
import Toast from './Toast';
import Icon from './Icon';

export default function SignUpForm() {
  const [state, action, isPending] = useActionState(signUp, undefined);

  useEffect(() => {
    if (state?.success)
      toast(<Toast type="signUp" role="success" />, toastOptions);
  }, [state]);

  return (
    <form
      action={action}
      autoComplete="off"
      className="mt-6 flex w-full flex-col gap-2"
    >
      <Input
        label="Name"
        name="name"
        defaultValue={state?.payloads?.name}
        error={state?.errors?.name?.errors.at(0)}
        disabled={isPending}
      />
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
      <Button disabled={isPending} type="submit" className="mt-3">
        {!isPending ? (
          'Sign Up'
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Icon name="loader-circle" className="animate-spin" />
            Submit
          </span>
        )}
      </Button>
    </form>
  );
}
