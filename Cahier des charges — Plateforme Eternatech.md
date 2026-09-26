# Cahier des charges — Plateforme Eterna Tech

Sep 25, 2026 · @islem

## 1. Présentation du projet

Le projet consiste à concevoir et développer la plateforme web d'Eterna Tech (domaine eternatech.net), vitrine de l'entreprise et point d'entrée pour ses prospects et clients.

- **Porteur du projet** : Eterna Tech (pour « Eternal Technologies »), toujours écrit en deux mots
- **Domaine** : eternatech.net
- **Nature** : site vitrine / plateforme corporate, évolutive vers des espaces clients
- **Langue(s)** : français, anglais et arabe, avec mise en page de droite à gauche (RTL) pour l'arabe

**Activité** : Eterna Tech est une entreprise algérienne de solutions technologiques innovantes, installée à Tlemcen (I2E Student Center, Université de Tlemcen). Elle affiche 1+ année d'expérience, 25+ projets réalisés et 15+ clients satisfaits. Son activité repose sur trois piliers :

- **13 services** aux entreprises et aux particuliers : développement web et mobile, IA, design, formation IT, réseaux, marketing, accompagnement aux labels Startup et Projet innovant.
- **2 solutions phares** développées en interne : BlindPath (lunettes intelligentes pour malvoyants) et Amane Trig (sécurité routière par IA).
- **3 domaines d'expertise** : IA & Machine Learning, 5G & IoT, Blockchain & Smart Contracts.

**Mission** : fournir des solutions technologiques innovantes qui transforment les défis en opportunités et stimulent la croissance des clients en Algérie et au-delà. **Valeurs** : Innovation, Excellence, Croissance, Partenariat.

Ce cahier des charges fixe le périmètre, la charte graphique, les exigences techniques et les critères de recette. Les sections marquées « à compléter » seront précisées au fil des échanges.

## 2. Objectifs et indicateurs de réussite

La plateforme doit présenter clairement l'offre d'Eterna Tech et convertir les visiteurs en demandes de contact qualifiées.

| Objectif | Indicateur | Cible |
| --- | --- | --- |
| Générer des prospects | Formulaires de contact / demandes de devis envoyés | À définir par mois |
| Crédibiliser la marque | Temps moyen passé sur le site | > 2 min |
| Être visible sur Google | Pages indexées, position sur les mots-clés cibles | Top 10 sur 5 mots-clés |
| Offrir une expérience rapide | Score Lighthouse Performance (mobile) | ≥ 90 |
| Être accessible à tous | Conformité WCAG 2.1 | Niveau AA |

Les cibles chiffrées seront validées avec Eterna Tech avant le lancement.

## 3. Cibles

La plateforme s'adresse en priorité aux décideurs d'entreprise qui cherchent un partenaire technologique. Les cibles ci-dessous sont une première hypothèse à valider.

| Cible | Besoin principal | Ce que le site doit lui montrer |
| --- | --- | --- |
| Dirigeants de PME / startups | Trouver un prestataire fiable | Services, chiffres clés, processus de travail, contact rapide |
| Responsables IT / DSI | Évaluer l'expertise technique | Domaines d'expertise, technologies (React, Next.js, Node.js), méthodologie |
| Porteurs de projets et étudiants entrepreneurs | Obtenir le label Startup ou Projet innovant, se former | Accompagnement aux labels, Formation IT, prise de rendez-vous |
| Gestionnaires de flottes de véhicules | Réduire les accidents et suivre les conducteurs | Page Amane Trig, fonctionnalités, demande de démonstration |
| Personnes aveugles ou malvoyantes, associations, proches | Gagner en autonomie au quotidien | Page BlindPath, fonctionnalités, contact ; page accessible aux lecteurs d'écran |
| Particuliers | Installer un réseau domestique fiable | Service Réseaux domestiques, zone d'intervention, contact rapide |
| Partenaires et investisseurs | Comprendre la vision | Mission, valeurs, solutions, chiffres clés |

## 4. Périmètre fonctionnel

La première version (V1) comprend 7 pages publiques et un formulaire de contact relié à une boîte e-mail. L'arborescence reprend la navigation du header.

| Page | Contenu principal | Priorité |
| --- | --- | --- |
| Accueil | Hero, Services, Solutions, Qui sommes-nous (aperçu), Contact | V1 |
| Services | Grille des 13 services | V1 |
| Fiche service (×13) | Hero du service + processus en 7 étapes (voir 7.5) | V1 |
| Solutions | Solutions phares + expertise technologique | V1 |
| Fiche solution (×2) | BlindPath, Amane Trig : présentation détaillée, fonctionnalités, demande de démo | V1 |
| À propos | Qui sommes-nous, chiffres clés, mission, valeurs | V1 |
| Contact | Formulaire, coordonnées, carte | V1 |
| Réalisations | Études de cas des 25+ projets | V2 (absente du site actuel) |
| Blog / Ressources | Articles, actualités | V2 (absente du site actuel) |
| Carrières | Offres d'emploi et candidature | V2 |

Navigation principale : Accueil, Services, Solutions, À propos, Contact + bouton « Contactez-nous ». Les fiches service et solution ont un en-tête simplifié : bouton « Retour » à gauche, logo à droite.

Formulaire de contact : Nom complet\*, Email\*, Téléphone, Entreprise, Sujet\*, Message\*. Le champ téléphone du site actuel affiche l'exemple « +212 » (indicatif du Maroc) : il doit être corrigé avec l'indicatif algérien +213. Le numéro d'Eterna Tech, +213 659 793 110, est affiché à côté du formulaire avec un lien d'appel (tel:+213659793110) et un lien WhatsApp (wa.me/213659793110).

Fonctionnalités transverses :

- Header fixe avec navigation et bouton « Contactez-nous » (voir 6.1)
- Menu mobile plein écran
- Footer avec plan du site, coordonnées, réseaux sociaux et mentions légales
- Formulaire de contact avec validation, anti-spam (reCAPTCHA ou Turnstile) et e-mail de confirmation
- Sélecteur de langue FR / EN / AR dans le header et le menu mobile, qui conserve la page en cours
- Bannière de consentement cookies
- Pages légales : mentions légales, politique de confidentialité

## 5. Charte graphique

L'identité repose sur trois bleus : #1372a2 en couleur principale, #0b305a en secondaire et #388caf pour les touches d'accent.

| Rôle | Couleur | Usage |
| --- | --- | --- |
| Principale | #1372a2 | Boutons principaux, liens, éléments actifs, icônes |
| Secondaire | #0b305a | Fonds sombres, header, footer, titres sur fond clair |
| Accent | #388caf | Badges, survols, soulignements, mots mis en avant, bordures |
| Texte clair | #FFFFFF | Texte sur fonds sombres |
| Texte secondaire | À définir (gris clair) | Paragraphes et libellés sur fond sombre |

Dégradé de marque (remplace le dégradé orange du composant d'inspiration) : #0b305a → #1372a2 → #388caf, orienté de gauche à droite.

Le site actuel utilise un fond bleu nuit et un dégradé bleu → violet, avec un fond animé de points reliés (réseau). La nouvelle charte conserve le fond sombre et l'effet réseau, mais remplace le violet par les trois bleus de la palette.

Principes d'interface :

- Contraste minimal de 4,5:1 entre texte et fond (à vérifier en particulier pour #388caf sur fond sombre)
- Coins arrondis de 8 à 12 px sur boutons et cartes
- Animations d'apparition douces (fondu + glissement), désactivées si l'utilisateur a choisi « réduire les animations »
- Typographie : à confirmer ; proposition d'une police sans-serif moderne (Inter ou Plus Jakarta Sans), graisses légères pour les grands titres
- Logo, iconographie et photos : fournis par Eterna Tech (à compléter)

Les inspirations de design pour les autres sections seront ajoutées dès réception.

## 6. Hero section

La Hero section reprend la structure du composant d'inspiration « Hero4 » : plein écran, image de fond assombrie, contenu aligné à gauche et barre de chiffres en bas. Seules les couleurs changent pour suivre la palette Eterna Tech.

### 6.1 Structure

1. **Header** : logo + « Eterna Tech » à gauche ; Accueil, Services, Solutions, À propos, Contact au centre ; bouton « Contactez-nous » à droite ; icône menu sur mobile. Le bouton « Se connecter » du modèle est retiré tant qu'il n'y a pas d'espace client.
2. **Badge** : pastille avec icône étoile, texte « L'INNOVATION AU SERVICE DE VOTRE CROISSANCE » (à valider).
3. **Titre** repris du site actuel : ligne 1 « Innovation Technologique », ligne 2 « pour un Avenir » + mot accentué « Durable » en dégradé de marque.
4. **Description** : « Découvrez des solutions technologiques avancées pour transformer votre entreprise et vous propulser vers l'avenir. », avec « transformer votre entreprise » en gras.
5. **Deux boutons d'action** : « Nos Solutions » (principal, fond dégradé) et « En savoir plus » (secondaire, contour dégradé).
6. **Barre du bas** : 3 chiffres clés avec icône (1+ année d'expérience, 25+ projets réalisés, 15+ clients satisfaits) à gauche, liens réseaux sociaux à droite.
7. **Fond** : image sombre ou fond animé de points reliés, comme sur le site actuel, recoloré en #1372a2 et #388caf.

### 6.2 Adaptation des couleurs

| Élément | Inspiration (Hero4) | Eterna Tech |
| --- | --- | --- |
| Fond de section | slate-950 | #0b305a très assombri + image de fond à 70 % de luminosité |
| Dégradé boutons | #4514C1 → #E8522D → #F59E45 | #0b305a → #1372a2 → #388caf |
| Mot accentué du titre | amber → orange → rose | #1372a2 → #388caf |
| Badge | Bordure et texte ambre | Bordure #388caf à 50 %, fond #0b305a à 40 %, texte #388caf |
| Survol des liens du menu mobile | amber-400 | #388caf |
| Ombre du bouton principal | Ombre ambre | Ombre #1372a2 à 20 % |
| Icônes des chiffres clés | Fond blanc à 10 % | Inchangé, ou fond #1372a2 à 20 % |

### 6.3 Comportement

- Header : apparition en fondu depuis le haut (0,8 s).
- Contenu : apparition échelonnée (0,15 s entre éléments) avec fondu, glissement depuis la gauche et flou qui disparaît.
- Barre du bas : même animation, déclenchée au défilement, une seule fois.
- Menu mobile : panneau plein écran semi-transparent avec flou d'arrière-plan, fermeture par bouton X ou clic sur un lien.
- Titre : 36 px sur mobile, jusqu'à 72 px sur grand écran.

### 6.4 Contenus à fournir

- [ ] Logo (SVG), en version claire pour fond sombre
- [x] Libellés de navigation
- [x] Titre, description et boutons
- [x] 3 chiffres clés
- [ ] Validation du texte du badge
- [ ] Choix du fond : image ou animation de points reliés
- [ ] Liens des réseaux sociaux

## 7. Section Services

La section Services présente les 13 services d'Eterna Tech sous forme de cartes illustrées, sur le modèle du composant d'inspiration « Blog4 », recoloré avec la palette de marque.

### 7.1 Structure

1. **En-tête sur deux colonnes** (une seule colonne sur mobile) :
   - À gauche : badge « Ce que nous offrons » avec icône étincelles, grand titre « Nos Services », sous-titre « Des solutions technologiques complètes pour répondre à tous vos besoins ».
   - À droite (décalée vers le bas sur grand écran) : phrase d'accroche et lien « Voir tous nos services » souligné, avec flèche.
2. **Grille de cartes** : 1 colonne sur mobile, 2 sur tablette, 3 sur ordinateur. Avec 13 services, la grille compte 5 rangées sur ordinateur, dont une dernière rangée d'une seule carte.
3. **Carte de service** :
   - Image en haut (240 à 256 px de haut), zoom léger au survol.
   - Pastille ronde blanche en haut à droite avec l'icône du service (remplace l'icône signet).
   - Ligne d'information : point de couleur + catégorie du service (remplace la catégorie et le temps de lecture).
   - Titre : nom du service.
   - Description : une phrase, 2 lignes maximum (ajout par rapport au modèle).
   - Lien « En savoir plus » avec flèche qui glisse vers la droite au survol.
   - Toute la carte est cliquable et mène à la page du service.

### 7.2 Adaptation des couleurs et du style

| Élément | Inspiration (Blog4) | Eterna Tech |
| --- | --- | --- |
| Fond de section | Gris clair (muted à 30 %) | Blanc cassé teinté de bleu (ex. #0b305a à 3 %), pour contraster avec la Hero sombre |
| Badge | Texte simple | Texte #388caf, bordure #388caf à 50 %, fond #388caf à 10 % |
| Grand titre | Couleur du texte par défaut | #0b305a |
| Lien « Voir tous » | Texte + bordure basse grise | Texte #1372a2, bordure basse #388caf, flèche #1372a2 |
| Accents des cartes | Violet, vert, bleu | #1372a2, #0b305a, #388caf, en alternance |
| Point de catégorie | Couleur de l'accent | Couleur d'accent de la carte |
| Lien « En savoir plus » | Couleur par défaut | Couleur d'accent de la carte |
| Cartes | Coins 16 px, ombre légère, ombre renforcée au survol | Inchangé ; ombre teintée #0b305a au survol |
| Focus clavier | Anneau par défaut | Anneau #388caf |

### 7.3 Contenu des cartes

Services et descriptions repris du site eternatech.net ; les catégories regroupent les services pour la ligne d'information des cartes.

| Service | Description | Catégorie | Icône (Lucide) | Accent | Lien |
| --- | --- | --- | --- | --- | --- |
| Développement Web | Création de sites web sur mesure, applications web et solutions e-commerce évolutives. | Développement | Code | #1372a2 | [/services/developpement-web](https://eternatech.net/services/developpement-web) |
| Applications Mobiles | Applications iOS et Android intuitives conçues pour offrir une expérience utilisateur exceptionnelle. | Développement | Smartphone | #0b305a | [/services/applications-mobiles](https://eternatech.net/services/applications-mobiles) |
| IA & Machine Learning | Création de modèles d'IA, apprentissage automatique et apprentissage fédéré pour des solutions intelligentes. | IA & Sécurité | BrainCircuit | #388caf | [/services/ia-machine-learning](https://eternatech.net/services/ia-machine-learning) |
| Modélisation 3D & Prototypage | Conception de modèles 3D professionnels et prototypes pour visualiser vos projets avant réalisation. | Design | Box | #1372a2 | [/services/modelisation-3d](https://eternatech.net/services/modelisation-3d) |
| Conception Graphique & Design | Création d'identités visuelles, logos, supports marketing et designs créatifs pour votre marque. | Design | PenTool | #0b305a | [/services/conception-graphique](https://eternatech.net/services/conception-graphique) |
| UI/UX Design | Conception d'interfaces utilisateur intuitives et expériences utilisateur optimisées pour vos produits digitaux. | Design | LayoutTemplate | #388caf | [/services/ui-ux](https://eternatech.net/services/ui-ux) |
| Formation IT | Programmes de formation personnalisés en technologies de l'information pour vos équipes. | Accompagnement | GraduationCap | #1372a2 | [/services/formation-it](https://eternatech.net/services/formation-it) |
| Installation Réseaux Domestiques | Configuration et installation de réseaux domestiques sécurisés, Wi-Fi et câblage structuré. | Infrastructure | Wifi | #0b305a | [/services/reseaux-domestiques](https://eternatech.net/services/reseaux-domestiques) |
| Blockchain & Sécurité des Données | Solutions blockchain et stratégies de cybersécurité pour protéger vos données sensibles. | IA & Sécurité | ShieldCheck | #388caf | [/services/blockchain-securite](https://eternatech.net/services/blockchain-securite) |
| E-Commerce | Création de boutiques en ligne performantes avec systèmes de paiement sécurisés et gestion des stocks. | Développement | ShoppingCart | #1372a2 | [/services/e-commerce](https://eternatech.net/services/e-commerce) |
| Agence de Publicité | Stratégies marketing digitales, campagnes publicitaires et gestion des réseaux sociaux. | Marketing | Megaphone | #0b305a | [/services/publicite](https://eternatech.net/services/publicite) |
| Dépôt Label Projet Innovant | Accompagnement et orientation pour le dépôt de votre dossier label projet innovant. | Accompagnement | Lightbulb | #388caf | [/services/label-projet-innovant](https://eternatech.net/services/label-projet-innovant) |
| Dépôt Label Startup | Assistance complète pour l'obtention du label startup et accès aux avantages associés. | Accompagnement | Award | #1372a2 | À confirmer |

### 7.4 Contenus à fournir

- [ ] Lien de la page « Dépôt Label Startup »
- [ ] Validation des catégories proposées
- [ ] Une image par service, soit 13 images (format WebP ou AVIF, 800 px de large minimum)
- [ ] Description et phrase d'accroche de l'en-tête

### 7.5 Page de détail d'un service

Chaque service a sa page (ex. /services/developpement-web), construite sur le même modèle que le site actuel.

1. **En-tête simplifié** : bouton « Retour » à gauche, logo à droite.
2. **Hero du service** : titre en dégradé de marque + une phrase de présentation (ex. « Nous créons des sites web sur mesure, modernes et performants qui reflètent l'identité de votre entreprise et répondent à vos objectifs commerciaux. »).
3. **« Notre Processus »** : frise verticale centrale avec étapes numérotées, cartes alternées à gauche et à droite (empilées à gauche sur mobile). Pour le Développement Web :

| Étape | Contenu |
| --- | --- |
| 1. Analyse des besoins | Consultation pour comprendre objectifs, audience cible et exigences fonctionnelles |
| 2. Conception & Maquettage | Wireframes et mockups pour valider design et architecture |
| 3. Développement | Codage avec React, Next.js, Node.js et bonnes pratiques |
| 4. Tests & Optimisation | Tests multi-navigateurs et appareils, performances, SEO |
| 5. Hébergement & Nom de domaine | Hébergement sécurisé, certificat SSL, domaine personnalisé |
| 6. Mise en ligne & Formation | Déploiement et formation au back-office |
| 7. Maintenance & Support | Support continu, mises à jour de sécurité, maintenance préventive |

Couleurs de la frise : ligne et pastilles numérotées en dégradé #1372a2 → #388caf (au lieu du bleu → violet actuel), titre de l'étape active en #388caf. Chaque étape apparaît au défilement.

À ajouter en bas de chaque fiche (absent du site actuel) : un appel à l'action « Parlons de votre projet » vers le formulaire de contact, et 3 liens vers d'autres services.

- [ ] Textes et processus des 12 autres services

## 8. Section Solutions — BlindPath et Amane Trig

La section Solutions présente les 2 solutions phares d'Eterna Tech, BlindPath et Amane Trig, puis ses 3 domaines d'expertise. Chaque solution suit le modèle du composant d'inspiration « Features2 » : texte d'un côté, tableau de bord illustratif de l'autre.

### 8.1 Structure

1. **En-tête de section** : badge « Innovation & Technologie », titre « Nos Solutions », sous-titre « Découvrez nos solutions innovantes qui transforment les défis en opportunités ».
2. **Solutions phares** : deux blocs Features2 empilés, en miroir pour rythmer la lecture — Amane Trig avec le texte à gauche (8.2 à 8.6), BlindPath avec le texte à droite (8.7).
3. **Bloc Amane Trig** :
   - À gauche : logo Amane Trig + badge « Solution · Amane Trig », titre « Sécurité Routière Intelligente », description « Amane Trig est un dispositif de sécurité routière basé sur l'intelligence artificielle, conçu pour surveiller en temps réel le comportement du conducteur et l'environnement routier. », accordéon des 4 fonctionnalités, bouton « En savoir plus » vers [/solutions/amane-trig](https://eternatech.net/solutions/amane-trig).
   - À droite : panneau #0b305a plein avec 3 cartes blanches superposées qui simulent la plateforme web Amane Trig.
4. **Expertise technologique** : grille de 3 cartes sous les solutions (8.8).

### 8.2 Accordéon des fonctionnalités

Les textes ci-dessous sont des propositions à valider par Eterna Tech.

| Fonctionnalité | Texte affiché à l'ouverture |
| --- | --- |
| Double dashcam IA | Deux caméras filment en continu la route et le conducteur ; l'IA analyse les images directement dans le véhicule. |
| Analyse comportementale | Détection des comportements à risque du conducteur : distraction, fatigue, usage du téléphone. |
| Plateforme web | Un tableau de bord pour suivre les trajets, les événements et les indicateurs de chaque véhicule. |
| Alertes temps réel | Avertissements sonores et visuels immédiats en cas de danger, remontés aussi sur la plateforme. |

### 8.3 Cartes du tableau de bord (colonne droite)

Les chiffres sont illustratifs ; ils seront remplacés par des valeurs de démonstration fournies par Eterna Tech.

| Carte | Remplace | Contenu |
| --- | --- | --- |
| Score de conduite | Performance Overview | Score 87/100, étiquettes « Prudent » et « Stable », puis trajets analysés, distance parcourue, alertes du jour |
| Analyse comportementale | Activity Breakdown | « 6 h 45 de conduite surveillée aujourd'hui », barre segmentée Conduite sûre / Distraction / Fatigue avec légende |
| Alerte temps réel | Insights Summary | « Distance de sécurité insuffisante », horodatage « il y a 2 min », étiquettes « Caméra route » et « Traitée » |

### 8.4 Adaptation des couleurs et du style

| Élément | Inspiration (Features2) | Eterna Tech |
| --- | --- | --- |
| Fond de section | Blanc | Blanc |
| Point du badge | Couleur primaire (vert) | #388caf |
| Titre | Noir | #0b305a |
| Éléments de l'accordéon | Gris clair | Fond #1372a2 à 6 %, chevron #1372a2 ; bordure gauche #388caf sur l'élément ouvert |
| Bouton | Vert | Fond #1372a2, survol #0b305a, texte blanc |
| Panneau de droite | Gris clair, ombre intérieure | Fond #0b305a plein, cartes blanches, ombre intérieure plus sombre |
| Étiquettes vert / bleu / violet | Couleurs Tailwind | Teintes de #1372a2, #388caf et #0b305a (fond à 15 %, texte plein) |
| Barre segmentée | Émeraude / bleu / orange | Conduite sûre #1372a2, Distraction #388caf, Fatigue en orange d'alerte |
| Carte d'alerte | Aucune couleur d'alerte | Icône et bordure gauche orange ou rouge, seule exception à la palette pour signaler un danger |

### 8.5 Comportement

- Les 3 cartes apparaissent l'une après l'autre au défilement (fondu + léger décalage vertical), puis flottent doucement.
- Sous 480 px de large, les cartes ne se superposent plus : elles s'empilent en colonne pour rester lisibles.
- Si d'autres solutions s'ajoutent, la section devient un carrousel avec une solution par diapositive.

### 8.6 Contenus à fournir

- [ ] Validation des textes de l'accordéon
- [ ] Valeurs de démonstration pour les 3 cartes
- [ ] Photo du dispositif Amane Trig (option : remplacer ou compléter le tableau de bord)
- [ ] Logo Amane Trig, s'il existe

### 8.7 Bloc BlindPath

Même structure qu'Amane Trig, en miroir : tableau de bord à gauche, texte à droite (texte au-dessus sur mobile).

- Logo BlindPath + badge « Solution · BlindPath », titre « Lunettes Intelligentes pour Malvoyants ».
- Description : « BlindPath est une paire de lunettes intelligentes conçue pour offrir une autonomie réelle aux personnes aveugles et malvoyantes, grâce à la vision par ordinateur, l'intelligence artificielle et un guidage vocal avancé. »
- Bouton « En savoir plus » vers la fiche BlindPath (lien à confirmer).

| Fonctionnalité (accordéon) | Texte affiché à l'ouverture (proposition à valider) |
| --- | --- |
| Vision par ordinateur | Une caméra intégrée aux lunettes analyse l'environnement en continu. |
| Détection d'obstacles | Les obstacles sur le chemin sont repérés et signalés avant d'être atteints. |
| Reconnaissance faciale | Les visages des proches enregistrés sont reconnus et annoncés. |
| Guidage vocal | Des indications vocales claires guident la personne dans ses déplacements. |

| Carte (illustrative) | Contenu |
| --- | --- |
| Obstacle détecté | « Obstacle à 2 m, à gauche », étiquettes « Caméra » et « Signalé » |
| Guidage vocal | « Tournez à droite dans 10 m », indicateur sonore actif |
| Personne reconnue | Initiales dans un cercle + « Personne reconnue : Amine » |

Accessibilité renforcée pour ce bloc et la fiche BlindPath, car une partie du public utilise un lecteur d'écran : textes alternatifs détaillés, ordre de lecture logique, cartes décoratives masquées aux lecteurs d'écran.

- [ ] Validation des textes et lien de la fiche BlindPath
- [ ] Logo et photo des lunettes BlindPath

### 8.8 Expertise technologique

Le bloc Expertise technologique présente les 3 domaines sur lesquels reposent les services et les solutions d'Eterna Tech. Il fait le lien entre les deux : chaque carte renvoie vers ce qui utilise cette expertise.

1. **En-tête du bloc**, repris du site actuel : icône dans un carré arrondi en dégradé, titre « Expertise Technologique », puis une ligne fine qui s'étend jusqu'au bord de la page. Sous-titre proposé : « Les technologies qui propulsent nos solutions ».
2. **Grille de 3 cartes** : 1 colonne sur mobile, 3 colonnes à partir de 1024 px.
3. **Carte** :
   - Icône dans un carré arrondi.
   - Titre et description d'une phrase.
   - 4 points clés avec puce de couleur.
   - Pied de carte « Utilisée dans : » avec des étiquettes cliquables vers les solutions et services liés (ajout par rapport au site actuel).
   - Lien « Découvrir → » vers la page la plus pertinente.

| Expertise | Description | Points clés | Icône (Lucide) |
| --- | --- | --- | --- |
| IA & Machine Learning | Solutions d'IA sur mesure pour automatiser et optimiser les processus métiers | Détection d'objets · Vision par ordinateur · Modèles d'IA personnalisés · Analyse prédictive | BrainCircuit |
| 5G & IoT | Connectivité avancée combinant la 5G et l'Internet des objets pour des systèmes intelligents | Réseaux 5G · Capteurs IoT · Edge computing · Temps réel | Signal |
| Blockchain & Smart Contracts | Technologies décentralisées pour sécuriser les transactions et automatiser les processus | Smart contracts · Tokenisation · Traçabilité · Sécurité décentralisée | Link |

La description du service IA & Machine Learning mentionne l'apprentissage fédéré : il peut être ajouté comme 5e point clé de la carte IA (à valider).

**Liens croisés** (pied de carte « Utilisée dans ») :

| Expertise | Étiquettes « Utilisée dans » | Lien « Découvrir » |
| --- | --- | --- |
| IA & Machine Learning | BlindPath · Amane Trig · Service IA & Machine Learning | [/services/ia-machine-learning](https://eternatech.net/services/ia-machine-learning) |
| 5G & IoT | Amane Trig (à valider) · Service Réseaux domestiques (à valider) | À définir : pas de page dédiée aujourd'hui |
| Blockchain & Smart Contracts | Service Blockchain & Sécurité des Données | [/services/blockchain-securite](https://eternatech.net/services/blockchain-securite) |

**Couleurs et style** : le bloc se trouve sur le fond blanc de la section Solutions ; le violet et le rose du site actuel sont remplacés par la palette.

| Élément | Site actuel | Eterna Tech (nouvelle charte) |
| --- | --- | --- |
| Icône d'en-tête | Carré dégradé rose → violet | Carré dégradé #1372a2 → #388caf, icône blanche |
| Ligne d'en-tête | Violet | Dégradé #388caf → transparent |
| Cartes | Fond sombre | Fond blanc, bordure #0b305a à 10 %, ombre légère |
| Tuile d'icône | Violet foncé | Fond #1372a2 à 10 %, icône #1372a2 |
| Titre de carte | Blanc | #0b305a |
| Puces | Rose | #388caf |
| Étiquettes « Utilisée dans » | — | Fond #388caf à 10 %, texte #1372a2, survol fond #388caf à 20 % |
| Lien « Découvrir → » | — | #1372a2, flèche qui glisse au survol |

**Comportement** :

- Cartes qui apparaissent l'une après l'autre au défilement (décalage 0,1 s).
- Au survol : bordure #388caf, carte relevée de 4 px, ombre renforcée.
- En arabe, la ligne d'en-tête part vers la gauche et les puces passent à droite du texte.

* [ ] Validation du sous-titre et des liens croisés 5G & IoT
* [ ] Ajout ou non de l'apprentissage fédéré à la carte IA
* [ ] Projets réels à citer par expertise (optionnel)

## 9. Section À propos

La section À propos existe en deux formats : un aperçu sur la page d'accueil et une page /a-propos complète. Textes, chiffres, mission et valeurs sont repris du site actuel ; la mise en page suit le style des autres sections.

### 9.1 Aperçu sur la page d'accueil

1. Badge « Algérie » avec icône bâtiment, titre « Qui sommes-nous ? » en dégradé de marque.
2. Description : « Eterna Tech est une entreprise algérienne spécialisée dans les solutions technologiques innovantes. Notre équipe d'experts passionnés s'engage à fournir des services de qualité supérieure pour répondre aux défis technologiques de demain. »
3. 3 cartes de chiffres clés (voir 9.3).
4. Bouton « En savoir plus sur nous » vers /a-propos.

Le fond est sombre pour rythmer la page d'accueil : Hero sombre, Services clair, Solutions blanc, À propos sombre, Contact clair, Footer sombre.

### 9.2 Page À propos complète

| Ordre | Bloc | Contenu |
| --- | --- | --- |
| 1 | Hero de page | Fil d'Ariane « Accueil › À propos », titre « À propos d'Eterna Tech », phrase d'accroche (proposition : « Une entreprise algérienne qui transforme les défis technologiques en opportunités. ») |
| 2 | Qui sommes-nous | Description + 3 chiffres clés, comme sur l'accueil |
| 3 | Mission et valeurs | Carte Mission à gauche, liste des valeurs à droite (voir 9.4) |
| 4 | Notre approche | 4 étapes résumées du processus des fiches service : Analyse, Conception, Développement, Accompagnement |
| 5 | Notre histoire (optionnel) | Courte frise des dates clés, même composant que le processus |
| 6 | Équipe (optionnel) | Cartes avec photo, nom, rôle et lien LinkedIn |
| 7 | Où nous trouver | Adresse du I2E Student Center, carte Google Maps intégrée (chargée après consentement cookies), téléphone et e-mail |
| 8 | Appel à l'action | « Parlons de votre projet » vers la page Contact |

### 9.3 Chiffres clés

| Chiffre | Libellé | Icône (Lucide) |
| --- | --- | --- |
| 1+ | Année d'expérience | Calendar |
| 25+ | Projets réalisés | Award |
| 15+ | Clients satisfaits | Users |

Les nombres défilent de 0 à leur valeur quand la carte apparaît, une seule fois ; ils sont modifiables dans le back-office et partagés avec la Hero section.

### 9.4 Mission et valeurs

**Carte Mission** : icône fusée dans un carré en dégradé, titre « Notre Mission », sous-titre « Ce qui nous anime », texte « Fournir des solutions technologiques innovantes qui transforment les défis en opportunités et stimulent la croissance de nos clients en Algérie et au-delà. »

**Liste « Nos Valeurs »**, précédée d'un trait de couleur :

| Valeur | Texte | Icône (Lucide) |
| --- | --- | --- |
| Innovation | Nous repoussons les limites de la technologie pour créer des solutions uniques. | Lightbulb |
| Excellence | Chaque projet est réalisé avec rigueur et souci du détail. | Target |
| Croissance | Nous accompagnons nos clients vers le succès et la transformation digitale. | TrendingUp |
| Partenariat | Proposition : « Nous construisons avec nos clients des relations de confiance sur le long terme. » | Handshake |

Le site actuel n'est pas cohérent : la liste montre Innovation, Excellence, Croissance, mais les étiquettes de la carte Mission montrent Innovation, Excellence, Partenariat. Le nouveau site retient les 4 valeurs partout. Les émojis des étiquettes sont remplacés par les icônes Lucide.

### 9.5 Couleurs et style

| Élément | Site actuel | Eterna Tech (nouvelle charte) |
| --- | --- | --- |
| Fond de section | Bleu nuit | #071f3b avec halo #1372a2 à 20 % |
| Titre | Dégradé violet → rose | Dégradé #388caf → blanc |
| Badge | Bleu | Bordure #388caf à 50 %, texte #388caf |
| Cartes de chiffres | Fond sombre, carte mise en avant violette | Fond blanc à 5 %, bordure blanc à 10 % ; au survol, bordure #388caf et halo |
| Tuiles d'icônes | Violet | Fond #1372a2 à 20 %, icône #388caf |
| Nombres | Dégradé violet | Dégradé #388caf → blanc, pour rester lisible sur fond sombre |
| Carte Mission | Dégradé bleu → violet | Dégradé #0b305a → #1372a2 à 40 %, bordure blanc à 10 % |
| Lignes de valeurs | Fond sombre, titre survolé violet | Fond blanc à 5 %, survol : bordure gauche #388caf et titre #388caf |

### 9.6 Comportement

- Apparition échelonnée au défilement, comme les autres sections.
- En arabe, la carte Mission passe à droite, les valeurs à gauche, et le trait avant « Nos Valeurs » se place à droite du titre.
- Les nombres sont lus en entier par les lecteurs d'écran (ex. « plus de 25 projets réalisés »).

### 9.7 Contenus à fournir

- [ ] Texte de la valeur Partenariat
- [ ] Phrase d'accroche de la page À propos
- [ ] Dates clés de l'histoire (optionnel)
- [ ] Photos, noms et rôles de l'équipe (optionnel)
- [ ] Photo des locaux ou de l'équipe
- [ ] Traductions anglaise et arabe

## 10. Footer

Le footer reprend le composant d'inspiration « Footer19 » : fond sombre avec halo lumineux et trame de points, inscription à la newsletter en haut, colonnes de liens au milieu, informations légales en bas. Il est commun à toutes les pages.

### 10.1 Structure

1. **Bloc newsletter** :
   - À gauche : point lumineux + badge « VOTRE PARTENAIRE TECHNOLOGIQUE », titre sur trois lignes « Nos actualités, / projets et conseils tech, / directement dans votre boîte mail. »
   - À droite : champ e-mail « Votre adresse e-mail » + bouton « S'abonner » avec flèche.
2. **Bloc liens** :
   - À gauche : logo + « Eterna Tech », slogan « Solutions technologiques innovantes pour les entreprises de demain. », puis 5 icônes de réseaux sociaux dans des carrés arrondis (Instagram, Facebook, TikTok, LinkedIn, messagerie).
   - À droite : 3 colonnes de liens, comme dans le modèle (1 colonne sur mobile, 3 sur ordinateur).
3. **Bande du bas** : copyright, localisation + heure locale, liens légaux.

### 10.2 Colonnes de liens

Contenus repris du footer actuel d'eternatech.net.

| LIENS RAPIDES | SERVICES | CONTACT |
| --- | --- | --- |
| Accueil | Développement Web | Icône localisation : I2E Student Center, Bureau N°3, Université de Tlemcen, Tlemcen 13000 (lien « Voir sur Google Maps ») |
| Services | Applications Mobiles | Icône téléphone : +213 659 793 110 |
| Solutions | Formation IT | Icône e-mail : <contact@eternatech.net> |
| À propos | IA & Machine Learning |  |
| Contact | Modélisation 3D & Prototypage |  |
|  | Voir tous les services → |  |

Les icônes de la colonne Contact sont en #388caf ; le numéro et l'e-mail sont cliquables (appel et envoi de mail directs).

### 10.3 Bande du bas

| Élément | Modèle | Eterna Tech |
| --- | --- | --- |
| Copyright | « Copyright© Watermelon Studio » | « © 2026 Eterna Tech. Tous droits réservés. », année mise à jour automatiquement |
| Localisation | Ville fixe | « Tlemcen, Algérie » |
| Heure | Heure fixe dans le code | Horloge réelle, fuseau Africa/Algiers (UTC+1), mise à jour chaque seconde |
| Liens légaux | Absents | Mentions légales · Politique de confidentialité · Gestion des cookies |
| Réseaux sociaux | Liens texte dans la bande du bas | Déplacés en icônes sous le slogan (voir 10.1) |

### 10.4 Adaptation des couleurs et du style

| Élément | Inspiration (Footer19) | Eterna Tech |
| --- | --- | --- |
| Fond | #0A0A0B | #0b305a assombri (ex. #071f3b) |
| Halo en bas à gauche | Violet à 20 %, flou 120 px | #1372a2 à 30 %, flou 120 px ; second halo #388caf à 15 % en haut à droite |
| Trame de points | Blanc à 7 % | Inchangée |
| Point du badge | Violet avec lueur | #388caf avec lueur #388caf |
| Champ e-mail | Fond noir, bordure gris foncé, focus violet | Fond blanc à 5 %, bordure blanc à 15 %, focus #388caf |
| Bouton « S'abonner » | Violet, sans survol | Fond #1372a2, survol #388caf |
| Titres de colonnes | Blanc, majuscules | Inchangé |
| Liens | Gris, blanc au survol | Blanc à 70 %, #388caf au survol |
| Bande du bas | Gris foncé | Blanc à 50 %, séparée par une ligne blanc à 10 % |
| Sélection de texte | Violet à 30 % | #388caf à 30 % |

### 10.5 Comportement et corrections techniques

- Apparition échelonnée au défilement (fondu + montée + flou), une seule fois : inchangée.
- Le formulaire du modèle n'envoie rien : il doit être relié à un service de newsletter (Brevo ou Mailchimp), avec messages de succès et d'erreur et mention de consentement.
- Le modèle utilise les icônes Hugeicons alors que la commande d'installation indique react-icons : pour rester cohérent avec le reste du site, remplacer par react-icons (ou installer @hugeicons/react et @hugeicons/core-free-icons).
- La commande d'installation « motion/react » est incorrecte : le paquet à installer s'appelle motion.
- Labels accessibles sur le champ e-mail et contraste AA vérifié sur fond sombre.

### 10.6 Contenus à fournir

- [ ] Logo Eterna Tech en version claire (pour fond sombre)
- [ ] Liens des 5 réseaux sociaux, et nature de l'icône de messagerie (WhatsApp ?)
- [ ] Lien Google Maps exact du bureau
- [ ] Service de newsletter retenu

## 11. Spécifications techniques

La stack proposée reprend les technologies du composant d'inspiration (React, Tailwind CSS, Motion, react-icons), dans un framework adapté au référencement.

| Domaine | Choix proposé |
| --- | --- |
| Framework | Next.js (React, TypeScript), rendu statique ou côté serveur |
| Styles | Tailwind CSS avec les couleurs de marque déclarées comme variables (primary, secondary, accent) |
| Composants | shadcn/ui ; utilitaires clsx et tailwind-merge |
| Animations | Motion (motion/react) |
| Icônes | react-icons |
| Contenus | CMS headless (Strapi, Sanity ou Payload) — à choisir |
| Hébergement | Vercel ou serveur VPS avec CDN — à choisir |
| Formulaires | API route + service d'e-mail (Resend, SMTP) |
| Suivi | Google Analytics 4 ou Plausible, Search Console |

Exigences :

- **Responsive** : mobile, tablette, ordinateur (points de rupture 640, 768, 1024, 1280 px)
- **Performance** : Lighthouse ≥ 90 sur mobile, images en AVIF/WebP avec chargement différé, LCP < 2,5 s
- **SEO** : balises title et meta par page, Open Graph, sitemap.xml, robots.txt, données structurées (Organization), URLs lisibles
- **Accessibilité** : WCAG 2.1 AA, navigation au clavier, textes alternatifs, respect de prefers-reduced-motion
- **Sécurité** : HTTPS, en-têtes de sécurité (CSP, HSTS), protection anti-spam des formulaires, mises à jour des dépendances
- **Conformité** : consentement cookies et politique de confidentialité conformes à la loi applicable
- **Compatibilité** : deux dernières versions de Chrome, Firefox, Safari et Edge

### Multilingue et arabe RTL

Le site est publié en 3 langues : français (langue par défaut), anglais et arabe.

| Exigence | Détail |
| --- | --- |
| URLs | Un préfixe par langue : /fr, /en, /ar (ex. /ar/services/developpement-web) |
| Traduction de l'interface | Bibliothèque next-intl, fichiers de traduction par langue |
| Contenus | Champs traduisibles dans le CMS (services, solutions, textes des sections) |
| Sens de lecture | Attribut dir="rtl" et lang="ar" sur la page arabe ; dir="ltr" pour FR et EN |
| Mise en page | Propriétés logiques Tailwind (ms/me, ps/pe, start/end) au lieu de gauche/droite, pour que toute la page s'inverse automatiquement en arabe |
| Éléments inversés en RTL | Flèches (« En savoir plus → », « Retour »), animations de glissement latéral, blocs en miroir des solutions, frise du processus, alignement du texte |
| Éléments non inversés | Logos, numéros de téléphone, adresses e-mail, chiffres clés, lecture vidéo |
| Typographie arabe | Police dédiée (IBM Plex Sans Arabic, Cairo ou Noto Kufi Arabic), avec la même hiérarchie de tailles |
| SEO | Balises hreflang entre les 3 versions, sitemap par langue, title et meta traduits |
| Détection | Langue du navigateur proposée à la première visite, choix mémorisé ensuite |

## 12. Contenus, back-office et maintenance

Eterna Tech doit pouvoir modifier ses contenus sans développeur, via un back-office simple.

- **Contenus gérés dans le back-office** : textes de la Hero section, services, réalisations, articles de blog, témoignages, chiffres clés, offres d'emploi
- **Rôles** : administrateur (tout), éditeur (contenus uniquement)
- **Médias** : bibliothèque d'images avec redimensionnement automatique
- **Formulaires** : consultation des messages reçus dans le back-office en plus de l'e-mail
- **Rédaction des contenus** : fournis par Eterna Tech ; le prestataire intègre et optimise pour le SEO
- **Maintenance** : sauvegardes automatiques quotidiennes, mises à jour de sécurité mensuelles, support correctif pendant 3 mois après la mise en ligne (durée à confirmer)
- **Formation** : une session de prise en main du back-office + guide d'utilisation

## 13. Planning, livrables et recette

Le projet est découpé en 6 phases, pour une durée indicative de 10 à 12 semaines ; les dates seront fixées après validation du cahier des charges.

| Phase | Livrables | Durée indicative |
| --- | --- | --- |
| 1. Cadrage | Cahier des charges validé, arborescence | 1 semaine |
| 2. Design UX/UI | Maquettes desktop et mobile (Figma), design system | 2 à 3 semaines |
| 3. Développement front-end | Pages et composants intégrés, animations | 3 semaines |
| 4. Back-office et intégrations | CMS, formulaires, analytics | 2 semaines |
| 5. Tests et recette | Rapport de tests, corrections | 1 à 2 semaines |
| 6. Mise en ligne | Site en production, formation, documentation | 1 semaine |

Critères de recette :

- [ ] Toutes les pages V1 conformes aux maquettes validées
- [ ] Affichage correct sur mobile, tablette et ordinateur
- [ ] Score Lighthouse ≥ 90 (performance, accessibilité, SEO)
- [ ] Formulaire de contact testé de bout en bout
- [ ] Contenus modifiables depuis le back-office
- [ ] Aucune erreur bloquante dans la console ni lien cassé
- [ ] Code source et accès (hébergement, CMS, domaine) remis à Eterna Tech

## 14. Points à compléter

Ces informations sont nécessaires pour finaliser le cahier des charges.

- [x] Activité, services, solutions, expertise, mission et valeurs
- [x] Coordonnées, adresse et chiffres clés
- [x] Langues du site : français, anglais et arabe (RTL)
- [ ] Pages Réalisations et Blog : en V1 ou en V2 ?
- [ ] Inspirations de design restantes : page Contact, fiches solution (la page À propos suit le style des autres sections, voir 9)
- [ ] Textes des 12 fiches service restantes
- [ ] Typographie et logo définitifs
- [ ] Choix du CMS et de l'hébergement
- [ ] Budget et date de mise en ligne souhaitée
- [ ] Cibles chiffrées des indicateurs de réussite

## 15. Consignes de développement (Kiro)

Cette section s'adresse à l'outil ou à l'équipe qui développe le site. Les sections 6 à 10 décrivent la page d'accueil de haut en bas ; les composants d'inspiration (Hero4, Blog4, Features2, Footer19) servent de base, avec les adaptations décrites dans chaque section.

**Ordre de réalisation**

1. Initialiser le projet Next.js (TypeScript, Tailwind CSS, Motion, react-icons, Lucide) et déclarer la palette : primary #1372a2, secondary #0b305a, accent #388caf.
2. Mettre en place le multilingue FR / EN / AR avec next-intl et le RTL (section 11) avant tout composant, pour que chaque composant soit construit avec des propriétés logiques dès le départ.
3. Header et menu mobile, puis Footer (section 10).
4. Page d'accueil dans l'ordre : Hero (6), Services (7), Solutions (8), À propos (9), aperçu Contact.
5. Pages Services et fiche service avec processus (7.5), pages Solutions et fiches BlindPath et Amane Trig (8).
6. Page À propos complète (9.2), page Contact avec formulaire relié à l'envoi d'e-mail.
7. SEO, accessibilité, performances et recette (sections 11 et 13).

**Règles à respecter**

- Aucune couleur violette, verte ou orange des composants d'origine ne doit rester ; seule exception : la couleur d'alerte de la carte Amane Trig (8.4).
- Tous les textes passent par les fichiers de traduction ou le contenu ; aucun texte écrit en dur dans les composants.
- Utiliser ms/me, ps/pe, start/end plutôt que left/right, et vérifier chaque page en arabe.
- Respecter prefers-reduced-motion pour toutes les animations.
- Les textes marqués « proposition » ou « à valider » peuvent être utilisés tels quels comme contenu provisoire.

**Hypothèses par défaut pour les points encore ouverts (section 14)**

| Point ouvert | Hypothèse à appliquer en attendant |
| --- | --- |
| CMS non choisi | Contenus dans des fichiers JSON par langue, structurés pour migrer ensuite vers un CMS |
| Hébergement non choisi | Déploiement compatible Vercel |
| Logo définitif absent | Emplacement SVG remplaçable, texte « Eterna Tech » en attendant |
| Images absentes | Images de remplacement neutres, dimensions finales respectées |
| Traductions EN / AR absentes | Traduire les textes français, à faire relire par Eterna Tech |
| Réalisations, Blog, Carrières | Hors périmètre V1 |

## 16. Annexe — Code des composants d'inspiration

Voici le code d'origine des 4 composants cités dans les sections 6, 7, 8 et 10, tel qu'il a été fourni. Il sert de base de structure et d'animation ; les couleurs, textes et corrections décrits dans ces sections s'appliquent par-dessus.

Ces composants utilisent la syntaxe Tailwind CSS v4 (ex. brightness-70, mask-b-from-50%, border-none!) : le projet doit donc utiliser Tailwind v4. Les imports en @/components/base-ui/… et @/assets/logo-icon viennent de la bibliothèque d'origine et doivent être remplacés par les composants du projet (shadcn/ui) et le logo Eterna Tech.

### 16.1 Hero4 — Hero section (section 6)

Points d'attention :

- Le composant utilise motion (motion/react), absent de la commande d'installation d'origine.
- LogoIcon (@/assets/logo-icon) est à remplacer par le logo Eterna Tech.
- Le bouton « Sign in » est retiré (6.1) ; les stats et réseaux sociaux par défaut sont remplacés par les contenus de la section 6.
- Le dégradé #4514C1 → #E8522D → #F59E45 et les couleurs amber / orange / rose sont remplacés par la palette (6.2).
- Le glissement x: -30 des animations doit s'inverser en arabe (RTL).

Installation d'origine :

```bash
npm install react-icons clsx tailwind-merge
```

demo.tsx :

```tsx
import { Hero4 } from '.';

export default function Hero4Demo() {
  return (
    <div className="flex  w-full flex-col justify-center bg-slate-950">
      <Hero4
        logoText="Watermelon"
        navItems={[
          { label: 'Products', href: '#' },
          { label: 'Solutions', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Resources', href: '#' },
        ]}
        signInText="Sign in"
        signInHref="#"
        getStartedText="Get Started"
        getStartedHref="#"
        badgeText="CRAFTED FOR TOMORROW"
        titleLine1="Where Creativity"
        titleLine2Start="Meets"
        titleLine2Accent="Brilliance"
        description="Watermelon helps teams design, prototype, and ship with cutting-edge tools that turn bold ideas into lasting digital experiences."
        primaryCtaText="Get Started"
        primaryCtaHref="#"
        secondaryCtaText="Watch Demo"
        secondaryCtaHref="#"
        backgroundImage="https://assets.watermelon.sh/hero-4-bg.avif"
      />
    </div>
  );
}
```

index.tsx :

```tsx
import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import {
  FaArrowTrendUp,
  FaShieldHalved,
  FaEarthAmericas,
  FaPlay,
  FaStar,
  FaBars,
  FaXmark,
  FaChevronDown,
} from 'react-icons/fa6';
import LogoIcon from '@/assets/logo-icon';

export interface Hero4NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface Hero4Stat {
  value: string;
  label: string;
  icon?: ReactNode;
}

export interface Hero4SocialLink {
  label: string;
  href: string;
}

export interface Hero4Props {
  /** Brand logo icon */
  logo?: ReactNode;
  /** Brand logo text */
  logoText?: string;
  /** Navigation items */
  navItems?: Hero4NavItem[];
  /** Sign in button text */
  signInText?: string;
  /** Sign in button URL */
  signInHref?: string;
  /** Get started button text */
  getStartedText?: string;
  /** Get started button URL */
  getStartedHref?: string;
  /** Badge text above the headline */
  badgeText?: string;
  /** Headline line 1 */
  titleLine1?: string;
  /** Headline line 2 (start — regular color) */
  titleLine2Start?: string;
  /** Headline line 2 (end — gradient accent) */
  titleLine2Accent?: string;
  /** Body description paragraph */
  description?: string;
  /** Primary CTA text */
  primaryCtaText?: string;
  /** Primary CTA URL */
  primaryCtaHref?: string;
  /** Secondary CTA text */
  secondaryCtaText?: string;
  /** Secondary CTA URL */
  secondaryCtaHref?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Stats displayed in the bottom bar */
  stats?: Hero4Stat[];
  /** Social links in the bottom bar */
  socialLinks?: Hero4SocialLink[];
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: -30, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 70, damping: 20 },
  },
};

export function Hero4({
  logo,
  logoText = 'Luminary',
  navItems = [
    { label: 'Products', href: '#', hasDropdown: false },
    { label: 'Solutions', href: '#', hasDropdown: false },
    { label: 'Pricing', href: '#', hasDropdown: false },
    { label: 'Resources', href: '#', hasDropdown: false },
  ],
  signInText = 'Sign in',
  signInHref = '#',
  getStartedText = 'Get Started',
  getStartedHref = '#',
  badgeText = 'CRAFTED FOR TOMORROW',
  titleLine1 = 'Where Creativity',
  titleLine2Start = 'Meets ',
  titleLine2Accent = 'Brilliance',
  description = 'Luminary helps teams design, prototype, and ship with cutting-edge tools that turn bold ideas into lasting digital experiences.',
  primaryCtaText = 'Get Started',
  primaryCtaHref = '#',
  secondaryCtaText = 'Watch Demo',
  secondaryCtaHref = '#',
  backgroundImage = 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1920',
  stats = [
    {
      value: '10K+',
      label: 'Active Teams',
      icon: <FaArrowTrendUp className="h-4 w-4 fill-current" />,
    },
    {
      value: '99.9%',
      label: 'Uptime',
      icon: <FaShieldHalved className="h-4 w-4 fill-current" />,
    },
    {
      value: '150+',
      label: 'Countries',
      icon: <FaEarthAmericas className="h-4 w-4 fill-current" />,
    },
  ],
  socialLinks = [
    { label: 'Linkedin', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Behance', href: '#' },
  ],
}: Hero4Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-white">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none h-full w-full object-cover brightness-70 select-none"
          />
        </div>
      )}

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-30 w-full"
      >
        <div className="mx-auto flex max-w-full items-center justify-between px-8 py-5 sm:px-12 md:px-16 lg:px-20">
          <a
            href="#"
            className="flex items-center gap-2 text-lg font-medium tracking-tight text-white"
          >
            <span className="flex items-center justify-center text-white">
              {logo || <LogoIcon className="size-8 fill-current" />}
            </span>
            <span className="text-md font-light tracking-wide">{logoText}</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-1 text-sm font-normal text-zinc-300 transition-colors duration-200 hover:text-white"
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <FaChevronDown className="h-2.5 w-2.5 fill-current transition-transform duration-200 group-hover:translate-y-0.5" />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={signInHref}
              className="flex items-center justify-center rounded-[12px] border border-zinc-700 bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] p-[1px]"
            >
              <div className="rounded-lg bg-black px-5 py-2 text-sm font-light text-white transition-all duration-200">
                {signInText}
              </div>
            </a>
            <a
              href={getStartedHref}
              className="rounded-lg bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] px-5 py-2 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-200 hover:bg-amber-500"
            >
              {getStartedText}
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-zinc-800 md:hidden"
            aria-label="Toggle navigation menu"
          >
            <FaBars className="h-5 w-5 fill-current" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 p-6 backdrop-blur-md md:hidden"
          >
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-center text-white">
                {logo || <LogoIcon className="size-8 fill-current" />}
              </span>
              <span className="text-xl font-light tracking-wide uppercase">
                {logoText}
              </span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-zinc-800"
              aria-label="Close menu"
            >
              <FaXmark className="h-5 w-5 fill-current" />
            </button>
          </div>

          <nav className="mt-12 flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between border-b border-zinc-800 pb-3 text-lg font-medium text-white transition-colors hover:text-amber-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <FaChevronDown className="h-4 w-4 fill-current text-zinc-500" />
                )}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href={signInHref}
              className="flex items-center justify-center rounded-[12px] border border-zinc-700 bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] p-[1px]"
            >
              <div className="w-full rounded-lg bg-black px-5 py-3 text-center text-sm font-light text-white transition-all duration-200">
                {signInText}
              </div>
            </a>
            <a
              href={getStartedHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] py-3 text-base font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-colors"
            >
              {getStartedText}
            </a>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 pt-3 pb-8 sm:px-12 md:px-16 md:pt-24 lg:px-20 lg:pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-1 flex-col justify-center"
        >
          <div className="max-w-3xl">
            {badgeText && (
              <motion.div variants={item} className="mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-800/50 bg-amber-950/40 px-4 py-1.5 text-xs font-medium tracking-wider text-amber-400">
                  <FaStar className="h-3 w-3 fill-amber-400" />
                  {badgeText}
                </span>
              </motion.div>
            )}

            <motion.h1 variants={item} className="mb-6 text-4xl leading-tight font-normal tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {titleLine1 && <span className="block">{titleLine1}</span>}
              {(titleLine2Start || titleLine2Accent) && (
                <span className="block">
                  {titleLine2Start}
                  {titleLine2Accent && (
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                      {titleLine2Accent}
                    </span>
                  )}
                </span>
              )}
            </motion.h1>

            {description && (
              <motion.p variants={item} className="sm:text-md mb-8 max-w-lg text-base leading-relaxed font-light text-zinc-200">
                {description}
              </motion.p>
            )}

            <motion.div variants={item} className="flex flex-wrap items-center gap-4">
              {primaryCtaText && (
                <a
                  href={primaryCtaHref}
                  className="rounded-lg bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] px-7 py-3 text-sm font-medium text-white shadow-lg shadow-amber-600/20 outline-2 -outline-offset-2 outline-white/20 transition-all duration-200 hover:bg-amber-500 hover:shadow-amber-500/30"
                >
                  {primaryCtaText}
                </a>
              )}
              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className="flex items-center justify-center rounded-[12px] border border-zinc-700 bg-gradient-to-r from-[#4514C1] via-[#E8522D] to-[#F59E45] p-[1px]"
                >
                  <div className="flex items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-light text-white transition-all duration-200">
                    {secondaryCtaText}
                    <FaPlay className="ml-2 h-3 w-3 fill-current" />
                  </div>
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-12 mb-12 sm:mt-12 md:mt-30"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            {stats.length > 0 && (
              <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                {stats.map((stat) => (
                  <motion.div variants={item} key={stat.label} className="flex items-center gap-3">
                    {stat.icon && (
                      <div className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-zinc-200 backdrop-blur-sm">
                        {stat.icon}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-xl font-light tracking-tight text-white sm:text-3xl">
                        {stat.value}
                      </span>
                      <span className="text-sm font-normal text-zinc-300">
                        {stat.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="flex items-center gap-8">
                {socialLinks.map((link) => (
                  <motion.a
                    variants={item}
                    key={link.label}
                    href={link.href}
                    className="text-sm font-normal text-zinc-300 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### 16.2 Blog4 — Section Services (section 7)

Points d'attention :

- Le composant utilise lucide-react, absent de la commande d'installation d'origine, ainsi que Button, Card (@/components/base-ui/…) et cn (@/lib/utils).
- Le lien « Read article » est un \<a> placé dans le \<a> qui entoure la carte : HTML invalide. Le remplacer par un \<span>.
- La phrase « From people strategy to team wellbeing… » est écrite en dur et le champ badge n'est pas affiché : les relier aux données de la section 7.
- Les classes iconTile et cta de accentClasses ne sont pas utilisées ; les couleurs violet / green / blue sont remplacées par les 3 accents de la palette (7.2).
- Les cartes Eterna Tech ajoutent une description et remplacent le temps de lecture par la catégorie (7.1).

Installation d'origine :

```bash
npm install react-icons clsx tailwind-merge
```

demo.tsx :

```tsx
'use client';

import Blog4 from '.';



export default function Blog4Demo() {
  return (
    <Blog4
    />
  );
}
```

index.tsx :

```tsx
'use client';

import type { ReactNode } from 'react';
import {
  ArrowRight,
  Bookmark,
  Heart,
  type LucideIcon,
  UserRound,
  UsersRound,
} from 'lucide-react';

import { Button } from '@/components/base-ui/button';
import { Card, CardContent } from '@/components/base-ui/card';
import { cn } from '@/lib/utils';

type Blog4Accent = 'violet' | 'green' | 'blue';

export interface Blog5Article {
  category: string;
  readTime: string;
  title: string;
  href?: string;
  accent: Blog4Accent;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
}

export interface Blog4Data {
  badge: string;
  heading: string;
  description: string;
  viewAllLabel: string;
  viewAllHref: string;
  articles: Blog5Article[];
  activeSlide?: number;
  slideCount?: number;
}

export interface Blog4Props {
  data?: Blog4Data;
  className?: string;
  renderViewAllLink?: (props: {
    href: string;
    children: ReactNode;
  }) => ReactNode;
  renderArticleLink?: (props: {
    href: string;
    children: ReactNode;
  }) => ReactNode;
}

const accentClasses: Record<
  Blog4Accent,
  {
    dot: string;
    iconTile: string;
    icon: string;
    cta: string;
    ctaText: string;
  }
> = {
  violet: {
    dot: 'bg-violet-500',
    iconTile: 'bg-violet-100 dark:bg-violet-500/20',
    icon: 'text-violet-700 dark:text-violet-300',
    cta: 'bg-violet-50 hover:bg-violet-100 dark:bg-violet-500/10 dark:hover:bg-violet-500/20',
    ctaText: 'text-violet-700 dark:text-violet-300',
  },
  green: {
    dot: 'bg-green-500',
    iconTile: 'bg-green-100 dark:bg-green-500/20',
    icon: 'text-green-700 dark:text-green-300',
    cta: 'bg-green-50 hover:bg-green-100 dark:bg-green-500/10 dark:hover:bg-green-500/20',
    ctaText: 'text-green-700 dark:text-green-300',
  },
  blue: {
    dot: 'bg-blue-500',
    iconTile: 'bg-blue-100 dark:bg-blue-500/20',
    icon: 'text-blue-700 dark:text-blue-300',
    cta: 'bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20',
    ctaText: 'text-blue-700 dark:text-blue-300',
  },
};

const defaultBlog4Data: Blog4Data = {
  badge: 'RESOURCES',
  heading: 'Design systems and\nfrontend engineering',
  description:
    'Guides, patterns, and practical insights for building scalable modern interfaces.',
  viewAllLabel: 'Browse all posts',
  viewAllHref: '#',
  activeSlide: 0,
  slideCount: 3,
  articles: [
    {
      category: 'Design Systems',
      readTime: '7 min read',
      title:
        'How semantic color tokens make large UI systems easier to scale',
      href: '#',
      accent: 'violet',
      imageSrc:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      icon: UsersRound,
      imageAlt: 'Developer workspace with monitor and keyboard',
    },
    {
      category: 'Frontend',
      readTime: '5 min read',
      title: 'Building cleaner dashboards with spacing, hierarchy, and motion',
      href: '#',
      accent: 'green',
      imageSrc:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      icon: Heart,
      imageAlt: 'Modern UI dashboard on laptop screen',
    },
    {
      category: 'Performance',
      readTime: '6 min read',
      title: 'Simple ways to improve perceived performance in React apps',
      href: '#',
      accent: 'blue',
      imageSrc:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      icon: UserRound,
      imageAlt: 'Code editor open on a desktop setup',
    },
  ],
};

export default function Blog4({
  data = defaultBlog4Data,
  className,
  renderViewAllLink,
  renderArticleLink,
}: Blog4Props) {
  const viewAll = (
    <Button
      asChild
      variant="ghost"
      className="text-foreground h-auto rounded-none border-b px-0 pb-3 text-lg font-semibold hover:bg-transparent"
    >
      <span>
        {data.viewAllLabel}
        <ArrowRight className="ml-4 size-5" />
      </span>
    </Button>
  );

  return (
    <section className={cn('bg-muted/30 w-full py-8', className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-10">
          <div>
            <h2 className="text-foreground mt-8 max-w-2xl text-4xl leading-tight font-semibold tracking-tight whitespace-pre-line sm:text-5xl md:text-6xl">
              {data.heading}
            </h2>

            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="pt-0 lg:pt-24">
            <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
              From people strategy to team wellbeing, we share what's working
              for teams like yours.
            </p>
            <div className="mt-10 w-fit">
              {renderViewAllLink ? (
                renderViewAllLink({
                  href: data.viewAllHref,
                  children: viewAll,
                })
              ) : (
                <a href={data.viewAllHref}>{viewAll}</a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-4">
          {data.articles.map((article) => (
            <Blog5ArticleCard
              key={`${article.category}-${article.title}`}
              article={article}
              renderArticleLink={renderArticleLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog5ArticleCard({
  article,
  renderArticleLink,
}: {
  article: Blog5Article;
  renderArticleLink?: Blog4Props['renderArticleLink'];
}) {
  const accent = accentClasses[article.accent];

  const card = (
    <Card className="group border-border bg-card flex h-full flex-col overflow-hidden rounded-2xl pt-0 pb-4 shadow-sm transition-all hover:shadow-md">
      <div className="relative h-60 overflow-hidden sm:h-64 dark:mask-b-from-50%">
        <img
          src={article.imageSrc}
          alt={article.imageAlt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="bg-background/90 text-foreground hover:bg-background absolute top-4 right-4 flex size-10 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-colors">
          <Bookmark className="size-5" strokeWidth={1.7} />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span className={cn('size-2 rounded-full', accent.dot)} />
            <span className="font-medium">{article.category}</span>
          </div>
          <span className="text-muted-foreground shrink-0 text-sm">
            {article.readTime}
          </span>
        </div>

        <h3 className="text-foreground mt-2 mb-2 text-xl font-semibold tracking-tight">
          {article.title}
        </h3>

        <div className="mt-auto">
          <a className="flex items-center gap-0.5">
            Read article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );

  if (renderArticleLink && article.href) {
    return renderArticleLink({ href: article.href, children: card });
  }

  if (article.href) {
    return (
      <a
        href={article.href}
        className="focus-visible:ring-ring block rounded-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {card}
      </a>
    );
  }

  return card;
}
```

### 16.3 Features2 — Section Solutions (section 8)

Points d'attention :

- Le composant utilise Card, Button et Accordion (@/components/base-ui/…) ; la classe theme-injected vient de la bibliothèque d'origine et peut être retirée.
- La classe border-b-none du 2e élément de l'accordéon n'existe pas dans Tailwind (probablement border-b-0 ou border-none!).
- L'accordéon est en ligne (flex gap-2) : avec 4 fonctionnalités, le disposer en colonne (flex-col) et en mode single (un seul ouvert).
- Les 3 cartes sont en position absolue avec des largeurs fixes : prévoir la version empilée sous 480 px (8.5).
- Les couleurs green / blue / purple / emerald / orange sont remplacées par la palette ; le panneau de droite passe en #0b305a plein avec cartes blanches (8.4).
- Le bloc BlindPath réutilise ce composant en miroir (tableau de bord à gauche, texte à droite, 8.7).

Installation d'origine :

```bash
npm install react-icons clsx tailwind-merge
```

demo.tsx :

```tsx
'use client';

import Features2 from ".";


export default function Feature2Demo() {
  return <Features2 />;
}
```

index.tsx :

```tsx
'use client';

import { Card, CardContent } from '@/components/base-ui/card';
import { Button } from '@/components/base-ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/base-ui/accordion';

export default function Features2() {
  return (
    <section className="theme-injected bg-background w-full py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="text-muted-foreground bg-muted/50 inline-flex w-fit items-center gap-2 rounded-lg px-3 py-1 text-sm">
            <span className="bg-primary h-2 w-2 rounded-full" />
            Smart insights
          </div>

          <h2 className="text-5xl leading-tight font-semibold tracking-tight">
            Turn raw data into clear decisions
          </h2>

          <p className="text-muted-foreground max-w-lg">
            Analyze patterns, track performance, and uncover actionable insights
            to make faster and smarter decisions with confidence.
          </p>

          <div className="flex gap-2">
            <Accordion type="single" collapsible className="flex gap-2">
              <AccordionItem
                value="item-1"
                className="bg-muted/50 rounded-lg border-none! px-4"
              >
                <AccordionTrigger className="text-sm hover:no-underline">
                  What insights can I track?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-3 text-sm">
                  Track productivity trends, focus time, collaboration patterns,
                  and performance metrics to understand how work actually
                  happens across your team.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="item-2"
                className="bg-muted/50 border-b-none flex-1 rounded-lg px-4"
              >
                <AccordionTrigger className="text-sm hover:no-underline">
                  Does it work in real-time?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-3 text-sm">
                  Yes, all insights are updated in real-time, giving you instant
                  visibility into activity, performance changes, and emerging
                  patterns as they happen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Button className="rounded-sm px-6 shadow-[inset_0_0px_2px_0px_rgba(0,0,0,0.1),inset_0_0px_4px_0px_rgba(0,0,0,0.1)]">
            Get started
          </Button>
        </div>

        <div className="bg-muted dark:bg-card/50 relative flex justify-center rounded-xl p-8 shadow-[inset_0_0px_4px_0px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0px_4px_0px_rgba(0,0,0,1)]">
          <div className="relative h-[380px] w-full max-w-md">
            <Card className="bg-background/80 dark:bg-card/80 ring-border/50 absolute top-0 left-0 w-[260px] rounded-lg p-0 shadow-md backdrop-blur-md">
              <CardContent className="space-y-2 p-4">
                <div className="text-muted-foreground text-xs">
                  Performance Overview
                </div>

                <div className="text-2xl font-semibold">
                  72<span className="text-muted-foreground text-sm">%</span>
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-200 px-2 py-0.5 text-green-700">
                    Improving
                  </span>
                  <span className="rounded-md bg-blue-200 px-2 py-0.5 text-blue-700">
                    Stable
                  </span>
                </div>

                <div className="text-muted-foreground space-y-1 text-xs">
                  <div>Tasks Completed: 124</div>
                  <div>Avg Focus Time: 3.2h</div>
                  <div>Efficiency: +12%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 absolute top-28 right-0 z-50 w-[240px] rounded-lg p-0 shadow-lg backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="text-muted-foreground text-xs">
                  Activity Breakdown
                </div>

                <div className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    6h 45m tracked
                  </span>{' '}
                  today
                </div>

                <div className="flex h-2 w-full gap-1">
                  <div className="w-[40%] rounded-full bg-emerald-400" />
                  <div className="w-[35%] rounded-full bg-blue-400" />
                  <div className="w-[25%] rounded-full bg-orange-400" />
                </div>

                <div className="text-muted-foreground flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Deep Work
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    Collaboration
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    Breaks
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/90 dark:bg-card/80 ring-border/50 absolute bottom-8 left-10 w-[260px] rounded-lg p-0 shadow-lg backdrop-blur-md">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Insights Summary</span>
                  <span className="text-muted-foreground text-xs">Updated</span>
                </div>

                <div className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    +18% productivity
                  </span>{' '}
                  this week
                </div>

                <div className="flex gap-2 text-[10px]">
                  <span className="rounded-md bg-green-200 px-2 py-0.5 text-green-700">
                    Growth
                  </span>
                  <span className="rounded-md bg-purple-200 px-2 py-0.5 text-purple-700">
                    Optimized
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 16.4 Footer19 — Footer (section 10)

Points d'attention :

- La commande d'installation d'origine est incorrecte : le paquet s'appelle motion (et non motion/react), et les icônes Hugeicons (@hugeicons/react, @hugeicons/core-free-icons) ne sont pas listées. Pour rester cohérent, remplacer ces icônes par react-icons ou Lucide.
- Le formulaire ne fait qu'un preventDefault : le relier au service de newsletter, avec messages de succès et d'erreur (10.5).
- L'heure est une chaîne fixe : la remplacer par une horloge réelle au fuseau Africa/Algiers (10.3).
- La structure des colonnes, le slogan, les icônes sociales et la colonne Contact suivent 10.1 et 10.2 ; les couleurs violet / neutral suivent 10.4.
- LogoIcon (@/assets/logo-icon) du fichier demo est à remplacer par le logo Eterna Tech.

Installation d'origine (à corriger comme indiqué ci-dessus) :

```bash
npm install motion/react react-icons
```

demo.tsx :

```tsx
import Footer19 from "./index";
import LogoIcon from "@/assets/logo-icon";

export default function Footer19Demo() {
  const customNavColumns = [
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Story", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "PLATFORM",
      links: [
        { label: "UI Blocks", href: "#" },
        { label: "Vite App Templates", href: "#" },
        { label: "Framer Motion", href: "#" },
        { label: "Pricing Plan", href: "#" },
      ],
    },
    {
      title: "SUPPORT",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Sales", href: "#" },
        { label: "System Status", href: "#" },
        { label: "Registry API", href: "#" },
      ],
    },
  ];

  const customSocialLinks = [
    { label: "Instagram", href: "https://instagram.com/watermelon" },
    { label: "Linkedin", href: "https://linkedin.com/company/watermelon" },
    { label: "Github", href: "https://github.com/watermelon" },
  ];

  return (
    <div className="flex w-full items-end bg-neutral-950">
      <Footer19
        badgeText="ENGINEERED FOR MODERN TEAMS"
        newsletterHeading={"The latest blocks,\ncomponents, and updates,\nin your inbox weekly."}
        newsletterPlaceholder="Enter your developer email"
        newsletterButtonText="Stay Updated"
        brandName="Watermelon"
        brandLogo={
          <LogoIcon className="text-violet-500 size-8" />
        }
        navColumns={customNavColumns}
        copyright="© 2026 Watermelon Labs, Inc. All rights reserved."
        location="Brooklyn, NY"
        time="10:45:00 AM"
        socialLinks={customSocialLinks}
      />
    </div>
  );
}
```

index.tsx :

```tsx
'use client'

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, LanguageCircleIcon, SparklesIcon } from "@hugeicons/core-free-icons";
import { motion, type Variants } from 'motion/react';

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.05,
        },
    },
};

const riseItem: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { type: 'spring', duration: 0.6, bounce: 0 },
    },
};

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface Footer19Props {
  badgeText?: string;
  newsletterHeading?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  brandName?: string;
  brandLogo?: React.ReactNode;
  navColumns?: FooterColumn[];
  copyright?: string;
  location?: string;
  time?: string;
  socialLinks?: { label: string; href: string }[];
}

export default function Footer19({
  badgeText = "Trusted by Thousands",
  newsletterHeading = "The latest news,\narticles, and resources,\nin your inbox weekly.",
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Stay Updated",
  brandName = "Watermelon",
  brandLogo = <HugeiconsIcon icon={SparklesIcon} size={24} className="text-violet-500 fill-violet-500/20" />,
  navColumns = [
    {
      title: "COMPANY",
      links: [
        { label: "About Us", href: "#" },
        { label: "Guides", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },
    {
      title: "PRODUCTS",
      links: [
        { label: "Software", href: "#" },
        { label: "Hardware", href: "#" },
        { label: "Accessories", href: "#" },
        { label: "Licensing", href: "#" },
      ],
    },
    {
      title: "CONTACT",
      links: [
        { label: "Email", href: "#" },
        { label: "Phone", href: "#" },
        { label: "Locations", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
  ],
  copyright = "Copyright© Watermelon Studio",
  location = "Brooklyn, NY",
  time = "07:23:14 AM",
  socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "Linkedin", href: "#" },
  ],
}: Footer19Props) {
  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="relative w-full bg-[#0A0A0B] text-neutral-300 font-sans overflow-hidden selection:bg-violet-500/30"
    >
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bottom Left Glow */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full" />
        
        {/* Dotted Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.07]" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)", 
            backgroundSize: "24px 24px" 
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 flex flex-col min-h-[500px] justify-between">
        
        {/* ── Top Section: Newsletter ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-24">
          <motion.div variants={riseItem} className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-violet-600 shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
              <span className="text-sm font-medium text-neutral-200">{badgeText}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-light leading-[1.1] text-white tracking-tight whitespace-pre-line">
              {newsletterHeading}
            </h2>
          </motion.div>

          <motion.div variants={riseItem} className="w-full max-w-md lg:mt-auto">
            <form className="flex w-full h-14" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="flex-1 bg-neutral-950 border border-neutral-800 border-r-0 px-5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-violet-600 transition-shadow"
                required
              />
              <button
                type="submit"
                className="h-full px-6 bg-violet-700 transition-colors border border-violet-800 flex items-center justify-center gap-2 text-sm font-medium text-white cursor-pointer"
              >
                {newsletterButtonText}
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── Middle Section: Links & Logo ── */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <motion.div variants={riseItem} className="flex items-center gap-2 text-white">
            {brandLogo}
            <span className="text-xl md:text-2xl font-medium tracking-tight">{brandName}</span>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 lg:gap-32">
            {navColumns.map((col, idx) => (
              <motion.div key={idx} variants={riseItem} className="flex flex-col gap-6">
                <h4 className="text-xs font-semibold tracking-wider text-white uppercase">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom Section: Meta ── */}
        <motion.div variants={riseItem} className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 text-xs text-neutral-500">
          <p>{copyright}</p>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={LanguageCircleIcon} size={16} />
              <span>{location}</span>
            </div>
            <span className="tabular-nums tracking-widest">{time}</span>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.href} 
                className="hover:text-white transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
}
```
