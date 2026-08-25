import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Caveat } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: {
    default: "Association Quimperlé-Glo",
    template: "%s — Association Quimperlé-Glo",
  },
  description:
    "De Quimperlé au Bénin, agir ensemble pour les enfants : éducation, missions sur place et solidarité entre la Bretagne et le Bénin.",
  icons: {
    icon: "/assets/logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${manrope.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
