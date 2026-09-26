'use client';

import { useEffect, useState } from 'react';

/**
 * Consentement cookies (§ 4 et § 11).
 *
 * Seuls les cookies strictement nécessaires sont posés par défaut : la
 * préférence de langue de next-intl et la mémorisation de ce choix. Rien
 * d'autre n'est chargé avant un accord explicite — ni mesure d'audience, ni
 * contenu tiers comme la carte Google Maps.
 */
export const CONSENT_KEY = 'eternatech-cookie-consent';
export const CONSENT_EVENT = 'eternatech:consent-change';
export const OPEN_SETTINGS_EVENT = 'eternatech:open-cookie-settings';

export type ConsentValue = 'accepted' | 'rejected';

export function readConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Stockage indisponible (navigation privée stricte) : on n'insiste pas.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/**
 * Lit le consentement et se met à jour quand il change.
 * `null` signifie « pas encore de choix », et non « refusé ».
 */
export function useConsent(): ConsentValue | null {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(readConsent());

    const onChange = (event: Event) => {
      setConsent((event as CustomEvent<ConsentValue>).detail ?? readConsent());
    };

    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return consent;
}
