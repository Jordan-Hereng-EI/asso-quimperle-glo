import * as React from "react";

/** Big impact figure + label. Defaults tuned for the dark impact band. */
export interface StatBlockProps {
  value: React.ReactNode;
  label: React.ReactNode;
  /** Number color @default "var(--benin-yellow)" */
  color?: string;
  /** @default true */
  ondark?: boolean;
  /** @default "center" */
  align?: "center" | "left";
  style?: React.CSSProperties;
  [key: string]: any;
}
export function StatBlock(props: StatBlockProps): JSX.Element;
