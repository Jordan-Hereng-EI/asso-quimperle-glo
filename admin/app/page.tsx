import { redirect } from "next/navigation";
import { logout } from "@/app/actions";
import { getSession } from "@/lib/session";

export default async function HomePage() {
  // Le middleware protège déjà la route ; ceinture et bretelles au cas où il
  // serait contourné (accès direct au serveur Node derrière le proxy).
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <>
      <header className="topbar">
        <div className="brand">
          Quimperlé-Glo <span>· Administration</span>
        </div>
        <div className="user">
          <span>{session.email}</span>
          <form action={logout}>
            <button type="submit" className="btn btn-ghost">
              Se déconnecter
            </button>
          </form>
        </div>
      </header>
      <main className="main">
        <div className="placeholder">
          <p>
            Vous êtes connecté. Les outils d&apos;administration (contenus, album, membres…)
            arriveront ici.
          </p>
        </div>
      </main>
    </>
  );
}
