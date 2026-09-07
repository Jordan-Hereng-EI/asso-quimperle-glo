import type { Metadata } from "next";
import { EquipePage } from "./EquipePage";

export const metadata: Metadata = {
  title: "L'équipe & espace membre",
};

export default function Page() {
  return <EquipePage />;
}
