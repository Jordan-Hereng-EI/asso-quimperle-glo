"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { Reveal } from "./Reveal";
import { ALBUM } from "@/lib/site-data";

/** PhotoMarquee — full-bleed auto-scrolling photo strip, pauses on hover. */
export function PhotoMarquee() {
  const [paused, setPaused] = useState(false);
  const pics = ALBUM.slice(0, 12);
  const track = pics.concat(pics);

  return (
    <section
      style={{
        background: "var(--ink-900)",
        overflow: "hidden",
        padding: "clamp(48px, 6vw, 72px) 0",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 64px)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div>
          <Reveal>
            <Eyebrow color="var(--benin-yellow)" ondark>
              En images
            </Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2
              style={{
                margin: "14px 0 0",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--white)",
              }}
            >
              La vie de l&apos;association, du terrain au{" "}
              <span
                style={{
                  fontFamily: "var(--font-script)",
                  fontWeight: 700,
                  color: "var(--benin-yellow)",
                }}
              >
                marché
              </span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <Button
            as="a"
            href="/album"
            variant="outline"
            style={{ color: "var(--white)", borderColor: "rgba(255,255,255,0.55)" }}
            iconAfter={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            }
          >
            Voir l&apos;album
          </Button>
        </Reveal>
      </div>
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: "flex",
          width: "max-content",
          gap: "18px",
          animation: "qgmarquee 60s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((photo, i) => (
          <Link
            key={`${photo.file}-${i}`}
            href="/album"
            title={photo.title}
            style={{ display: "block", flexShrink: 0 }}
          >
            <Image
              src={`/photos/${photo.file}`}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              loading="lazy"
              style={{
                height: "215px",
                width: "auto",
                borderRadius: "var(--radius-md)",
                display: "block",
                objectFit: "cover",
                boxShadow: "var(--shadow-md)",
                transition: "transform 400ms var(--ease-out), opacity 400ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            />
          </Link>
        ))}
      </div>
      <style>{`@keyframes qgmarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
