import Image from "next/image";
import { Badge, Button, SectionHeading } from "@/components/ui";
import type { BrandTone } from "@/types";

const POINTS: Array<[string, string]> = [
  ["Local", "Des partenaires béninois de confiance sur chaque projet."],
  ["Durable", "Un accompagnement dans le temps, pas une aide ponctuelle."],
  ["Transparent", "100 % des dons tracés, du marché de Quimperlé jusqu'au terrain."],
];

const TONES: BrandTone[] = ["green", "yellow", "red"];

/** AboutSection — split-layout story with a value-points list and a link to the president's letter. */
export function AboutSection() {
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
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap: "clamp(36px, 6vw, 80px)",
          alignItems: "center",
        }}
      >
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
              src="/assets/article2.avif"
              alt="Bénévoles de l'association à Quimperlé"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-28px",
              right: "-14px",
              width: "116px",
              height: "116px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "5px solid var(--surface-sunk)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <Image
              src="/assets/logo.jpg"
              alt=""
              fill
              sizes="116px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="Notre histoire"
            title="Un pont entre la"
            scriptWord="Bretagne et le Bénin"
            lead="Née à Quimperlé, l'association réunit bénévoles bretons et partenaires béninois autour d'une conviction simple : chaque enfant mérite une chance."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "28px" }}>
            {POINTS.map(([t, d], i) => (
              <div key={t} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <Badge tone={TONES[i]} soft>
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
              Découvrir l&apos;association
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
