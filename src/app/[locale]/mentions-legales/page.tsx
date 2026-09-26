import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { LegalSections } from '@/components/sections/LegalSections';
import { PageHero } from '@/components/sections/PageHero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { legal } = getSite(locale as Locale);

  return buildMetadata({
    locale: locale as Locale,
    path: '/mentions-legales',
    title: legal.notice.title,
    description: legal.notice.seoDescription,
  });
}

/** Mentions légales (§ 4 — pages légales). */
export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const { notice } = site.legal;

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: notice.title }]}
          title={notice.title}
          withNetwork={false}
        />
        <LegalSections sections={notice.sections} />
      </main>
    </>
  );
}
