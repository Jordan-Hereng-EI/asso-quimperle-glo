import type { Metadata } from "next";
import { MotDeLaPresidentePage } from "./MotDeLaPresidentePage";

export const metadata: Metadata = {
  title: "Le mot de la présidente",
};

export default function Page() {
  return <MotDeLaPresidentePage />;
}
