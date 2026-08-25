import { SectionHeading } from "@/components/ui";
import { MissionCard } from "@/components/ui/MissionCard";
import { MISSIONS } from "@/lib/site-data";

/** MissionsSection — the three MissionCards presenting the association's focus areas. */
export function MissionsSection() {
  return (
    <section
      id="missions"
      style={{ background: "var(--paper)", padding: "var(--section-pad-y) 0" }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 64px)",
        }}
      >
        <SectionHeading
          eyebrow="Nos missions"
          title="Trois combats, un même"
          scriptWord="élan"
          lead="De l'école à la table, du terrain béninois aux marchés bretons — découvrez nos actions et suivez-les dans la presse."
          align="center"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(20px, 3vw, 32px)",
            marginTop: "clamp(40px, 6vw, 64px)",
          }}
        >
          {MISSIONS.map((mission) => (
            <MissionCard key={mission.title} {...mission} />
          ))}
        </div>
      </div>
    </section>
  );
}
