import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/adminAuth";
import { getDb } from "@/lib/mongodb";
import AdminConsole, { type SignupRow } from "./AdminConsole";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Signup Console — BuggedOut Admin",
};

interface SignupDoc {
  name?: string;
  email?: string;
  phone?: string;
  referral?: string;
  createdAt?: Date;
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
      referral: d.referral ?? "",
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : "",
    }));
    return { rows };
  } catch (err) {
    console.error("failed to load signups", err);
    return {
      rows: [],
      error:
        "Could not connect to the database. Check that MONGODB_URI is set in .env.local.",
    };
  }
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { rows, error } = await loadSignups();

  return (
    <AdminConsole
      rows={rows}
      error={error}
      loadedAt={new Date().toISOString()}
    />
  );
}
