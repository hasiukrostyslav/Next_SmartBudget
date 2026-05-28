import { redirect } from 'next/navigation';

import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export default function RootPage() {
  redirect(DEFAULT_LOGIN_REDIRECT);
}
