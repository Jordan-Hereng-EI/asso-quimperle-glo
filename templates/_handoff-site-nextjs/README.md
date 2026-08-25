# Handoff — Site Association Quimperlé-Glo → Next.js

## Overview

Site vitrine de l'association Quimperlé-Glo (Quimperlé, Bretagne ↔ Glo-Djigbé, Bénin) : 5 pages —
accueil, mot de la présidente, équipe, album photo, contact. Objectif du portage : recréer ces pages
dans une application **Next.js (App Router)** avec React + CSS Modules ou Tailwind, en gardant les
tokens de design tels quels.

## À propos des fichiers de design

Les fichiers de `design/` sont des **références de design réalisées en HTML/JSX navigateur** (React
UMD + Babel in-browser, composants exposés sur `window`). Ce **n'est pas du code de production** :
il ne faut pas les copier tels quels. Le travail consiste à **recréer ces écrans** dans un projet
Next.js propre (composants serveur/clients, imports ES, pas de `window.*`, pas de Babel runtime).

## Fidélité

**Hi-fi.** Couleurs, typographies, espacements, animations et copie sont définitifs. Reproduire
fidèlement le rendu ; les tokens CSS sont fournis et doivent être conservés à l'identique.

## Structure cible suggérée

```
app/
  layout.tsx            # <html lang="fr">, fonts, styles globaux, NavBar + Footer
  page.tsx              # accueil (design/index.html)
  mot-de-la-presidente/page.tsx
  equipe/page.tsx
  album/page.tsx
  contact/page.tsx
components/
  ui/                   # portage de design-system/components (Button, Badge, NavBar, Footer,
                        # MissionCard, SectionHeading, StatBlock, Eyebrow)
  sections/             # Hero, MissionsSection, AboutSection, DonateBand, PhotoMarquee,
                        # PresidentTeaser, DonateModal, Reveal
styles/
  tokens.css            # copie de design-system/tokens/*.css
public/
  photos/, assets/
```

## Écrans

### 1. Accueil — `design/index.html`

Assemblage (dans l'ordre) : `NavBar` sticky transparente qui devient opaque après 40px de scroll →
`Hero` (plein écran, photo Ken-Burns, dégradés de protection, révélation en cascade, bande tricolore,
chiffres d'impact, indicateur de scroll animé) → `MissionsSection` (3 `MissionCard` : Éducation /
Terrain / Solidarité, une couleur de drapeau par carte, lien vers un article de presse) →
`PhotoMarquee` (bandeau photo défilant vers l'album) → `AboutSection` (récit en split-layout, badge
logo en surimpression, points de valeur) → `PresidentTeaser` (citation, lien vers sa lettre) →
`DonateBand` (bande sombre + CTA) → `Footer` → `DonateModal`.

Comportements : le scroll se fait sur un conteneur `#scrollhost` (à remplacer par le scroll document
en Next.js) ; `DonateModal` = flux de don **factice** (sélection de montant + état de remerciement),
à brancher sur un vrai prestataire (HelloAsso, Stripe…).

### 2. Mot de la présidente — `design/mot-de-la-presidente.html`

Lettre longue : en-tête photo, badges partenaires, corps de lettre, membres du bureau, remerciements,
projet « Glo sans palu », mission, appel au don. Contenu statique → composant serveur.

### 3. Équipe — `design/equipe.html`

6 cartes membres du bureau, bandeau de statistiques (≈20 actifs, ≈10 fondateurs, ≈100 adhérents),
maquette d'espace membre (connexion **non fonctionnelle** — décider si on l'implémente ou on la retire).

### 4. Album — `design/album.html`

Mosaïque de 19 photos légendées, filtres Bénin / Bretagne, lightbox plein écran avec navigation
clavier (←/→, Échap). En Next.js : `next/image` + composant client pour filtres et lightbox.

### 5. Contact — `design/contact.html`

Adresse, formulaire (états de focus, confirmation). **Aucun backend** : à brancher sur une Server
Action ou un service d'envoi. L'adresse e-mail présente est un **placeholder à remplacer**.

## Interactions & animations

- Révélations au scroll : `Reveal.jsx` = wrapper `IntersectionObserver` (opacité + translateY 24px,
  ~700ms, easing doux, délais échelonnés). Porter tel quel en composant client.
- NavBar : transition fond/ombre au-delà de 40px de scroll.
- Hero : zoom lent Ken-Burns sur l'image de fond (~20s, infini).
- Lightbox album : ouverture/fermeture en fondu, navigation clavier et clic.
- Modale de don : sélection de montant → état « merci ».

## Design tokens

Fichiers sources : `design-system/tokens/` (à copier tel quel dans `styles/`).

**Couleurs** — base logo : sand `#faf6ee #f2e9d6 #e6d5b3 #d5be92 #c6ac79 #b1935c #937743` ;
encre `#0f0806 #171310 #2a231d #423a30` ; sauge `#4f6349 #6e8765 #a6b79e`.
Accents drapeau béninois : vert `#009543` / `#007235`, jaune `#fcd017` / `#f2b705`,
rouge `#e8112d` / `#bd0a20`. Neutres : `#ffffff`, papier `#fdfbf6`, pierre `#f3efe6 #e4ddcf #a89e8b`.
Alias sémantiques (`--bg-page`, `--text-strong`, `--action-primary`, `--focus-ring`, …) définis dans
`tokens/colors.css` — les conserver, les composants s'y réfèrent.

**Typographie** — display : Bricolage Grotesque ; corps : Manrope ; accent manuscrit : Caveat
(Google Fonts). Échelle : 80 / 56 / 40 / 32 / 24 / 20 / 16 / 14 / 12 px. Interlignes 1.02 → 1.65,
graisses 400 → 800, interlettrage -0.03em → 0.16em (eyebrow). En Next.js : `next/font/google`
pour les trois familles, en gardant les mêmes noms de variables CSS.

**Espacements, rayons, ombres** : `design-system/tokens/spacing.css`.

## Composants du design system

`design-system/components/**` — chaque composant a son `.jsx`, son `.d.ts` (contrat de props) et un
`.prompt.md` (intention d'usage). Ils sont écrits en React avec styles inline lisant les variables
CSS ; le portage consiste surtout à remplacer l'export global `window.*` par des exports ES et,
si souhaité, à passer les styles en CSS Modules / Tailwind arbitrary values sur les mêmes tokens.

## Assets

- `design/assets/` : `logo.jpg`, `enfants.jpg`, `article1.avif`, `article2.avif`.
- `design/photos/` : 14 photos terrain redimensionnées (Bénin & Bretagne) utilisées en fonds de
  section, dans le bandeau défilant et l'album. Les originaux haute résolution sont dans le projet
  de design (`uploads/`) si des versions plus grandes sont nécessaires.
- Le logo est du lettrage manuscrit livré en image uniquement — ne pas tenter de le reconstituer en
  texte.

## Points à trancher avant/pendant le portage

1. Adresse e-mail de contact réelle (actuellement un placeholder).
2. Prestataire de don réel pour remplacer `DonateModal`.
3. Espace membre : vraie authentification ou suppression de la maquette.
4. Vérifier les légendes de l'album (déduites des noms de fichiers).
5. Liens des articles de presse dans les `MissionCard` (placeholders).
6. Chiffres d'impact du hero à confirmer.

## Fichiers de ce paquet

```
design/          pages HTML + sections JSX + navigation + images
design-system/   styles.css, tokens/*.css, components/**
```
