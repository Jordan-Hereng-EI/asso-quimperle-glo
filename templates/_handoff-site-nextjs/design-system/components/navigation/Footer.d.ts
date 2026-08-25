import * as React from "react";

/**
 * Dark closing footer with flag accent stripe, logo, tagline, link columns
 * and legal row.
 *
 * @startingPoint section="Navigation" subtitle="Dark footer with flag stripe" viewport="1200x360"
 */
export interface FooterColumn {
  title: string;
  items: string[];
}
export interface FooterProps {
  logo?: string;
  tagline?: string;
  columns?: FooterColumn[];
  style?: React.CSSProperties;
  [key: string]: any;
}
export function Footer(props: FooterProps): JSX.Element;
