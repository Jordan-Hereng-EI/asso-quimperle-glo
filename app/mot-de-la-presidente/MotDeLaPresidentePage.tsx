"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";
import { Badge, Button, Eyebrow, Footer, NavBar } from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { BUREAU, FOOTER_COLUMNS, PARTNERS, getNavLinks } from "@/lib/site-data";

function P({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <p
        style={{
          margin: "0 0 22px",
          fontSize: "1.08rem",
          lineHeight: 1.75,
          color: "var(--text-body)",
        }}
      >
        {children}
      </p>
    </Reveal>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.35rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--ink-900)",
          margin: "38px 0 16px",
        }}
      >
        {children}
      </h3>
    </Reveal>
  );
}

const BADGE_TONES = ["green", "yellow", "red"] as const;

export function MotDeLaPresidentePage() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <div>
      <NavBar links={getNavLinks("accueil")} onCta={() => setDonateOpen(true)} />

      <header style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden" }}>
        <Image
          src="/photos/pelagie.jpg"
          alt="Pélagie et les bénévoles à Quimperlé"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%", opacity: 0.38 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(15,8,6,0.55), rgba(15,8,6,0.88))",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(72px, 10vw, 128px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <Eyebrow color="var(--benin-yellow)" ondark style={{ justifyContent: "center" }}>
              Le mot de la présidente
            </Eyebrow>
          </Reveal>
          <Reveal delay={140}>
            <h1
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                Bienvenue
              </span>{" "}
              sur le site officiel de l&apos;association
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p
              style={{
                margin: "20px auto 0",
                maxWidth: "58ch",
                fontSize: "1.1rem",
                lineHeight: 1.65,
                color: "var(--sand-200)",
              }}
            >
              Permettez-nous, avant tout, d&apos;avoir une pensée pour toutes les personnes qui
              souffrent des guerres et autres sinistres aux quatre coins du monde.
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
        <div style={{ maxWidth: "880px", margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)" }}>
          <Reveal>
            <div
              style={{
                background: "var(--white)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                padding: "clamp(32px, 6vw, 72px)",
              }}
            >
              <SubTitle>Merci à celles et ceux qui font vivre l&apos;association</SubTitle>
              <P>
                Nous remercions d&apos;abord les bénévoles, les adhérents, les cotisants et leurs
                donateurs : leurs efforts dans la recherche de financements et l&apos;organisation
                d&apos;événements au profit de l&apos;Association Quimperlé-Glo sont précieux.
              </P>
              <P>
                Nous remercions tout particulièrement les parrains et les marraines d&apos;une
                vingtaine d&apos;enfants à Glo, au Bénin. Grâce à vous, plusieurs personnes en
                difficulté mènent aujourd&apos;hui une vie normale et épanouie.
              </P>
              <P>
                Nous remercions la Mairie de Quimperlé et ses élus, qui nous soutiennent depuis une
                douzaine d&apos;années par l&apos;octroi de subventions et la mise à disposition des
                infrastructures des services techniques. Nous n&apos;oublions pas les bailleurs du
                Département du Finistère et de la Région Bretagne, toujours restés à nos côtés lors
                de nos demandes de subventions, ni Brest&apos;Eau, sur qui nous avons pu compter
                pendant le forage du puits.
              </P>
              <P>
                Grâce au PRA/OSIM, à l&apos;AFD et au FORIM, l&apos;Association Quimperlé-Glo a
                repris son souffle. Nous avons bénéficié d&apos;un accompagnement au montage de
                dossiers par XYLM, le CAPCOS et le CBF : merci pour la qualité de l&apos;écoute et
                du suivi.
              </P>
              <P>
                Nos remerciements vont également à Katty, Walter, Dominique, Paul et Léa, éléments
                motivateurs qui continuent de soutenir les membres du bureau dans leurs tâches
                associatives, surtout administratives.
              </P>

              <SubTitle>Ils nous accompagnent</SubTitle>
              <Reveal>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}
                >
                  {PARTNERS.map((p, i) => (
                    <Badge key={p} tone={BADGE_TONES[i % 3]} soft>
                      {p}
                    </Badge>
                  ))}
                </div>
              </Reveal>

              <SubTitle>Nos pensées aux membres du bureau</SubTitle>
              <Reveal>
                <ul
                  style={{
                    margin: "0 0 22px",
                    padding: 0,
                    listStyle: "none",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
                    gap: "12px",
                  }}
                >
                  {BUREAU.map((m) => (
                    <li
                      key={m.name}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        padding: "14px 18px",
                        background: "var(--sand-50)",
                        borderRadius: "var(--radius-md)",
                      }}
                    >
                      <span style={{ fontWeight: 700, color: "var(--ink-900)" }}>{m.name}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        {m.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <P>
                Nous remercions toutes les personnes qui nous ont porté dans la réussite du projet
                <strong>« Glo sans palu »</strong>. Nous félicitons les jeunes qui ont obtenus leur
                diplômes professionnelles aux bénéfices du parrainage.
              </P>

              <Reveal>
                <div
                  style={{ marginTop: "36px", display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <span
                    style={{
                      width: "54px",
                      height: "3px",
                      background: "var(--benin-green)",
                      borderRadius: "2px",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-script)",
                        fontSize: "1.9rem",
                        color: "var(--ink-900)",
                      }}
                    >
                      Pélagie Atanhlouéto-Tritscher
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                      }}
                    >
                      Présidente de l&apos;association
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden" }}>
        <Image
          src="/photos/yokpo1.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.22 }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "clamp(56px, 8vw, 96px) clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <Eyebrow color="var(--benin-yellow)" ondark style={{ justifyContent: "center" }}>
              Notre mission
            </Eyebrow>
          </Reveal>
          <Reveal delay={140}>
            <h2
              style={{
                margin: "18px 0 0",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.9rem, 4.5vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              Le développement de tous les{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                Glo
              </span>{" "}
              est notre mission première
            </h2>
          </Reveal>
          <Reveal delay={280}>
            <p
              style={{
                margin: "18px auto 0",
                maxWidth: "62ch",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--sand-200)",
              }}
            >
              Faire rayonner les actions de notre association auprès des personnes démunies du
              Bénin, pour prévenir les dangers de l&apos;exode rural, de l&apos;immigration
              clandestine, de la délinquance, des mariages forcés et des grossesses de mineures.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <p
              style={{
                margin: "18px auto 0",
                maxWidth: "56ch",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                color: "var(--sand-100)",
              }}
            >
              Nous avons besoin de vous, chères et chers internautes : de vos dons, de vos apports,
              de vos conseils pour réussir cette mission. Rejoignez-nous !
            </p>
          </Reveal>
          <Reveal delay={520}>
            <div
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "32px",
              }}
            >
              <Button variant="highlight" size="lg" onClick={() => setDonateOpen(true)}>
                Faites un don
              </Button>
              <Button
                as="a"
                href="/contact"
                variant="ghost"
                size="lg"
                style={{ color: "var(--white)" }}
              >
                Rejoignez-nous
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
