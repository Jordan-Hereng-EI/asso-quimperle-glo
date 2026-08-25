import Image from "next/image";
import { Button, Eyebrow } from "@/components/ui";
import { Reveal } from "./Reveal";

/** PresidentTeaser — quote + portrait linking to the full president's letter. */
export function PresidentTeaser() {
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
                &ldquo;
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
                Présidente de l&apos;association
              </div>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div style={{ marginTop: "28px" }}>
              <Button
                as="a"
                href="/mot-de-la-presidente"
                variant="primary"
                size="lg"
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
                    aria-hidden
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
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/photos/pelagie.jpg"
                alt="Clotilde, Pélagie et Céline à la restitution du 23-24 mars 2025 à l'Espace Benoite Groult."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
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
              Restitution du 23-24 mars 2025 à l'Espace Benoite Groult
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
