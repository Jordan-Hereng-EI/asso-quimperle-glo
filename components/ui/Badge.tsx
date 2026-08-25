import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import type { BrandTone } from "@/types";

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "style"> {
  children: ReactNode;
  tone?: BrandTone;
  soft?: boolean;
  icon?: ReactNode;
  style?: CSSProperties;
}

const SOLID: Record<BrandTone, { bg: string; fg: string }> = {
  green: { bg: "var(--benin-green)", fg: "var(--white)" },
  yellow: { bg: "var(--benin-yellow)", fg: "var(--ink-900)" },
  red: { bg: "var(--benin-red)", fg: "var(--white)" },
  ink: { bg: "var(--ink-900)", fg: "var(--sand-50)" },
  sand: { bg: "var(--sand-400)", fg: "var(--ink-900)" },
  sage: { bg: "var(--sage-500)", fg: "var(--white)" },
};

const SOFT: Record<BrandTone, { bg: string; fg: string }> = {
  green: { bg: "rgba(0,149,67,0.12)", fg: "var(--benin-green-dark)" },
  yellow: { bg: "rgba(242,183,5,0.18)", fg: "var(--sand-600)" },
  red: { bg: "rgba(232,17,45,0.12)", fg: "var(--benin-red-dark)" },
  ink: { bg: "var(--stone-100)", fg: "var(--ink-800)" },
  sand: { bg: "var(--sand-100)", fg: "var(--sand-600)" },
  sage: { bg: "rgba(110,135,101,0.16)", fg: "var(--sage-700)" },
};

/**
 * Badge — small status/label chip. Solid or soft tint variants across the
 * brand + flag palette. Used for mission tags, "Presse", counts, etc.
 */
export function Badge({
  children,
  tone = "green",
  soft = false,
  icon = null,
  style = {},
  ...rest
}: BadgeProps) {
  const c = (soft ? SOFT : SOLID)[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "5px 12px",
        fontFamily: "var(--font-body)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        lineHeight: 1,
        borderRadius: "var(--radius-pill)",
        background: c.bg,
        color: c.fg,
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
