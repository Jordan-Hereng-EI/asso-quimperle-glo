import { Button, Eyebrow } from "@/components/ui";

interface DonateBandProps {
  onDonate: () => void;
}

/** DonateBand — dark closing call-to-action band before the footer. */
export function DonateBand({ onDonate }: DonateBandProps) {
  return (
    <section style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden" }}>
      <div style={{ height: "6px", display: "flex" }}>
        <span style={{ flex: 1, background: "var(--benin-green)" }} />
        <span style={{ flex: 1, background: "var(--benin-yellow)" }} />
        <span style={{ flex: 1, background: "var(--benin-red)" }} />
      </div>
      <div
        style={{
          maxWidth: "var(--container-narrow)",
          margin: "0 auto",
          padding: "clamp(56px, 8vw, 96px) clamp(20px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <Eyebrow color="var(--benin-yellow)" ondark style={{ justifyContent: "center" }}>
          Nous soutenir
        </Eyebrow>
        <h2
          style={{
            margin: "18px 0 0",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "var(--white)",
          }}
        >
          20 € financent une semaine de{" "}
          <span
            style={{
              fontFamily: "var(--font-script)",
              fontWeight: 700,
              color: "var(--benin-yellow)",
            }}
          >
            cantine
          </span>
        </h2>
        <p
          style={{
            margin: "18px auto 0",
            maxWidth: "52ch",
            fontFamily: "var(--font-body)",
            fontSize: "1.15rem",
            lineHeight: 1.6,
            color: "var(--sand-200)",
          }}
        >
          Votre don, ponctuel ou régulier, se transforme en fournitures, en repas et en soins.
          Rejoignez le mouvement.
        </p>
        <div
          style={{
            display: "flex",
            gap: "14px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "34px",
          }}
        >
          <Button variant="highlight" size="lg" onClick={onDonate}>
            Faire un don
          </Button>
          <Button
            as="a"
            href="/contact"
            variant="ghost"
            size="lg"
            style={{ color: "var(--white)" }}
          >
            Devenir bénévole
          </Button>
        </div>
      </div>
    </section>
  );
}
