import type { Locale } from '@/i18n/routing';
import type {
  AboutContent,
  FaqContent,
  LocaleContent,
  ServiceItem,
  ServicesContent,
  SiteContent,
  SolutionItem,
  SolutionsContent,
} from './types';

import frSite from './fr/site.json';
import frServices from './fr/services.json';
import frSolutions from './fr/solutions.json';
import frAbout from './fr/about.json';
import frFaq from './fr/faq.json';

import enSite from './en/site.json';
import enServices from './en/services.json';
import enSolutions from './en/solutions.json';
import enAbout from './en/about.json';
import enFaq from './en/faq.json';

import arSite from './ar/site.json';
import arServices from './ar/services.json';
import arSolutions from './ar/solutions.json';
import arAbout from './ar/about.json';
import arFaq from './ar/faq.json';

/**
 * Les imports JSON sont typés en littéraux larges (string au lieu des unions
 * `BrandAccent` / `textSide`) ; la conversion est faite une seule fois ici pour
 * que tous les composants consommateurs restent entièrement typés.
 * La cohérence des valeurs est garantie par `scripts/check-content.mjs`.
 */
const content: Record<Locale, LocaleContent> = {
  fr: {
    site: frSite as unknown as SiteContent,
    services: frServices as unknown as ServicesContent,
    solutions: frSolutions as unknown as SolutionsContent,
    about: frAbout as unknown as AboutContent,
    faq: frFaq as unknown as FaqContent,
  },
  en: {
    site: enSite as unknown as SiteContent,
    services: enServices as unknown as ServicesContent,
    solutions: enSolutions as unknown as SolutionsContent,
    about: enAbout as unknown as AboutContent,
    faq: enFaq as unknown as FaqContent,
  },
  ar: {
    site: arSite as unknown as SiteContent,
    services: arServices as unknown as ServicesContent,
    solutions: arSolutions as unknown as SolutionsContent,
    about: arAbout as unknown as AboutContent,
    faq: arFaq as unknown as FaqContent,
  },
};

export function getContent(locale: Locale): LocaleContent {
  return content[locale];
}

export function getSite(locale: Locale): SiteContent {
  return content[locale].site;
}

export function getServices(locale: Locale): ServicesContent {
  return content[locale].services;
}

export function getSolutions(locale: Locale): SolutionsContent {
  return content[locale].solutions;
}

export function getAbout(locale: Locale): AboutContent {
  return content[locale].about;
}

export function getFaq(locale: Locale): FaqContent {
  return content[locale].faq;
}

export function getServiceBySlug(
  locale: Locale,
  slug: string,
): ServiceItem | undefined {
  return content[locale].services.items.find((item) => item.slug === slug);
}

export function getSolutionBySlug(
  locale: Locale,
  slug: string,
): SolutionItem | undefined {
  return content[locale].solutions.items.find((item) => item.slug === slug);
}

/** Slugs des services, identiques dans les 3 langues (§ 11 — URLs). */
export function getServiceSlugs(): string[] {
  return content.fr.services.items.map((item) => item.slug);
}

export function getSolutionSlugs(): string[] {
  return content.fr.solutions.items.map((item) => item.slug);
}

export type * from './types';
