import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Administration — Quimperlé-Glo",
    template: "%s — Administration Quimperlé-Glo",
  },
  description: "Espace d'administration du site de l'Association Quimperlé-Glo.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
