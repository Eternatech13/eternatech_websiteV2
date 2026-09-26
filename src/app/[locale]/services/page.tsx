import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getServices, getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const { intro } = getServices(typedLocale);
  const t = await getTranslations({ locale, namespace: 'services' });

  return buildMetadata({
    locale: typedLocale,
    path: '/services',
    title: intro.title,
    description: `${intro.subtitle} ${t('pageIntro')}`,
  });
}

/** Page Services : grille des 13 services (§ 4). */
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const { intro, items } = getServices(typedLocale);
  const t = await getTranslations('services');

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: intro.title }]}
          title={intro.title}
          tagline={t('pageIntro')}
        />

        <section className="bg-surface py-16 md:py-20">
          <div className="container-page">
            <RevealGroup
              as="ul"
              stagger={0.07}
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((service, index) => (
                <RevealItem as="li" key={service.slug} className="h-full">
                  <ServiceCard service={service} priority={index < 3} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} cta={t('ctaButton')} />
      </main>
    </>
  );
}
