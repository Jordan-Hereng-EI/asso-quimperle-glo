"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Button,
  FilterChip,
  Footer,
  Lightbox,
  NavBar,
  SectionHeading,
  cycleIndex,
} from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { ALBUM, FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { AlbumCategory, AlbumPhoto } from "@/types";

const FILTERS: Array<[AlbumCategory | "all", string]> = [
  ["all", "Toutes les photos"],
  ["benin", "Au Bénin"],
  ["bretagne", "En Bretagne"],
];

function Photo({ photo, index, onOpen }: { photo: AlbumPhoto; index: number; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  return (
    <figure>
      <Reveal delay={(index % 3) * 100}>
        <div
          onClick={onOpen}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: "relative",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            cursor: "zoom-in",
            boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
            transition: "box-shadow 320ms var(--ease-out)",
            background: "var(--stone-100)",
          }}
        >
          <Image
            src={`/photos/${photo.file}`}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              transform: hover ? "scale(1.045)" : "scale(1)",
              transition: "transform 700ms var(--ease-out)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(15,8,6,0) 55%, rgba(15,8,6,0.82) 100%)",
              opacity: hover ? 1 : 0.75,
              transition: "opacity 320ms",
            }}
          />
          <figcaption
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: "18px 18px 16px",
              transform: hover ? "translateY(0)" : "translateY(6px)",
              transition: "transform 320ms var(--ease-out)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.02rem",
                color: "var(--white)",
                letterSpacing: "-0.01em",
              }}
            >
              {photo.title}
            </div>
            <div
              style={{
                fontSize: "0.84rem",
                lineHeight: 1.45,
                color: "var(--sand-200)",
                marginTop: "4px",
                maxHeight: hover ? "80px" : 0,
                opacity: hover ? 1 : 0,
                overflow: "hidden",
                transition: "all 380ms var(--ease-out)",
              }}
            >
              {photo.description}
            </div>
          </figcaption>
        </div>
      </Reveal>
    </figure>
  );
}

export function AlbumPage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [filter, setFilter] = useState<AlbumCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const list = ALBUM.filter((p) => filter === "all" || p.category === filter);
  const lightboxList = list.map((p) => ({
    src: `/photos/${p.file}`,
    alt: p.title,
    title: p.title,
    description: p.description,
    width: p.width,
    height: p.height,
  }));

  return (
    <div>
      <NavBar links={getNavLinks("album")} onCta={() => setDonateOpen(true)} />

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
              eyebrow="Album photo"
              title="Nos actions en"
              scriptWord="images"
              lead="Missions au Bénin, événements en Bretagne : chaque photo raconte un moment de la vie de l'association. Cliquez pour agrandir."
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

      <section style={{ background: "var(--surface-sunk)", padding: "0 0 var(--section-pad-y)" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <div className="masonry" key={filter}>
            {list.map((photo, i) => (
              <Photo key={photo.file} photo={photo} index={i} onOpen={() => setOpenIndex(i)} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--ink-900)" }}>
        <div style={{ height: "6px", display: "flex" }}>
          <span style={{ flex: 1, background: "var(--benin-green)" }} />
          <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
          <span style={{ flex: 1, background: "var(--benin-red)" }} />
        </div>
        <div
          style={{
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(48px, 7vw, 80px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Derrière chaque photo, une{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                action
              </span>{" "}
              à soutenir
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "28px",
              }}
            >
              <Button variant="highlight" size="lg" onClick={() => setDonateOpen(true)}>
                Faire un don
              </Button>
              <Button
                as="a"
                href="/projets"
                variant="ghost"
                size="lg"
                style={{ color: "var(--white)" }}
              >
                Découvrir nos projets
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer columns={FOOTER_COLUMNS} />
      <Lightbox
        list={lightboxList}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNav={(direction) =>
          setOpenIndex((current) => cycleIndex(current, direction, list.length))
        }
      />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
