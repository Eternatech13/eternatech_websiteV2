import { getTranslations } from 'next-intl/server';
import { Star } from 'lucide-react';
import { getAbout, getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { getIcon, getSocialIcon } from '@/lib/icons';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Counter } from '@/components/ui/Counter';
import { CssReveal } from '@/components/ui/CssReveal';
import { NetworkBackground } from '@/components/ui/NetworkBackground';

/**
 * Hero section (§ 6), structure du composant d'inspiration Hero4 : plein écran,
 * fond sombre, contenu aligné au début de ligne, barre de chiffres en bas.
 *
 * Fond retenu : l'animation de points reliés du site actuel, recolorée en
 * #1372a2 et #388caf (§ 6.1 point 7 — option laissée ouverte au § 6.4).
 *
 * Les apparitions sont faites en CSS et non en JavaScript : le titre porte le
 * LCP de la page (§ 11 — performance) et doit s'afficher sans attendre
 * l'hydratation, ni dépendre de l'exécution d'un script.
 */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations('hero');
  const site = getSite(locale);
  const about = getAbout(locale);
  const { hero } = site;

  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-secondary-900 text-white">
      {/* Fond : dégradé sombre + réseau animé + halos de marque */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(19_114_162_/_0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgb(56_140_175_/_0.25),transparent_50%)]"
      />
      <NetworkBackground className="opacity-70" />

      <div className="relative z-10 flex flex-1 flex-col justify-between pt-32 pb-12 md:pt-40">
        <div className="container-page flex flex-1 flex-col justify-center">
          <div className="max-w-3xl">
            <CssReveal delay={0.2} className="mb-8">
              <Badge tone="dark" icon={Star} uppercase>
                {hero.badge}
              </Badge>
            </CssReveal>

            <CssReveal as="h1" delay={0.35}>
              <span className="block text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {hero.titleLine1}
              </span>
              <span className="block text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                {hero.titleLine2Start}
                <span className="text-brand-gradient">{hero.titleLine2Accent}</span>
              </span>
            </CssReveal>

            <CssReveal
              as="p"
              delay={0.5}
              className="mt-6 max-w-xl text-base leading-relaxed font-normal text-on-dark sm:text-lg"
            >
              {hero.description.map((segment, index) =>
                segment.strong ? (
                  <strong key={index} className="font-semibold text-white">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={index}>{segment.text}</span>
                ),
              )}
            </CssReveal>

            <CssReveal delay={0.65} className="mt-9 flex flex-wrap items-center gap-4">
              <ButtonLink href={hero.primaryCta.href} variant="primary" size="lg">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </CssReveal>
          </div>
        </div>

        {/* Barre du bas : chiffres clés au début de ligne, réseaux sociaux à la fin */}
        <CssReveal delay={0.8} className="container-page mt-16 md:mt-24">
          <div className="flex flex-col justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center">
            <ul
              aria-label={t('keyFiguresLabel')}
              className="flex flex-wrap items-center gap-8 sm:gap-12"
            >
              {about.figures.map((figure) => {
                const Icon = getIcon(figure.icon);
                return (
                  <li key={figure.label} className="flex items-center gap-3">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-primary/20 text-accent backdrop-blur-sm">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <Counter
                        value={figure.number}
                        suffix={figure.suffix}
                        screenReaderLabel={figure.screenReaderLabel}
                        className="text-xl font-bold tracking-tight text-white sm:text-3xl"
                      />
                      <span className="text-sm text-on-dark" aria-hidden="true">
                        {figure.label}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <ul aria-label={t('socialLabel')} className="flex flex-wrap items-center gap-2.5">
              {site.social.map((item) => {
                const Icon = getSocialIcon(item.icon);
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="flex size-10 items-center justify-center rounded-brand border border-white/10 bg-white/5 text-on-dark transition-colors hover:border-accent hover:bg-primary hover:text-white"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </CssReveal>
      </div>
    </section>
  );
}
