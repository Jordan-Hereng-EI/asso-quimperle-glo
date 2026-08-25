import * as React from "react";

/**
 * Signature card for the "Nos missions" section: illustration image,
 * category tag, short title + description, and a link out to a press article.
 * Whole card is a link; image zooms and card lifts on hover.
 *
 * @startingPoint section="Patterns" subtitle="Mission card with press link" viewport="380x440"
 */
export interface MissionCardProps {
  /** Illustration image URL */
  image: string;
  imageAlt?: string;
  /** Category tag text */
  tag?: string;
  /** @default "green" */
  tagTone?: "green" | "yellow" | "red" | "ink" | "sand" | "sage";
  title: React.ReactNode;
  description: React.ReactNode;
  /** Link text @default "Lire l'article" */
  articleLabel?: string;
  /** Publication name shown next to the link, e.g. "Ouest-France" */
  articleSource?: string;
  href?: string;
  /** Accent bar + link color @default "var(--benin-green)" */
  accent?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export function MissionCard(props: MissionCardProps): JSX.Element;
