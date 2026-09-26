import { defineRouting } from 'next-intl/routing';

/**
 * Multilingue — cahier des charges § 11.
 * Français langue par défaut, anglais, arabe (RTL).
 * Un préfixe d'URL par langue : /fr, /en, /ar.
 */
export const locales = ['fr', 'en', 'ar'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

/** Langues à sens de lecture de droite à gauche. */
export const rtlLocales: readonly Locale[] = ['ar'];

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

/** Correspondance locale → code de langue complet (balises hreflang, Open Graph). */
export const localeToHtmlLang: Record<Locale, string> = {
  fr: 'fr-DZ',
  en: 'en',
  ar: 'ar-DZ',
};

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  fr: { short: 'FR', name: 'Français' },
  en: { short: 'EN', name: 'English' },
  ar: { short: 'AR', name: 'العربية' },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Toutes les langues sont préfixées, y compris le français.
  localePrefix: 'always',
  // Langue du navigateur proposée à la première visite, choix mémorisé
  // ensuite dans le cookie NEXT_LOCALE (§ 11 — Détection).
  localeDetection: true,
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  },
});
