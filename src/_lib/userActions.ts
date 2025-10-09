'use server';

import z from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from './db';
import { SignInSchema, SignUpSchema } from './schema';
import { cookies } from 'next/headers';

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

export async function signUp(formData: SignUpFormData) {
  // Form data validation
  const validatedFields = SignUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  // Checking if account with provided email exist
  const existUser = await prisma.users.findUnique({
    where: { email: validatedFields.data.email },
    select: { email: true },
  });

  if (existUser)
    return {
      errors: { email: ['An account with this email already exists.'] },
    };

  // Create new user
  await prisma.users.create({
    data: {
      user_name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    },
  });

  // Set cookie for Toast component
  const cookieStore = cookies();
  (await cookieStore).set({
    name: 'signup_success',
    value: '1',
    maxAge: 1,
  });

  redirect('/dashboard');
}

export async function login(formData: SignInFormData) {
  const validatedFields = SignInSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  const user = await prisma.users.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });

  redirect('/dashboard');
}
