(function () {
  const { SectionHeading, Button, Badge, Eyebrow } = window.QuimperlGloDesignSystem_ce5208;

  function AboutSection() {
    const points = [
      ["Local", "Des partenaires béninois de confiance sur chaque projet."],
      ["Durable", "Un accompagnement dans le temps, pas une aide ponctuelle."],
      ["Transparent", "100 % des dons tracés, du marché de Quimperlé jusqu'au terrain."],
    ];
    return (
      <section
        id="about"
        style={{ background: "var(--surface-sunk)", padding: "var(--section-pad-y) 0" }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(36px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={
                (window.__resources && window.__resources.article2) || "../../assets/article2.avif"
              }
              alt="Bénévoles de l'association à Quimperlé"
              style={{
                width: "100%",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                display: "block",
                aspectRatio: "4/3",
                objectFit: "cover",
              }}
            />
            <img
              src={(window.__resources && window.__resources.logo) || "../../assets/logo.jpg"}
              alt=""
              style={{
                position: "absolute",
                bottom: "-28px",
                right: "-14px",
                width: "116px",
                height: "116px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid var(--surface-sunk)",
                boxShadow: "var(--shadow-lg)",
              }}
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Notre histoire"
              title="Un pont entre la"
              scriptWord="Bretagne et le Bénin"
              lead="Née à Quimperlé, l'association réunit bénévoles bretons et partenaires béninois autour d'une conviction simple : chaque enfant mérite une chance."
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "28px" }}
            >
              {points.map(([t, d], i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <Badge tone={["green", "yellow", "red"][i]} soft>
                    {t}
                  </Badge>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body)",
                      fontSize: "1rem",
                      lineHeight: 1.55,
                      color: "var(--text-body)",
                    }}
                  >
                    {d}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "32px" }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = "mot-de-la-presidente.html")}
                iconAfter={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                }
              >
                Découvrir l'association
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function DonateBand({ onDonate }) {
    return (
      <section style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden" }}>
        <div style={{ height: "6px", display: "flex" }}>
          <span style={{ flex: 1, background: "var(--benin-green)" }} />
          <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
          <span style={{ flex: 1, background: "var(--benin-red)" }} />
        </div>
        <div
          style={{
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(56px, 8vw, 96px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Eyebrow color="var(--benin-yellow)" ondark style={{ justifyContent: "center" }}>
            Nous soutenir
          </Eyebrow>
          <h2
            style={{
              margin: "18px 0 0",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "var(--white)",
            }}
          >
            20 € financent une semaine de{" "}
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontWeight: 700,
                color: "var(--benin-yellow)",
              }}
            >
              cantine
            </span>
          </h2>
          <p
            style={{
              margin: "18px auto 0",
              maxWidth: "52ch",
              fontFamily: "var(--font-body)",
              fontSize: "1.15rem",
              lineHeight: 1.6,
              color: "var(--sand-200)",
            }}
          >
            Votre don, ponctuel ou régulier, se transforme en fournitures, en repas et en soins.
            Rejoignez le mouvement.
          </p>
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "34px",
            }}
          >
            <Button variant="highlight" size="lg" onClick={onDonate}>
              Faire un don
            </Button>
            <Button variant="ghost" size="lg" style={{ color: "var(--white)" }}>
              Devenir bénévole
            </Button>
          </div>
        </div>
      </section>
    );
  }
  window.AboutSection = AboutSection;
  window.DonateBand = DonateBand;
})();
