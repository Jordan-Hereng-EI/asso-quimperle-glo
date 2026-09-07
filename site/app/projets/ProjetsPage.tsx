"use client";

import { useState } from "react";
import {
  Button,
  Eyebrow,
  FilterChip,
  Footer,
  Lightbox,
  NavBar,
  ProjectCard,
  SectionHeading,
  cycleIndex,
  projectLightboxPhotos,
  type LightboxPhoto,
} from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { FOOTER_COLUMNS, PROJECT_STATUS_LABELS, getNavLinks } from "@/lib/site-data";
import type { Project, ProjectStatus } from "@/types";

const ORDER: ProjectStatus[] = ["en_cours", "realise", "a_venir"];

const GROUPS: Record<
  ProjectStatus,
  { id: string; eyebrow: string; title: string; accent: string }
> = {
  en_cours: {
    id: "en-cours",
    eyebrow: "En cours",
    title: "Ce que nous construisons aujourd'hui",
    accent: "var(--benin-green)",
  },
  realise: {
    id: "realises",
    eyebrow: "Réalisés",
    title: "Ce que nous avons accompli",
    accent: "var(--sage-500)",
  },
  a_venir: {
    id: "a-venir",
    eyebrow: "À venir",
    title: "Ce qui nous attend",
    accent: "var(--benin-yellow-deep)",
  },
};

const FILTERS: Array<[ProjectStatus | "all", string]> = [
  ["all", "Tous les projets"],
  ["en_cours", PROJECT_STATUS_LABELS.en_cours],
  ["realise", PROJECT_STATUS_LABELS.realise],
  ["a_venir", PROJECT_STATUS_LABELS.a_venir],
];

export function ProjetsPage({ projects }: { projects: Project[] }) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");
  const [lightbox, setLightbox] = useState<{ photos: LightboxPhoto[]; index: number } | null>(null);

  const groups = ORDER.map((status) => ({
    status,
    projects: projects.filter((p) => p.status === status),
  })).filter((g) => g.projects.length > 0 && (filter === "all" || g.status === filter));

  return (
    <div>
      <NavBar links={getNavLinks("projets")} onCta={() => setDonateOpen(true)} />

      <header style={{ background: "var(--surface-sunk)", padding: "clamp(56px, 8vw, 88px) 0 0" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal>
            <SectionHeading
              eyebrow="Nos projets"
              title="De l'école à la cantine, des"
              scriptWord="réalisations concrètes"
              lead="À Glo Yokpo comme à Glo Alladacomè, chaque projet répond à un besoin exprimé par les habitants et les partenaires locaux. Voici ce que vos dons ont permis — et ce qu'ils permettront."
              align="center"
            />
          </Reveal>
          <Reveal delay={160}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
                margin: "clamp(28px, 4vw, 40px) 0",
              }}
            >
              {FILTERS.map(([key, label]) => (
                <FilterChip key={key} on={filter === key} onClick={() => setFilter(key)}>
                  {label}
                </FilterChip>
              ))}
            </div>
          </Reveal>
        </div>
      </header>

      <div style={{ background: "var(--surface-sunk)", padding: "0 0 var(--section-pad-y)" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          {projects.length === 0 && (
            <div
              style={{
                padding: "clamp(40px, 6vw, 72px) 24px",
                textAlign: "center",
                border: "2px dashed var(--border-soft)",
                borderRadius: "var(--radius-lg)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Les projets seront présentés ici très prochainement.
            </div>
          )}

          {groups.map((group, gi) => {
            const meta = GROUPS[group.status];
            return (
              <section
                key={group.status}
                id={meta.id}
                style={{ marginTop: gi === 0 ? 0 : "clamp(48px, 7vw, 88px)" }}
              >
                <Reveal>
                  <div style={{ marginBottom: "clamp(20px, 3vw, 28px)" }}>
                    <Eyebrow color={meta.accent}>{meta.eyebrow}</Eyebrow>
                    <h2
                      style={{
                        margin: "12px 0 0",
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color: "var(--text-strong)",
                      }}
                    >
                      {meta.title}
                    </h2>
                  </div>
                </Reveal>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(20px, 3vw, 32px)",
                  }}
                >
                  {group.projects.map((project, i) => (
                    <Reveal key={project.id} delay={Math.min(i, 3) * 90}>
                      <ProjectCard
                        project={project}
                        onOpenPhoto={(index) =>
                          setLightbox({ photos: projectLightboxPhotos(project), index })
                        }
                      />
                    </Reveal>
                  ))}
                </div>

                {group.status === "en_cours" && (
                  <Reveal delay={120}>
                    <div
                      style={{
                        marginTop: "clamp(20px, 3vw, 28px)",
                        padding: "clamp(22px, 3.5vw, 32px)",
                        background: "var(--ink-900)",
                        borderRadius: "var(--radius-lg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "20px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ maxWidth: "60ch" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.2rem, 2.2vw, 1.5rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--white)",
                          }}
                        >
                          Nous sollicitons l&apos;aide des particuliers, des entreprises et des
                          mécènes afin d&apos;achever ce projet.
                        </div>
                        <p
                          style={{
                            margin: "8px 0 0",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.95rem",
                            color: "var(--sand-200)",
                          }}
                        >
                          Chaque contribution, même modeste, rapproche les enfants de leur cantine.
                        </p>
                      </div>
                      <Button variant="highlight" size="lg" onClick={() => setDonateOpen(true)}>
                        Faire un don
                      </Button>
                    </div>
                  </Reveal>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <Footer columns={FOOTER_COLUMNS} />
      <Lightbox
        list={lightbox?.photos ?? []}
        index={lightbox?.index ?? null}
        onClose={() => setLightbox(null)}
        onNav={(d) =>
          setLightbox((cur) =>
            cur ? { ...cur, index: cycleIndex(cur.index, d, cur.photos.length) ?? 0 } : null,
          )
        }
      />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
