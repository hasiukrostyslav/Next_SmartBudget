'use server';

import { prisma } from './db';

export async function signUp(formData: FormData) {
  const userName = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  const newUser = await prisma.users.create({
    data: {
      user_name: userName,
      email,
      password,
    },
  });
  console.log(newUser);
}

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log(user);
}
