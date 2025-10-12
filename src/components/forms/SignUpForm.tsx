'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/userActions';
import { SignUpSchema } from '@/lib/schema';
import Button from '../ui/Button';
import Input from '../ui/Input';
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: FormInputs) {
    setServerError({});

    startTransition(async () => {
      const failed = await signUp(data);
      if (failed) {
        setServerError({
          name: failed.errors?.name?.at(0),
          email: failed.errors?.email?.at(0),
          password: failed.errors?.password?.at(0),
        });
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
