import * as React from "react";

/**
 * Small uppercase status/label chip. Use for mission tags, "Presse" labels,
 * category markers. `soft` gives a low-saturation tinted version.
 *
 * @startingPoint section="Content" subtitle="Label & status chips" viewport="700x160"
 */
export interface BadgeProps {
  children: React.ReactNode;
  /** @default "green" */
  tone?: "green" | "yellow" | "red" | "ink" | "sand" | "sage";
  /** Low-saturation tinted style @default false */
  soft?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function Badge(props: BadgeProps): JSX.Element;
