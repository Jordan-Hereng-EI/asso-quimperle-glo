# Association Quimperlé-Glo — site vitrine

Site vitrine de l'**Association Quimperlé-Glo** (Quimperlé, Bretagne ↔ Glo, Bénin) :
accueil, projets, actions, parrainages, mot de la présidente, équipe, album photo et contact.
Application [Next.js](https://nextjs.org) (App Router, TypeScript) construite à partir d'un
handoff [Claude Design](https://claude.com), puis enrichie du contenu rédigé par l'association.

## Origine du projet

Ce dossier est le portage en production d'un handoff généré dans **Claude Design** — pages,
composants et tokens de design system livrés sous forme de HTML/JSX de référence (React en
navigateur, sans build). Ce matériel d'origine est conservé tel quel dans
[`templates/_handoff-site-nextjs/`](templates/_handoff-site-nextjs) à titre de référence ; ce
n'est pas du code applicatif et il n'est pas utilisé par l'application.

Le portage a repris fidèlement :

- les **5 pages** du handoff (accueil, mot de la présidente, équipe, album, contact) ;
- les **composants du design system** (`Button`, `Badge`, `Eyebrow`, `SectionHeading`,
  `StatBlock`, `NavBar`, `Footer`) et les sections de page (`Hero`, `AboutSection`,
  `DonateBand`, `DonateModal`, `PhotoMarquee`, `PresidentTeaser`, `Reveal`) ;
- les **tokens de design** (couleurs, typographie, espacements/rayons/ombres/animations),
  conservés à l'identique en variables CSS dans [`styles/tokens/`](styles/tokens).

Depuis, trois pages et une section d'accueil ont été ajoutées à partir du document
« Les éléments du site en cours » fourni par l'association (voir « Contenu géré en base »).

### Écarts assumés par rapport au handoff

- **Polices** : le handoff charge Bricolage Grotesque / Manrope / Caveat depuis le CDN Google
  Fonts. Ici elles sont chargées via `next/font/google` (auto-hébergées, sans requête CDN), en
  conservant les mêmes noms de variables CSS (`--font-display`, `--font-body`, `--font-script`).
- **Album photo** : le handoff référence 19 photos originales haute résolution qui ne sont pas
  incluses dans ce paquet de design (seules 13 photos de travail redimensionnées sont fournies
  dans `design/photos/`). Les 6 légendes sans image correspondante ont été retirées plutôt que
  associées à une photo trompeuse — voir le commentaire dans
  [`lib/site-data.ts`](lib/site-data.ts).
- **Section « Nos missions »** de l'accueil : remplacée par `EngagementsSection`, qui met en
  avant le projet en cours et ouvre vers Projets / Actions / Parrainages avec les chiffres
  réels (`MissionCard` / `MissionsSection` ont été retirés).
- **Modale de don** : deux vrais parcours (HelloAsso, virement avec RIB) à la place du faux
  choix de montant. Adresse HelloAsso et RIB sont des **valeurs factices** dans
  [`lib/site-data.ts`](lib/site-data.ts) ; le bouton HelloAsso reste désactivé tant que l'URL
  vaut `#`.
- **Navigation interne** : les `onClick={() => window.location.href = '...'}` du handoff sont
  remplacés par `next/link` / `Button as="a"` pour une navigation côté client idiomatique.
- **Formulaires (contact, connexion membre)** : maquettes fonctionnelles côté client
  uniquement (pas de backend). Voir « Points restant à trancher » ci-dessous.
- **Mobile** : le handoff cible explicitement un viewport desktop (`1280×760/900`, annoté dans
  chaque page source) et ne fournit ni menu mobile ni breakpoints. Le responsive a donc été ajouté
  par-dessus le design d'origine, sans en modifier le rendu desktop — voir « Responsive »
  ci-dessous.

## Contenu géré en base

Les pages **Projets**, **Actions** et **Parrainages**, ainsi que la section « Nos engagements »
de l'accueil, lisent PostgreSQL (`lib/db.ts`, `lib/content.ts`) et sont rendues à la demande
(`force-dynamic`) pour refléter immédiatement les modifications faites dans l'admin. La lecture
est tolérante : sans `DATABASE_URL` ou si la base est injoignable, les pages affichent leurs
états vides au lieu de tomber.

Les photos associées à ce contenu sont déposées depuis l'admin sur un volume partagé et servies
par la route `app/uploads/[file]/route.ts` (`UPLOADS_DIR`). Le composant `PhotoFrame` affiche un
cadre « Photo à venir » quand aucune photo n'est encore associée.

Le schéma, les migrations et le contenu initial (repris du document de l'association) vivent
dans `admin/migrations/` — voir le README à la racine du dépôt.

## Responsive

Le rendu desktop reste strictement celui du handoff. En dessous, trois mécanismes se combinent :

- **Menu burger** sous 1000px : les six liens et le CTA de la `NavBar` se replient dans un
  panneau déroulant (fermeture au clic sur un lien, à la touche Échap, et au retour en desktop).
- **Variables CSS de points de rupture** : les composants portent des styles inline (repris tels
  quels du handoff), et un style inline l'emporte sur toute règle de classe — une media query ne
  peut donc pas les surcharger. Les valeurs de mise en page qui doivent changer selon la largeur
  sont donc exposées en variables CSS dans `app/globals.css` (`--footer-cols`, `--form-row-cols`,
  `--nav-h`, `--hero-min-h`) et consommées depuis les styles inline. Seule la `NavBar`, qui
  demande un vrai changement de structure, utilise des classes (`.qg-nav-*`).
- **Grilles fluides** : les grilles `auto-fit` utilisent `minmax(min(320px, 100%), 1fr)` pour ne
  pas déborder sous 320px de large.

Points vérifiés à 320 / 375 / 768 / 1010 / 1280px : aucun débordement horizontal sur les 8
pages, cibles tactiles ≥ 44px, ancres (`#engagements`, `#<slug-de-projet>`, …) dégagées de la
barre sticky, hauteur du héros en `svh` (la barre d'adresse mobile ne décale plus le premier
écran), et respect de `prefers-reduced-motion`.

### Points restant à trancher

1. Adresse e-mail de contact réelle (`contact@quimperle-glo.fr` est un placeholder).
2. Adresse de la page HelloAsso et vrai RIB (`HELLOASSO_URL`, `RIB` dans `lib/site-data.ts`).
3. Espace membre (`/equipe`) : vraie authentification ou suppression de la maquette de connexion.
4. Formulaire de contact (`/contact`) : brancher sur une Server Action ou un service d'envoi
   d'e-mails (actuellement simulé côté client).
5. Vérifier les légendes de l'album. Les articles de presse des projets et actions se renseignent
   désormais depuis l'admin.
6. Chiffres du hero et des pages (≈ 20 parrainés, etc.) à confirmer avec l'association.

## Prérequis

- [Node.js](https://nodejs.org) ≥ 20
- npm (fourni avec Node.js)
- Une base PostgreSQL pour voir le contenu dynamique (`docker compose up -d db` à la racine)

## Installation

```bash
npm install
```

Variables d'environnement (`.env.local`, non commité) :

```bash
DATABASE_URL=postgresql://quimperle:devpassword@localhost:5432/quimperle_glo
UPLOADS_DIR=../admin/uploads   # photos déposées par l'admin en développement
```

## Scripts disponibles

| Commande               | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Démarre le serveur de développement sur `localhost:3000`. |
| `npm run build`        | Build de production (sortie `standalone`).                |
| `npm run start`        | Démarre le serveur de production (après `build`).         |
| `npm run lint`         | Vérifie le code avec ESLint.                              |
| `npm run format`       | Formate le code avec Prettier.                            |
| `npm run format:check` | Vérifie le formatage sans modifier les fichiers.          |

## Structure du projet

```
app/                          # Routes App Router
  layout.tsx                  # <html lang="fr">, polices next/font, styles globaux
  page.tsx + HomePage.tsx     # Accueil (données serveur → composant client)
  projets/                    # Projets réalisés / en cours / à venir (base)
  actions/                    # Actions au Bénin et en Bretagne (base)
  parrainages/                # Parrainages : initiales, galerie (base)
  mot-de-la-presidente/
  equipe/
  album/
  contact/
  uploads/[file]/route.ts     # Sert les photos uploadées (volume partagé)
components/
  ui/                         # Design system : Button, Badge, Eyebrow, SectionHeading,
                               # StatBlock, NavBar, Footer, PhotoFrame, Lightbox, FilterChip,
                               # EntryCard, ArticleLink, ProjectCard
  sections/                   # Sections de page : Hero, EngagementsSection, AboutSection,
                               # DonateBand, DonateModal, PhotoMarquee, PresidentTeaser, Reveal
lib/
  site-data.ts                # Données statiques (nav, footer, album, bureau, don)
  db.ts                       # Pool PostgreSQL en lecture tolérante
  content.ts                  # Requêtes projets / actions / parrainages / compteurs
types/
  index.ts                    # Types partagés (NavLink, Project, ActionEntry, PhotoRef, …)
styles/
  tokens/                     # Tokens de design (couleurs, typographie, espacements) — importés
                               # dans app/globals.css
public/
  assets/, photos/            # Images statiques du site
templates/
  _handoff-site-nextjs/       # Handoff Claude Design d'origine, conservé pour référence
```

## Stack technique

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) pour la base/reset
- Tokens de design en variables CSS natives (couleurs, typographie, espacements) — les composants
  y font directement référence via `style={{ color: 'var(--ink-900)' }}`, à l'identique du handoff
- `pg` pour la lecture du contenu, `sharp` pour `next/image` en production
- ESLint (`eslint-config-next`) + Prettier
