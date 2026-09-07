"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Footer, NavBar, SectionHeading } from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { ALBUM, FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { AlbumCategory, AlbumPhoto } from "@/types";

const FILTERS: Array<[AlbumCategory | "all", string]> = [
  ["all", "Toutes les photos"],
  ["benin", "Au Bénin"],
  ["bretagne", "En Bretagne"],
];

function Chip({ on, children, onClick }: { on: boolean; children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "0.92rem",
        fontWeight: 700,
        borderRadius: "var(--radius-pill)",
        border: `2px solid ${on ? "var(--benin-green)" : "var(--border-soft)"}`,
        background: on ? "var(--benin-green)" : "var(--white)",
        color: on ? "var(--white)" : "var(--text-body)",
        transition: "all 220ms var(--ease-out)",
      }}
    >
      {children}
    </button>
  );
}

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

function Lightbox({
  list,
  index,
  onClose,
  onNav,
}: {
  list: AlbumPhoto[];
  index: number | null;
  onClose: () => void;
  onNav: (direction: 1 | -1) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNav, onClose]);

  if (index == null) return null;
  const photo = list[index];
  const btnStyle = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background: "rgba(253,251,246,0.14)",
    color: "var(--white)",
    fontSize: "1.3rem",
    backdropFilter: "blur(6px)",
    transition: "background 180ms",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(15,8,6,0.92)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 48px)",
        animation: "fade 240ms ease",
      }}
    >
      {/* Anchored to the overlay rather than the image so it stays put whatever
          the photo's aspect ratio — and stays thumb-reachable on mobile, where
          tapping the backdrop is the only other way out. */}
      <button
        type="button"
        aria-label="Fermer la photo"
        onClick={onClose}
        style={{
          position: "absolute",
          top: "clamp(12px, 2.5vw, 24px)",
          right: "clamp(12px, 2.5vw, 24px)",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          padding: 0,
          borderRadius: "50%",
          border: "1px solid rgba(253,251,246,0.22)",
          cursor: "pointer",
          background: "rgba(253,251,246,0.16)",
          color: "var(--white)",
          backdropFilter: "blur(6px)",
          transition: "background 180ms var(--ease-out), transform 180ms var(--ease-out)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(253,251,246,0.3)";
          e.currentTarget.style.transform = "scale(1.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(253,251,246,0.16)";
          e.currentTarget.style.transform = "none";
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "1000px", width: "100%" }}
      >
        <Image
          key={photo.file}
          src={`/photos/${photo.file}`}
          alt={photo.title}
          width={photo.width}
          height={photo.height}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "72vh",
            objectFit: "contain",
            borderRadius: "var(--radius-lg)",
            animation: "fade 320ms ease",
          }}
        />
        <button
          aria-label="Photo précédente"
          onClick={() => onNav(-1)}
          style={{ ...btnStyle, left: "-8px" }}
        >
          ‹
        </button>
        <button
          aria-label="Photo suivante"
          onClick={() => onNav(1)}
          style={{ ...btnStyle, right: "-8px" }}
        >
          ›
        </button>
        <div
          style={{
            textAlign: "center",
            marginTop: "18px",
            maxWidth: "64ch",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.25rem",
              color: "var(--white)",
            }}
          >
            {photo.title}
          </div>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "var(--sand-200)",
            }}
          >
            {photo.description}
          </p>
          <div
            style={{
              marginTop: "10px",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--sand-400)",
            }}
          >
            {index + 1} / {list.length}
          </div>
        </div>
      </div>
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}

export function AlbumPage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [filter, setFilter] = useState<AlbumCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const list = ALBUM.filter((p) => filter === "all" || p.category === filter);

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
                <Chip key={key} on={filter === key} onClick={() => setFilter(key)}>
                  {label}
                </Chip>
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
                href="/#missions"
                variant="ghost"
                size="lg"
                style={{ color: "var(--white)" }}
              >
                Découvrir nos missions
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer columns={FOOTER_COLUMNS} />
      <Lightbox
        list={list}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNav={(direction) =>
          setOpenIndex((current) =>
            current === null ? null : (current + direction + list.length) % list.length,
          )
        }
      />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
