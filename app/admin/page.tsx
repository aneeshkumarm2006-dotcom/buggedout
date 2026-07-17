import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/adminAuth";
import { getDb } from "@/lib/mongodb";
import DashboardControls, { type SignupRow } from "./DashboardControls";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Signups",
  robots: { index: false, follow: false },
};

const REFERRAL_LABELS: Record<string, string> = {
  search: "Search engine",
  social: "Social media",
  friend: "Friend or family",
  youtube: "YouTube / streamer",
  event: "Event or expo",
  ad: "Advertisement",
  other: "Other",
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

function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { rows, error } = await loadSignups();

  return (
    <main
      id="main-content"
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "var(--space-8) var(--space-4)",
        display: "grid",
        gap: "var(--space-5)",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "var(--space-4)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <span className="eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>
            BuggedOut Admin
          </span>
          <h1 style={{ margin: 0 }}>
            Sign-ups{" "}
            <span style={{ color: "var(--accent)", fontSize: "0.7em" }}>
              ({rows.length})
            </span>
          </h1>
        </div>
        <DashboardControls rows={rows} />
      </header>

      {error ? (
        <p role="alert" style={{ color: "#ff5a5a" }}>
          {error}
        </p>
      ) : rows.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No sign-ups yet.</p>
      ) : (
        <div className="hud-panel" style={{ borderRadius: 14, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.9rem",
              minWidth: 720,
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", opacity: 0.7 }}>
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Phone</th>
                <th style={cellStyle}>Heard via</th>
                <th style={cellStyle}>Signed up</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.email}-${i}`} style={{ borderTop: "1px solid rgba(128,128,128,0.2)" }}>
                  <td style={cellStyle}>{r.name || "—"}</td>
                  <td style={cellStyle}>
                    <a href={`mailto:${r.email}`} style={{ color: "var(--accent)" }}>
                      {r.email}
                    </a>
                  </td>
                  <td style={cellStyle}>{r.phone || "—"}</td>
                  <td style={cellStyle}>
                    {r.referral ? REFERRAL_LABELS[r.referral] ?? r.referral : "—"}
                  </td>
                  <td style={cellStyle}>{fmtDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

const cellStyle: React.CSSProperties = {
  padding: "0.6rem 0.8rem",
  whiteSpace: "nowrap",
};
