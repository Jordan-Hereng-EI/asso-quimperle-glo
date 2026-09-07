/* Shared nav/footer link data + upload path helper for all site pages. */
window.UPLOAD = function (n) {
  return "../../uploads/" + encodeURIComponent(n);
};
window.NAV_LINKS = function (active) {
  return [
    { label: "Accueil", href: "index.html", active: active === "accueil" },
    { label: "Nos missions", href: "index.html#missions" },
    { label: "Album", href: "album.html", active: active === "album" },
    { label: "L'équipe", href: "equipe.html", active: active === "equipe" },
    { label: "Contact", href: "contact.html", active: active === "contact" },
  ];
};
window.FOOTER_COLS = [
  {
    title: "Association",
    items: [
      { label: "Le mot de la présidente", href: "mot-de-la-presidente.html" },
      { label: "L'équipe & espace membre", href: "equipe.html" },
      { label: "Album photo", href: "album.html" },
      { label: "Nos missions", href: "index.html#missions" },
    ],
  },
  {
    title: "Agir",
    items: [
      { label: "Faire un don", href: "#don" },
      { label: "Devenir bénévole", href: "contact.html" },
      { label: "Parrainer un enfant", href: "contact.html" },
      { label: "Nous contacter", href: "contact.html" },
    ],
  },
];
window.ALBUM = [
  {
    f: "enfants.jpg",
    t: "Les enfants de Glo",
    d: "Des sourires qui résument notre raison d'être : les enfants du village accueillent la mission.",
    cat: "benin",
  },
  {
    f: "Gouter offert par Dominique.jpg",
    t: "Goûter offert par Dominique",
    d: "Jeux, danses et goûter sous le préau — un moment de fête offert aux enfants.",
    cat: "benin",
  },
  {
    f: "Courrier aux parrains-marraines.jpg",
    t: "Courrier aux parrains et marraines",
    d: "Les enfants parrainés rédigent leur courrier pour leurs parrains et marraines de Bretagne.",
    cat: "benin",
  },
  {
    f: "Denise parrainée en 2019. Maintenant coiffeuse et mariée.jpg",
    t: "Denise, parrainée en 2019",
    d: "Aujourd'hui coiffeuse installée et mariée — une belle réussite du parrainage.",
    cat: "benin",
  },
  {
    f: "CEG YOKPO.jpg",
    t: "Le CEG de Yokpo",
    d: "Le drapeau béninois flotte sur la cour du collège, un des établissements suivis par l\u2019association.",
    cat: "benin",
  },
  {
    f: "CEG YOKPO 2.jpg",
    t: "CEG de Yokpo, la cour",
    d: "Vélos et motos des élèves à l'ombre des manguiers, à l'heure de la classe.",
    cat: "benin",
  },
  {
    f: "CEG de 432 élèves.jpg",
    t: "Un CEG de 432 élèves",
    d: "Les salles en dur accueillent les collégiens de tout le secteur.",
    cat: "benin",
  },
  {
    f: "Cantine scolaire fonctionne bien.jpg",
    t: "La cantine scolaire",
    d: "La cantine fonctionne bien : distribution des repas aux écoliers.",
    cat: "benin",
  },
  {
    f: "Campagne à Glo Djigbé.jpg",
    t: "Campagne à Glo-Djigbé",
    d: "Les femmes du village réunies pour une campagne de sensibilisation santé.",
    cat: "benin",
  },
  {
    f: "Dons alimentaires Glo Fanto.jpg",
    t: "Dons alimentaires à Glo-Fanto",
    d: "Distribution de vivres aux familles du village de Glo-Fanto.",
    cat: "benin",
  },
  {
    f: "visite ux orphelins de Sakété.jpg",
    t: "Visite aux orphelins de Sakété",
    d: "Un moment de partage et de jeux avec les enfants de l\u2019orphelinat.",
    cat: "benin",
  },
  {
    f: "Chips fait par ALOHADO.jpg",
    t: "Chips « ALOHADO »",
    d: "Fabrication de chips de banane plantain — un atelier générateur de revenus pour les femmes.",
    cat: "benin",
  },
  {
    f: "Monteur APSONIC offert à DENIS.jpg",
    t: "Le tricycle offert à Denis",
    d: "Un tricycle APSONIC pour transporter récoltes et marchandises vers le marché.",
    cat: "benin",
  },
  {
    f: "Equipe Bretonne Glo Sans Palu.jpg",
    t: "Équipe bretonne « Glo sans palu »",
    d: "Les bénévoles bretons en mission sur le terrain pour le projet de lutte contre le paludisme.",
    cat: "benin",
  },
  {
    f: "Séance de travail de 3 ONG.jpg",
    t: "Séance de travail de 3 ONG",
    d: "Trois ONG partenaires autour de la table pour coordonner leurs actions.",
    cat: "benin",
  },
  {
    f: "Journal Local.jpg",
    t: "Le journal local",
    d: "Présentation des projets de l\u2019association — la presse locale suit nos actions.",
    cat: "benin",
  },
  {
    f: "Quimp-Glo-18 Clotilde Pélagie Céline.JPG",
    t: "Clotilde, Pélagie et Céline",
    d: "Trois bénévoles au marché solidaire de Quimperlé.",
    cat: "bretagne",
  },
  {
    f: "Quimp-Glo-50 Didi+Fan club.JPG",
    t: "Didi et son fan club",
    d: "Repas solidaire à Quimperlé : la convivialité au service des projets.",
    cat: "bretagne",
  },
  {
    f: "Quimp-Glo-119 Bretagne Bénin.JPG",
    t: "Soirée Bretagne-Bénin",
    d: "Les drapeaux des deux pays réunis pour la grande soirée annuelle.",
    cat: "bretagne",
  },
];
