import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

/**
 * Toute l'admin est derrière authentification, sauf /login.
 * jose fonctionne dans le runtime Edge du middleware, donc la session est
 * réellement vérifiée ici (pas juste la présence du cookie).
 */
export async function middleware(request: NextRequest) {
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
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Tout sauf les assets Next et le favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
