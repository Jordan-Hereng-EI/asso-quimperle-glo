import * as React from "react";

/** Uppercase kicker label with a flag-colored tick, sits above a heading. */
export interface EyebrowProps {
  children: React.ReactNode;
  /** Tick color @default "var(--benin-green)" */
  color?: string;
  /** Light styling for dark backgrounds */
  ondark?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}
export function Eyebrow(props: EyebrowProps): JSX.Element;
