"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "highlight" | "danger" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface SharedProps {
  children: ReactNode;
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** @default "md" */
  size?: ButtonSize;
  /** Icon node rendered before the label */
  icon?: ReactNode;
  /** Icon node rendered after the label */
  iconAfter?: ReactNode;
  /** Full-width */
  block?: boolean;
  style?: CSSProperties;
  className?: string;
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "className"> & {
    as?: "button";
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "className" | "href"> & {
    as: "a";
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const SIZES: Record<ButtonSize, { padding: string; fontSize: string; gap: string }> = {
  sm: { padding: "8px 16px", fontSize: "0.875rem", gap: "6px" },
  md: { padding: "12px 24px", fontSize: "1rem", gap: "8px" },
  lg: { padding: "16px 32px", fontSize: "1.125rem", gap: "10px" },
};

const VARIANTS: Record<ButtonVariant, CSSProperties> = {
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

/**
 * Button — primary action control for Quimperlé-Glo.
 * Primary uses Beninese green; danger uses Beninese red; highlight uses the
 * flag yellow with ink text. Ghost + outline for secondary actions.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    as = "button",
    icon = null,
    iconAfter = null,
    block = false,
    style = {},
    className,
    ...rest
  } = props;

  const disabled =
    as === "button" ? Boolean((rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled) : false;

  const sharedStyle: CSSProperties = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: SIZES[size].gap,
    padding: SIZES[size].padding,
    fontSize: SIZES[size].fontSize,
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
    ...VARIANTS[variant],
    ...style,
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    e.currentTarget.style.filter = "brightness(0.92)";
    e.currentTarget.style.transform = "translateY(-2px)";
  };
  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.currentTarget.style.filter = "none";
    e.currentTarget.style.transform = "none";
  };
  const handleMouseDown = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!disabled) e.currentTarget.style.transform = "translateY(0) scale(0.97)";
  };
  const handleMouseUp = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (!disabled) e.currentTarget.style.transform = "translateY(-2px)";
  };

  if (as === "a") {
    const { href, ...anchorRest } = rest as Omit<ButtonAsLink, keyof SharedProps | "as">;
    return (
      <Link
        href={href}
        className={className}
        style={sharedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...anchorRest}
      >
        {icon}
        {children}
        {iconAfter}
      </Link>
    );
  }

  return (
    <button
      className={className}
      style={sharedStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon}
      {children}
      {iconAfter}
    </button>
  );
}
