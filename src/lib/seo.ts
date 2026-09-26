import type { Metadata } from 'next';
import { getSite } from '@/content';
import { locales, localeToHtmlLang, type Locale } from '@/i18n/routing';

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://eternatech.net'
).replace(/\/$/, '');

/** Construit l'URL absolue d'une page dans une langue donnée. */
export function absoluteUrl(locale: Locale, path = ''): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return `${siteUrl}/${locale}${clean}`;
}

/**
 * Métadonnées d'une page : title, description, canonical et balises hreflang
 * vers les trois langues (§ 11 — SEO).
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  images,
}: {
  locale: Locale;
  /** Chemin sans préfixe de langue, par exemple `/services/ui-ux`. */
  path: string;
  title?: string;
  description: string;
  images?: string[];
}): Metadata {
  const site = getSite(locale);
  const canonical = absoluteUrl(locale, path);

  const languages = Object.fromEntries(
    locales.map((item) => [localeToHtmlLang[item], absoluteUrl(item, path)]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': absoluteUrl('fr', path) },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: localeToHtmlLang[locale],
      url: canonical,
      title: title ?? site.seo.homeTitle,
      description,
      images: images ?? ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? site.seo.homeTitle,
      description,
      images: images ?? ['/logo.png'],
    },
  };
}

/**
 * Données structurées Organization (§ 11 — SEO).
 * Le champ `sameAs` reprend les comptes sociaux réels d'Eterna Tech.
 */
export function organizationJsonLd(locale: Locale) {
  const site = getSite(locale);
  const { contact } = site;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eterna Tech',
    alternateName: 'Eternal Technologies',
    url: absoluteUrl(locale, '/'),
    logo: `${siteUrl}/logo.png`,
    description: site.seo.homeDescription,
    email: contact.email,
    telephone: '+213659793110',
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLines[0],
      addressLocality: 'Tlemcen',
      postalCode: '13000',
      addressCountry: 'DZ',
    },
    sameAs: site.social.map((item) => item.href),
    areaServed: 'DZ',
  };
}

/** Données structurées d'une fiche service. */
export function serviceJsonLd(
  locale: Locale,
  service: { slug: string; name: string; description: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: absoluteUrl(locale, `/services/${service.slug}`),
    provider: {
      '@type': 'Organization',
      name: 'Eterna Tech',
      url: absoluteUrl(locale, '/'),
    },
    areaServed: 'DZ',
  };
}

/** Fil d'Ariane structuré (§ 9.2). */
export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}
