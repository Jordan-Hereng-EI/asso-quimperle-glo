"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { FooterColumn } from "@/types";

interface FooterProps {
  logo?: string;
  tagline?: string;
  columns: FooterColumn[];
}

/**
 * Footer — dark closing band with the logo, a short mission line, link
 * columns, and legal row. Uses the flag trio as a top accent stripe.
 */
export function Footer({
  logo = "/assets/logo.jpg",
  tagline = "De Quimperlé au Bénin, agir ensemble pour les enfants.",
  columns,
}: FooterProps) {
  const handleEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--benin-yellow)";
  };
  const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = "var(--sand-100)";
  };

  return (
    <footer style={{ background: "var(--ink-900)", color: "var(--sand-50)" }}>
      <div style={{ height: "6px", display: "flex" }}>
        <span style={{ flex: 1, background: "var(--benin-green)" }} />
        <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
        <span style={{ flex: 1, background: "var(--benin-red)" }} />
      </div>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 64px) clamp(20px, 5vw, 64px) 40px",
          display: "grid",
          gridTemplateColumns: "var(--footer-cols)",
          gap: "clamp(28px, 4vw, 48px)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "320px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              src={logo}
              alt=""
              width={56}
              height={56}
              style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }}
            />
            <span style={{ fontFamily: "var(--font-script)", fontSize: "1.6rem", fontWeight: 700 }}>
              Quimperlé-Glo
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              lineHeight: "var(--lh-relaxed)",
              color: "var(--sand-300)",
            }}
          >
            {tagline}
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--sand-400)",
              }}
            >
              {col.title}
            </span>
            {col.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--sand-100)",
                  textDecoration: "none",
                }}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          borderTop: "1px solid var(--ink-700)",
          padding: "20px clamp(20px, 5vw, 64px)",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--sand-400)",
          }}
        >
          © {new Date().getFullYear()} Association Quimperlé-Glo · Association loi 1901
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--sand-400)",
          }}
        >
          Quimperlé, Bretagne · Bénin
        </span>
      </div>
    </footer>
  );
}
