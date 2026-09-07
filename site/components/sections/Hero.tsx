"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Button, Eyebrow } from "@/components/ui";

interface HeroProps {
  onDonate: () => void;
}

/** Hero — cinematic full-screen intro with a Ken Burns background and staggered copy reveal. */
export function Hero({ onDonate }: HeroProps) {
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  const rise = (delay: number): CSSProperties => ({
    opacity: go ? 1 : 0,
    transform: go ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 900ms var(--ease-out) ${delay}ms, transform 900ms var(--ease-out) ${delay}ms`,
  });

  return (
    <section
      style={{
        position: "relative",
        minHeight: "var(--hero-min-h)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--ink-900)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/assets/enfants.jpg"
          alt="Enfants béninois souriant"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 38%",
            transform: go ? "scale(1.12)" : "scale(1)",
            transition: "transform 12s linear",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(15,8,6,0.72) 0%, rgba(15,8,6,0.30) 38%, rgba(15,8,6,0.55) 78%, rgba(15,8,6,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(15,8,6,0.78) 0%, rgba(15,8,6,0.15) 55%, rgba(15,8,6,0) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          display: "flex",
          zIndex: 3,
        }}
      >
        <span
          style={{
            flex: 1,
            background: "var(--benin-green)",
            transformOrigin: "left",
            transform: go ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 700ms var(--ease-out) 200ms",
          }}
        />
        <span
          style={{
            flex: 1,
            background: "var(--benin-yellow)",
            transformOrigin: "left",
            transform: go ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 700ms var(--ease-out) 340ms",
          }}
        />
        <span
          style={{
            flex: 1,
            background: "var(--benin-red)",
            transformOrigin: "left",
            transform: go ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 700ms var(--ease-out) 480ms",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "var(--container-max)",
          width: "100%",
          margin: "0 auto",
          padding: "120px clamp(20px, 5vw, 64px) 40px",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <div style={rise(300)}>
            <Eyebrow color="var(--benin-yellow)" ondark>
              De Quimperlé au Bénin
            </Eyebrow>
          </div>
          <h1
            style={{
              ...rise(420),
              margin: "20px 0 0",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem, 7vw, 5.25rem)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--white)",
            }}
          >
            Agir pour les{" "}
            <span
              style={{
                fontFamily: "var(--font-script)",
                fontWeight: 700,
                color: "var(--benin-yellow)",
                letterSpacing: 0,
              }}
            >
              enfants
            </span>{" "}
            béninois
          </h1>
          <p
            style={{
              ...rise(560),
              margin: "24px 0 0",
              maxWidth: "54ch",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
              lineHeight: 1.6,
              color: "var(--sand-100)",
            }}
          >
            L&apos;Association Quimperlé-Glo œuvre pour l&apos;éducation, la santé et
            l&apos;autonomie des familles au Bénin. Chaque geste compte, chaque enfant compte.
          </p>
          <div
            style={{
              ...rise(700),
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "36px",
            }}
          >
            <Button
              variant="highlight"
              size="lg"
              onClick={onDonate}
              iconAfter={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5 5.4 5c2 0 3.4 1.1 4.2 2.4C10.4 6.1 11.8 5 13.8 5 17.2 5 18.8 8.6 17.2 11.8 14.7 16.4 12 21 12 21z" />
                </svg>
              }
            >
              Faire un don
            </Button>
            <Button
              as="a"
              href="/projets"
              variant="outline"
              size="lg"
              style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.6)" }}
            >
              Découvrir nos projets
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "22px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          opacity: go ? 0.8 : 0,
          transition: "opacity 900ms 1200ms",
        }}
      >
        <div
          style={{
            width: "26px",
            height: "42px",
            border: "2px solid rgba(255,255,255,0.5)",
            borderRadius: "13px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "7px",
          }}
        >
          <span
            style={{
              width: "4px",
              height: "9px",
              borderRadius: "2px",
              background: "var(--benin-yellow)",
              animation: "scrollcue 1.6s var(--ease-in-out) infinite",
            }}
          />
        </div>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(0);opacity:1}70%{transform:translateY(12px);opacity:0}100%{opacity:0}}`}</style>
    </section>
  );
}
