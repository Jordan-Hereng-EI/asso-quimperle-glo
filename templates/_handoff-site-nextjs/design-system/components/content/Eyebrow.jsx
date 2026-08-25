import React from "react";

/**
 * Eyebrow — small uppercase kicker label above a heading. Includes a short
 * flag-colored tick mark for the brand's signature accent.
 */
export function Eyebrow({
  children,
  color = "var(--benin-green)",
  ondark = false,
  style = {},
  ...rest
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--font-body)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color: ondark ? "var(--sand-300)" : "var(--text-muted)",
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          width: "28px",
          height: "3px",
          borderRadius: "2px",
          background: color,
          display: "inline-block",
        }}
      />
      {children}
    </span>
  );
}
