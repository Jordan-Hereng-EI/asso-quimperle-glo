"use client";

import Image from "next/image";
import { useEffect } from "react";

export interface LightboxPhoto {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width: number;
  height: number;
  /** Fichiers déjà optimisés (uploads WebP) : on saute l'optimiseur Next. */
  unoptimized?: boolean;
}

interface LightboxProps {
  list: LightboxPhoto[];
  index: number | null;
  onClose: () => void;
  onNav: (direction: 1 | -1) => void;
}

const NAV_BTN = {
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

/**
 * Visionneuse plein écran : clavier (←/→, Échap), clic sur le fond, croix
 * explicite. Partagée par l'album, les projets et les parrainages.
 */
export function Lightbox({ list, index, onClose, onNav }: LightboxProps) {
  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onNav, onClose]);

  if (index == null || list.length === 0) return null;
  const photo = list[index];
  const single = list.length === 1;

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
      {/* Ancrée au fond plutôt qu'à l'image : même coin quelle que soit la
          proportion de la photo, et accessible au pouce sur mobile. */}
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
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          unoptimized={photo.unoptimized}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "72vh",
            objectFit: "contain",
            borderRadius: "var(--radius-lg)",
            animation: "fade 320ms ease",
          }}
        />
        {!single && (
          <>
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() => onNav(-1)}
              style={{ ...NAV_BTN, left: "-8px" }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() => onNav(1)}
              style={{ ...NAV_BTN, right: "-8px" }}
            >
              ›
            </button>
          </>
        )}
        {(photo.title || photo.description || !single) && (
          <div
            style={{
              textAlign: "center",
              marginTop: "18px",
              maxWidth: "64ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {photo.title && (
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
            )}
            {photo.description && (
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
            )}
            {!single && (
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
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}

/** Petit hook d'état pour brancher une Lightbox sur une liste de photos. */
export function cycleIndex(current: number | null, direction: 1 | -1, length: number) {
  if (current === null || length === 0) return null;
  return (current + direction + length) % length;
}
