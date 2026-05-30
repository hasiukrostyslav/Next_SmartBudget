'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { FORGOT_PASSWORD_PATH } from '@/routes';
import { login } from '@/lib/actions/authActions';
import { INPUT_PLACEHOLDER } from '@/lib/constants/messages';
import { SignInSchema } from '@/lib/schemas/schema';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';

import Button from '../ui/buttons/Button';
import FormError from '../ui/feedback/FormError';
import Icon from '../ui/icons/Icon';
import Input from '../ui/inputs/Input';
import AuthLink from '../ui/links/AuthLink';

type FormInputs = z.infer<typeof SignInSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string>();
  const { buttonRole, toggleVisibility } = usePasswordVisibility();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  async function onSubmit(data: FormInputs) {
    setServerError(undefined);

    startTransition(async () => {
      const result = await login(data);
      if (result?.error) {
        setServerError(result.error);
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="mt-6 flex w-full flex-col gap-2"
    >
      <Input
        label="Email address"
        {...register('email')}
        placeholder={INPUT_PLACEHOLDER.email}
        disabled={isPending}
        error={errors.email?.message}
        icon="email"
      />
      <Input
        label="Password"
        {...register('password')}
        placeholder={INPUT_PLACEHOLDER.password}
        disabled={isPending}
        error={errors.password?.message}
        icon="password"
        trailingButton={{
          role: buttonRole,
          onClick: toggleVisibility,
        }}
      />

      <AuthLink href={FORGOT_PASSWORD_PATH} className="mb-3 self-end">
        Forgot password
      </AuthLink>

      {serverError && <FormError message={serverError} />}

      <Button size="lg" color="black" disabled={isPending} type="submit">
        {!isPending ? (
          'Sign In'
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Icon size={24} name="loader-circle" className="animate-spin" />
            Submit
          </span>
        )}
      </Button>
    </form>
  );
}
