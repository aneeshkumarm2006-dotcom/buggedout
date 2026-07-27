"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import SignupsPanel from "./SignupsPanel";
import MessagesPanel from "./MessagesPanel";
import {
  downloadCsv,
  messagesCsv,
  signupsCsv,
  type MessageRow,
  type SignupRow,
} from "./data";

type Tab = "signups" | "messages";

const TABS: { key: Tab; label: string }[] = [
  { key: "signups", label: "Signups" },
  { key: "messages", label: "Messages" },
];

export default function AdminConsole({
  signups,
  signupError,
  messages,
  messageError,
  loadedAt,
}: {
  signups: SignupRow[];
  signupError?: string;
  messages: MessageRow[];
  messageError?: string;
  // Server render time (ISO). Freshness math derives from this so SSR and
  // hydration see the same instant.
  loadedAt: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("signups");
  const [loggingOut, setLoggingOut] = useState(false);
  const tablistRef = useRef<HTMLDivElement>(null);

  const loaded = useMemo(() => Date.parse(loadedAt), [loadedAt]);

  const onSignups = tab === "signups";
  const count = onSignups ? signups.length : messages.length;

  function exportCsv() {
    if (onSignups) downloadCsv("buggedout-signups", signupsCsv(signups));
    else downloadCsv("buggedout-messages", messagesCsv(messages));
  }

  // Left/right arrows move between tabs, per the WAI-ARIA tabs pattern.
  function onTabKey(e: React.KeyboardEvent) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.key === tab);
    const next = TABS[(i + dir + TABS.length) % TABS.length];
    setTab(next.key);
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`#tab-${next.key}`)
      ?.focus();
  }

  async function logout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <header className="admin-head">
        <div>
          <span className="kicker">BuggedOut Admin</span>
          <h1 className="admin-title">
            {onSignups ? "Signup console" : "Message console"}{" "}
            <span className="count">{count}</span>
          </h1>
        </div>
        <div className="admin-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={exportCsv}
            disabled={count === 0}
            title={`Download all ${count} ${onSignups ? "signups" : "messages"}`}
          >
            Export CSV
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={logout}
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out…" : "Log out"}
          </button>
        </div>
      </header>

      <div
        className="admin-tabs"
        role="tablist"
        aria-label="Console sections"
        ref={tablistRef}
        onKeyDown={onTabKey}
      >
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              id={`tab-${t.key}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${t.key}`}
              tabIndex={active ? 0 : -1}
              className={`admin-tab${active ? " active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              <b>{t.key === "signups" ? signups.length : messages.length}</b>
            </button>
          );
        })}
      </div>

      <div
        id="panel-signups"
        role="tabpanel"
        aria-labelledby="tab-signups"
        hidden={!onSignups}
        className="admin-panel"
      >
        {onSignups && (
          <SignupsPanel rows={signups} error={signupError} loaded={loaded} />
        )}
      </div>

      <div
        id="panel-messages"
        role="tabpanel"
        aria-labelledby="tab-messages"
        hidden={onSignups}
        className="admin-panel"
      >
        {!onSignups && (
          <MessagesPanel rows={messages} error={messageError} loaded={loaded} />
        )}
      </div>
    </div>
  );
}
