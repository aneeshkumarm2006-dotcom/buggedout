"use client";

import { useMemo, useState } from "react";
import { DAY_MS, PAGE_SIZE, fmtDate, type SignupRow } from "./data";

export default function SignupsPanel({
  rows,
  error,
  /** Server render time (ms). Freshness math derives from it so SSR and
   *  hydration see the same instant. */
  loaded,
}: {
  rows: SignupRow[];
  error?: string;
  loaded: number;
}) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const stats = useMemo(() => {
    let last24h = 0;
    let last7d = 0;
    let last30d = 0;
    for (const r of rows) {
      const t = r.createdAt ? Date.parse(r.createdAt) : NaN;
      if (Number.isNaN(t)) continue;
      const age = loaded - t;
      if (age < DAY_MS) last24h++;
      if (age < 7 * DAY_MS) last7d++;
      if (age < 30 * DAY_MS) last30d++;
    }
    return { last24h, last7d, last30d };
  }, [rows, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.phone].some((v) => v.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const visible = filtered.slice(0, shown);
  const filtering = query.trim() !== "";

  function search(value: string) {
    setQuery(value);
    setShown(PAGE_SIZE);
  }

  if (error) {
    return (
      <div className="hud-panel admin-alert" role="alert">
        <h2>Database offline</h2>
        <p>
          Couldn&apos;t load signups. Check that <code>MONGODB_URI</code> is set
          in <code>.env.local</code>, then reload this page.
        </p>
      </div>
    );
  }

  return (
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
          <span className="num">{stats.last30d}</span>
          <span className="lbl">Last 30 days</span>
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
            Try a different search, or clear it.
            <br />
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => search("")}
            >
              Clear search
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
                    <th scope="col">Signed up</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r, i) => {
                    const t = r.createdAt ? Date.parse(r.createdAt) : NaN;
                    const isNew = !Number.isNaN(t) && loaded - t < DAY_MS;
                    return (
                      <tr
                        key={`${r.email}-${r.createdAt}-${i}`}
                        className={isNew ? "is-new" : undefined}
                        title={
                          isNew ? "Signed up in the last 24 hours" : undefined
                        }
                      >
                        <td className="t-name">{r.name || "—"}</td>
                        <td>
                          <a href={`mailto:${r.email}`}>{r.email}</a>
                        </td>
                        <td>
                          {r.phone ? <a href={`tel:${r.phone}`}>{r.phone}</a> : "—"}
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
  );
}
