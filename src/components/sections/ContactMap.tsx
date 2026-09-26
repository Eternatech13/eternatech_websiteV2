'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { useConsent, writeConsent } from '@/lib/consent';

/**
 * Carte Google Maps intégrée (§ 9.2 bloc 7).
 *
 * Elle n'est chargée qu'après acceptation des cookies tiers : tant que le
 * consentement n'est pas donné, seul un substitut est affiché, avec un bouton
 * qui vaut acceptation explicite (§ 11 — conformité).
 */
export function ContactMap({ embedUrl }: { embedUrl: string }) {
  const t = useTranslations('contact');
  const consent = useConsent();
  const [forced, setForced] = useState(false);

  const allowed = consent === 'accepted' || forced;

  if (!allowed) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-card border border-secondary/10 bg-surface p-8 text-center sm:h-80">
        <MapPin className="size-8 text-primary" aria-hidden="true" />
        <p className="max-w-md text-sm leading-relaxed text-secondary/70">{t('mapConsent')}</p>
        <button
          type="button"
          onClick={() => {
            writeConsent('accepted');
            setForced(true);
          }}
          className="rounded-brand bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary"
        >
          {t('mapConsentButton')}
        </button>
      </div>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={t('mapFrameTitle')}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-72 w-full rounded-card border border-secondary/10 sm:h-80"
    />
  );
}
