/**
 * Validation de la couche de contenu (src/content).
 *
 * Les fichiers JSON sont convertis une seule fois vers les types TypeScript
 * dans src/content/index.ts ; le compilateur ne peut donc pas vérifier leur
 * forme. Ce script joue ce rôle : il garantit que les trois langues restent
 * alignées et que les références croisées pointent vers des contenus existants.
 *
 * Usage : node scripts/check-content.mjs
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['fr', 'en', 'ar'];
const ACCENTS = ['primary', 'secondary', 'accent'];
const TONES = [...ACCENTS, 'alert'];

const errors = [];
const fail = (message) => errors.push(message);

const read = (locale, file) =>
  JSON.parse(readFileSync(join(ROOT, 'src', 'content', locale, `${file}.json`), 'utf8'));

const content = {};
for (const locale of LOCALES) {
  content[locale] = {
    site: read(locale, 'site'),
    services: read(locale, 'services'),
    solutions: read(locale, 'solutions'),
    about: read(locale, 'about'),
  };
}

const reference = content.fr;
const serviceSlugs = reference.services.items.map((item) => item.slug);
const solutionSlugs = reference.solutions.items.map((item) => item.slug);

// --- Alignement des langues -------------------------------------------------
for (const locale of LOCALES) {
  const { services, solutions, about, site } = content[locale];

  const slugs = services.items.map((item) => item.slug);
  if (slugs.join(',') !== serviceSlugs.join(',')) {
    fail(`[${locale}] services : slugs ou ordre différents du français`);
  }
  if (solutions.items.map((i) => i.slug).join(',') !== solutionSlugs.join(',')) {
    fail(`[${locale}] solutions : slugs ou ordre différents du français`);
  }

  services.items.forEach((item, index) => {
    const ref = reference.services.items[index];
    const label = `[${locale}] service ${item.slug}`;

    for (const field of ['name', 'description', 'category', 'icon', 'accent']) {
      if (!item[field]) fail(`${label} : champ « ${field} » manquant`);
    }
    if (!ACCENTS.includes(item.accent)) fail(`${label} : accent « ${item.accent} » hors palette`);
    if (!item.hero?.title || !item.hero?.intro) fail(`${label} : hero incomplet`);

    if (item.icon !== ref.icon) fail(`${label} : icône différente du français`);
    if (item.accent !== ref.accent) fail(`${label} : accent différent du français`);
    if (item.related.join(',') !== ref.related.join(','))
      fail(`${label} : liens « related » différents du français`);

    for (const list of ['process', 'features', 'includes']) {
      if (item[list].length !== ref[list].length) {
        fail(`${label} : ${list} — ${item[list].length} entrées contre ${ref[list].length} en français`);
      }
    }
    item.process.forEach((step, i) => {
      if (!step.title || !step.description) fail(`${label} : étape ${i + 1} incomplète`);
      if (/^\s*\d+\./.test(step.title))
        fail(`${label} : étape ${i + 1} — le numéro doit être ajouté par la frise, pas par le texte`);
    });
    item.related.forEach((slug) => {
      if (!serviceSlugs.includes(slug)) fail(`${label} : service lié inconnu « ${slug} »`);
      if (slug === item.slug) fail(`${label} : ne peut pas se lier à lui-même`);
    });
    if (!item.seo?.title || !item.seo?.description) fail(`${label} : SEO incomplet`);
  });

  solutions.items.forEach((item, index) => {
    const ref = reference.solutions.items[index];
    const label = `[${locale}] solution ${item.slug}`;

    if (!['start', 'end'].includes(item.textSide)) fail(`${label} : textSide invalide`);
    if (!ACCENTS.includes(item.accent)) fail(`${label} : accent hors palette`);
    if (item.features.length !== 4) fail(`${label} : l'accordéon doit compter 4 fonctionnalités (§ 8.2)`);
    if (item.dashboard.length !== 3) fail(`${label} : le tableau de bord doit compter 3 cartes (§ 8.3)`);
    if (!item.dashboardAltText) fail(`${label} : texte alternatif du tableau de bord manquant`);

    item.dashboard.forEach((card) => {
      (card.segments ?? []).forEach((segment) => {
        if (!TONES.includes(segment.tone))
          fail(`${label} : segment « ${segment.label} » — tonalité « ${segment.tone} » hors palette`);
      });
    });

    const detail = item.detail ?? {};
    for (const field of ['tagline', 'longDescription', 'howItWorks', 'capabilities', 'benefits', 'specs', 'audience', 'images']) {
      if (!detail[field]) fail(`${label} : detail.${field} manquant`);
    }
    for (const list of ['howItWorks', 'capabilities', 'benefits', 'specs', 'images']) {
      if (detail[list]?.length !== ref.detail[list]?.length) {
        fail(`${label} : detail.${list} — longueur différente du français`);
      }
    }
    (detail.images ?? []).forEach((image) => {
      if (!image.alt) fail(`${label} : image ${image.src} sans texte alternatif`);
      if (!existsSync(join(ROOT, 'public', image.src.replace(/^\//, '')))) {
        fail(`${label} : image absente de public/ — ${image.src}`);
      }
    });
    if (item.logo && !existsSync(join(ROOT, 'public', item.logo.replace(/^\//, '')))) {
      fail(`${label} : logo absent de public/ — ${item.logo}`);
    }
  });

  // Liens croisés du bloc Expertise (§ 8.8)
  const hrefs = solutions.expertise.items.flatMap((item) => [
    ...item.usedIn.map((tag) => tag.href),
    ...(item.discover ? [item.discover.href] : []),
  ]);
  hrefs.forEach((href) => {
    const service = href.match(/^\/services\/(.+)$/);
    const solution = href.match(/^\/solutions\/(.+)$/);
    if (service && !serviceSlugs.includes(service[1]))
      fail(`[${locale}] expertise : service inconnu « ${href} »`);
    if (solution && !solutionSlugs.includes(solution[1]))
      fail(`[${locale}] expertise : solution inconnue « ${href} »`);
    if (!service && !solution) fail(`[${locale}] expertise : lien non résolu « ${href} »`);
  });
  if (solutions.expertise.items.length !== 3) fail(`[${locale}] expertise : 3 cartes attendues (§ 8.8)`);

  // À propos (§ 9)
  if (about.figures.length !== 3) fail(`[${locale}] à propos : 3 chiffres clés attendus (§ 9.3)`);
  if (about.values.items.length !== 4) fail(`[${locale}] à propos : 4 valeurs attendues (§ 9.4)`);
  about.figures.forEach((figure) => {
    if (!figure.screenReaderLabel)
      fail(`[${locale}] à propos : chiffre « ${figure.value} » sans libellé pour lecteur d'écran (§ 9.6)`);
  });

  // Liens de navigation et de pied de page
  const navHrefs = [
    ...site.nav.map((i) => i.href),
    ...site.footer.columns.flatMap((c) => c.links.map((l) => l.href)),
    ...site.footer.legalLinks.map((l) => l.href),
  ];
  const knownRoutes = [
    '/',
    '/services',
    '/solutions',
    '/a-propos',
    '/contact',
    '/mentions-legales',
    '/politique-confidentialite',
    ...serviceSlugs.map((s) => `/services/${s}`),
    ...solutionSlugs.map((s) => `/solutions/${s}`),
  ];
  navHrefs.forEach((href) => {
    if (!knownRoutes.includes(href)) fail(`[${locale}] lien de navigation inconnu « ${href} »`);
  });

  // Indicatif algérien (§ 4 — correction du +212 du site actuel)
  if (!site.contact.phone.startsWith('+213')) fail(`[${locale}] téléphone : indicatif algérien +213 attendu`);
  if (site.contact.phoneLink !== 'tel:+213659793110')
    fail(`[${locale}] lien d'appel incorrect : ${site.contact.phoneLink}`);
}

// --- BlindPath retiré du périmètre -----------------------------------------
for (const locale of LOCALES) {
  const raw = JSON.stringify(content[locale]);
  if (/blindpath/i.test(raw) || raw.includes('بلايند')) {
    fail(`[${locale}] une référence à BlindPath subsiste (hors périmètre)`);
  }
}

// --- Rapport ---------------------------------------------------------------
if (errors.length > 0) {
  console.error(`✗ ${errors.length} problème(s) détecté(s) :\n`);
  errors.forEach((message) => console.error(`  ${message}`));
  process.exit(1);
}

const totalSteps = reference.services.items.reduce((sum, item) => sum + item.process.length, 0);
console.log('✓ Contenu valide');
console.log(`  langues        : ${LOCALES.join(', ')}`);
console.log(`  services       : ${serviceSlugs.length} (${totalSteps} étapes de processus par langue)`);
console.log(`  solutions      : ${solutionSlugs.length} — ${solutionSlugs.join(', ')}`);
console.log(`  expertises     : ${reference.solutions.expertise.items.length}`);
