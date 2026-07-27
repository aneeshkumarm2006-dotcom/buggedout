"use client";

import { useCallback, useMemo, useState } from "react";
import { DAY_MS, PAGE_SIZE, fmtDate, kindLabel, type MessageRow } from "./data";

const KINDS = ["contact", "feedback"] as const;

/**
 * Message body, clamped to three lines until expanded.
 *
 * The toggle only appears when the text genuinely overflows, measured on the
 * clamped element itself (a character-count guess would show the control on
 * short messages at wide viewports). The body stays clamped while collapsed so
 * that measurement is always valid.
 */
function MessageBody({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  const measure = useCallback((el: HTMLParagraphElement | null) => {
    if (el) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, []);

  return (
    <>
      <p
        ref={measure}
        className={`msg-body${open ? "" : " is-clamped"}`}
      >
        {text}
      </p>
      {overflows && (
        <button
          type="button"
          className="msg-more"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? "Show less" : "Show full message"}
        </button>
      )}
    </>
  );
}

export default function MessagesPanel({
  rows,
  error,
  /** Server render time (ms) — see SignupsPanel. */
  loaded,
}: {
  rows: MessageRow[];
  error?: string;
  loaded: number;
}) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);

  const stats = useMemo(() => {
    let last24h = 0;
    let last7d = 0;
    const byKind = new Map<string, number>();
    for (const r of rows) {
      const t = r.createdAt ? Date.parse(r.createdAt) : NaN;
      if (!Number.isNaN(t)) {
        const age = loaded - t;
        if (age < DAY_MS) last24h++;
        if (age < 7 * DAY_MS) last7d++;
      }
      byKind.set(r.kind, (byKind.get(r.kind) ?? 0) + 1);
    }
    return {
      last24h,
      last7d,
      byKind,
      feedback: byKind.get("feedback") ?? 0,
    };
  }, [rows, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !kind) return rows;
    return rows.filter((r) => {
      if (kind && r.kind !== kind) return false;
      if (!q) return true;
      return [r.name, r.email, r.subject, r.message].some((v) =>
        v.toLowerCase().includes(q),
      );
    });
  }, [rows, query, kind]);

  const visible = filtered.slice(0, shown);
  const filtering = query.trim() !== "" || kind !== null;

  function search(value: string) {
    setQuery(value);
    setShown(PAGE_SIZE);
  }

  function pickKind(key: string | null) {
    setKind(key);
    setShown(PAGE_SIZE);
  }

  function clearFilters() {
    setQuery("");
    setKind(null);
    setShown(PAGE_SIZE);
  }

  if (error) {
    return (
      <div className="hud-panel admin-alert" role="alert">
        <h2>Database offline</h2>
        <p>
          Couldn&apos;t load messages. Check that <code>MONGODB_URI</code> is set
          in <code>.env.local</code>, then reload this page.
        </p>
      </div>
    );
  }

  return (
    <>
      <section className="stathud" aria-label="Message stats">
        <div className="stat">
          <span className="num">{rows.length}</span>
          <span className="lbl">Total messages</span>
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
          <span className="num">{stats.feedback}</span>
          <span className="lbl">Feedback entries</span>
        </div>
      </section>

      <section className="hud-panel ledger" aria-label="Message ledger">
        <div className="ledger-bar">
          <span>Contact &amp; feedback inbox</span>
          <span>Newest first</span>
        </div>

        {rows.length > 0 && (
          <div className="ledger-tools">
            <div className="ledger-search">
              <input
                type="search"
                value={query}
                onChange={(e) => search(e.target.value)}
                placeholder="Search name, email, subject, message"
                aria-label="Search messages"
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
            <div className="ledger-pills" role="group" aria-label="Filter by type">
              <button
                type="button"
                className={`filter-pill${kind === null ? " active" : ""}`}
                aria-pressed={kind === null}
                onClick={() => pickKind(null)}
              >
                All<b>{rows.length}</b>
              </button>
              {KINDS.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-pill${kind === key ? " active" : ""}`}
                  aria-pressed={kind === key}
                  onClick={() => pickKind(kind === key ? null : key)}
                >
                  {kindLabel(key)}
                  <b>{stats.byKind.get(key) ?? 0}</b>
                </button>
              ))}
            </div>
          </div>
        )}

        {rows.length === 0 ? (
          <p className="ledger-note">
            <b>No messages yet.</b>
            <br />
            Everything sent from the <code>/contact</code> form lands here,
            questions and feedback alike.
          </p>
        ) : visible.length === 0 ? (
          <div className="ledger-note">
            <b>No messages match.</b>
            <br />
            Try a different search, or clear the filters.
            <br />
            <button type="button" className="btn btn-ghost" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="ledger-view">
              <ul className="msg-list">
                {visible.map((r, i) => {
                  const id = `${r.email}-${r.createdAt}-${i}`;
                  const t = r.createdAt ? Date.parse(r.createdAt) : NaN;
                  const isNew = !Number.isNaN(t) && loaded - t < DAY_MS;
                  return (
                    <li
                      key={id}
                      className={`msg${isNew ? " is-new" : ""}`}
                      title={isNew ? "Received in the last 24 hours" : undefined}
                    >
                      <div className="msg-top">
                        <span className="msg-who">{r.name || "-"}</span>
                        <span
                          className={`t-chip${r.kind === "feedback" ? " is-feedback" : ""}`}
                        >
                          {kindLabel(r.kind)}
                        </span>
                        <span className="t-date msg-date">
                          {fmtDate(r.createdAt)}
                        </span>
                      </div>

                      {r.subject && <p className="msg-subject">{r.subject}</p>}

                      <MessageBody text={r.message} />

                      <div className="msg-foot">
                        <a
                          href={`mailto:${r.email}${
                            r.subject
                              ? `?subject=${encodeURIComponent(`Re: ${r.subject}`)}`
                              : ""
                          }`}
                        >
                          {r.email}
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
