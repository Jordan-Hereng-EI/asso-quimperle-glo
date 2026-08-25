"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge, Button, Footer, NavBar, SectionHeading, StatBlock } from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { BUREAU, FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { BureauMember } from "@/types";

const TONES: Record<BureauMember["tone"], string> = {
  green: "var(--benin-green)",
  yellow: "var(--benin-yellow-deep)",
  red: "var(--benin-red)",
};

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

function MemberCard({ member, delay }: { member: BureauMember; delay: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "var(--white)",
          borderRadius: "var(--radius-lg)",
          padding: "28px 24px",
          textAlign: "center",
          boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
          transform: hover ? "translateY(-6px)" : "none",
          transition: "transform 320ms var(--ease-out), box-shadow 320ms var(--ease-out)",
          borderTop: `4px solid ${TONES[member.tone]}`,
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            margin: "0 auto 14px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--sand-100)",
            color: "var(--ink-800)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.5rem",
            letterSpacing: "0.02em",
          }}
        >
          {initials(member.name)}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.08rem",
            letterSpacing: "-0.01em",
            color: "var(--ink-900)",
            lineHeight: 1.25,
          }}
        >
          {member.name}
        </div>
        <div style={{ marginTop: "8px" }}>
          <Badge tone={member.tone} soft>
            {member.role}
          </Badge>
        </div>
      </div>
    </Reveal>
  );
}

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px 16px",
  fontSize: "0.95rem",
  border: "1.5px solid var(--border-soft)",
  borderRadius: "var(--radius-md)",
  background: "var(--white)",
  color: "var(--ink-900)",
  outline: "none",
  transition: "border-color 180ms",
};

const MEMBER_PERKS: Array<["green" | "yellow" | "red", string]> = [
  ["green", "Comptes rendus et convocations aux assemblées"],
  ["yellow", "Photos et nouvelles des enfants parrainés"],
  ["red", "Reçus fiscaux et attestations de dons"],
];

export function EquipePage() {
  const [donateOpen, setDonateOpen] = useState(false);
  const [loggedAttempt, setLoggedAttempt] = useState(false);

  return (
    <div>
      <NavBar links={getNavLinks("equipe")} onCta={() => setDonateOpen(true)} />

      <header style={{ background: "var(--surface-sunk)", padding: "clamp(56px, 8vw, 96px) 0 0" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal>
            <SectionHeading
              eyebrow="L'équipe"
              title="Celles et ceux qui font"
              scriptWord="vivre l'association"
              lead="Un bureau de six bénévoles épaulé par une vingtaine de membres actifs, en Bretagne comme au Bénin."
              align="center"
            />
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "clamp(16px, 2.5vw, 28px)",
              margin: "clamp(36px, 5vw, 56px) 0",
              maxWidth: "980px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {BUREAU.map((member, i) => (
              <MemberCard key={member.name} member={member} delay={i * 90} />
            ))}
          </div>
        </div>

        <div style={{ background: "var(--ink-900)", marginTop: "clamp(24px, 4vw, 48px)" }}>
          <div style={{ height: "6px", display: "flex" }}>
            <span style={{ flex: 1, background: "var(--benin-green)" }} />
            <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
            <span style={{ flex: 1, background: "var(--benin-red)" }} />
          </div>
          <div
            style={{
              maxWidth: "var(--container-max)",
              margin: "0 auto",
              padding: "clamp(44px, 6vw, 72px) clamp(20px, 5vw, 64px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            <Reveal delay={0}>
              <StatBlock value="≈ 20" label="Membres actifs — une vingtaine" />
            </Reveal>
            <Reveal delay={140}>
              <StatBlock
                value="≈ 10"
                label="Membres fondateurs — une dizaine"
                color="var(--benin-green)"
              />
            </Reveal>
            <Reveal delay={280}>
              <StatBlock
                value="≈ 100"
                label="Membres adhérents — une centaine"
                color="var(--benin-red)"
              />
            </Reveal>
          </div>
        </div>
      </header>

      <section style={{ background: "var(--paper)", padding: "var(--section-pad-y) 0" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(36px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Espace membre"
                title="Un espace réservé aux"
                scriptWord="adhérents"
                lead="Comptes rendus de réunions, photos des missions, suivi des parrainages et documents de l'association : connectez-vous avec vos identifiants d'adhérent."
              />
            </Reveal>
            <Reveal delay={160}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "26px" }}
              >
                {MEMBER_PERKS.map(([tone, text]) => (
                  <div key={text} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: TONES[tone],
                        flexShrink: 0,
                      }}
                    />
                    <p style={{ margin: 0, fontSize: "1rem", color: "var(--text-body)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div
              style={{
                maxWidth: "420px",
                justifySelf: "center",
                width: "100%",
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
              <div style={{ padding: "34px" }}>
                {loggedAttempt ? (
                  <div style={{ textAlign: "center", padding: "18px 0" }}>
                    <div style={{ fontSize: "2.6rem" }}>🔑</div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.4rem",
                        margin: "8px 0",
                        color: "var(--ink-900)",
                      }}
                    >
                      Maquette
                    </h3>
                    <p style={{ color: "var(--text-body)", margin: "0 0 20px" }}>
                      La connexion sera activée avec le site final.
                    </p>
                    <Button variant="outline" block onClick={() => setLoggedAttempt(false)}>
                      Retour
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.45rem",
                        margin: "0 0 4px",
                        color: "var(--ink-900)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Connexion membre
                    </h3>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        margin: "0 0 22px",
                        fontSize: "0.92rem",
                      }}
                    >
                      Identifiants remis lors de l&apos;adhésion.
                    </p>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="vous@exemple.fr"
                      style={{ ...fieldStyle, marginBottom: "16px" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--benin-green)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-soft)")}
                    />
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: "6px",
                      }}
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      style={{ ...fieldStyle, marginBottom: "22px" }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--benin-green)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-soft)")}
                    />
                    <Button
                      variant="primary"
                      block
                      size="lg"
                      onClick={() => setLoggedAttempt(true)}
                    >
                      Se connecter
                    </Button>
                    <p
                      style={{
                        margin: "16px 0 0",
                        fontSize: "0.85rem",
                        color: "var(--text-muted)",
                        textAlign: "center",
                      }}
                    >
                      Pas encore adhérent ? <a href="/contact">Contactez-nous</a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden" }}>
        <Image
          src="/photos/campagne.jpg"
          alt="Rassemblement associatif"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.3 }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(56px, 8vw, 90px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Envie de nous{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                rejoindre
              </span>{" "}
              ?
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "28px",
              }}
            >
              <Button as="a" href="/contact" variant="highlight" size="lg">
                Devenir bénévole
              </Button>
              <Button
                variant="ghost"
                size="lg"
                style={{ color: "var(--white)" }}
                onClick={() => setDonateOpen(true)}
              >
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
