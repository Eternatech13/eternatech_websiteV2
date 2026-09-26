import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getSite, getSolutions } from '@/content';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { CtaBand } from '@/components/sections/CtaBand';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { PageHero } from '@/components/sections/PageHero';
import { SolutionBlock } from '@/components/sections/SolutionBlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { intro } = getSolutions(locale as Locale);

  return buildMetadata({
    locale: locale as Locale,
    path: '/solutions',
    title: intro.title,
    description: intro.subtitle,
  });
}

/** Page Solutions : solution phare + expertise technologique (§ 4 et § 8). */
export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const { intro, items, expertise } = getSolutions(typedLocale);
  const t = await getTranslations('services');

  return (
    <>
      <Header nav={site.nav} variant="solid" />
      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: intro.title }]}
          title={intro.title}
          tagline={intro.subtitle}
        />

        <section className="bg-white py-16 md:py-20">
          <div className="container-page">
            <div className="space-y-24">
              {items.map((solution) => (
                <SolutionBlock key={solution.slug} solution={solution} />
              ))}
            </div>

            <ExpertiseSection expertise={expertise} />
          </div>
        </section>

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} cta={t('ctaButton')} />
      </main>
    </>
  );
}
