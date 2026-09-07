import Image from "next/image";
import type { CSSProperties } from "react";
import type { PhotoRef } from "@/types";

interface PhotoFrameProps {
  photo: PhotoRef | null;
  /** Texte alternatif de repli si la photo n'en a pas. */
  alt?: string;
  /** Ratio CSS, ex. "4/3", "16/9". */
  ratio?: string;
  radius?: string;
  sizes?: string;
  priority?: boolean;
  /** Variante compacte du placeholder (vignettes). */
  compact?: boolean;
  style?: CSSProperties;
}

/**
 * Cadre photo pour le contenu géré depuis l'admin. Sans photo associée, un
 * placeholder « Photo à venir » prend la même place — la cliente pourra
 * l'alimenter depuis la photothèque sans rien changer à la mise en page.
 * Les fichiers sont déjà en WebP redimensionné : pas de ré-optimisation.
 */
export function PhotoFrame({
  photo,
  alt,
  ratio = "4/3",
  radius = "var(--radius-lg)",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  compact = false,
  style = {},
}: PhotoFrameProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: "hidden",
        background: "var(--sand-100)",
        ...style,
      }}
    >
      {photo ? (
        <Image
          src={`/uploads/${photo.filename}`}
          alt={photo.alt || alt || ""}
          fill
          unoptimized
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          role="img"
          aria-label={alt ? `${alt} (photo à venir)` : "Photo à venir"}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: compact ? "4px" : "10px",
            background:
              "repeating-linear-gradient(135deg, var(--sand-100) 0 14px, var(--sand-50) 14px 28px)",
            color: "var(--sand-600)",
          }}
        >
          <svg
            width={compact ? 18 : 34}
            height={compact ? 18 : 34}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
            <circle cx="12" cy="13" r="3.5" />
          </svg>
          {!compact && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Photo à venir
            </span>
          )}
        </div>
      )}
    </div>
  );
}
