(function () {
  const { Eyebrow, Button } = window.QuimperlGloDesignSystem_ce5208;
  const { Reveal, UPLOAD, ALBUM } = window;

  /* PhotoMarquee — full-bleed auto-scrolling photo strip, pauses on hover. */
  function PhotoMarquee() {
    const [paused, setPaused] = React.useState(false);
    const pics = ALBUM.slice(0, 12);
    const track = pics.concat(pics);
    return (
      <section
        style={{
          background: "var(--ink-900)",
          overflow: "hidden",
          padding: "clamp(48px, 6vw, 72px) 0",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div>
            <Reveal>
              <Eyebrow color="var(--benin-yellow)" ondark>
                En images
              </Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2
                style={{
                  margin: "14px 0 0",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--white)",
                }}
              >
                La vie de l'association, du terrain au{" "}
                <span
                  style={{
                    fontFamily: "var(--font-script)",
                    fontWeight: 700,
                    color: "var(--benin-yellow)",
                  }}
                >
                  marché
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Button
              variant="outline"
              style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.55)" }}
              onClick={() => (window.location.href = "album.html")}
              iconAfter={
                <svg
                  width="16"
                  height="16"
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
              Voir l'album
            </Button>
          </Reveal>
        </div>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            display: "flex",
            width: "max-content",
            gap: "18px",
            animation: "qgmarquee 60s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {track.map((p, i) => (
            <a key={i} href="album.html" title={p.t} style={{ display: "block", flexShrink: 0 }}>
              <img
                src={UPLOAD(p.f)}
                alt={p.t}
                loading="lazy"
                style={{
                  height: "215px",
                  width: "auto",
                  borderRadius: "var(--radius-md)",
                  display: "block",
                  objectFit: "cover",
                  boxShadow: "var(--shadow-md)",
                  transition: "transform 400ms var(--ease-out), opacity 400ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              />
            </a>
          ))}
        </div>
        <style>{`@keyframes qgmarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </section>
    );
  }

  /* PresidentTeaser — quote + portrait linking to the full letter. */
  function PresidentTeaser() {
    return (
      <section style={{ background: "var(--paper)", padding: "var(--section-pad-y) 0" }}>
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
          <div>
            <Reveal>
              <Eyebrow color="var(--benin-green)">Le mot de la présidente</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <blockquote style={{ margin: "22px 0 0", position: "relative", padding: 0 }}>
                <span
                  style={{
                    position: "absolute",
                    top: "-34px",
                    left: "-10px",
                    fontFamily: "var(--font-script)",
                    fontSize: "6rem",
                    lineHeight: 1,
                    color: "var(--sand-200)",
                    userSelect: "none",
                  }}
                >
                  “
                </span>
                <p
                  style={{
                    position: "relative",
                    margin: 0,
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-900)",
                  }}
                >
                  Le développement de tous les Glo est notre mission première. Nous avons besoin de
                  vos dons, de vos apports, de vos conseils. Rejoignez-nous !
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ marginTop: "24px" }}>
                <div
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "1.7rem",
                    color: "var(--ink-900)",
                  }}
                >
                  Pélagie Atanhlouéto-Tritscher
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  Présidente de l'association
                </div>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div style={{ marginTop: "28px" }}>
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
                  Lire le mot de la présidente
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div style={{ position: "relative" }}>
              <img
                src={UPLOAD("Quimp-Glo-18 Clotilde Pélagie Céline.JPG")}
                alt="Clotilde, Pélagie et Céline au marché solidaire de Quimperlé"
                style={{
                  width: "100%",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                  display: "block",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-18px",
                  left: "24px",
                  background: "var(--white)",
                  borderRadius: "var(--radius-pill)",
                  padding: "10px 20px",
                  boxShadow: "var(--shadow-md)",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "var(--ink-800)",
                }}
              >
                Au marché solidaire de Quimperlé
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  window.PhotoMarquee = PhotoMarquee;
  window.PresidentTeaser = PresidentTeaser;
})();
