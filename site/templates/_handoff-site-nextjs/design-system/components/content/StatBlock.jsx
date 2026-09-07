import React from "react";

/**
 * StatBlock — a big impact number with a label. Used in the impact band on
 * the landing page (e.g. "12 écoles soutenues"). The value renders in the
 * display font; an accent color tints the number.
 */
export function StatBlock({
  value,
  label,
  color = "var(--benin-yellow)",
  ondark = true,
  align = "center",
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.75rem, 6vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "var(--tracking-tight)",
          color,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
          color: ondark ? "var(--text-ondark-muted)" : "var(--text-muted)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
