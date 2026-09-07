import React from "react";
import { Eyebrow } from "./Eyebrow.jsx";

/**
 * SectionHeading — an eyebrow + display title + optional lead paragraph.
 * The title supports a `script` highlight word rendered in the Caveat accent.
 */
export function SectionHeading({
  eyebrow,
  title,
  scriptWord,
  lead,
  align = "left",
  ondark = false,
  style = {},
  ...rest
}) {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align,
        maxWidth: align === "center" ? "720px" : "none",
        marginInline: align === "center" ? "auto" : 0,
        ...style,
      }}
      {...rest}
    >
      {eyebrow && <Eyebrow ondark={ondark}>{eyebrow}</Eyebrow>}
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
          lineHeight: "var(--lh-snug)",
          fontWeight: 800,
          letterSpacing: "var(--tracking-tight)",
          color: ondark ? "var(--text-ondark)" : "var(--text-strong)",
        }}
      >
        {title}{" "}
        {scriptWord && (
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontWeight: 700,
              color: "var(--benin-green)",
              letterSpacing: 0,
            }}
          >
            {scriptWord}
          </span>
        )}
      </h2>
      {lead && (
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-lead)",
            lineHeight: "var(--lh-relaxed)",
            color: ondark ? "var(--text-ondark-muted)" : "var(--text-body)",
            maxWidth: "58ch",
            textWrap: "pretty",
          }}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
