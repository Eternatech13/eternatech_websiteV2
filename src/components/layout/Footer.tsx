import { getTranslations } from 'next-intl/server';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { getSocialIcon } from '@/lib/icons';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Logo } from './Logo';
import { LocalClock } from './LocalClock';
import { CookieSettingsButton } from './CookieBanner';

/**
 * Footer commun à toutes les pages (§ 10), sur le modèle Footer19 : fond sombre
 * avec halo lumineux et trame de points, inscription à la newsletter en haut,
 * colonnes de liens au milieu, informations légales en bas.
 *
 * Adaptation des couleurs (§ 10.4) :
 *  - fond #0A0A0B → #071f3b (#0b305a assombri)
 *  - halo bas au début de ligne : violet à 20 % → #1372a2 à 30 %, flou 120 px,
 *    plus un second halo #388caf à 15 % en haut à la fin de ligne
 *  - point du badge : violet avec lueur → #388caf avec lueur #388caf
 *  - liens : gris → blanc à 70 %, #388caf au survol
 *  - bande du bas : gris foncé → blanc à 50 %, séparée par une ligne blanc à 10 %
 *  - sélection de texte : violet à 30 % → #388caf à 30 % (défini globalement)
 *
 * Deux écarts assumés par rapport au modèle, imposés par le cahier des charges :
 *  - les réseaux sociaux passent en icônes sous le slogan et non en liens texte
 *    dans la bande du bas (§ 10.1 et § 10.3) ;
 *  - la troisième colonne est la colonne Contact, avec adresse, téléphone et
 *    e-mail cliquables et icônes en #388caf (§ 10.2).
 */
export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations('footer');
  const tCommon = await getTranslations('common');
  const site = getSite(locale);
  const { footer, contact, social } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-secondary-900 text-on-dark">
      {/* Halos et trame de points */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-[20%] -start-[10%] size-[50%] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute -top-[15%] -end-[5%] size-[40%] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute inset-0 bg-dot-grid" />
      </div>

      <RevealGroup
        stagger={0.1}
        delayChildren={0.05}
        className="relative z-10 container-page flex min-h-[500px] flex-col justify-between pt-20 pb-10"
      >
        {/* ── Newsletter ── */}
        <div className="mb-20 flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-24">
          <RevealItem className="max-w-xl">
            <p className="mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_12px_rgb(56_140_175_/_0.85)]"
              />
              <span className="text-sm font-medium tracking-wide text-white/90">
                {footer.newsletter.badge}
              </span>
            </p>
            <h2 className="text-3xl leading-[1.1] font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {footer.newsletter.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </RevealItem>

          <RevealItem className="w-full max-w-md lg:mt-auto">
            <NewsletterForm consent={footer.newsletter.consent} />
          </RevealItem>
        </div>

        {/* ── Marque et colonnes de liens ── */}
        <div className="mb-20 flex flex-col items-start justify-between gap-14 lg:flex-row lg:gap-20">
          <RevealItem className="max-w-xs">
            <Logo tone="light" size="lg" />
            <p className="mt-5 text-sm leading-relaxed text-on-dark">{site.slogan}</p>

            {/* Réseaux sociaux en carrés arrondis, sous le slogan (§ 10.1) */}
            <ul aria-label={t('socialLabel')} className="mt-6 flex flex-wrap items-center gap-2.5">
              {social.map((item) => {
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
          </RevealItem>

          <nav
            aria-label={t('navigationLabel')}
            className="grid w-full grid-cols-2 gap-10 md:grid-cols-3 md:gap-12 lg:w-auto lg:gap-20"
          >
            {footer.columns.map((column) => (
              <RevealItem key={column.title} className="flex flex-col gap-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-white">
                  {column.title}
                </h3>
                <ul className="flex flex-col gap-4">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}

            {/* Colonne Contact : icônes #388caf, téléphone et e-mail cliquables (§ 10.2) */}
            <RevealItem className="col-span-2 flex flex-col gap-6 md:col-span-1">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-white">
                {footer.contactTitle}
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block not-italic">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                    <a
                      href={contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-accent transition-colors hover:text-white"
                    >
                      {footer.mapsLinkLabel}
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <a
                    href={contact.phoneLink}
                    dir="ltr"
                    aria-label={tCommon('callUs')}
                    className="transition-colors hover:text-accent"
                  >
                    {contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <a
                    href={`mailto:${contact.email}`}
                    dir="ltr"
                    aria-label={tCommon('writeToUs')}
                    className="transition-colors hover:text-accent"
                  >
                    {contact.email}
                  </a>
                </li>
              </ul>
            </RevealItem>
          </nav>
        </div>

        {/* ── Bande du bas (§ 10.3) ── */}
        <RevealItem className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <p>{t('copyright', { year })}</p>

          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-12">
            <p className="flex items-center gap-2">
              <Globe className="size-4 text-accent" aria-hidden="true" />
              {footer.location}
            </p>
            <p>
              <span className="sr-only">{t('localTime')}: </span>
              <LocalClock locale={locale} className="tabular-nums tracking-widest" />
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton label={t('cookiesSettings')} />
            </li>
          </ul>
        </RevealItem>
      </RevealGroup>
    </footer>
  );
}
