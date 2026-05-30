'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { signUp } from '@/lib/actions/authActions';
import { INPUT_PLACEHOLDER } from '@/lib/constants/messages';
import { SignUpSchema } from '@/lib/schemas/schema';
import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';

import Button from '../ui/buttons/Button';
import FormError from '../ui/FormError';
import Icon from '../ui/Icon';
import Input from '../ui/inputs/Input';

type FormInputs = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string>();
  const { buttonRole, toggleVisibility } = usePasswordVisibility();

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
        placeholder={INPUT_PLACEHOLDER.name}
        disabled={isPending}
        error={errors.name?.message}
        icon="name"
      />
      <Input
        {...register('email')}
        label="Email address"
        placeholder={INPUT_PLACEHOLDER.email}
        disabled={isPending}
        error={errors.email?.message}
        icon="email"
      />
      <Input
        {...register('password')}
        label="Password"
        placeholder={INPUT_PLACEHOLDER.password}
        disabled={isPending}
        error={errors.password?.message}
        icon="password"
        trailingButton={{
          role: buttonRole,
          onClick: toggleVisibility,
        }}
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
