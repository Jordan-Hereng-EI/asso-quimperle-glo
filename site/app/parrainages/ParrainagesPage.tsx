"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Eyebrow,
  Footer,
  Lightbox,
  NavBar,
  PhotoFrame,
  SectionHeading,
  StatBlock,
  cycleIndex,
} from "@/components/ui";
import { DonateModal, Reveal } from "@/components/sections";
import { FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { Sponsorship } from "@/types";

export function ParrainagesPage({ sponsorship }: { sponsorship: Sponsorship }) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const { initials, photos } = sponsorship;

  const lightboxList = photos.map((p) => ({
    src: `/uploads/${p.filename}`,
    alt: p.alt || p.caption,
    title: p.caption || undefined,
    width: p.width,
    height: p.height,
    unoptimized: true,
  }));

  return (
    <div>
      <NavBar links={getNavLinks("parrainages")} onCta={() => setDonateOpen(true)} />

      <header style={{ background: "var(--surface-sunk)", padding: "clamp(56px, 8vw, 88px) 0 0" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal>
            <SectionHeading
              eyebrow="Parrainages"
              title="Une vingtaine d'enfants"
              scriptWord="accompagnés"
              lead="Une vingtaine d'enfants et de personnes sont parrainés à Glo Yokpo, Glo Alladacomè et à Agla Cotonou."
              align="center"
            />
          </Reveal>
        </div>

        <div style={{ background: "var(--ink-900)", marginTop: "clamp(36px, 5vw, 56px)" }}>
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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
              gap: "32px",
            }}
          >
            <Reveal delay={0}>
              <StatBlock value="≈ 20" label="Enfants et personnes parrainés" />
            </Reveal>
            <Reveal delay={140}>
              <StatBlock
                value="3"
                label="Localités : Glo Yokpo, Glo Alladacomè, Agla Cotonou"
                color="var(--benin-green)"
              />
            </Reveal>
            <Reveal delay={280}>
              <StatBlock
                value="3"
                label="Jeunes diplômés et autonomes : coiffure, pâtisserie, graphisme"
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
            gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
            gap: "clamp(36px, 6vw, 80px)",
            alignItems: "center",
          }}
        >
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Le parrainage"
                title="Vivre décemment, étudier dans la"
                scriptWord="quiétude"
              />
            </Reveal>
            <Reveal delay={120}>
              <p
                style={{
                  margin: "22px 0 0",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.08rem",
                  lineHeight: 1.75,
                  color: "var(--text-body)",
                }}
              >
                Grâce aux parrains et marraines qui ont le sens du partage, la main sur le cœur, ces
                enfants ont la possibilité de vivre décemment et de suivre une scolarité dans la
                quiétude.
              </p>
              <p
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.08rem",
                  lineHeight: 1.75,
                  color: "var(--text-body)",
                }}
              >
                Ce système a déjà permis l&apos;autonomisation de trois jeunes diplômés — en
                coiffure, en pâtisserie et en graphisme design.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "28px" }}>
                <Button as="a" href="/contact" variant="primary" size="lg">
                  Devenir parrain ou marraine
                </Button>
                <Button variant="outline" size="lg" onClick={() => setDonateOpen(true)}>
                  Faire un don
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            {photos[0] ? (
              <div onClick={() => setOpen(0)} style={{ cursor: "zoom-in" }}>
                <PhotoFrame
                  photo={photos[0]}
                  alt={photos[0].caption}
                  ratio="4/3"
                  style={{ boxShadow: "var(--shadow-lg)" }}
                />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <Image
                  src="/photos/courrier.jpg"
                  alt="Les enfants parrainés rédigent leur courrier pour leurs parrains et marraines"
                  width={1200}
                  height={1600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: "4/3",
                    objectFit: "cover",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-lg)",
                    display: "block",
                  }}
                />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--surface-sunk)", padding: "var(--section-pad-y) 0" }}>
        <div
          style={{
            maxWidth: "var(--container-narrow)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
            textAlign: "center",
          }}
        >
          <Reveal>
            <Eyebrow color="var(--benin-red)" style={{ justifyContent: "center" }}>
              Merci infiniment
            </Eyebrow>
            <h2
              style={{
                margin: "14px 0 0",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--text-strong)",
              }}
            >
              À nos parrains et{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-green)",
                }}
              >
                marraines
              </span>
            </h2>
            <p
              style={{
                margin: "14px auto 0",
                maxWidth: "52ch",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "var(--text-body)",
              }}
            >
              Remerciements infinis aux parrains et marraines dont voici les initiales :
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
                marginTop: "26px",
              }}
            >
              {initials.map((label, i) => (
                <span
                  key={`${label}-${i}`}
                  style={{
                    padding: "9px 16px",
                    borderRadius: "var(--radius-pill)",
                    background: "var(--white)",
                    border: "1.5px solid var(--border-soft)",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    color: "var(--ink-900)",
                  }}
                >
                  {label}
                </span>
              ))}
              {initials.length === 0 && (
                <span style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)" }}>
                  La liste sera publiée prochainement.
                </span>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--paper)", padding: "var(--section-pad-y) 0" }}>
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 clamp(20px, 5vw, 64px)",
          }}
        >
          <Reveal>
            <SectionHeading
              eyebrow="En images"
              title="Les enfants"
              scriptWord="parrainés"
              align="center"
            />
          </Reveal>
          {photos.length === 0 ? (
            <div style={{ maxWidth: "720px", margin: "clamp(28px, 4vw, 40px) auto 0" }}>
              <PhotoFrame photo={null} alt="Photos des enfants parrainés" ratio="16/9" />
            </div>
          ) : (
            <div className="masonry" style={{ marginTop: "clamp(28px, 4vw, 40px)" }}>
              {photos.map((p, i) => (
                <figure key={`${p.filename}-${i}`}>
                  <Reveal delay={(i % 3) * 100}>
                    <div
                      onClick={() => setOpen(i)}
                      style={{
                        position: "relative",
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        cursor: "zoom-in",
                        boxShadow: "var(--shadow-sm)",
                        background: "var(--stone-100)",
                      }}
                    >
                      <Image
                        src={`/uploads/${p.filename}`}
                        alt={p.alt || p.caption}
                        width={p.width}
                        height={p.height}
                        unoptimized
                        loading="lazy"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      {p.caption && (
                        <figcaption
                          style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            padding: "28px 16px 14px",
                            background:
                              "linear-gradient(180deg, rgba(15,8,6,0) 0%, rgba(15,8,6,0.8) 100%)",
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "0.98rem",
                            color: "var(--white)",
                          }}
                        >
                          {p.caption}
                        </figcaption>
                      )}
                    </div>
                  </Reveal>
                </figure>
              ))}
            </div>
          )}
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
              Plusieurs enfants ont besoin de{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                vous
              </span>{" "}
              actuellement
            </h2>
            <p
              style={{
                margin: "16px auto 0",
                maxWidth: "50ch",
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "var(--sand-200)",
              }}
            >
              Merci de rejoindre l&apos;équipe des parrains et marraines : un geste régulier qui
              change durablement une vie.
            </p>
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
                Devenir parrain ou marraine
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
      <Lightbox
        list={lightboxList}
        index={open}
        onClose={() => setOpen(null)}
        onNav={(d) => setOpen((cur) => cycleIndex(cur, d, lightboxList.length))}
      />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
}
