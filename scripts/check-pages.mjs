/**
 * Vérification des pages servies, contre un serveur déjà démarré.
 *
 * Ce script existe parce qu'un build réussi ne garantit pas qu'une page
 * s'affiche : une CSP trop stricte peut empêcher tout script client de démarrer,
 * et les animations d'apparition laissent alors le contenu invisible. Les
 * contrôles ci-dessous portent donc autant sur les en-têtes de sécurité et
 * l'état initial du contenu que sur les codes de réponse.
 *
 * Usage :
 *   npm run dev                  puis  npm run check:pages
 *   npm run build && npm start   puis  npm run check:pages:prod
 *
 * L'URL du serveur se règle avec la variable SMOKE_BASE, par défaut
 * http://localhost:3000. Le drapeau --prod exige une CSP stricte, sans les
 * assouplissements réservés au rechargement à chaud.
 */

const base = (process.env.SMOKE_BASE ?? 'http://localhost:3000').replace(/\/$/, '');
const locales = ['fr', 'en', 'ar'];

const paths = [
  '/',
  '/services',
  '/services/developpement-web',
  '/services/label-startup',
  '/solutions',
  '/solutions/amane-trig',
  '/faq',
  '/a-propos',
  '/contact',
  '/mentions-legales',
  '/politique-confidentialite',
];

/** Repère de contenu attendu par langue, pour vérifier que la page est remplie. */
const heroMarker = {
  fr: 'Innovation Technologique',
  en: 'Technology Innovation',
  ar: 'ابتكار تكنولوجي',
};

const failures = [];
const fail = (message) => failures.push(message);

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(240000) });
  return { response, html: await response.text() };
}

// --- Pages -----------------------------------------------------------------
for (const locale of locales) {
  for (const path of paths) {
    const url = `${base}/${locale}${path === '/' ? '' : path}`;
    try {
      const { response, html } = await get(url);

      if (response.status !== 200) {
        fail(`${url} → statut ${response.status}`);
        continue;
      }
      if (html.includes('__next_error__')) {
        fail(`${url} → page d'erreur Next.js`);
        continue;
      }
      if (!html.includes('Eterna Tech') && !html.includes('إيترنا تك')) {
        fail(`${url} → marque absente du rendu`);
        continue;
      }
      console.log(`  ok  ${locale}${path}`);
    } catch (error) {
      fail(`${url} → ${error.message}`);
    }
  }
}

// --- En-têtes de sécurité et visibilité du contenu de la Hero --------------
const isProduction =
  process.argv.includes('--prod') || process.env.SMOKE_ENV === 'production';

for (const locale of locales) {
  const url = `${base}/${locale}`;
  const { response, html } = await get(url);
  const csp = response.headers.get('content-security-policy') ?? '';

  if (!csp) {
    fail(`${url} → aucune en-tête Content-Security-Policy`);
  }

  // La Hero porte le LCP : son contenu doit être visible sans JavaScript.
  const marker = heroMarker[locale];
  const index = html.indexOf(marker);
  if (index < 0) {
    fail(`${url} → titre de la Hero absent du HTML rendu`);
  } else {
    const before = html.slice(Math.max(0, index - 1200), index);
    if (before.includes('opacity:0')) {
      fail(`${url} → la Hero est rendue avec une opacité nulle, invisible sans JavaScript`);
    }
  }

  if (!html.includes('[data-reveal]')) {
    fail(`${url} → correctif noscript des animations absent`);
  }
}

// --- CSP de production : aucun assouplissement de développement ------------
{
  const { response } = await get(`${base}/fr`);
  const csp = response.headers.get('content-security-policy') ?? '';
  const hasDevRelaxations = csp.includes("'unsafe-eval'") || csp.includes('ws:');

  if (isProduction && hasDevRelaxations) {
    fail("CSP de production : 'unsafe-eval' ou 'ws:' ne doivent pas être autorisés");
  }
  if (!isProduction && !hasDevRelaxations) {
    fail("CSP de développement : 'unsafe-eval' est requis par le rechargement à chaud");
  }
  console.log(`  csp ${isProduction ? 'production (stricte)' : 'développement (assouplie)'}`);
}

// --- Fichiers de référencement --------------------------------------------
for (const file of ['/sitemap.xml', '/robots.txt']) {
  const { response, html } = await get(base + file);
  if (response.status !== 200 || html.length === 0) {
    fail(`${file} → statut ${response.status}`);
  } else {
    console.log(`  ok  ${file}`);
  }
}

// --- Rapport ---------------------------------------------------------------
if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} problème(s) :\n`);
  failures.forEach((message) => console.error(`  ${message}`));
  process.exit(1);
}

console.log(`\n✓ ${locales.length * paths.length} pages vérifiées sur ${base}`);
