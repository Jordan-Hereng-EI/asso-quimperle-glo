"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "./Badge";
import type { Mission } from "@/types";

interface MissionCardProps extends Mission {
  articleLabel?: string;
}

/**
 * MissionCard — the signature card of the site's "Nos missions" section.
 * An illustration image, a category tag, a short title + description, and a
 * link out to a press article. Image zooms and the card lifts on hover.
 */
export function MissionCard({
  image,
  imageAlt = "",
  tag,
  tagTone = "green",
  title,
  description,
  articleLabel = "Lire l'article",
  articleSource,
  href = "#",
  accent = "var(--benin-green)",
}: MissionCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1px solid var(--border-soft)",
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-6px)" : "none",
        transition:
          "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden" }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transform: hover ? "scale(1.06)" : "scale(1)",
            transition: "transform var(--dur-slow) var(--ease-out)",
          }}
        />
        {tag && (
          <div style={{ position: "absolute", top: "14px", left: "14px" }}>
            <Badge tone={tagTone}>{tag}</Badge>
          </div>
        )}
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "5px",
            background: accent,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "24px" }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "1.375rem",
            fontWeight: 700,
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
          }}
        >
          {description}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
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
            {articleLabel}
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
          {articleSource && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginLeft: "auto",
              }}
            >
              {articleSource}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
