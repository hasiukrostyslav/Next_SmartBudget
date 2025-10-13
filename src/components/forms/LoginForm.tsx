'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/lib/actions/auth';
import { SignInSchema } from '@/lib/schemas/schema';
import AuthLink from '../ui/AuthLink';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../ui/Icon';
import FormError from '../ui/FormError';

type FormInputs = z.infer<typeof SignInSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string>();

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
      if (result.error) {
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
        placeholder="Please enter your email"
        disabled={isPending}
        error={errors.email?.message}
      />
      <Input
        label="Password"
        {...register('password')}
        placeholder="Please enter your password"
        isPassword
        disabled={isPending}
        error={errors.password?.message}
      />
      <AuthLink href="/auth/forgot-password" className="mb-3 self-end">
        Forgot password
      </AuthLink>
      {serverError && <FormError message={serverError} />}
      <Button color="black" disabled={isPending} type="submit">
        {!isPending ? (
          'Sign In'
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
