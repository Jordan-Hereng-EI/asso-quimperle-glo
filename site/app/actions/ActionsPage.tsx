"use client";

import { useState } from "react";
import {
  ArticleLink,
  Footer,
  Lightbox,
  NavBar,
  PhotoFrame,
  SectionHeading,
  cycleIndex,
  type LightboxPhoto,
} from "@/components/ui";
import { DonateBand, DonateModal, Reveal } from "@/components/sections";
import { FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { ActionEntry, ActionZone } from "@/types";

const ZONES: Array<{
  zone: ActionZone;
  id: string;
  eyebrow: string;
  title: string;
  script: string;
  lead: string;
  accent: string;
}> = [
  {
    zone: "benin",
    id: "benin",
    eyebrow: "Au Bénin",
    title: "Sur le terrain, aux côtés des",
    script: "habitants de Glo",
    lead: "Les bénévoles qui le souhaitent se rendent au Bénin, à leurs propres frais, pour rencontrer la population et les partenaires, visiter les projets et rendre compte.",
    accent: "var(--benin-green)",
  },
  {
    zone: "bretagne",
    id: "bretagne",
    eyebrow: "En Bretagne",
    title: "Faire connaître, financer,",
    script: "partager",
    lead: "À Quimperlé et dans le Finistère, l'association témoigne, mobilise et collecte tout au long de l'année.",
    accent: "var(--benin-yellow-deep)",
  },
];

function ActionCard({ action, onOpen }: { action: ActionEntry; onOpen?: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-soft)",
        overflow: "hidden",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-4px)" : "none",
        transition:
          "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      }}
    >
      <div onClick={onOpen} style={{ cursor: onOpen ? "zoom-in" : "default" }}>
        <PhotoFrame
          photo={action.photo}
          alt={action.title}
          ratio="16/10"
          radius="0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "22px 24px 24px",
          flex: 1,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "1.3rem",
            fontWeight: 800,
            lineHeight: "var(--lh-snug)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-strong)",
          }}
        >
          {action.title}
        </h3>
        {action.description && (
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--text-body)",
              textWrap: "pretty",
              flex: 1,
            }}
          >
            {action.description}
          </p>
        )}
        {action.articleUrl && (
          <div style={{ marginTop: "4px" }}>
            <ArticleLink url={action.articleUrl} source={action.articleSource} />
          </div>
        )}
      </div>
    </article>
  );
}

export function ActionsPage({ actions }: { actions: ActionEntry[] }) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ photos: LightboxPhoto[]; index: number } | null>(null);

  const openZone = (zone: ActionZone, actionId: number) => {
    const withPhoto = actions.filter((a) => a.zone === zone && a.photo);
    const index = withPhoto.findIndex((a) => a.id === actionId);
    if (index < 0) return;
    setLightbox({
      photos: withPhoto.map((a) => ({
        src: `/uploads/${a.photo!.filename}`,
        alt: a.photo!.alt || a.title,
        title: a.title,
        description: a.description,
        width: a.photo!.width,
        height: a.photo!.height,
        unoptimized: true,
      })),
      index,
    });
  };

  return (
    <div>
      <NavBar links={getNavLinks("actions")} onCta={() => setDonateOpen(true)} />

      <header
        style={{
          background: "var(--surface-sunk)",
          padding: "clamp(56px, 8vw, 88px) 0 clamp(32px, 5vw, 56px)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal>
            <SectionHeading
              eyebrow="Nos actions"
              title="Deux rives, un même"
              scriptWord="engagement"
              lead="Ce que l'association fait au quotidien, au Bénin comme en Bretagne — et comment vous pouvez y prendre part."
              align="center"
            />
          </Reveal>
        </div>
      </header>

      {ZONES.map((z, zi) => {
        const list = actions.filter((a) => a.zone === z.zone);
        return (
          <section
            key={z.zone}
            id={z.id}
            style={{
              background: zi % 2 === 0 ? "var(--paper)" : "var(--surface-sunk)",
              padding: "var(--section-pad-y) 0",
            }}
          >
            <div
              style={{
                maxWidth: "var(--container-max)",
                margin: "0 auto",
                padding: "0 clamp(20px, 5vw, 64px)",
              }}
            >
              <Reveal>
                <SectionHeading
                  eyebrow={z.eyebrow}
                  title={z.title}
                  scriptWord={z.script}
                  lead={z.lead}
                />
              </Reveal>
              {list.length === 0 ? (
                <p
                  style={{
                    marginTop: "24px",
                    fontFamily: "var(--font-body)",
                    color: "var(--text-muted)",
                  }}
                >
                  Les actions de cette zone seront présentées ici prochainement.
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
                    gap: "clamp(20px, 3vw, 28px)",
                    marginTop: "clamp(32px, 5vw, 48px)",
                  }}
                >
                  {list.map((action, i) => (
                    <Reveal key={action.id} delay={(i % 3) * 100}>
                      <ActionCard
                        action={action}
                        onOpen={action.photo ? () => openZone(z.zone, action.id) : undefined}
                      />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <DonateBand onDonate={() => setDonateOpen(true)} />
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
