import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getFaq, getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { FaqSection } from '@/components/sections/FaqSection';
import { PageHero } from '@/components/sections/PageHero';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { intro } = getFaq(locale as Locale);

  return buildMetadata({
    locale: locale as Locale,
    path: '/faq',
    title: intro.title,
    description: intro.subtitle,
  });
}

/**
 * Page Foire aux questions.
 *
 * La même section est présente en bas de la page d'accueil, mais c'est cette
 * page qui porte les données structurées FAQPage : elles ne doivent être
 * déclarées qu'une seule fois sur le site.
 */
export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const { intro } = getFaq(typedLocale);

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: intro.title }]}
          title={intro.title}
          tagline={intro.subtitle}
        />
        <FaqSection locale={typedLocale} withJsonLd showIntro={false} />
      </main>
    </>
  );
}
