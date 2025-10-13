'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { login } from '@/lib/actions/auth';
import { SignInSchema } from '@/lib/schemas/schema';
import { toastOptions } from '@/lib/constants';
import AuthLink from '../ui/AuthLink';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Toast from '../ui/Toast';
import Icon from '../ui/Icon';

type FormInputs = z.infer<typeof SignInSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  async function onSubmit(data: FormInputs) {
    setServerError({});

    startTransition(async () => {
      const result = await login(data);
      if (result && result.error) {
        setServerError({
          email: result.error?.email?.errors.at(0),
          password: result.error?.password?.errors.at(0),
        });
        return;
      }
    });

    reset();
    toast(<Toast type="login" role="success" />, toastOptions);
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
        error={errors.email?.message || serverError.email}
      />
      <Input
        label="Password"
        {...register('password')}
        placeholder="Please enter your password"
        isPassword
        disabled={isPending}
        error={errors.password?.message || serverError.password}
      />
      <AuthLink href="/auth/forgot-password" className="mb-3 self-end">
        Forgot password
      </AuthLink>
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
