"use client";

import { ArticleLink } from "./ArticleLink";
import { Badge } from "./Badge";
import { PhotoFrame } from "./PhotoFrame";
import { PROJECT_STATUS_LABELS } from "@/lib/site-data";
import type { BrandTone, Project, ProjectStatus } from "@/types";

export const STATUS_TONE: Record<ProjectStatus, BrandTone> = {
  en_cours: "green",
  realise: "sage",
  a_venir: "yellow",
};

interface ProjectCardProps {
  project: Project;
  /** Ouvre la visionneuse sur la n-ième photo du projet (couverture comprise). */
  onOpenPhoto?: (index: number) => void;
}

/**
 * Un projet complet : couverture, état, lieu, présentation, puis la liste
 * numérotée de ses réalisations, chacune avec sa vignette (cliquable quand
 * une photo existe). L'ancre `#<slug>` permet d'y arriver depuis l'accueil.
 */
export function ProjectCard({ project, onOpenPhoto }: ProjectCardProps) {
  // Index des photos ouvrables : 0 = couverture si présente, puis les items avec photo.
  let photoCursor = project.cover ? 1 : 0;

  return (
    <article
      id={project.slug}
      style={{
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-soft)",
        boxShadow: "var(--shadow-sm)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          cursor: project.cover && onOpenPhoto ? "zoom-in" : "default",
        }}
        onClick={project.cover && onOpenPhoto ? () => onOpenPhoto(0) : undefined}
      >
        <PhotoFrame
          photo={project.cover}
          alt={project.title}
          ratio="16/8"
          radius="0"
          sizes="(max-width: 768px) 100vw, 900px"
        />
        <div style={{ position: "absolute", top: "16px", left: "16px" }}>
          <Badge tone={STATUS_TONE[project.status]}>{PROJECT_STATUS_LABELS[project.status]}</Badge>
        </div>
      </div>

      <div style={{ padding: "clamp(22px, 3.5vw, 36px)" }}>
        <h3
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
            fontWeight: 800,
            lineHeight: "var(--lh-snug)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-strong)",
          }}
        >
          {project.title}
        </h3>
        {project.location && (
          <div
            style={{
              marginTop: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-muted)",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z" />
              <circle cx="12" cy="10" r="2.2" />
            </svg>
            {project.location}
          </div>
        )}
        {project.summary && (
          <p
            style={{
              margin: "16px 0 0",
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--text-body)",
              maxWidth: "70ch",
              textWrap: "pretty",
            }}
          >
            {project.summary}
          </p>
        )}

        {project.items.length > 0 && (
          <ol
            style={{
              listStyle: "none",
              margin: "24px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
              gap: "12px",
            }}
          >
            {project.items.map((item, i) => {
              const index = item.photo ? photoCursor++ : null;
              const clickable = index !== null && onOpenPhoto;
              return (
                <li
                  key={item.id}
                  onClick={clickable ? () => onOpenPhoto(index) : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "10px 12px 10px 10px",
                    background: "var(--surface-sunk)",
                    borderRadius: "var(--radius-md)",
                    cursor: clickable ? "zoom-in" : "default",
                  }}
                >
                  <div style={{ width: "84px", flexShrink: 0 }}>
                    <PhotoFrame
                      photo={item.photo}
                      alt={item.label}
                      ratio="4/3"
                      radius="var(--radius-sm)"
                      sizes="84px"
                      compact
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-display)",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "var(--sand-600)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.95rem",
                        lineHeight: 1.45,
                        color: "var(--text-body)",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {project.articleUrl && (
          <div style={{ marginTop: "22px" }}>
            <ArticleLink url={project.articleUrl} source={project.articleSource} />
          </div>
        )}
      </div>
    </article>
  );
}

/** Photos ouvrables d'un projet, dans l'ordre utilisé par ProjectCard. */
export function projectLightboxPhotos(project: Project) {
  const list = [];
  if (project.cover) {
    list.push({
      src: `/uploads/${project.cover.filename}`,
      alt: project.cover.alt || project.title,
      title: project.title,
      width: project.cover.width,
      height: project.cover.height,
      unoptimized: true,
    });
  }
  for (const item of project.items) {
    if (!item.photo) continue;
    list.push({
      src: `/uploads/${item.photo.filename}`,
      alt: item.photo.alt || item.label,
      title: item.label,
      description: project.title,
      width: item.photo.width,
      height: item.photo.height,
      unoptimized: true,
    });
  }
  return list;
}
