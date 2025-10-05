'use server';

import z from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from './db';
import { FormState, SignInSchema, SignUpSchema } from './zod';

type SignUpForData = z.infer<typeof SignUpSchema>;

export async function signUp(formData: SignUpForData) {
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

export async function login(prevState: FormState, formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error).properties,
      payloads: {
        email: formData.get('email')?.toString() ?? '',
        password: formData.get('password')?.toString() ?? '',
      },
    };
  }

  const user = await prisma.users.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });

  return { success: true };
}
