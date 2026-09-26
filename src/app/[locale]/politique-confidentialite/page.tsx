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
    path: '/politique-confidentialite',
    title: legal.privacy.title,
    description: legal.privacy.seoDescription,
  });
}

/** Politique de confidentialité (§ 4 et § 11 — conformité). */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const { privacy } = site.legal;

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: privacy.title }]}
          title={privacy.title}
          withNetwork={false}
        />
        <LegalSections sections={privacy.sections} showCookieSettings />
      </main>
    </>
  );
}
