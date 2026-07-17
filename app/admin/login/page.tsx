"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      id="main-content"
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        padding: "var(--space-8) var(--space-4)",
      }}
    >
      <form
        onSubmit={onSubmit}
        className="hud-panel"
        style={{
          width: "min(100%, 380px)",
          padding: "var(--space-6)",
          borderRadius: 16,
          display: "grid",
          gap: "var(--space-4)",
        }}
      >
        <div>
          <span className="eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>
            BuggedOut Admin
          </span>
          <h1 style={{ margin: 0, fontSize: "1.6rem" }}>Sign in</h1>
        </div>
        <div className="field">
          <label htmlFor="admin-pw">Password</label>
          <input
            id="admin-pw"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </div>
        {error ? (
          <p role="alert" style={{ color: "#ff5a5a", fontSize: "0.85rem", margin: 0 }}>
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Enter Dashboard"}
        </button>
      </form>
    </main>
  );
}
