import React from "react";

/**
 * Button — primary action control for Quimperlé-Glo.
 * Primary uses Beninese green; danger uses Beninese red; highlight uses the
 * flag yellow with ink text. Ghost + outline for secondary actions.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  icon = null,
  iconAfter = null,
  block = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "0.875rem", gap: "6px" },
    md: { padding: "12px 24px", fontSize: "1rem", gap: "8px" },
    lg: { padding: "16px 32px", fontSize: "1.125rem", gap: "10px" },
  };

  const variants = {
    primary: {
      background: "var(--benin-green)",
      color: "var(--white)",
      border: "2px solid var(--benin-green)",
    },
    highlight: {
      background: "var(--benin-yellow)",
      color: "var(--ink-900)",
      border: "2px solid var(--benin-yellow)",
    },
    danger: {
      background: "var(--benin-red)",
      color: "var(--white)",
      border: "2px solid var(--benin-red)",
    },
    outline: {
      background: "transparent",
      color: "var(--ink-900)",
      border: "2px solid var(--ink-900)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink-800)",
      border: "2px solid transparent",
    },
  };

  const Tag = as;
  return (
    <Tag
      disabled={as === "button" ? disabled : undefined}
      style={{
        display: block ? "flex" : "inline-flex",
        width: block ? "100%" : "auto",
        alignItems: "center",
        justifyContent: "center",
        gap: sizes[size].gap,
        padding: sizes[size].padding,
        fontSize: sizes[size].fontSize,
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "0.01em",
        textDecoration: "none",
        borderRadius: "var(--radius-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition:
          "transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)",
        boxShadow: variant === "ghost" || variant === "outline" ? "none" : "var(--shadow-sm)",
        ...variants[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.filter = "brightness(0.92)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.transform = "none";
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(0) scale(0.97)";
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-2px)";
      }}
      {...rest}
    >
      {icon}
      {children}
      {iconAfter}
    </Tag>
  );
}
