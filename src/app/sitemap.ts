import type { MetadataRoute } from 'next';
import { getServiceSlugs, getSolutionSlugs } from '@/content';
import { locales, localeToHtmlLang } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo';

/**
 * Sitemap couvrant les trois langues, avec les alternances hreflang (§ 11 — SEO).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/solutions', priority: 0.9 },
    { path: '/faq', priority: 0.7 },
    { path: '/a-propos', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
    { path: '/mentions-legales', priority: 0.2 },
    { path: '/politique-confidentialite', priority: 0.2 },
  ];

  const servicePaths = getServiceSlugs().map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
  }));

  const solutionPaths = getSolutionSlugs().map((slug) => ({
    path: `/solutions/${slug}`,
    priority: 0.8,
  }));

  const allPaths = [...staticPaths, ...servicePaths, ...solutionPaths];
  const lastModified = new Date();

  return allPaths.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [localeToHtmlLang[item], absoluteUrl(item, path)]),
        ),
      },
    })),
  );
}
