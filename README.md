# Plateforme Eterna Tech

Site vitrine corporate d'Eterna Tech (eternatech.net), en français, anglais et arabe avec mise en page de droite à gauche.

Développé d'après `Cahier des charges — Plateforme Eternatech.md`. Les contenus proviennent du site actuel (dépôt `Eternatech13/eternatech_website`) ; la charte graphique et les structures de mise en page viennent du cahier des charges.

## Voir le site

```bash
npm install
npm run dev
```

Puis ouvrir **http://localhost:3000/fr**. Si le port 3000 est déjà occupé, Next.js en choisit un autre et l'affiche au démarrage : lire la ligne `- Local:` dans le terminal.

| Langue | URL |
| --- | --- |
| Français | http://localhost:3000/fr |
| English | http://localhost:3000/en |
| العربية (RTL) | http://localhost:3000/ar |

La racine `/` redirige vers la langue du navigateur, puis mémorise le choix dans un cookie.

Pages à parcourir : `/fr`, `/fr/services`, `/fr/services/developpement-web`, `/fr/solutions`, `/fr/solutions/amane-trig`, `/fr/a-propos`, `/fr/contact`, `/fr/mentions-legales`, `/fr/politique-confidentialite`.

Le sélecteur de langue du header conserve la page en cours : depuis `/fr/services/ui-ux`, passer en arabe amène sur `/ar/services/ui-ux`.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production, génère 70 pages statiques |
| `npm start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run check:content` | Valide la couche de contenu et l'alignement des trois langues |
| `npm run check:pages` | Vérifie les 30 pages servies, les en-têtes de sécurité et la visibilité du contenu — serveur de développement |
| `npm run check:pages:prod` | Même vérification, en exigeant une CSP stricte — serveur de production |

Les deux dernières commandes s'exécutent contre un serveur déjà démarré. Régler `SMOKE_BASE` si le port n'est pas 3000, par exemple `$env:SMOKE_BASE='http://localhost:3001'`.

## Stack

Next.js 15 (App Router, TypeScript), React 19, Tailwind CSS v4, next-intl 4, Motion, Lucide et react-icons. Déploiement compatible Vercel, conformément à l'hypothèse du § 15.

## Structure

```
src/
  app/[locale]/          Pages : accueil, services, solutions, à propos, contact, légales
  app/api/               Formulaire de contact, inscription newsletter
  app/sitemap.ts         Sitemap des 3 langues avec alternances hreflang
  app/robots.ts
  content/               Contenus JSON par langue + modèle de types
  i18n/                  Routage, direction de lecture, navigation localisée
  messages/              Libellés d'interface par langue
  components/layout/     Header, menu mobile, sélecteur de langue, footer, cookies
  components/sections/   Sections de page
  components/ui/         Composants réutilisables
  components/forms/      Formulaire de contact, newsletter
  lib/                   Utilitaires, icônes, animations, SEO, consentement
scripts/                 Validation de contenu, préchargement de paquets npm
public/                  Logo, favicon, visuels Amane Trig
```

## Contenus

Le CMS n'étant pas arrêté (§ 14), les contenus sont dans `src/content/{fr,en,ar}/`, structurés comme des collections de CMS headless pour permettre une migration directe.

| Fichier | Contenu |
| --- | --- |
| `site.json` | Navigation, Hero, coordonnées, footer, réseaux sociaux, pages légales, SEO |
| `services.json` | Les 13 services : carte, hero, processus, caractéristiques, prestations incluses |
| `solutions.json` | Amane Trig et les 3 domaines d'expertise |
| `about.json` | Chiffres clés, mission, 4 valeurs, approche, histoire, localisation |

`npm run check:content` vérifie que les trois langues restent alignées, que les liens croisés pointent vers des contenus existants, que les images référencées sont présentes, que l'indicatif est bien +213 et qu'aucune référence à BlindPath ne subsiste.

## Variables d'environnement

Copier `.env.example` vers `.env.local`. Tout est optionnel en développement : sans configuration d'envoi, les messages sont journalisés côté serveur et le parcours reste testable de bout en bout.

L'envoi d'e-mail accepte deux voies, SMTP en priorité puisque c'est la configuration de l'API actuelle, puis Resend. Le routage reprend la règle du site existant : les sujets contenant « devis » ou « démonstration » partent vers `service@eternatech.net`, le reste vers `contact@eternatech.net`.

## En-têtes de sécurité

Les en-têtes du § 11 sont définis dans `next.config.ts` : CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` et `Permissions-Policy`.

La CSP est plus permissive en développement, où le rechargement à chaud de Next.js a besoin de `'unsafe-eval'` et d'une connexion websocket. Ces deux assouplissements sont absents du build de production, ce que `npm run check:pages:prod` vérifie.

## Animations et robustesse du contenu

Le contenu de la Hero, qui porte le plus grand élément de la page, est animé en CSS et non en JavaScript : il s'affiche sans attendre l'hydratation et reste visible si aucun script ne s'exécute. Les sections situées plus bas utilisent Motion, déclenché au défilement, avec un correctif `noscript` qui les rend visibles en l'absence de JavaScript. Les compteurs de chiffres clés affichent leur valeur finale au rendu serveur, et ne repartent de zéro qu'une fois le JavaScript actif.

Toutes les animations respectent `prefers-reduced-motion`.

## Décisions prises en cours de route

**BlindPath retiré du périmètre.** Une seule solution phare, Amane Trig. Décomptes, liens croisés, mots-clés, mentions de marque et sujets du formulaire nettoyés en conséquence.

**Texte secondaire sur fond sombre**, point laissé ouvert au § 5 : échelle claire à deux niveaux, `#cbd5e1` pour le texte courant et `#94a3b8` pour les légendes. Contrastes calculés selon la formule WCAG 2.1 — 8,9:1 et 5,2:1 sur `#0b305a`, 11,2:1 et 6,5:1 sur `#071f3b`.

**Limite d'usage de l'accent.** Le § 5 demandait de vérifier `#388caf` sur fond sombre. Le calcul donne 3,5:1 sur `#0b305a`, 4,4:1 sur `#071f3b` et 3,8:1 sur blanc : insuffisant pour du texte courant. L'accent est réservé aux grands titres, bordures, icônes et puces ; le texte courant sur fond clair utilise `#1372a2`, à 5,3:1.

**Fond de la Hero**, choix laissé ouvert au § 6.4 : l'animation de points reliés du site actuel, recolorée en `#1372a2` et `#388caf`. Elle est figée si l'utilisateur a demandé de réduire les animations.

**Typographie** : Inter, déjà utilisée sur le site actuel, et IBM Plex Sans Arabic pour l'arabe.

**Nombre d'étapes du processus.** Le § 7.5 annonce 7 étapes par fiche. Les contenus réels en comptent 7 pour Développement Web et IA & Machine Learning, 6 pour les onze autres. Les contenus réels ont été conservés et la frise accepte un nombre variable d'étapes.

**Grille des 13 services.** Le § 7.1 constate qu'une grille de 3 colonnes laisse la dernière rangée incomplète. Une tuile d'appel à l'action comble ce vide sur la page d'accueil.

## Corrections apportées au site actuel

- Indicatif téléphonique : `+212` (Maroc) remplacé par `+213`.
- Valeurs de l'entreprise : les 4 valeurs sont cohérentes entre la liste et les étiquettes de la carte Mission.
- Lien « En savoir plus » des cartes de service : `<span>` au lieu d'un `<a>` imbriqué dans un `<a>`.
- Heure du footer : horloge réelle au fuseau Africa/Algiers au lieu d'une chaîne figée.
- Formulaire newsletter : relié à une route d'API, avec messages de succès et d'erreur.
- Accordéon des solutions : disposition en colonne, ouverture unique, bordure réelle.
- Sujet du formulaire de contact : liste de choix au lieu d'un champ libre, ce qui permet le routage vers la bonne boîte.

## À valider avant mise en ligne

Deux affirmations reprises du site actuel sortent du contenu éditorial ordinaire.

La fiche Amane Trig annonce « Réduction de 40% des accidents de la route » : cette allégation chiffrée a besoin d'une source. Elle mentionne aussi la conformité RGPD pour un dispositif qui filme le conducteur en continu : à confirmer.

Les prestations incluses des fiches service sont des engagements commerciaux fermes — hébergement offert un an, nom de domaine la première année, cinq adresses e-mail, six mois de support. À revalider.

## Reste à fournir

| Élément | Référence |
| --- | --- |
| Logo en SVG, version claire pour fond sombre | § 6.4 — un PNG est en place, remplacer `public/logo.png` |
| Les 13 images de services, WebP ou AVIF, 800 px minimum | § 7.4 — un visuel de remplacement est généré en attendant |
| Relecture des traductions anglaise et arabe | § 9.7 |
| Valeurs de démonstration du tableau de bord Amane Trig | § 8.6 — valeurs provisoires signalées dans l'interface |
| Identification légale complète des mentions légales | forme juridique, numéro d'identification, responsable de la publication |
| Choix du CMS, de l'hébergement, du service de newsletter, de l'outil de mesure | § 11 et § 14 |
| Cibles chiffrées des indicateurs, budget, date de mise en ligne | § 2 et § 14 |

## Points non implémentés

**Mesure d'audience.** L'outil n'est pas choisi (§ 11) : GA4 exige un chargement conditionné au consentement, Plausible sans cookie n'en a pas besoin. Le mécanisme de consentement est en place et expose l'état du choix ; il ne reste qu'à brancher le script retenu.

**Redirections depuis les anciennes URLs.** Le passage de `/services/x` à `/fr/services/x` doit être accompagné de redirections 301, sinon l'indexation acquise est perdue au lancement. À traiter à la mise en production, quand l'hébergement sera arrêté.

**Back-office.** Le § 12 demande un back-office et le § 13 en fait un critère de recette, mais le CMS n'est pas choisi. En V1, les contenus se modifient dans les fichiers JSON. Ce critère de recette est à reporter ou le CMS à arrêter.

**Pages Réalisations, Blog et Carrières** : hors périmètre V1 selon le § 15.

## Note d'environnement

Sur le poste de développement utilisé, la pile TLS de Node corrompt les transferts volumineux, ce qui fait échouer `npm install` sur les binaires natifs de Next.js, SWC et Sharp. `node scripts/prefetch-tarballs.mjs` télécharge ces paquets par la pile TLS de Windows, vérifie leur empreinte sha512 et les place dans le cache npm. À lancer avant `npm install` en cas d'erreur `ERR_SSL_CIPHER_OPERATION_FAILED`. Ce script n'est pas nécessaire sur un réseau qui fonctionne normalement.
