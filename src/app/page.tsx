import { redirect } from 'next/navigation';

import { DEFAULT_LOGIN_PATH } from '@/routes';

export default function RootPage() {
  redirect(DEFAULT_LOGIN_PATH);
}
