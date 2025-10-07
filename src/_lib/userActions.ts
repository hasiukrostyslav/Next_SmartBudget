'use server';

import z from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from './db';
import { SignInSchema, SignUpSchema } from './schema';

type SignUpFormData = z.infer<typeof SignUpSchema>;
type SignInFormData = z.infer<typeof SignInSchema>;

export async function signUp(formData: SignUpFormData) {
  const validatedFields = SignUpSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: z.treeifyError(validatedFields.error).properties,
    };
  }

  await prisma.users.create({
    data: {
      user_name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    },
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
