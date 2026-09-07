"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

interface EntryCardProps {
  href: string;
  eyebrow: string;
  accent: string;
  title: ReactNode;
  description: ReactNode;
  /** Ligne de chiffres sous la description (ex. « 3 réalisés · 1 en cours »). */
  figures?: ReactNode;
  cta?: string;
}

/**
 * Point d'entrée vers une section du site (Projets, Actions, Parrainages).
 * Contrairement à une carte d'article, c'est un lien interne : pas de nouvel
 * onglet. Se soulève au survol comme les autres cartes du site.
 */
export function EntryCard({
  href,
  eyebrow,
  accent,
  title,
  description,
  figures,
  cta = "Découvrir",
}: EntryCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "28px 26px 24px",
        textDecoration: "none",
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-soft)",
        borderTop: `5px solid ${accent}`,
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-6px)" : "none",
        transition:
          "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      }}
    >
      <Eyebrow color={accent}>{eyebrow}</Eyebrow>
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 800,
          lineHeight: "var(--lh-snug)",
          letterSpacing: "var(--tracking-tight)",
          color: "var(--text-strong)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          lineHeight: "var(--lh-relaxed)",
          color: "var(--text-body)",
          textWrap: "pretty",
          flex: 1,
        }}
      >
        {description}
      </p>
      {figures && (
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: "var(--text-muted)",
          }}
        >
          {figures}
        </div>
      )}
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          fontWeight: 700,
          color: accent,
        }}
      >
        {cta}
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: hover ? "translateX(4px)" : "none",
            transition: "transform var(--dur-base) var(--ease-out)",
          }}
          aria-hidden
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
