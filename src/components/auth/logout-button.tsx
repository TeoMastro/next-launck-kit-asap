'use client';

import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const t = useTranslations('app');
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/signin');
    router.refresh();
  };

  return <a onClick={handleLogout}>{t('signOut')}</a>;
}
