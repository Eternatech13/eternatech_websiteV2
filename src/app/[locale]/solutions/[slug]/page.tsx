import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check } from 'lucide-react';
import { getSolutionBySlug, getSolutionSlugs } from '@/content';
import { locales, type Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo';
import { getIcon } from '@/lib/icons';
import { SimpleHeader } from '@/components/layout/SimpleHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { SolutionDashboard } from '@/components/sections/SolutionDashboard';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { NetworkBackground } from '@/components/ui/NetworkBackground';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

export function generateStaticParams() {
  return locales.flatMap((locale) => getSolutionSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolutionBySlug(locale as Locale, slug);
  if (!solution) return {};

  return buildMetadata({
    locale: locale as Locale,
    path: `/solutions/${slug}`,
    title: solution.seo.title,
    description: solution.seo.description,
    images: solution.detail.images.map((image) => image.src),
  });
}

/** Fiche solution : présentation détaillée, fonctionnalités, demande de démo (§ 4). */
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const solution = getSolutionBySlug(typedLocale, slug);
  if (!solution) notFound();

  const t = await getTranslations('solutions');
  const tServices = await getTranslations('services');
  const tCommon = await getTranslations('common');
  const { detail } = solution;

  return (
    <>
      <SimpleHeader fallbackHref="/solutions" />

      <main id="contenu">
        {/* Hero de la solution */}
        <section className="relative overflow-hidden bg-secondary-900 pt-32 pb-16 md:pt-36 md:pb-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(19_114_162_/_0.3),transparent_55%)]"
          />
          <NetworkBackground className="opacity-50" />

          <div className="relative container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              {solution.logo && (
                <Image
                  src={solution.logo}
                  alt={solution.name}
                  width={160}
                  height={56}
                  priority
                  className="mb-6 h-12 w-auto object-contain"
                />
              )}
              <Badge tone="dark">
                {t('badgePrefix')} · {solution.name}
              </Badge>
              <h1 className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-brand-gradient-light">{solution.title}</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-on-dark sm:text-lg">
                {detail.tagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/contact" variant="primary" size="lg">
                  {t('demoCta')}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal>
              <SolutionDashboard
                cards={solution.dashboard}
                altText={solution.dashboardAltText}
                caption={t('dashboardCaption')}
              />
              <p className="mt-3 text-xs text-on-dark-muted">{tCommon('illustrativeData')}</p>
            </Reveal>
          </div>
        </section>

        {/* Présentation détaillée */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <Reveal>
              <p className="text-base leading-relaxed text-secondary/80 sm:text-lg">
                {detail.longDescription}
              </p>

              <h2 className="mt-12 text-2xl leading-tight font-bold text-secondary sm:text-3xl">
                {t('capabilitiesTitle')}
              </h2>
              <RevealGroup as="ul" stagger={0.08} className="mt-8 grid gap-6 sm:grid-cols-2">
                {detail.capabilities.map((capability) => {
                  const Icon = getIcon(capability.icon);
                  return (
                    <RevealItem as="li" key={capability.title}>
                      <span
                        aria-hidden="true"
                        className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
                      >
                        <Icon className="size-5" />
                      </span>
                      <h3 className="mt-4 text-base font-semibold text-secondary">
                        {capability.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-secondary/70">
                        {capability.description}
                      </p>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </Reveal>

            {/* Caractéristiques techniques et public visé */}
            <Reveal className="space-y-8">
              <div className="rounded-card border border-secondary/10 bg-surface p-6 sm:p-8">
                <h2 className="text-xl font-bold text-secondary">{t('specsTitle')}</h2>
                <dl className="mt-5 space-y-3.5 text-sm">
                  {detail.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start justify-between gap-4 border-b border-secondary/10 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-secondary/60">{spec.label}</dt>
                      <dd className="text-end font-medium text-secondary">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-card border border-secondary/10 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-xl font-bold text-secondary">{detail.audience.title}</h2>
                <ul className="mt-5 space-y-3">
                  {detail.audience.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary/80"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Comment ça marche */}
        <ProcessTimeline steps={detail.howItWorks} title={t('howItWorksTitle')} />

        {/* Bénéfices et visuels du dispositif */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-2xl leading-tight font-bold text-secondary sm:text-3xl">
                {t('benefitsTitle')}
              </h2>
              <ul className="mt-8 space-y-3.5">
                {detail.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm leading-relaxed text-secondary/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                      <Check className="size-3" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs leading-relaxed text-secondary/50">
                {t('benefitsNote')}
              </p>
            </Reveal>

            {detail.images.length > 0 && (
              <RevealGroup as="ul" stagger={0.1} className="grid gap-6 sm:grid-cols-2">
                {detail.images.map((image) => (
                  <RevealItem
                    as="li"
                    key={image.src}
                    className="overflow-hidden rounded-card border border-secondary/10 bg-surface"
                  >
                    <div className="relative aspect-4/3">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <p className="border-t border-secondary/10 p-4 text-xs leading-relaxed text-secondary/60">
                      {image.caption}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>

        <CtaBand
          title={tServices('ctaTitle')}
          body={tServices('ctaBody')}
          cta={t('demoCta')}
        />
      </main>
    </>
  );
}
