import Link from "next/link";
import type { ReactNode } from "react";
import { logout } from "@/app/login/actions";

export type AdminSection = "dashboard" | "photos" | "projets" | "actions" | "parrainages";

const NAV: Array<{ key: AdminSection; href: string; label: string }> = [
  { key: "dashboard", href: "/", label: "Tableau de bord" },
  { key: "photos", href: "/photos", label: "Photos" },
  { key: "projets", href: "/projets", label: "Projets" },
  { key: "actions", href: "/actions", label: "Actions" },
  { key: "parrainages", href: "/parrainages", label: "Parrainages" },
];

interface AdminShellProps {
  active: AdminSection;
  email: string;
  title: string;
  /** Bouton d'action principal affiché à droite du titre (ex. « Nouveau projet »). */
  headAction?: ReactNode;
  children: ReactNode;
}

export function AdminShell({ active, email, title, headAction, children }: AdminShellProps) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <div className="brand">
            Quimperlé-Glo <span>· Administration</span>
          </div>
          <nav className="nav" aria-label="Sections">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="nav-link"
                data-active={item.key === active ? "true" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="user">
          <span className="user-email">{email}</span>
          <form action={logout}>
            <button type="submit" className="btn btn-ghost btn-sm">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <main className="main">
        <div className="page-head">
          <h1>{title}</h1>
          {headAction}
        </div>
        {children}
      </main>
    </>
  );
}
