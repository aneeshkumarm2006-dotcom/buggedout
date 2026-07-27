import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";

// Form posts are request-time writes; never prerender or cache this handler.
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// "contact" = a question for the crew, "feedback" = a suggestion. The contact
// page toggles between the two; the admin console filters on it.
const KINDS = new Set(["contact", "feedback"]);

const MESSAGE_MIN = 10;
const MESSAGE_MAX = 4000;

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

  const kind = clean(body.kind, 20) || "contact";
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const subject = clean(body.subject, 160);
  const message = clean(body.message, MESSAGE_MAX);

  if (!KINDS.has(kind)) {
    return NextResponse.json({ error: "Invalid message type." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json(
      { error: "Please tell us your name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required so we can reply." },
      { status: 400 },
    );
  }
  if (message.length < MESSAGE_MIN) {
    return NextResponse.json(
      { error: "Please write a little more so we can help." },
      { status: 400 },
    );
  }

  try {
    const db = await getDb();

    // Unlike signups (one row per email), every message is its own entry —
    // the same person can write in as often as they like.
    await db.collection("messages").insertOne({
      kind,
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      userAgent: request.headers.get("user-agent") ?? "",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact insert failed", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
