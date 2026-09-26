import { setRequestLocale } from 'next-intl/server';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { ContactSection } from '@/components/sections/ContactSection';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';

/**
 * Page d'accueil (§ 4) : Hero, Services, Solutions, Qui sommes-nous, Contact.
 *
 * Le rythme des fonds suit le § 9.1 : Hero sombre, Services clair,
 * Solutions blanc, À propos sombre, Contact clair, Footer sombre.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);

  return (
    <>
      {/* Header transparent posé sur la Hero sombre, opaque au défilement (§ 6.1) */}
      <Header nav={site.nav} variant="overlay" />
      <main id="contenu">
        <Hero locale={typedLocale} />
        <ServicesSection locale={typedLocale} />
        <SolutionsSection locale={typedLocale} />
        <AboutPreview locale={typedLocale} />
        <ContactSection locale={typedLocale} withMap={false} />
      </main>
    </>
  );
}
