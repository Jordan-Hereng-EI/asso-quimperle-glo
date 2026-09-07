import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

/**
 * Toute l'admin est derrière authentification, sauf /login et les photos
 * servies par /uploads (le site public les référence aussi).
 * jose fonctionne dans le runtime Edge, donc la session est réellement
 * vérifiée ici (pas juste la présence du cookie).
 *
 * (Convention `proxy.ts` de Next 16 — ex-`middleware.ts`.)
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Tout sauf les assets Next, le favicon et les photos uploadées.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads/).*)"],
};
