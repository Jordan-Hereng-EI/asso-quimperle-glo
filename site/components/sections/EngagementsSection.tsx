"use client";

import Link from "next/link";
import { Badge, Button, EntryCard, Eyebrow, PhotoFrame, SectionHeading } from "@/components/ui";
import type { ContentCounts } from "@/lib/content";
import { Reveal } from "./Reveal";
import type { Project } from "@/types";

interface EngagementsSectionProps {
  featured: Project | null;
  counts: ContentCounts;
  onDonate: () => void;
}

function plural(n: number, one: string, many: string) {
  return `${n} ${n > 1 ? many : one}`;
}

/**
 * EngagementsSection — remplace « Nos missions » : met en avant le projet en
 * cours, puis ouvre vers les trois sections de contenu (Projets, Actions,
 * Parrainages) avec leurs chiffres réels.
 */
export function EngagementsSection({ featured, counts, onDonate }: EngagementsSectionProps) {
  const p = counts.projects;
  const a = counts.actions;

  return (
    <section
      id="engagements"
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
          eyebrow="Nos engagements"
          title="Des projets concrets, un même"
          scriptWord="élan"
          lead="Écoles, cantines, santé, parrainages : de Glo Yokpo à Quimperlé, découvrez ce que l'association réalise — et le projet qu'elle porte aujourd'hui."
          align="center"
        />

        {featured && (
          <Reveal>
            <div
              style={{
                marginTop: "clamp(40px, 6vw, 64px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
                gap: "clamp(28px, 5vw, 64px)",
                alignItems: "center",
                background: "var(--surface-card)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-md)",
                padding: "clamp(18px, 3vw, 28px)",
              }}
            >
              <div style={{ position: "relative" }}>
                <PhotoFrame
                  photo={featured.cover}
                  alt={featured.title}
                  ratio="4/3"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                  <Badge tone="green">Projet en cours</Badge>
                </div>
              </div>
              <div>
                <Eyebrow color="var(--benin-yellow)">En ce moment</Eyebrow>
                <h3
                  style={{
                    margin: "14px 0 0",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                    fontWeight: 800,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    color: "var(--text-strong)",
                  }}
                >
                  {featured.title}
                </h3>
                {featured.location && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                    }}
                  >
                    {featured.location}
                  </div>
                )}
                {featured.summary && (
                  <p
                    style={{
                      margin: "16px 0 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "1.02rem",
                      lineHeight: "var(--lh-relaxed)",
                      color: "var(--text-body)",
                      textWrap: "pretty",
                    }}
                  >
                    {featured.summary}
                  </p>
                )}
                {featured.items.length > 0 && (
                  <ul
                    style={{
                      margin: "16px 0 0",
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {featured.items.slice(0, 3).map((item) => (
                      <li
                        key={item.id}
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "flex-start",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.95rem",
                          lineHeight: 1.45,
                          color: "var(--text-body)",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            flexShrink: 0,
                            marginTop: "6px",
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--benin-green)",
                          }}
                        />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "26px" }}>
                  <Button variant="highlight" size="lg" onClick={onDonate}>
                    Soutenir ce projet
                  </Button>
                  <Button
                    as="a"
                    href={`/projets#${featured.slug}`}
                    variant="outline"
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
                    Découvrir le projet
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "clamp(20px, 3vw, 32px)",
            marginTop: "clamp(28px, 4vw, 40px)",
          }}
        >
          <Reveal delay={0}>
            <EntryCard
              href="/projets"
              eyebrow="Projets"
              accent="var(--benin-green)"
              title="Écoles, cantines, santé"
              description="Un collège de 6 classes, des tables-bancs, une cantine, un forage… ce que nous avons construit à Glo, et ce qui reste à faire."
              figures={`${plural(p.realise, "réalisé", "réalisés")} · ${plural(p.en_cours, "en cours", "en cours")} · ${plural(p.a_venir, "à venir", "à venir")}`}
              cta="Voir les projets"
            />
          </Reveal>
          <Reveal delay={120}>
            <EntryCard
              href="/actions"
              eyebrow="Actions"
              accent="var(--benin-yellow-deep)"
              title="Sur le terrain, ici et là-bas"
              description="Interventions dans les écoles bretonnes, forum des associations, ateliers cuisine, missions au Bénin auprès des familles et des partenaires."
              figures={`${a.benin} au Bénin · ${a.bretagne} en Bretagne`}
              cta="Voir les actions"
            />
          </Reveal>
          <Reveal delay={240}>
            <EntryCard
              href="/parrainages"
              eyebrow="Parrainages"
              accent="var(--benin-red)"
              title="Une vingtaine d'enfants accompagnés"
              description="Grâce aux parrains et marraines, ces enfants suivent une scolarité dans la quiétude. Trois jeunes sont déjà diplômés et autonomes."
              figures={
                counts.sponsors > 0
                  ? `${counts.sponsors} parrains et marraines nous font confiance`
                  : undefined
              }
              cta="Parrainer un enfant"
            />
          </Reveal>
        </div>

        <p
          style={{
            margin: "28px 0 0",
            textAlign: "center",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--text-muted)",
          }}
        >
          Envie d&apos;en voir plus ?{" "}
          <Link href="/album" style={{ fontWeight: 700 }}>
            Parcourez l&apos;album photo
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
