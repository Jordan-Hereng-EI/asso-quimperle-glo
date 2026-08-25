"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

interface DonateModalProps {
  open: boolean;
  onClose: () => void;
}

const AMOUNTS = [10, 20, 50, 100];

/**
 * DonateModal — placeholder donation flow (amount picker + thank-you state).
 * Not wired to a real payment provider — see the "Points à trancher" note in
 * the original handoff README (HelloAsso, Stripe, etc. to be decided).
 */
export function DonateModal({ open, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState(20);
  const [done, setDone] = useState(false);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
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
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "var(--white)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div style={{ height: "6px", display: "flex" }}>
          <span style={{ flex: 1, background: "var(--benin-green)" }} />
          <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
          <span style={{ flex: 1, background: "var(--benin-red)" }} />
        </div>
        <div style={{ padding: "32px" }}>
          {done ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem" }}>💚</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  margin: "8px 0",
                  color: "var(--ink-900)",
                }}
              >
                Merci !
              </h3>
              <p style={{ color: "var(--text-body)", margin: "0 0 24px" }}>
                Votre don de {amount} € soutient directement les enfants béninois.
              </p>
              <Button variant="outline" block onClick={onClose}>
                Fermer
              </Button>
            </div>
          ) : (
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  margin: "0 0 6px",
                  color: "var(--ink-900)",
                  letterSpacing: "-0.02em",
                }}
              >
                Faire un don
              </h3>
              <p style={{ color: "var(--text-muted)", margin: "0 0 22px", fontSize: "0.95rem" }}>
                Choisissez un montant. Chaque euro compte.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "22px",
                }}
              >
                {AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAmount(a)}
                    style={{
                      padding: "16px",
                      cursor: "pointer",
                      fontFamily: "var(--font-display)",
                      fontSize: "1.35rem",
                      fontWeight: 800,
                      borderRadius: "var(--radius-md)",
                      border: `2px solid ${amount === a ? "var(--benin-green)" : "var(--border-soft)"}`,
                      background: amount === a ? "rgba(0,149,67,0.08)" : "var(--white)",
                      color: amount === a ? "var(--benin-green-dark)" : "var(--ink-800)",
                      transition: "all 140ms",
                    }}
                  >
                    {a} €
                  </button>
                ))}
              </div>
              <Button variant="highlight" block size="lg" onClick={() => setDone(true)}>
                Donner {amount} €
              </Button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}
