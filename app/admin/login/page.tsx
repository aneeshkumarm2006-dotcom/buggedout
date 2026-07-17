"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        placeItems: "start center",
        // Clear the fixed navbar (logo + countdown rows) so the card sits below it.
        padding:
          "clamp(160px, 26vh, 300px) var(--space-4) var(--space-8)",
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
          <div style={{ position: "relative", display: "flex" }}>
            <input
              id="admin-pw"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              style={{ flex: 1, paddingRight: 48 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              title={showPassword ? "Hide password" : "Show password"}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100%",
                width: 48,
                display: "grid",
                placeItems: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-secondary)",
                padding: 0,
              }}
            >
              {showPassword ? (
                // eye-off
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                // eye
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
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
