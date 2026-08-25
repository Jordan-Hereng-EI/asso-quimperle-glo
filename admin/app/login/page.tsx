import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="card">
        <header className="card-header">
          <div className="kicker">Association Quimperlé-Glo</div>
          <h1>Administration</h1>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
