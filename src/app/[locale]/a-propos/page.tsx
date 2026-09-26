import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Building2 } from 'lucide-react';
import { getAbout, getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { ContactMap } from '@/components/sections/ContactMap';
import { CtaBand } from '@/components/sections/CtaBand';
import { MissionValues } from '@/components/sections/MissionValues';
import { PageHero } from '@/components/sections/PageHero';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { StatsGrid } from '@/components/sections/StatsGrid';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const about = getAbout(locale as Locale);

  return buildMetadata({
    locale: locale as Locale,
    path: '/a-propos',
    title: about.page.seo.title,
    description: about.page.seo.description,
  });
}

/** Page À propos complète (§ 9.2). */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const site = getSite(typedLocale);
  const about = getAbout(typedLocale);
  const t = await getTranslations('about');
  const tContact = await getTranslations('contact');
  const tCommon = await getTranslations('common');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(typedLocale, [
              { name: 'Eterna Tech', path: '/' },
              { name: about.page.title, path: '/a-propos' },
            ]),
          ),
        }}
      />

      <Header nav={site.nav} variant="solid" />

      <main id="contenu">
        <PageHero
          breadcrumb={[{ label: t('pageTitle') }]}
          title={about.page.title}
          tagline={about.page.tagline}
        />

        {/* Qui sommes-nous + chiffres clés */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-page">
            <Reveal className="mx-auto max-w-3xl text-center">
              <Badge tone="light" icon={Building2}>
                {about.preview.badge}
              </Badge>
              <h2 className="mt-5 text-2xl leading-tight font-light tracking-tight text-secondary sm:text-3xl md:text-4xl">
                <span>{about.preview.title}</span>
                <span className="text-brand-gradient">{about.preview.titleAccent}</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-secondary/70">
                {about.preview.description}
              </p>
            </Reveal>

            <div className="mt-14">
              <StatsGrid figures={about.figures} tone="light" />
            </div>
          </div>
        </section>

        {/* Mission et valeurs */}
        <MissionValues about={about} />

        {/* Notre approche */}
        <ProcessTimeline
          steps={about.approach.steps}
          title={about.approach.title}
          subtitle={about.approach.subtitle}
        />

        {/* Notre histoire */}
        <section className="bg-white py-20 md:py-24">
          <div className="container-page">
            <Reveal className="text-center">
              <h2 className="text-2xl leading-tight font-light tracking-tight text-secondary sm:text-3xl md:text-4xl">
                {about.history.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-secondary/70 sm:text-base">
                {about.history.subtitle}
              </p>
            </Reveal>

            <ol className="mx-auto mt-12 max-w-3xl space-y-6">
              {about.history.steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={index * 0.05}
                  className="flex gap-5 rounded-card border border-secondary/10 bg-surface p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient-short text-sm font-medium text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-secondary">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary/70">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Où nous trouver */}
        <section className="bg-surface py-20 md:py-24">
          <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <Reveal>
              <h2 className="text-2xl leading-tight font-light tracking-tight text-secondary sm:text-3xl">
                {about.location.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-secondary/70 sm:text-base">
                {about.location.subtitle}
              </p>

              <address className="mt-7 space-y-1.5 text-sm text-secondary/80 not-italic">
                {site.contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <ul className="mt-5 space-y-2 text-sm">
                <li>
                  <a
                    href={site.contact.phoneLink}
                    dir="ltr"
                    aria-label={tCommon('callUs')}
                    className="font-medium text-primary transition-colors hover:text-accent"
                  >
                    {site.contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    dir="ltr"
                    className="font-medium text-primary transition-colors hover:text-accent"
                  >
                    {site.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary transition-colors hover:text-accent"
                  >
                    {tCommon('seeOnMaps')}
                  </a>
                </li>
              </ul>
            </Reveal>

            <Reveal>
              <h3 className="sr-only">{tContact('mapTitle')}</h3>
              <ContactMap embedUrl={site.contact.mapsEmbedUrl} />
            </Reveal>
          </div>
        </section>

        <CtaBand title={t('ctaTitle')} body={t('ctaBody')} cta={t('ctaButton')} />
      </main>
    </>
  );
}
