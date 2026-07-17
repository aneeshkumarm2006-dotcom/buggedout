"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export interface SignupRow {
  name: string;
  email: string;
  phone: string;
  referral: string;
  createdAt: string;
}

const REFERRAL_LABELS: Record<string, string> = {
  search: "Search engine",
  social: "Social media",
  friend: "Friend or family",
  youtube: "YouTube / streamer",
  event: "Event or expo",
  ad: "Advertisement",
  other: "Other",
};

// Short forms for the stat module + pills, where the full label is too wide.
const REFERRAL_SHORT: Record<string, string> = {
  search: "Search",
  social: "Social",
  friend: "Friend",
  youtube: "YouTube",
  event: "Event",
  ad: "Ads",
  other: "Other",
};

const DAY_MS = 86_400_000;
const PAGE_SIZE = 200;

function channelLabel(key: string): string {
  return REFERRAL_LABELS[key] ?? key;
}

function channelShort(key: string): string {
  return REFERRAL_SHORT[key] ?? key;
}

// en-US is pinned so the server-rendered HTML and the client hydration agree.
function fmtDate(iso: string): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function toCsv(rows: SignupRow[]): string {
  const header = ["Name", "Email", "Phone", "Channel", "Signed up"];
  const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.name, r.email, r.phone, channelLabel(r.referral), r.createdAt]
      .map(esc)
      .join(","),
  );
  return [header.map(esc).join(","), ...lines].join("\r\n");
}

export default function AdminConsole({
  rows,
  error,
  loadedAt,
}: {
  rows: SignupRow[];
  error?: string;
  // Server render time (ISO). Freshness math derives from this so SSR and
  // hydration see the same instant.
  loadedAt: string;
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);

  const loaded = useMemo(() => Date.parse(loadedAt), [loadedAt]);

  const stats = useMemo(() => {
    let last24h = 0;
    let last7d = 0;
    const byChannel = new Map<string, number>();
    for (const r of rows) {
      const t = r.createdAt ? Date.parse(r.createdAt) : NaN;
      if (!Number.isNaN(t)) {
        const age = loaded - t;
        if (age < DAY_MS) last24h++;
        if (age < 7 * DAY_MS) last7d++;
      }
      if (r.referral) {
        byChannel.set(r.referral, (byChannel.get(r.referral) ?? 0) + 1);
      }
    }
    const channels = [...byChannel.entries()].sort((a, b) => b[1] - a[1]);
    const top = channels[0];
    return {
      last24h,
      last7d,
      channels,
      topChannel: top ? channelShort(top[0]) : "—",
      topShare: top ? Math.round((top[1] / rows.length) * 100) : 0,
    };
  }, [rows, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !channel) return rows;
    return rows.filter((r) => {
      if (channel && r.referral !== channel) return false;
      if (!q) return true;
      return [r.name, r.email, r.phone, channelLabel(r.referral)].some((v) =>
        v.toLowerCase().includes(q),
      );
    });
  }, [rows, query, channel]);

  const visible = filtered.slice(0, shown);
  const filtering = query.trim() !== "" || channel !== null;

  function search(value: string) {
    setQuery(value);
    setShown(PAGE_SIZE);
  }

  function pickChannel(key: string | null) {
    setChannel(key);
    setShown(PAGE_SIZE);
  }

  function clearFilters() {
    setQuery("");
    setChannel(null);
    setShown(PAGE_SIZE);
  }

  function exportCsv() {
    const blob = new Blob([toCsv(rows)], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `buggedout-signups-${new Date().toISOString().slice(0, 10)}.csv`;
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
    <div className="admin-shell">
      <header className="admin-head">
        <div>
          <span className="kicker">BuggedOut Admin</span>
          <h1 className="admin-title">
            Signup console <span className="count">{rows.length}</span>
          </h1>
        </div>
        <div className="admin-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={exportCsv}
            disabled={rows.length === 0}
            title={`Download all ${rows.length} signups`}
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

      {error ? (
        <div className="hud-panel admin-alert" role="alert">
          <h2>Database offline</h2>
          <p>
            Couldn&apos;t load signups. Check that <code>MONGODB_URI</code> is
            set in <code>.env.local</code>, then reload this page.
          </p>
        </div>
      ) : (
        <>
          <section className="stathud" aria-label="Signup stats">
            <div className="stat">
              <span className="num">{rows.length}</span>
              <span className="lbl">Total signups</span>
            </div>
            <div className="stat">
              <span className="num">{stats.last24h}</span>
              <span className="lbl">Last 24 hours</span>
            </div>
            <div className="stat">
              <span className="num">{stats.last7d}</span>
              <span className="lbl">Last 7 days</span>
            </div>
            <div className="stat">
              {stats.topShare > 0 && (
                <span className="idx">{stats.topShare}%</span>
              )}
              <span className="num is-word">{stats.topChannel}</span>
              <span className="lbl">Top channel</span>
            </div>
          </section>

          <section className="hud-panel ledger" aria-label="Signup ledger">
            <div className="ledger-bar">
              <span>Signup ledger</span>
              <span>Newest first</span>
            </div>

            {rows.length > 0 && (
              <div className="ledger-tools">
                <div className="ledger-search">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => search(e.target.value)}
                    placeholder="Search name, email, phone"
                    aria-label="Search signups"
                  />
                  {query !== "" && (
                    <button
                      type="button"
                      className="ledger-clear"
                      onClick={() => search("")}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {stats.channels.length > 0 && (
                  <div
                    className="ledger-pills"
                    role="group"
                    aria-label="Filter by channel"
                  >
                    <button
                      type="button"
                      className={`filter-pill${channel === null ? " active" : ""}`}
                      aria-pressed={channel === null}
                      onClick={() => pickChannel(null)}
                    >
                      All<b>{rows.length}</b>
                    </button>
                    {stats.channels.map(([key, count]) => (
                      <button
                        key={key}
                        type="button"
                        className={`filter-pill${channel === key ? " active" : ""}`}
                        aria-pressed={channel === key}
                        onClick={() => pickChannel(channel === key ? null : key)}
                        title={channelLabel(key)}
                      >
                        {channelShort(key)}
                        <b>{count}</b>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {rows.length === 0 ? (
              <p className="ledger-note">
                <b>No signups yet.</b>
                <br />
                Entries land here the moment someone joins the list from the
                homepage.
              </p>
            ) : visible.length === 0 ? (
              <div className="ledger-note">
                <b>No entries match.</b>
                <br />
                Try a different search, or clear the filters.
                <br />
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className="ledger-view"
                  role="region"
                  aria-label="Signup table"
                  tabIndex={0}
                >
                  <table className="ledger-table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Channel</th>
                        <th scope="col">Signed up</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((r, i) => {
                        const t = r.createdAt ? Date.parse(r.createdAt) : NaN;
                        const isNew =
                          !Number.isNaN(t) && loaded - t < DAY_MS;
                        return (
                          <tr
                            key={`${r.email}-${r.createdAt}-${i}`}
                            className={isNew ? "is-new" : undefined}
                            title={
                              isNew
                                ? "Signed up in the last 24 hours"
                                : undefined
                            }
                          >
                            <td className="t-name">{r.name || "—"}</td>
                            <td>
                              <a href={`mailto:${r.email}`}>{r.email}</a>
                            </td>
                            <td>
                              {r.phone ? (
                                <a href={`tel:${r.phone}`}>{r.phone}</a>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td>
                              {r.referral ? (
                                <span className="t-chip">
                                  {channelShort(r.referral)}
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                            <td className="t-date">{fmtDate(r.createdAt)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="ledger-foot">
                  <span>
                    Showing <b>{visible.length}</b> /{" "}
                    {filtering ? `${filtered.length} matching` : filtered.length}
                  </span>
                  {filtered.length > shown && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setShown((n) => n + PAGE_SIZE)}
                    >
                      Show {Math.min(PAGE_SIZE, filtered.length - shown)} more
                    </button>
                  )}
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
