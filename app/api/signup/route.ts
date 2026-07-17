import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

// Signups are request-time writes; never prerender or cache this handler.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REFERRAL_VALUES = new Set([
  "search",
  "social",
  "friend",
  "youtube",
  "event",
  "ad",
  "other",
]);

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 40);
  const referral = clean(body.referral, 40);

  // Name is optional: the inline hero form only collects an email.
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (referral && !REFERRAL_VALUES.has(referral)) {
    return NextResponse.json({ error: "Invalid referral." }, { status: 400 });
  }

  try {
    const db = await getDb();
    const signups = db.collection("signups");

    // One row per email — repeat submissions just refresh the details.
    await signups.updateOne(
      { email },
      {
        $set: {
          name,
          email,
          phone,
          referral,
          updatedAt: new Date(),
          userAgent: request.headers.get("user-agent") ?? "",
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("signup insert failed", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
