import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { getServiceBySlug, getServiceSlugs, getServices } from '@/content';
import { locales, type Locale } from '@/i18n/routing';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';
import { getIcon } from '@/lib/icons';
import { accentClasses, cn, resolveAccent } from '@/lib/utils';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { NetworkBackground } from '@/components/ui/NetworkBackground';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/** Génère les 13 fiches × 3 langues au build (§ 11 — rendu statique). */
export function generateStaticParams() {
  return locales.flatMap((locale) => getServiceSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(locale as Locale, slug);
  if (!service) return {};

  return buildMetadata({
    locale: locale as Locale,
    path: `/services/${slug}`,
    title: service.seo.title,
    description: service.seo.description,
  });
}

/**
 * Fiche service (§ 7.5) : en-tête simplifié, hero du service, frise du
 * processus, caractéristiques, prestations incluses, appel à l'action et
 * 3 liens vers d'autres services.
 */
export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const service = getServiceBySlug(typedLocale, slug);
  if (!service) notFound();

  const t = await getTranslations('services');
  const { items } = getServices(typedLocale);
  const related = service.related
    .map((relatedSlug) => items.find((item) => item.slug === relatedSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const Icon = getIcon(service.icon);
  const accent = resolveAccent(service.accent);
  const colors = accentClasses[accent];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(typedLocale, service)),
        }}
      />

      {/* En-tête simplifié : bouton Retour, logo (§ 7.5) */}
      <SimpleHeader fallbackHref="/services" />

      <main id="contenu">
        {/* Hero du service : titre en dégradé de marque + phrase de présentation */}
        <section className="relative overflow-hidden bg-secondary-900 pt-32 pb-16 md:pt-36 md:pb-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgb(19_114_162_/_0.3),transparent_55%)]"
          />
          <NetworkBackground className="opacity-50" />

          <Reveal className="relative container-page max-w-3xl">
            <span
              aria-hidden="true"
              className="flex size-14 items-center justify-center rounded-2xl bg-primary/20 text-accent backdrop-blur-sm"
            >
              <Icon className="size-7" />
            </span>
            <p className="mt-6 flex items-center gap-2 text-xs font-medium tracking-wide uppercase text-accent">
              <span className={cn('size-1.5 rounded-full', colors.dot)} aria-hidden="true" />
              {service.category}
            </p>
            <h1 className="mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="text-brand-gradient-light">{service.hero.title}</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-on-dark sm:text-lg">
              {service.hero.intro}
            </p>
          </Reveal>
        </section>

        {/* Notre Processus */}
        <ProcessTimeline
          steps={service.process}
          title={t('processTitle')}
          subtitle={t('processSubtitle')}
        />

        {/* Caractéristiques et prestations incluses */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-2xl leading-tight font-bold text-secondary sm:text-3xl">
                {t('featuresTitle')}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="rounded-card border border-secondary/10 bg-surface p-6 sm:p-8">
              <h2 className="text-2xl leading-tight font-bold text-secondary sm:text-3xl">
                {t('includesTitle')}
              </h2>
              <ul className="mt-6 space-y-3">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-secondary/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                      <Check className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-secondary/50">
                {t('includesNote')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 3 liens vers d'autres services (§ 7.5) */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container-page">
            <h2 className="text-2xl leading-tight font-bold text-secondary sm:text-3xl">
              {t('relatedTitle')}
            </h2>
            <RevealGroup as="ul" stagger={0.1} className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <RevealItem as="li" key={item.slug} className="h-full">
                  <ServiceCard service={item} />
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
