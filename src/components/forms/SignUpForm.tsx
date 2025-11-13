'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@/lib/actions/authActions';
import { SignUpSchema } from '@/lib/schemas/schema';
import Button from '../ui/buttons/Button';
import Input from '../ui/inputs/Input';
import Icon from '../ui/Icon';
import FormError from '../ui/FormError';

type FormInputs = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: FormInputs) {
    setServerError(undefined);

    startTransition(async () => {
      const result = await signUp(data);
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
        {...register('name')}
        label="Full name"
        placeholder="Please enter your full name"
        disabled={isPending}
        error={errors.name?.message}
        withError
        icon="name"
      />
      <Input
        {...register('email')}
        label="Email address"
        placeholder="Please enter your email"
        disabled={isPending}
        error={errors.email?.message}
        withError
        icon="email"
      />
      <Input
        {...register('password')}
        label="Password"
        placeholder="Please enter your password"
        disabled={isPending}
        error={errors.password?.message}
        withError
        icon="password"
        withButton
      />

      {serverError && <FormError message={serverError} />}

      <Button
        size="lg"
        color="black"
        disabled={isPending}
        type="submit"
        className="mt-3"
      >
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
