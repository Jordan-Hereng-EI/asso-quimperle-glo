import React from "react";

/**
 * NavBar — top navigation for the site. Circular logo badge + links + a
 * primary donate CTA. Links accept strings or { label, href, active }. `transparent` overlays a hero; it turns solid on scroll
 * when `scrolled` is passed by the host.
 */
export function NavBar({
  logo = "assets/logo.jpg",
  links = ["Accueil", "Nos missions", "Le Bénin", "Nous soutenir", "Contact"],
  cta = "Faire un don",
  onCta,
  transparent = false,
  scrolled = false,
  style = {},
  ...rest
}) {
  const solid = !transparent || scrolled;
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
      {...rest}
    >
      <a
        href="#"
        style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
      >
        <img
          src={logo}
          alt="Association Quimperlé-Glo"
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
              color: solid ? "var(--ink-900)" : "var(--white)",
            }}
          >
            Quimperlé-Glo
          </span>
        </span>
      </a>

      <ul
        style={{
          display: "flex",
          gap: "28px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginLeft: "auto",
        }}
      >
        {links.map((l, i) => {
          const it = typeof l === "string" ? { label: l, href: "#" } : l;
          return (
            <li key={i}>
              <a
                href={it.href || "#"}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  color: solid ? "var(--text-body)" : "var(--sand-50)",
                  paddingBottom: "3px",
                  borderBottom: it.active
                    ? "2px solid var(--benin-green)"
                    : "2px solid transparent",
                  transition: "border-color var(--dur-fast) var(--ease-out)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderBottomColor = "var(--benin-green)")
                }
                onMouseLeave={(e) => {
                  if (!it.active) e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>

      <button
        onClick={onCta}
        style={{
          display: "inline-flex",
          alignItems: "center",
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
          transition:
            "transform var(--dur-fast) var(--ease-out), filter var(--dur-fast) var(--ease-out)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.filter = "brightness(0.95)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.filter = "none";
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.4 5c2 0 3.4 1.1 4.2 2.4C10.4 6.1 11.8 5 13.8 5 17.2 5 18.8 8.6 17.2 11.8 14.7 16.4 12 21 12 21z" />
        </svg>
        {cta}
      </button>
    </nav>
  );
}
