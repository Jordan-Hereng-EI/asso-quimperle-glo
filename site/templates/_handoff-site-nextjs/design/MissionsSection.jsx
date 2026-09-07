(function () {
  const { SectionHeading, MissionCard } = window.QuimperlGloDesignSystem_ce5208;

  const MISSIONS = [
    {
      image: (window.__resources && window.__resources.enfants) || "../../assets/enfants.jpg",
      tag: "Éducation",
      tagTone: "green",
      accent: "var(--benin-green)",
      title: "Scolariser chaque enfant",
      description:
        "Fournitures, uniformes et parrainage scolaire pour que les enfants de la région rejoignent les bancs de l'école et y restent.",
      articleSource: "Ouest-France",
    },
    {
      image: (window.__resources && window.__resources.article1) || "../../assets/article1.avif",
      tag: "Terrain",
      tagTone: "yellow",
      accent: "var(--benin-yellow-deep)",
      title: "Des missions sur place",
      description:
        "Deux fois par an, nos bénévoles se rendent au Bénin pour rencontrer les familles, évaluer les besoins et suivre les projets.",
      articleSource: "Le Télégramme",
    },
    {
      image: (window.__resources && window.__resources.article2) || "../../assets/article2.avif",
      tag: "Solidarité",
      tagTone: "red",
      accent: "var(--benin-red)",
      title: "Mobiliser à Quimperlé",
      description:
        "Marchés solidaires, ventes d'artisanat béninois et événements en Bretagne financent nos actions tout au long de l'année.",
      articleSource: "Le Poher",
    },
  ];

  function MissionsSection() {
    return (
      <section
        id="missions"
        style={{ background: "var(--paper)", padding: "var(--section-pad-y) 0" }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <SectionHeading
            eyebrow="Nos missions"
            title="Trois combats, un même"
            scriptWord="élan"
            lead="De l'école à la table, du terrain béninois aux marchés bretons — découvrez nos actions et suivez-les dans la presse."
            align="center"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(20px, 3vw, 32px)",
              marginTop: "clamp(40px, 6vw, 64px)",
            }}
          >
            {MISSIONS.map((m, i) => (
              <MissionCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  window.MissionsSection = MissionsSection;
})();
