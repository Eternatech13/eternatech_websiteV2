import { getTranslations } from 'next-intl/server';
import { MessageCircleQuestionMark, Phone } from 'lucide-react';
import { getFaq, getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { FaqTabs } from './FaqTabs';

/**
 * Section Foire aux questions.
 *
 * Ajout au périmètre du cahier des charges, sur le modèle FAQ2 recoloré avec la
 * palette. Sur la page d'accueil, elle est placée juste avant la section
 * Contact : elle lève les dernières questions au moment où le visiteur est le
 * plus près de nous écrire.
 *
 * `withJsonLd` n'est activé que sur la page /faq, afin que les données
 * structurées FAQPage ne soient déclarées qu'une seule fois sur le site
 * (§ 11 — SEO, données structurées).
 */
export async function FaqSection({
  locale,
  withJsonLd = false,
  showIntro = true,
}: {
  locale: Locale;
  withJsonLd?: boolean;
  showIntro?: boolean;
}) {
  const t = await getTranslations('faq');
  const { intro, categories } = getFaq(locale);
  const site = getSite(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    ),
  };

  return (
    <section id="faq" className="relative overflow-hidden bg-surface py-20 md:py-28">
      {withJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Halo de marque, pour que la section ne soit pas un aplat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 start-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px] rtl:translate-x-1/2"
      />

      <div className="relative container-page">
        {showIntro && (
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-primary shadow-sm">
              <MessageCircleQuestionMark className="size-3.5" aria-hidden="true" />
              {intro.badge}
            </p>
            <h2 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-secondary sm:text-4xl md:text-5xl">
              {intro.title}
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-secondary/70 md:text-base">
              {intro.subtitle}
            </p>
          </Reveal>
        )}

        <Reveal className="w-full">
          <FaqTabs categories={categories} />
        </Reveal>

        {/* Panneau de renvoi pour les questions non couvertes */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="flex flex-col items-center gap-5 rounded-card border border-secondary/10 bg-white p-6 text-center shadow-sm sm:flex-row sm:justify-between sm:p-7 sm:text-start">
            <div>
              <p className="text-base font-bold text-secondary">{t('moreTitle')}</p>
              <p className="mt-1 text-sm text-secondary/70">{t('moreBody')}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={site.contact.phoneLink}
                dir="ltr"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.contact.phone}
              </a>
              <ButtonLink href="/contact" variant="solid">
                {t('moreCta')}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
