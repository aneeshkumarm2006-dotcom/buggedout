import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/adminAuth";
import { getDb } from "@/lib/mongodb";
import AdminConsole from "./AdminConsole";
import type { MessageRow, SignupRow } from "./data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Console — BuggedOut Admin",
};

interface SignupDoc {
  name?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
}

interface MessageDoc {
  name?: string;
  email?: string;
  kind?: string;
  subject?: string;
  message?: string;
  createdAt?: Date;
}

const DB_ERROR =
  "Could not connect to the database. Check that MONGODB_URI is set in .env.local.";

function iso(value?: Date): string {
  return value ? new Date(value).toISOString() : "";
}

async function loadSignups(): Promise<{ rows: SignupRow[]; error?: string }> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<SignupDoc>("signups")
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(2000)
      .toArray();

    const rows: SignupRow[] = docs.map((d) => ({
      name: d.name ?? "",
      email: d.email ?? "",
      phone: d.phone ?? "",
      createdAt: iso(d.createdAt),
    }));
    return { rows };
  } catch (err) {
    console.error("failed to load signups", err);
    return { rows: [], error: DB_ERROR };
  }
}

async function loadMessages(): Promise<{ rows: MessageRow[]; error?: string }> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<MessageDoc>("messages")
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(2000)
      .toArray();

    const rows: MessageRow[] = docs.map((d) => ({
      name: d.name ?? "",
      email: d.email ?? "",
      kind: d.kind ?? "contact",
      subject: d.subject ?? "",
      message: d.message ?? "",
      createdAt: iso(d.createdAt),
    }));
    return { rows };
  } catch (err) {
    console.error("failed to load messages", err);
    return { rows: [], error: DB_ERROR };
  }
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const [signups, messages] = await Promise.all([
    loadSignups(),
    loadMessages(),
  ]);

  return (
    <AdminConsole
      signups={signups.rows}
      signupError={signups.error}
      messages={messages.rows}
      messageError={messages.error}
      loadedAt={new Date().toISOString()}
    />
  );
}
