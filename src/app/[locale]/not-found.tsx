import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { ButtonLink } from '@/components/ui/Button';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  const locale = (await getLocale()) as Locale;
  const site = getSite(locale);

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu" className="flex min-h-dvh items-center bg-secondary-900 pt-24 pb-20">
        <div className="container-page text-center">
          <p className="text-brand-gradient-light text-6xl font-bold sm:text-8xl">404</p>
          <h1 className="mt-6 text-2xl font-bold text-white sm:text-3xl">{t('title')}</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-on-dark">{t('body')}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/" variant="primary" size="lg">
              {t('cta')}
            </ButtonLink>
          </div>
        </div>
      </main>
    </>
  );
}
