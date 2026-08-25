"use client";

import { useEffect, useState } from "react";
import { Footer, NavBar } from "@/components/ui";
import {
  AboutSection,
  DonateBand,
  DonateModal,
  Hero,
  MissionsSection,
  PhotoMarquee,
  PresidentTeaser,
} from "@/components/sections";
import { FOOTER_COLUMNS, getNavLinks } from "@/lib/site-data";

export default function HomePage() {
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
      <MissionsSection />
      <PhotoMarquee />
      <AboutSection />
      <PresidentTeaser />
      <DonateBand onDonate={openDonate} />
      <Footer columns={FOOTER_COLUMNS} />
      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
