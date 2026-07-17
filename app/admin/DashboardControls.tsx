"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface SignupRow {
  name: string;
  email: string;
  phone: string;
  referral: string;
  createdAt: string;
}

function toCsv(rows: SignupRow[]): string {
  const header = ["Name", "Email", "Phone", "Referral", "Signed up"];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.name, r.email, r.phone, r.referral, r.createdAt].map(esc).join(","),
  );
  return [header.map(esc).join(","), ...lines].join("\r\n");
}

export default function DashboardControls({ rows }: { rows: SignupRow[] }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  function exportCsv() {
    const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "buggedout-signups.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
      <button
        type="button"
        className="btn btn-primary"
        onClick={exportCsv}
        disabled={rows.length === 0}
      >
        Export CSV
      </button>
      <button
        type="button"
        className="btn"
        onClick={logout}
        disabled={loggingOut}
      >
        {loggingOut ? "Logging out…" : "Log out"}
      </button>
    </div>
  );
}
