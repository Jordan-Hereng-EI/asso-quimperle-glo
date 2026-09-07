"use client";

interface FilterChipProps {
  on: boolean;
  children: string;
  onClick: () => void;
}

/** Bouton-filtre pilule (album, projets). */
export function FilterChip({ on, children, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
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
