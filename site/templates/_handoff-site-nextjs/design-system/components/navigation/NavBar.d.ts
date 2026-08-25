import * as React from "react";

/**
 * Site top navigation: circular logo badge, links, yellow donate CTA.
 * Pass `transparent` to overlay a hero and toggle `scrolled` from the host.
 *
 * @startingPoint section="Navigation" subtitle="Site header with donate CTA" viewport="1200x90"
 */
export interface NavBarProps {
  logo?: string;
  links?: string[];
  cta?: string;
  onCta?: () => void;
  /** Overlay style for hero backgrounds */
  transparent?: boolean;
  /** Host-controlled: solidifies a transparent bar */
  scrolled?: boolean;
  style?: React.CSSProperties;
  [key: string]: any;
}
export function NavBar(props: NavBarProps): JSX.Element;
