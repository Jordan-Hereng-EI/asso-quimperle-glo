"use server";

import { redirect } from "next/navigation";
import { verifyCredentials } from "@/lib/credentials";
import { createSession, destroySession } from "@/lib/session";

export interface LoginState {
  error: string | null;
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Veuillez renseigner l'e-mail et le mot de passe." };
  }

  const ok = await verifyCredentials(email, password);
  if (!ok) {
    // Message volontairement générique : ne révèle pas lequel des deux champs est faux.
    return { error: "Identifiants incorrects." };
  }

  await createSession(email);
  redirect("/");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
