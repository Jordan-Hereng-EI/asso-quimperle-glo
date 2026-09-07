"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import type { NavLink } from "@/types";

interface NavBarProps {
  logo?: string;
  links: NavLink[];
  cta?: string;
  onCta?: () => void;
  transparent?: boolean;
  scrolled?: boolean;
  style?: CSSProperties;
}

const HeartIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.4 5c2 0 3.4 1.1 4.2 2.4C10.4 6.1 11.8 5 13.8 5 17.2 5 18.8 8.6 17.2 11.8 14.7 16.4 12 21 12 21z" />
  </svg>
);

/**
 * NavBar — top navigation for the site. Circular logo badge + links + a
 * primary donate CTA. `transparent` overlays a hero; it turns solid on
 * scroll when `scrolled` is passed by the host page.
 *
 * Below 1000px the links and CTA collapse into a burger menu; which elements
 * show at which width is driven by the `.qg-nav-*` classes in globals.css,
 * so those properties are deliberately kept out of the inline styles.
 */
export function NavBar({
  logo = "/assets/logo.jpg",
  links,
  cta = "Faire un don",
  onCta,
  transparent = false,
  scrolled = false,
  style = {},
}: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the panel on navigation (including browser back/forward), adjusting
  // state during render rather than in an effect — see
  // https://react.dev/learn/you-might-not-need-an-effect
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  // The panel is only reachable under 1000px: also close it on Escape and
  // whenever the viewport grows past the breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1001px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  // A transparent bar sits on the hero, but an open panel needs a solid bar
  // behind it so the logo and burger stay readable.
  const solid = !transparent || scrolled || menuOpen;

  const handleLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.borderBottomColor = "var(--benin-green)";
  };
  const handleLinkLeave = (e: MouseEvent<HTMLAnchorElement>, active?: boolean) => {
    if (!active) e.currentTarget.style.borderBottomColor = "transparent";
  };

  const ctaStyle: CSSProperties = {
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "11px 22px",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    fontWeight: 700,
    color: "var(--ink-900)",
    background: "var(--benin-yellow)",
    borderRadius: "var(--radius-pill)",
    boxShadow: "var(--shadow-sm)",
    transition: "transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out)",
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "14px clamp(20px, 5vw, 64px)",
        background: solid ? "rgba(253,251,246,0.9)" : "transparent",
        backdropFilter: solid ? "saturate(1.4) blur(12px)" : "none",
        borderBottom: solid ? "1px solid var(--border-soft)" : "1px solid transparent",
        transition:
          "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)",
        ...style,
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
      >
        <Image
          src={logo}
          alt="Association Quimperlé-Glo"
          width={52}
          height={52}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "var(--shadow-sm)",
          }}
        />
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: solid ? "var(--text-muted)" : "var(--sand-200)",
            }}
          >
            Association
          </span>
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontSize: "1.5rem",
              fontWeight: 700,
              whiteSpace: "nowrap",
              color: solid ? "var(--ink-900)" : "var(--white)",
            }}
          >
            Quimperlé-Glo
          </span>
        </span>
      </Link>

      <ul className="qg-nav-links">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                textDecoration: "none",
                whiteSpace: "nowrap",
                color: solid ? "var(--text-body)" : "var(--sand-50)",
                paddingBottom: "3px",
                borderBottom: link.active
                  ? "2px solid var(--benin-green)"
                  : "2px solid transparent",
                transition: "border-color var(--dur-fast) var(--ease-out)",
              }}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={(e) => handleLinkLeave(e, link.active)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button type="button" className="qg-nav-cta" onClick={onCta} style={ctaStyle}>
        <HeartIcon />
        {cta}
      </button>

      <button
        type="button"
        className="qg-nav-burger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          padding: 0,
          border: "none",
          cursor: "pointer",
          borderRadius: "var(--radius-sm)",
          background: "transparent",
          color: solid ? "var(--ink-900)" : "var(--white)",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden
        >
          {menuOpen ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M3.5 7h17" />
              <path d="M3.5 12h17" />
              <path d="M3.5 17h17" />
            </>
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="qg-nav-panel" id="qg-mobile-menu">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="qg-nav-panel-link"
              data-active={link.active ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onCta?.();
            }}
            style={{
              ...ctaStyle,
              display: "inline-flex",
              width: "100%",
              marginTop: "16px",
              padding: "14px 22px",
              fontSize: "1rem",
            }}
          >
            <HeartIcon size={18} />
            {cta}
          </button>
        </div>
      )}
    </nav>
  );
}
