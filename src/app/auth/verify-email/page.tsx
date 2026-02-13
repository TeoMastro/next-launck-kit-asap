'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { InfoAlert } from '@/components/info-alert';

export default function VerifyEmailPage() {
  const router = useRouter();
  const t = useTranslations('app');
  const [status, setStatus] = useState<'loading' | 'success'>('loading');

  useEffect(() => {
    // Supabase handles email verification via the /auth/callback route.
    // If the user lands here, they've already been verified (callback redirected them)
    // or they navigated here directly after signing up.
    setStatus('success');

    const timer = setTimeout(() => {
      router.push(
        '/auth/signin?message=' +
          encodeURIComponent(t('verificationSuccessRedirect'))
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [t, router]);

  const handleBackToLogin = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {t('pageTitle')}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t('pageSubtitle')}
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            {status === 'loading' && (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <CardTitle>{t('verifying')}</CardTitle>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-green-600 dark:text-green-400">
                    {t('successTitle')}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {t('verificationSuccess')}
                  </CardDescription>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {status === 'success' && (
              <div className="space-y-4">
                <InfoAlert message={t('redirectingMessage')} type="success" />
                <Button
                  onClick={handleBackToLogin}
                  className="w-full"
                  variant="default"
                >
                  {t('backToLoginButton')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
