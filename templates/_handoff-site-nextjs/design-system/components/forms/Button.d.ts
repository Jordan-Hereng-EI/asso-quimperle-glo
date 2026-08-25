import * as React from "react";

/**
 * Primary action control. Pill-shaped, bold label, warm shadow.
 * Use `primary` (Beninese green) for the main call-to-action, `highlight`
 * (flag yellow) for donate/urgent asks, `outline`/`ghost` for secondary.
 *
 * @startingPoint section="Actions" subtitle="Pill buttons in the flag palette" viewport="700x220"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: "primary" | "highlight" | "danger" | "outline" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Render as a different element, e.g. "a" for links. @default "button" */
  as?: "button" | "a";
  /** Icon node rendered before the label */
  icon?: React.ReactNode;
  /** Icon node rendered after the label */
  iconAfter?: React.ReactNode;
  /** Full-width */
  block?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function Button(props: ButtonProps): JSX.Element;
