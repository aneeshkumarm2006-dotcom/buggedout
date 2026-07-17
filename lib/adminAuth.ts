import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Minimal password-gated admin session.
 *
 * The password lives in ADMIN_PASSWORD (env). On login we hand back an
 * httpOnly cookie holding an HMAC signature — stateless, unforgeable without
 * the secret, and never exposes the password itself.
 */

export const ADMIN_COOKIE = "bo_admin";
const SESSION_PAYLOAD = "admin-session-v1";

function secret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

/** Constant-time string comparison that tolerates length differences. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Still run a comparison to avoid leaking length via early return timing.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(input, expected);
}

export function makeSessionToken(): string {
  return createHmac("sha256", secret()).update(SESSION_PAYLOAD).digest("hex");
}

export function isValidToken(token: string | undefined): boolean {
  if (!token || !secret()) return false;
  return safeEqual(token, makeSessionToken());
}

/** Reads the admin cookie from the current request. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return isValidToken(store.get(ADMIN_COOKIE)?.value);
}
