'use server';

import z from 'zod';
import { prisma } from './db';
import { SignInSchema, SignUpSchema } from './zod';

export async function signUp(formData: FormData) {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error).properties;
  }

  const newUser = await prisma.users.create({
    data: {
      user_name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    },
  });
}

export async function login(formData: FormData) {
  const validatedFields = SignInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return z.treeifyError(validatedFields.error).properties;
  }

  const user = await prisma.users.findUnique({
    where: {
      email: validatedFields.data.email,
    },
  });
}
