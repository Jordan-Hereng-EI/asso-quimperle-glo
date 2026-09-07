"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import { HELLOASSO_URL, RIB } from "@/lib/site-data";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* presse-papiers indisponible (http, ancien navigateur) : l'utilisateur copie à la main */
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 12px",
        background: "var(--surface-sunk)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "var(--ink-900)",
            fontVariantNumeric: "tabular-nums",
            wordBreak: "break-all",
          }}
        >
          {value}
        </div>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copier ${label}`}
        style={{
          flexShrink: 0,
          padding: "7px 11px",
          fontFamily: "var(--font-body)",
          fontSize: "0.78rem",
          fontWeight: 700,
          color: copied ? "var(--benin-green-dark)" : "var(--ink-800)",
          background: "var(--white)",
          border: "1.5px solid var(--border-soft)",
          borderRadius: "var(--radius-pill)",
          cursor: "pointer",
        }}
      >
        {copied ? "Copié !" : "Copier"}
      </button>
    </div>
  );
}

/**
 * DonateModal — deux façons de donner : en ligne via HelloAsso (lien à
 * renseigner dans HELLOASSO_URL) ou par virement avec le RIB de
 * l'association (données factices pour l'instant, voir lib/site-data.ts).
 */
export function DonateModal({ open, onClose }: DonateModalProps) {
  const [showRib, setShowRib] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const helloAssoReady = HELLOASSO_URL !== "#";

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(15,8,6,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fade 240ms ease",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          background: "var(--white)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-xl)",
          margin: "auto",
        }}
      >
        <div style={{ height: "6px", display: "flex" }}>
          <span style={{ flex: 1, background: "var(--benin-green)" }} />
          <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
          <span style={{ flex: 1, background: "var(--benin-red)" }} />
        </div>

        <button
          type="button"
          aria-label="Fermer"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "14px",
            width: "40px",
            height: "40px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "50%",
            background: "var(--stone-100)",
            color: "var(--ink-800)",
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div style={{ padding: "30px 32px 32px" }}>
          <h3
            id="donate-title"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              margin: "0 0 6px",
              color: "var(--ink-900)",
              letterSpacing: "-0.02em",
              paddingRight: "40px",
            }}
          >
            Faire un don
          </h3>
          <p
            style={{
              color: "var(--text-muted)",
              margin: "0 0 22px",
              fontSize: "0.95rem",
              lineHeight: 1.55,
            }}
          >
            Chaque euro se transforme en fournitures, en repas et en soins pour les enfants de Glo.
            Deux façons de donner :
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* Option 1 : en ligne */}
            <div
              style={{
                padding: "18px",
                border: "1.5px solid var(--border-soft)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "var(--ink-900)",
                  marginBottom: "4px",
                }}
              >
                En ligne, en quelques clics
              </div>
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: "0.9rem",
                  color: "var(--text-body)",
                  lineHeight: 1.5,
                }}
              >
                Paiement sécurisé par HelloAsso, la plateforme des associations.
              </p>
              <Button
                as="a"
                href={HELLOASSO_URL}
                target={helloAssoReady ? "_blank" : undefined}
                rel={helloAssoReady ? "noopener noreferrer" : undefined}
                onClick={helloAssoReady ? undefined : (e) => e.preventDefault()}
                aria-disabled={!helloAssoReady}
                variant="highlight"
                block
                size="lg"
                title={helloAssoReady ? undefined : "Page HelloAsso bientôt disponible"}
                style={helloAssoReady ? undefined : { opacity: 0.6, cursor: "not-allowed" }}
                iconAfter={
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                }
              >
                Donner via HelloAsso
              </Button>
              {!helloAssoReady && (
                <p style={{ margin: "10px 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  La page de don en ligne arrive bientôt. En attendant, le virement ci-dessous
                  fonctionne.
                </p>
              )}
            </div>

            {/* Option 2 : virement */}
            <div
              style={{
                padding: "18px",
                border: "1.5px solid var(--border-soft)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  color: "var(--ink-900)",
                  marginBottom: "4px",
                }}
              >
                Par virement bancaire
              </div>
              <p
                style={{
                  margin: "0 0 14px",
                  fontSize: "0.9rem",
                  color: "var(--text-body)",
                  lineHeight: 1.5,
                }}
              >
                Vous pouvez aussi utiliser le RIB de l&apos;association : il suffit de le remettre à
                votre banque.
              </p>
              {showRib ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <CopyField label="Titulaire" value={RIB.holder} />
                  <CopyField label="IBAN" value={RIB.iban} />
                  <CopyField label="BIC" value={RIB.bic} />
                  <CopyField label="Banque" value={RIB.bank} />
                </div>
              ) : (
                <Button variant="outline" block onClick={() => setShowRib(true)}>
                  Afficher le RIB
                </Button>
              )}
            </div>
          </div>

          <p
            style={{
              margin: "22px 0 0",
              textAlign: "center",
              fontFamily: "var(--font-script)",
              fontSize: "1.45rem",
              color: "var(--benin-green-dark)",
            }}
          >
            Infiniment merci pour eux
          </p>
        </div>
      </div>
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}
