import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, makeSessionToken, verifyPassword } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: { password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 500 },
    );
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!verifyPassword(password)) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
