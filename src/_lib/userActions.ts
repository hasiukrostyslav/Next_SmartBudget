'use server';

import z from 'zod';
import { prisma } from './db';
import { FormState, SignInSchema, SignUpSchema } from './zod';

export async function signUp(prevState: FormState, formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error).properties,
      payloads: {
        name: formData.get('name')?.toString() ?? '',
        email: formData.get('email')?.toString() ?? '',
        password: formData.get('password')?.toString() ?? '',
      },
    };
  }

  const newUser = await prisma.users.create({
    data: {
      user_name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    },
  });

  return { success: true };
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
