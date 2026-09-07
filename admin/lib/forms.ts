/** Petits helpers de lecture/validation de FormData pour les Server Actions. */

export function text(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export function optionalText(fd: FormData, key: string): string | null {
  const value = text(fd, key);
  return value === "" ? null : value;
}

export function intOrNull(fd: FormData, key: string): number | null {
  const value = text(fd, key);
  if (value === "") return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : null;
}

export function oneOf<T extends string>(
  fd: FormData,
  key: string,
  allowed: readonly T[],
): T | null {
  const value = text(fd, key);
  return (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

/** Accepte une URL http(s) ou vide ; rejette le reste. */
export function optionalUrl(
  fd: FormData,
  key: string,
): { ok: true; value: string | null } | { ok: false } {
  const value = optionalText(fd, key);
  if (value === null) return { ok: true, value: null };
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return { ok: false };
    return { ok: true, value: url.toString() };
  } catch {
    return { ok: false };
  }
}
