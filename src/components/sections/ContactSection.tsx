import { getTranslations } from 'next-intl/server';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { getSite } from '@/content';
import type { Locale } from '@/i18n/routing';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactMap } from './ContactMap';

/**
 * Section Contact (§ 4) : formulaire, coordonnées et carte.
 *
 * Le numéro d'Eterna Tech est affiché à côté du formulaire avec un lien d'appel
 * et un lien WhatsApp. Numéros, e-mails et adresses restent en lecture de
 * gauche à droite même en arabe (§ 11 — éléments non inversés).
 */
export async function ContactSection({
  locale,
  withMap = true,
  headingLevel = 'h2',
}: {
  locale: Locale;
  withMap?: boolean;
  headingLevel?: 'h1' | 'h2';
}) {
  const t = await getTranslations('contact');
  const tCommon = await getTranslations('common');
  const site = getSite(locale);
  const { contact } = site;

  return (
    <section id="contact" className="bg-surface py-20 md:py-28">
      <div className="container-page">
        {headingLevel === 'h2' ? (
          <SectionHeading
            badge={contact.badge}
            title={
              <>
                <span>{contact.title}</span>
                <span className="text-brand-gradient">{contact.titleAccent}</span>
              </>
            }
            subtitle={contact.subtitle}
            align="center"
          />
        ) : null}

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          {/* Formulaire */}
          <Reveal className="rounded-card border border-secondary/10 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-medium text-secondary">{t('formTitle')}</h3>
            <div className="mt-6">
              <ContactForm subjects={contact.subjects} />
            </div>
          </Reveal>

          {/* Coordonnées */}
          <Reveal className="space-y-8">
            <div className="rounded-card border border-secondary/10 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-medium text-secondary">{t('infoTitle')}</h3>

              <dl className="mt-6 space-y-6 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-secondary">{t('addressLabel')}</dt>
                    <dd className="mt-1 text-secondary/70">
                      {contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <a
                        href={contact.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-block font-medium text-primary transition-colors hover:text-accent"
                      >
                        {tCommon('seeOnMaps')}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-secondary">{t('phoneLabel')}</dt>
                    <dd className="mt-1">
                      <a
                        href={contact.phoneLink}
                        dir="ltr"
                        aria-label={tCommon('callUs')}
                        className="text-secondary/70 transition-colors hover:text-primary"
                      >
                        {contact.phone}
                      </a>
                      <a
                        href={contact.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
                      >
                        <FaWhatsapp className="size-4" aria-hidden="true" />
                        {tCommon('whatsapp')}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-secondary">{t('emailLabel')}</dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${contact.email}`}
                        dir="ltr"
                        className="text-secondary/70 transition-colors hover:text-primary"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <dt className="font-medium text-secondary">{t('hoursLabel')}</dt>
                    <dd className="mt-1 text-secondary/70">{contact.hours}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {withMap && (
              <div>
                <h3 className="mb-4 text-xl font-medium text-secondary">{t('mapTitle')}</h3>
                <ContactMap embedUrl={contact.mapsEmbedUrl} />
              </div>
            )}

            {!withMap && (
              <ArrowLink href="/contact">{t('pageTitle')}</ArrowLink>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
