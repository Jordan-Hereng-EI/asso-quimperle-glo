import type { AlbumPhoto, BureauMember, FooterColumn, Mission, NavLink } from "@/types";

/**
 * Builds the primary nav links, marking the current page as active.
 * `active` matches the handoff's per-page NAV_LINKS(active) helper.
 */
export function getNavLinks(active?: string): NavLink[] {
  return [
    { label: "Accueil", href: "/", active: active === "accueil" },
    { label: "Nos missions", href: "/#missions" },
    { label: "Album", href: "/album", active: active === "album" },
    { label: "L'équipe", href: "/equipe", active: active === "equipe" },
    { label: "Contact", href: "/contact", active: active === "contact" },
  ];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Association",
    items: [
      { label: "Le mot de la présidente", href: "/mot-de-la-presidente" },
      { label: "L'équipe & espace membre", href: "/equipe" },
      { label: "Album photo", href: "/album" },
      { label: "Nos missions", href: "/#missions" },
    ],
  },
  {
    title: "Agir",
    items: [
      { label: "Faire un don", href: "#don" },
      { label: "Devenir bénévole", href: "/contact" },
      { label: "Parrainer un enfant", href: "/contact" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
];

export const MISSIONS: Mission[] = [
  {
    image: "/assets/enfants.jpg",
    imageAlt: "Enfants béninois souriant",
    tag: "Éducation",
    tagTone: "green",
    accent: "var(--benin-green)",
    title: "Scolariser chaque enfant",
    description:
      "Fournitures, uniformes et parrainage scolaire pour que les enfants de la région rejoignent les bancs de l'école et y restent.",
    articleSource: "Ouest-France",
    href: "#",
  },
  {
    image: "/assets/article1.avif",
    imageAlt: "Bénévoles en mission sur le terrain au Bénin",
    tag: "Terrain",
    tagTone: "yellow",
    accent: "var(--benin-yellow-deep)",
    title: "Des missions sur place",
    description:
      "Deux fois par an, nos bénévoles se rendent au Bénin pour rencontrer les familles, évaluer les besoins et suivre les projets.",
    articleSource: "Le Télégramme",
    href: "#",
  },
  {
    image: "/assets/article2.avif",
    imageAlt: "Marché solidaire à Quimperlé",
    tag: "Solidarité",
    tagTone: "red",
    accent: "var(--benin-red)",
    title: "Mobiliser à Quimperlé",
    description:
      "Marchés solidaires, ventes d'artisanat béninois et événements en Bretagne financent nos actions tout au long de l'année.",
    articleSource: "Le Poher",
    href: "#",
  },
];

/**
 * The handoff's album references 19 originals from a high-res `uploads/`
 * folder that wasn't included in this design package — only 13 resized
 * working photos ship in `design/photos/`. Captions below are kept from the
 * handoff for the 13 entries with a matching file; the 6 without an asset
 * were dropped rather than paired with a misleading image. See the
 * "Points à trancher" section of the original handoff README.
 */
export const ALBUM: AlbumPhoto[] = [
  {
    file: "enfants.jpg",
    title: "Les enfants de Glo Alladacomè",
    description:
      "Des sourires qui résument notre raison d'être : les enfants du village accueillent la mission.",
    category: "benin",
    width: 2000,
    height: 1333,
  },
  {
    file: "gouter.jpg",
    title: "Transports des enfants parrainés",
    description: "Description à écrire.",
    category: "benin",
    width: 1600,
    height: 1200,
  },
  {
    file: "courrier.jpg",
    title: "Courrier aux parrains et marraines",
    description:
      "Les enfants parrainés rédigent leur courrier pour leurs parrains et marraines de Bretagne.",
    category: "benin",
    width: 1200,
    height: 1600,
  },
  {
    file: "denise.jpg",
    title: "Denise, parrainée en 2019",
    description: "Aujourd'hui coiffeuse installée et mariée — une belle réussite du parrainage.",
    category: "benin",
    width: 1200,
    height: 1600,
  },
  {
    file: "yokpo1.jpg",
    title: "Le CEG de Yokpo",
    description:
      "Le drapeau béninois flotte sur la cour du collège, un des établissements suivis par l'association.",
    category: "benin",
    width: 1600,
    height: 1200,
  },
  {
    file: "yokpo2.jpg",
    title: "CEG de Yokpo, la cour",
    description: "Vélos et motos des élèves à l'ombre des manguiers, à l'heure de la classe.",
    category: "benin",
    width: 1600,
    height: 1200,
  },
  {
    file: "ceg432.jpg",
    title: "Produit agricole offert par les locaux",
    description: "Description à écrire.",
    category: "benin",
    width: 1600,
    height: 1200,
  },
  {
    file: "campagne.jpg",
    title: "Campagne à Glo-Djigbé",
    description: "Les femmes du village réunies pour une campagne de sensibilisation santé.",
    category: "benin",
    width: 1600,
    height: 1200,
  },
  {
    file: "dons.jpg",
    title: "Dons alimentaires à Glo-Fanto",
    description: "Distribution de vivres aux familles du village de Glo-Fanto.",
    category: "benin",
    width: 360,
    height: 269,
  },
  {
    file: "sakete.jpg",
    title: "Visite aux orphelins de Sakété",
    description: "Un moment de partage et de jeux avec les enfants de l'orphelinat.",
    category: "benin",
    width: 1600,
    height: 1200,
  },
  {
    file: "chips.jpg",
    title: "Chips « ALOHADO »",
    description:
      "Fabrication de chips de banane plantain — un atelier générateur de revenus pour les femmes.",
    category: "benin",
    width: 1200,
    height: 1600,
  },
  {
    file: "pelagie.jpg",
    title: "Clotilde, Pélagie et Céline",
    description: "Restitution du 23-24 mars 2025 à l'Espace Benoite Groult.",
    category: "bretagne",
    width: 1600,
    height: 1144,
  },
];

export const BUREAU: BureauMember[] = [
  { name: "Pélagie Atanhlouéto-Tritscher", role: "Présidente", tone: "green" },
  { name: "Yves Le Goff", role: "Vice-président", tone: "yellow" },
  { name: "Gwénaëlle Petit-Jean", role: "Secrétaire", tone: "red" },
  { name: "Katty Bardouil", role: "Secrétaire adjointe", tone: "green" },
  { name: "Christine Le Goff", role: "Trésorière", tone: "yellow" },
  { name: "Thomas Dinahet", role: "Communication", tone: "red" },
];

export const PARTNERS: string[] = [
  "Mairie de Quimperlé",
  "Département du Finistère",
  "Région Bretagne",
  "Brest'Eau",
  "PRA/OSIM",
  "AFD",
  "FORIM",
  "XYLM",
  "CAPCOS",
  "CBF",
];
