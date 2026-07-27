/**
 * Shared shapes + helpers for the admin console panels.
 *
 * The console has two ledgers — signups (email list) and messages (contact /
 * feedback form). Both render the same HUD vocabulary, so the labels, date
 * formatting and CSV plumbing live here instead of being duplicated per panel.
 */

export interface SignupRow {
  name: string;
  email: string;
  phone: string;
  referral: string;
  createdAt: string;
}

export interface MessageRow {
  name: string;
  email: string;
  /** "contact" = question, "feedback" = suggestion. Matches /api/contact. */
  kind: string;
  subject: string;
  message: string;
  createdAt: string;
}

export const DAY_MS = 86_400_000;
export const PAGE_SIZE = 200;

/* ---- signup referral channels ---- */
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

export function channelLabel(key: string): string {
  return REFERRAL_LABELS[key] ?? key;
}

export function channelShort(key: string): string {
  return REFERRAL_SHORT[key] ?? key;
}

/* ---- message kinds ---- */
const KIND_LABELS: Record<string, string> = {
  contact: "Contact",
  feedback: "Feedback",
};

export function kindLabel(key: string): string {
  return KIND_LABELS[key] ?? key;
}

/** en-US is pinned so the server-rendered HTML and the client hydration agree. */
export function fmtDate(iso: string): string {
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

function esc(v: string): string {
  return `"${String(v).replace(/"/g, '""')}"`;
}

export function toCsv(header: string[], rows: string[][]): string {
  return [header, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
}

/** Triggers a client-side download of `csv` as `<prefix>-<today>.csv`. */
export function downloadCsv(prefix: string, csv: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${prefix}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function signupsCsv(rows: SignupRow[]): string {
  return toCsv(
    ["Name", "Email", "Phone", "Channel", "Signed up"],
    rows.map((r) => [
      r.name,
      r.email,
      r.phone,
      channelLabel(r.referral),
      r.createdAt,
    ]),
  );
}

export function messagesCsv(rows: MessageRow[]): string {
  return toCsv(
    ["Name", "Email", "Type", "Subject", "Message", "Received"],
    rows.map((r) => [
      r.name,
      r.email,
      kindLabel(r.kind),
      r.subject,
      r.message,
      r.createdAt,
    ]),
  );
}
