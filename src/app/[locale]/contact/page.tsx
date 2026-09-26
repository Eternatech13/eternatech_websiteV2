import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { ContactSection } from '@/components/sections/ContactSection';
import { PageHero } from '@/components/sections/PageHero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const site = getSite(locale as Locale);
  const t = await getTranslations({ locale, namespace: 'contact' });

  return buildMetadata({
    locale: locale as Locale,
    path: '/contact',
    title: t('pageTitle'),
    description: site.contact.subtitle,
  });
}

/** Page Contact : formulaire, coordonnées et carte (§ 4). */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const t = await getTranslations('contact');

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: t('pageTitle') }]}
          title={site.contact.title}
          titleAccent={site.contact.titleAccent}
          tagline={site.contact.subtitle}
        />
        <ContactSection locale={typedLocale} withMap headingLevel="h1" />
      </main>
    </>
  );
}
