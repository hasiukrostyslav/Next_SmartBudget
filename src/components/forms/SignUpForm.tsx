'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { signUp } from '@/lib/userActions';
import { SignUpSchema } from '@/lib/schema';
import { toastOptions } from '@/lib/constants';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Toast from '../ui/Toast';
import Icon from '../ui/Icon';

type FormInputs = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
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
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: FormInputs) {
    setServerError({});

    startTransition(async () => {
      const result = await signUp(data);
      if (result && result.error) {
        setServerError({
          name: result.error?.name?.errors.at(0),
          email: result.error?.email?.errors.at(0),
          password: result.error?.password?.errors.at(0),
        });
        return;
      }
    });

    reset();
    toast(<Toast type="signUp" role="success" />, toastOptions);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className="mt-6 flex w-full flex-col gap-2"
    >
      <Input
        label="Full name"
        {...register('name')}
        placeholder="Please enter your full name"
        disabled={isPending}
        error={errors.name?.message || serverError.name}
      />
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
      <Button color="black" disabled={isPending} type="submit" className="mt-3">
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
