import * as React from "react";

/**
 * Section header: eyebrow + display title (with optional handwritten
 * `scriptWord` highlight) + optional lead paragraph.
 *
 * @startingPoint section="Content" subtitle="Eyebrow + title + lead" viewport="760x320"
 */
export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /** Optional word appended in the Caveat script accent */
  scriptWord?: string;
  lead?: React.ReactNode;
  /** @default "left" */
  align?: "left" | "center";
  ondark?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
