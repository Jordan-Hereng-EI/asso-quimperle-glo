interface ArticleLinkProps {
  url: string | null;
  source: string | null;
  color?: string;
}

/** Lien vers un article de presse associé à un projet ou une action. */
export function ArticleLink({ url, source, color = "var(--benin-green-dark)" }: ArticleLinkProps) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        fontWeight: 700,
        color,
        textDecoration: "none",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M4 5h11a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3z" />
        <path d="M18 8h2v9a2 2 0 0 1-2 2" />
        <path d="M8 9h6M8 13h6" />
      </svg>
      Lire l&apos;article{source ? ` — ${source}` : ""}
    </a>
  );
}
