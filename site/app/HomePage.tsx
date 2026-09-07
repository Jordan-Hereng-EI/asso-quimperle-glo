"use client";

import { useEffect, useState } from "react";
import { Footer, NavBar } from "@/components/ui";
import {
  AboutSection,
  DonateBand,
  DonateModal,
  EngagementsSection,
  Hero,
  PhotoMarquee,
  PresidentTeaser,
} from "@/components/sections";
import type { ContentCounts } from "@/lib/content";
import { FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";
import type { Project } from "@/types";

interface HomePageProps {
  featured: Project | null;
  counts: ContentCounts;
}

export function HomePage({ featured, counts }: HomePageProps) {
  const [scrolled, setScrolled] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDonate = () => setDonateOpen(true);

  return (
    <>
      <NavBar links={getNavLinks("accueil")} transparent scrolled={scrolled} onCta={openDonate} />
      <div style={{ marginTop: "calc(var(--nav-h) * -1)" }}>
        <Hero onDonate={openDonate} />
      </div>
      <EngagementsSection featured={featured} counts={counts} onDonate={openDonate} />
      <PhotoMarquee />
      <AboutSection />
      <PresidentTeaser />
      <DonateBand onDonate={openDonate} />
      <Footer columns={FOOTER_COLUMNS} />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
