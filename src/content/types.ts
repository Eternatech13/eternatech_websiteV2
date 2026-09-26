/**
 * Modèle de contenu de la plateforme Eterna Tech.
 *
 * Le CMS n'étant pas encore choisi (cahier des charges § 14), les contenus sont
 * stockés dans des fichiers JSON par langue (§ 15 — hypothèses par défaut).
 * La structure ci-dessous est volontairement proche d'un schéma de CMS
 * headless (Strapi / Sanity / Payload) pour permettre une migration directe :
 * une collection par tableau `items`, un singleton par objet.
 */

/** Accents de la palette de marque (§ 5). */
export type BrandAccent = 'primary' | 'secondary' | 'accent';

export interface SectionIntro {
  badge: string;
  title: string;
  /** Mot du titre affiché en dégradé de marque, s'il y en a un. */
  titleAccent?: string;
  subtitle: string;
  /** Phrase d'accroche de la colonne de droite de l'en-tête (§ 7.1). */
  pitch?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceItem {
  slug: string;
  name: string;
  /** Une phrase, 2 lignes maximum sur la carte (§ 7.1). */
  description: string;
  category: string;
  /** Clé d'icône Lucide, résolue par src/lib/icons.ts. */
  icon: string;
  accent: BrandAccent;
  /** Image de la carte. Absente → visuel de remplacement généré (§ 15). */
  image?: string;
  hero: {
    title: string;
    intro: string;
  };
  /**
   * Processus de la fiche service (§ 7.5). Le cahier des charges annonce
   * 7 étapes, mais les contenus réels d'eternatech.net en comptent 7 pour
   * Développement Web et IA & Machine Learning, et 6 pour les 11 autres.
   * Les contenus réels sont conservés tels quels ; la frise verticale gère un
   * nombre d'étapes variable.
   */
  process: ProcessStep[];
  /** Caractéristiques du service, reprises du site actuel. */
  features: string[];
  /**
   * Prestations incluses, reprises du site actuel. Ce sont des engagements
   * commerciaux : à revalider par Eterna Tech avant mise en ligne.
   */
  includes: string[];
  /** 3 slugs de services liés, affichés en bas de fiche (§ 7.5). */
  related: string[];
  seo: {
    title: string;
    description: string;
  };
}

export interface ServicesContent {
  intro: SectionIntro;
  items: ServiceItem[];
}

export interface SolutionFeature {
  title: string;
  description: string;
  icon: string;
}

/** Carte du tableau de bord illustratif (§ 8.3 et § 8.7). */
export interface SolutionDashboardCard {
  id: string;
  kind: 'score' | 'breakdown' | 'alert' | 'voice' | 'person';
  title: string;
  icon: string;
  /** Libellé principal (valeur, message d'alerte, instruction vocale…). */
  headline?: string;
  caption?: string;
  tags?: string[];
  metrics?: { label: string; value: string }[];
  segments?: { label: string; value: number; tone: BrandAccent | 'alert' }[];
}

export interface SolutionImage {
  src: string;
  alt: string;
  caption: string;
}

export interface SolutionItem {
  slug: string;
  /** Nom court affiché dans le badge « Solution · … ». */
  name: string;
  title: string;
  description: string;
  /** Côté du texte dans le bloc Features2 : start = début de ligne (§ 8.1). */
  textSide: 'start' | 'end';
  accent: BrandAccent;
  /** Logo de la solution, affiché au-dessus du badge (§ 8.1). */
  logo?: string;
  /** 4 fonctionnalités de l'accordéon (§ 8.2). */
  features: SolutionFeature[];
  /** 3 cartes du tableau de bord illustratif (§ 8.3). */
  dashboard: SolutionDashboardCard[];
  /** Page de détail de la solution. */
  detail: {
    tagline: string;
    longDescription: string;
    /** Étapes « Comment ça marche », reprises du site actuel. */
    howItWorks: ProcessStep[];
    /** Fonctionnalités détaillées, reprises du site actuel. */
    capabilities: SolutionFeature[];
    /**
     * Bénéfices annoncés sur le site actuel. Contiennent une allégation
     * chiffrée (« Réduction de 40% des accidents ») à étayer par une source
     * avant publication.
     */
    benefits: string[];
    /** Caractéristiques techniques réelles du dispositif. */
    specs: { label: string; value: string }[];
    audience: { title: string; items: string[] };
    images: SolutionImage[];
  };
  /**
   * Texte alternatif du tableau de bord illustratif : les cartes sont
   * décoratives et masquées aux lecteurs d'écran, ce texte les résume.
   */
  dashboardAltText: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: string[];
  /** Étiquettes « Utilisée dans » (§ 8.8), liens croisés services / solutions. */
  usedIn: { label: string; href: string }[];
  discover?: { href: string };
}

export interface ExpertiseContent {
  intro: SectionIntro;
  items: ExpertiseItem[];
}

export interface SolutionsContent {
  intro: SectionIntro;
  items: SolutionItem[];
  expertise: ExpertiseContent;
}

export interface KeyFigure {
  value: string;
  label: string;
  /** Valeur numérique pour le compteur animé (§ 9.3). */
  number: number;
  suffix: string;
  icon: string;
  /** Formulation complète lue par les lecteurs d'écran (§ 9.6). */
  screenReaderLabel: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

export interface AboutContent {
  preview: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    cta: string;
  };
  page: {
    title: string;
    tagline: string;
    seo: { title: string; description: string };
  };
  figures: KeyFigure[];
  mission: {
    title: string;
    subtitle: string;
    body: string;
  };
  values: {
    title: string;
    items: ValueItem[];
  };
  approach: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  history: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  team: {
    title: string;
    subtitle: string;
    members: { name: string; role: string; linkedin?: string }[];
  };
  location: {
    title: string;
    subtitle: string;
  };
}

export interface HeroContent {
  badge: string;
  titleLine1: string;
  titleLine2Start: string;
  titleLine2Accent: string;
  /** Segments de la description ; `strong` met le texte en gras (§ 6.1). */
  description: { text: string; strong?: boolean }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  slogan: string;
  nav: NavItem[];
  hero: HeroContent;
  contact: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    addressLines: string[];
    phone: string;
    phoneLink: string;
    whatsapp: string;
    email: string;
    mapsUrl: string;
    mapsEmbedUrl: string;
    hours: string;
    subjects: string[];
  };
  footer: {
    newsletter: {
      badge: string;
      titleLines: string[];
      consent: string;
    };
    columns: { title: string; links: NavItem[] }[];
    contactTitle: string;
    mapsLinkLabel: string;
    location: string;
    legalLinks: NavItem[];
  };
  social: { label: string; href: string; icon: string }[];
  legal: {
    notice: { title: string; seoDescription: string; sections: { title: string; body: string }[] };
    privacy: { title: string; seoDescription: string; sections: { title: string; body: string }[] };
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    defaultTitleTemplate: string;
    keywords: string[];
  };
}

export interface LocaleContent {
  site: SiteContent;
  services: ServicesContent;
  solutions: SolutionsContent;
  about: AboutContent;
}
