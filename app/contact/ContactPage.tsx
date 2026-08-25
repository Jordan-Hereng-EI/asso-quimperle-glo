"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import { Button, Footer, NavBar, SectionHeading } from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { BrandTone } from "@/types";

const SUBJECTS = [
  "Faire un don",
  "Parrainer un enfant",
  "Devenir bénévole",
  "Adhérer à l'association",
  "Presse",
  "Autre demande",
];

const TONES: Record<Extract<BrandTone, "green" | "yellow" | "red">, string> = {
  green: "var(--benin-green)",
  yellow: "var(--benin-yellow-deep)",
  red: "var(--benin-red)",
};

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{
          fontSize: "0.8rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoRow({
  tone,
  title,
  children,
  delay,
}: {
  tone: "green" | "yellow" | "red";
  title: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: TONES[tone],
            marginTop: "6px",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "var(--ink-900)",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: "0.98rem",
              lineHeight: 1.6,
              color: "var(--text-body)",
            }}
          >
            {children}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function ContactPage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);

  const fieldStyle = (key: string) => ({
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "13px 16px",
    fontSize: "0.98rem",
    border: `1.5px solid ${focus === key ? "var(--benin-green)" : "var(--border-soft)"}`,
    borderRadius: "var(--radius-md)",
    background: "var(--white)",
    color: "var(--ink-900)",
    outline: "none",
    transition: "border-color 200ms, box-shadow 200ms",
    boxShadow: focus === key ? "0 0 0 3px rgba(0,149,67,0.12)" : "none",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <NavBar links={getNavLinks("contact")} onCta={() => setDonateOpen(true)} />

      <header style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden" }}>
        <Image
          src="/photos/gouter.jpg"
          alt="Bénévoles et amis de l'association"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 32%", opacity: 0.35 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(15,8,6,0.5), rgba(15,8,6,0.86))",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(64px, 9vw, 110px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "var(--tracking-eyebrow)",
                textTransform: "uppercase",
                color: "var(--sand-300)",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "3px",
                  borderRadius: "2px",
                  background: "var(--benin-yellow)",
                  display: "inline-block",
                }}
              />
              Contact
            </span>
          </Reveal>
          <Reveal delay={140}>
            <h1
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Écrivez-nous, on vous{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                répond
              </span>
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p
              style={{
                margin: "18px auto 0",
                maxWidth: "52ch",
                fontSize: "1.08rem",
                lineHeight: 1.65,
                color: "var(--sand-200)",
              }}
            >
              Don, parrainage, bénévolat ou simple question : l&apos;équipe vous répond avec
              plaisir, de Quimperlé au Bénin.
            </p>
          </Reveal>
        </div>
        <div style={{ position: "relative", height: "6px", display: "flex" }}>
          <span style={{ flex: 1, background: "var(--benin-green)" }} />
          <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
          <span style={{ flex: 1, background: "var(--benin-red)" }} />
        </div>
      </header>

      <section style={{ background: "var(--surface-sunk)", padding: "var(--section-pad-y) 0" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(36px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Nous joindre"
                title="Une association, deux"
                scriptWord="rives"
                lead="Basée à Quimperlé, dans le Finistère, l'association agit dans les villages de Glo au Bénin avec ses partenaires locaux."
              />
            </Reveal>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "30px" }}
            >
              <InfoRow tone="green" title="Adresse" delay={0}>
                Association Quimperlé-Glo — Quimperlé, Finistère (29), Bretagne
              </InfoRow>
              <InfoRow tone="yellow" title="E-mail" delay={100}>
                <a href="mailto:contact@quimperle-glo.fr">contact@quimperle-glo.fr</a>
              </InfoRow>
              <InfoRow tone="red" title="Permanences" delay={200}>
                Lors des marchés solidaires et événements de l&apos;association — annoncés sur cette
                page et dans la presse locale.
              </InfoRow>
              <InfoRow tone="green" title="Au Bénin" delay={300}>
                Nos partenaires locaux assurent le relais dans les villages de Glo (Glo-Djigbé,
                Glo-Fanto…).
              </InfoRow>
            </div>
            <Reveal delay={380}>
              <div
                style={{
                  marginTop: "34px",
                  position: "relative",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                  <Image
                    src="/photos/campagne.jpg"
                    alt="L'équipe bretonne en mission au Bénin"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: "14px 18px",
                    background: "linear-gradient(180deg, rgba(15,8,6,0), rgba(15,8,6,0.85))",
                    color: "var(--sand-100)",
                    fontSize: "0.88rem",
                  }}
                >
                  L&apos;équipe bretonne « Glo sans palu » en mission sur le terrain
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                overflow: "hidden",
              }}
            >
              <div style={{ height: "6px", display: "flex" }}>
                <span style={{ flex: 1, background: "var(--benin-green)" }} />
                <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
                <span style={{ flex: 1, background: "var(--benin-red)" }} />
              </div>
              <div style={{ padding: "clamp(28px, 4vw, 40px)" }}>
                {sent ? (
                  <div style={{ textAlign: "center", padding: "26px 0" }}>
                    <div style={{ fontSize: "3rem" }}>💌</div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        margin: "10px 0",
                        color: "var(--ink-900)",
                      }}
                    >
                      Message envoyé !
                    </h3>
                    <p style={{ color: "var(--text-body)", margin: "0 0 24px", lineHeight: 1.6 }}>
                      Merci pour votre message. Un membre de l&apos;équipe vous répondra très vite.
                    </p>
                    <Button variant="outline" onClick={() => setSent(false)}>
                      Écrire un autre message
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "18px" }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.5rem",
                        margin: 0,
                        color: "var(--ink-900)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Envoyer un message
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <Field label="Nom">
                        <input
                          placeholder="Votre nom"
                          style={fieldStyle("nom")}
                          onFocus={() => setFocus("nom")}
                          onBlur={() => setFocus(null)}
                        />
                      </Field>
                      <Field label="E-mail">
                        <input
                          type="email"
                          placeholder="vous@exemple.fr"
                          style={fieldStyle("mail")}
                          onFocus={() => setFocus("mail")}
                          onBlur={() => setFocus(null)}
                        />
                      </Field>
                    </div>
                    <Field label="Sujet">
                      <select
                        style={{
                          ...fieldStyle("sujet"),
                          appearance: "none",
                          backgroundImage:
                            "linear-gradient(45deg, transparent 50%, var(--ink-600) 50%), linear-gradient(135deg, var(--ink-600) 50%, transparent 50%)",
                          backgroundPosition: "calc(100% - 20px) 50%, calc(100% - 15px) 50%",
                          backgroundSize: "5px 5px",
                          backgroundRepeat: "no-repeat",
                        }}
                        onFocus={() => setFocus("sujet")}
                        onBlur={() => setFocus(null)}
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Message">
                      <textarea
                        rows={6}
                        placeholder="Bonjour, je souhaite…"
                        style={{ ...fieldStyle("msg"), resize: "vertical" }}
                        onFocus={() => setFocus("msg")}
                        onBlur={() => setFocus(null)}
                      />
                    </Field>
                    <Button type="submit" variant="primary" size="lg" block>
                      Envoyer le message
                    </Button>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.82rem",
                        color: "var(--text-muted)",
                        textAlign: "center",
                      }}
                    >
                      Vos coordonnées ne servent qu&apos;à vous répondre — jamais partagées.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--ink-900)" }}>
        <div style={{ height: "6px", display: "flex" }}>
          <span style={{ flex: 1, background: "var(--benin-green)" }} />
          <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
          <span style={{ flex: 1, background: "var(--benin-red)" }} />
        </div>
        <div
          style={{
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(48px, 7vw, 80px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 4vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Le plus court chemin pour aider : un{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                don
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div style={{ marginTop: "28px" }}>
              <Button variant="highlight" size="lg" onClick={() => setDonateOpen(true)}>
                Faire un don
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer columns={FOOTER_COLUMNS} />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
