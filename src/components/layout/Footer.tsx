import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { getSocialIcon } from '@/lib/icons';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { CookieSettingsButton } from './CookieBanner';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Logo } from './Logo';
import { LocalClock } from './LocalClock';

/**
 * Footer commun à toutes les pages (§ 10), sur le modèle Footer19 : fond sombre
 * avec halos et trame de points, newsletter en haut, colonnes de liens au
 * milieu, bande légale en bas.
 */
export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations('footer');
  const tCommon = await getTranslations('common');
  const site = getSite(locale);
  const { footer, contact, social } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-secondary-900 text-white">
      {/* Halos : #1372a2 à 30 % en bas au début de ligne, #388caf à 15 % en haut
          à la fin de ligne (§ 10.4). Ils suivent le sens de lecture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 start-0 size-96 rounded-full bg-primary/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 end-0 size-80 rounded-full bg-accent/15 blur-[120px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid" />

      <div className="relative container-page">
        {/* Bloc newsletter */}
        <Reveal className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium tracking-wider uppercase text-accent">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgb(56_140_175_/_0.6)]" />
              </span>
              {footer.newsletter.badge}
            </span>
            <p className="mt-5 text-2xl leading-snug font-light text-white sm:text-3xl">
              {footer.newsletter.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <NewsletterForm consent={footer.newsletter.consent} />
          </div>
        </Reveal>

        {/* Bloc liens */}
        <RevealGroup className="grid gap-12 py-16 lg:grid-cols-[1fr_2fr]" stagger={0.1}>
          <RevealItem>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-dark">{site.slogan}</p>
            <ul
              aria-label={t('socialLabel')}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
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

          <RevealItem as="nav" className="grid gap-10 sm:grid-cols-3">
            <div aria-label={t('navigationLabel')} className="contents">
              {footer.columns.map((column) => (
                <div key={column.title}>
                  <h2 className="text-xs font-semibold tracking-wider uppercase text-white">
                    {column.title}
                  </h2>
                  <ul className="mt-5 space-y-3">
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
                </div>
              ))}

              {/* Colonne Contact : icônes en #388caf, téléphone et e-mail cliquables (§ 10.2) */}
              <div>
                <h2 className="text-xs font-semibold tracking-wider uppercase text-white">
                  {footer.contactTitle}
                </h2>
                <ul className="mt-5 space-y-4 text-sm text-white/70">
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
              </div>
            </div>
          </RevealItem>
        </RevealGroup>

        {/* Bande du bas (§ 10.3) */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{t('copyright', { year })}</p>
          <p className="flex items-center gap-2">
            <span>{footer.location}</span>
            <span aria-hidden="true">·</span>
            <span className="sr-only">{t('localTime')}: </span>
            <LocalClock locale={locale} />
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
        </div>
      </div>
    </footer>
  );
}
