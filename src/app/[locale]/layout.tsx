import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getDirection, localeToHtmlLang, routing, type Locale } from '@/i18n/routing';
import { getSite } from '@/content';
import { buildMetadata, organizationJsonLd, siteUrl } from '@/lib/seo';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

/** Inter : police du site actuel, conservée pour la continuité (§ 5). */
const latin = Inter({
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
});

/** Police arabe dédiée, même hiérarchie de tailles (§ 11). */
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0b305a',
  colorScheme: 'light',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const site = getSite(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.seo.homeTitle,
      template: site.seo.defaultTitleTemplate,
    },
    keywords: site.seo.keywords,
    authors: [{ name: 'Eterna Tech', url: siteUrl }],
    creator: 'Eterna Tech',
    icons: { icon: '/favicon.ico' },
    robots: { index: true, follow: true },
    ...buildMetadata({
      locale,
      path: '/',
      description: site.seo.homeDescription,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Nécessaire pour le rendu statique des pages de ce segment.
  setRequestLocale(locale);

  const t = await getTranslations('common');
  const typedLocale = locale as Locale;
  const direction = getDirection(typedLocale);

  return (
    <html
      lang={localeToHtmlLang[typedLocale]}
      dir={direction}
      className={`${latin.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Sans JavaScript, les sections animées au défilement resteraient à une
          opacité nulle. Ce correctif les rend visibles : le contenu reste
          accessible et indexable même si aucun script ne s'exécute (§ 11).
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[data-reveal]{opacity:1 !important;transform:none !important;filter:none !important}',
            }}
          />
        </noscript>
      </head>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // Données structurées Organization (§ 11 — SEO)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd(typedLocale)),
          }}
        />
        <NextIntlClientProvider>
          <a href="#contenu" className="skip-link">
            {t('skipToContent')}
          </a>
          {children}
          <Footer locale={typedLocale} />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
