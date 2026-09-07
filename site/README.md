# Association Quimperlé-Glo — site vitrine

Site vitrine de l'**Association Quimperlé-Glo** (Quimperlé, Bretagne ↔ Glo-Djigbé, Bénin) :
accueil, mot de la présidente, équipe, album photo et contact. Application [Next.js](https://nextjs.org)
(App Router, TypeScript) construite à partir d'un handoff [Claude Design](https://claude.com).

## Origine du projet

Ce dépôt est le portage en production d'un handoff généré dans **Claude Design** — pages,
composants et tokens de design system livrés sous forme de HTML/JSX de référence (React en
navigateur, sans build). Ce matériel d'origine est conservé tel quel dans
[`templates/_handoff-site-nextjs/`](templates/_handoff-site-nextjs) à titre de référence ; ce
n'est pas du code applicatif et il n'est pas utilisé par l'application.

Le portage a repris fidèlement :

- les **5 pages** du handoff (accueil, mot de la présidente, équipe, album, contact) ;
- tous les **composants du design system** (`Button`, `Badge`, `Eyebrow`, `SectionHeading`,
  `StatBlock`, `NavBar`, `Footer`, `MissionCard`) et les sections de page (`Hero`,
  `MissionsSection`, `AboutSection`, `DonateBand`, `DonateModal`, `PhotoMarquee`,
  `PresidentTeaser`, `Reveal`) ;
- les **tokens de design** (couleurs, typographie, espacements/rayons/ombres/animations),
  conservés à l'identique en variables CSS dans [`styles/tokens/`](styles/tokens).

### Écarts assumés par rapport au handoff

- **Polices** : le handoff charge Bricolage Grotesque / Manrope / Caveat depuis le CDN Google
  Fonts. Ici elles sont chargées via `next/font/google` (auto-hébergées, sans requête CDN), en
  conservant les mêmes noms de variables CSS (`--font-display`, `--font-body`, `--font-script`).
- **Album photo** : le handoff référence 19 photos originales haute résolution qui ne sont pas
  incluses dans ce paquet de design (seules 13 photos de travail redimensionnées sont fournies
  dans `design/photos/`). Les 6 légendes sans image correspondante ont été retirées plutôt que
  associées à une photo trompeuse — voir le commentaire dans
  [`lib/site-data.ts`](lib/site-data.ts).
- **Navigation interne** : les `onClick={() => window.location.href = '...'}` du handoff sont
  remplacés par `next/link` / `Button as="a"` pour une navigation côté client idiomatique.
- **Formulaires (don, contact, connexion membre)** : maquettes fonctionnelles côté client
  uniquement (pas de backend). Voir « Points restant à trancher » ci-dessous.
- **Mobile** : le handoff cible explicitement un viewport desktop (`1280×760/900`, annoté dans
  chaque page source) et ne fournit ni menu mobile ni breakpoints. Le responsive a donc été ajouté
  par-dessus le design d'origine, sans en modifier le rendu desktop — voir « Responsive »
  ci-dessous.

## Responsive

Le rendu desktop reste strictement celui du handoff. En dessous, trois mécanismes se combinent :

- **Menu burger** sous 900px : les liens et le CTA de la `NavBar` se replient dans un panneau
  déroulant (fermeture au clic sur un lien, à la touche Échap, et au retour en desktop).
- **Variables CSS de points de rupture** : les composants portent des styles inline (repris tels
  quels du handoff), et un style inline l'emporte sur toute règle de classe — une media query ne
  peut donc pas les surcharger. Les valeurs de mise en page qui doivent changer selon la largeur
  sont donc exposées en variables CSS dans `app/globals.css` (`--footer-cols`, `--form-row-cols`,
  `--nav-h`, `--hero-min-h`) et consommées depuis les styles inline. Seule la `NavBar`, qui
  demande un vrai changement de structure, utilise des classes (`.qg-nav-*`).
- **Grilles fluides** : les grilles `auto-fit` utilisent `minmax(min(320px, 100%), 1fr)` pour ne
  pas déborder sous 320px de large.

Points vérifiés à 320 / 375 / 768 / 1280px : aucun débordement horizontal sur les 5 pages, cibles
tactiles ≥ 44px, ancres `#missions` / `#about` dégagées de la barre sticky, hauteur du héros en
`svh` (la barre d'adresse mobile ne décale plus le premier écran), et respect de
`prefers-reduced-motion`.

### Points restant à trancher (hérités du handoff)

1. Adresse e-mail de contact réelle (`contact@quimperle-glo.fr` est un placeholder).
2. Prestataire de don réel pour remplacer la modale `DonateModal` (HelloAsso, Stripe…).
3. Espace membre (`/equipe`) : vraie authentification ou suppression de la maquette de connexion.
4. Formulaire de contact (`/contact`) : brancher sur une Server Action ou un service d'envoi
   d'e-mails (actuellement simulé côté client).
5. Vérifier les légendes de l'album et les liens des articles de presse (placeholders `href="#"`
   sur les `MissionCard`).

## Prérequis

- [Node.js](https://nodejs.org) ≥ 20
- npm (fourni avec Node.js)

## Installation

```bash
npm install
```

## Scripts disponibles

| Commande               | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `npm run dev`          | Démarre le serveur de développement sur `localhost:3000`. |
| `npm run build`        | Build de production.                                      |
| `npm run start`        | Démarre le serveur de production (après `build`).         |
| `npm run lint`         | Vérifie le code avec ESLint.                              |
| `npm run format`       | Formate le code avec Prettier.                            |
| `npm run format:check` | Vérifie le formatage sans modifier les fichiers.          |

## Structure du projet

```
app/                          # Routes App Router
  layout.tsx                  # <html lang="fr">, polices next/font, styles globaux
  page.tsx                    # Accueil
  mot-de-la-presidente/
  equipe/
  album/
  contact/
components/
  ui/                         # Design system : Button, Badge, Eyebrow, SectionHeading,
                               # StatBlock, NavBar, Footer, MissionCard
  sections/                   # Sections de page : Hero, MissionsSection, AboutSection,
                               # DonateBand, DonateModal, PhotoMarquee, PresidentTeaser, Reveal
lib/
  site-data.ts                # Données partagées (nav, footer, missions, album, bureau)
types/
  index.ts                    # Types partagés (NavLink, Mission, AlbumPhoto, …)
styles/
  tokens/                     # Tokens de design (couleurs, typographie, espacements) — importés
                               # dans app/globals.css
public/
  assets/, photos/            # Images du site
templates/
  _handoff-site-nextjs/       # Handoff Claude Design d'origine, conservé pour référence
```

## Stack technique

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) pour la base/reset
- Tokens de design en variables CSS natives (couleurs, typographie, espacements) — les composants
  y font directement référence via `style={{ color: 'var(--ink-900)' }}`, à l'identique du handoff
- ESLint (`eslint-config-next`) + Prettier
