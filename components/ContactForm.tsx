"use client";

import { useState } from "react";
import { IconCheck, IconInstagram } from "@/components/icons";

const INSTAGRAM_URL = "https://www.instagram.com/buggedoutevents";

// Two ways in, one form: a question for the crew, or feedback on the show.
// The choice rides along to /api/contact and drives the admin console filter.
const KINDS = [
  {
    key: "contact",
    label: "Contact us",
    hint: "Questions, events, partnerships",
    subject: "What's it about?",
    subjectPlaceholder: "e.g. Booking BuggedOut for an event",
    message: "Your message",
    messagePlaceholder: "Tell us what you need and we'll point you the right way.",
    cta: "Send message",
  },
  {
    key: "feedback",
    label: "Feedback",
    hint: "Ideas, praise, things we broke",
    subject: "Feedback headline",
    subjectPlaceholder: "e.g. The countdown looks great on mobile",
    message: "Your feedback",
    messagePlaceholder:
      "What did you love, what fell flat, what should we do next? All of it helps.",
    cta: "Send feedback",
  },
] as const;

type KindKey = (typeof KINDS)[number]["key"];

const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [kind, setKind] = useState<KindKey>("contact");
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = KINDS.find((k) => k.key === kind) ?? KINDS[0];

  const set = (field: keyof typeof EMPTY) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!form.name.trim()) return setError("Please tell us your name.");
    if (!form.email.trim()) return setError("We need an email to reply to.");
    if (form.message.trim().length < 10) {
      return setError("Please write a little more so we can help.");
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...form }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="form-card hud-panel contact-sent" role="status">
        <div className="success-check" aria-hidden="true">
          <IconCheck width={34} height={34} />
        </div>
        <span className="eyebrow">Message received</span>
        <h2>Thanks — that landed.</h2>
        <p>
          A real human on the crew reads every message. We&apos;ll get back to
          you at <strong>{form.email}</strong>, usually within two business days.
        </p>
        <a
          className="btn btn-primary btn-block"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="shimmer" />
          <IconInstagram width={20} height={20} />
          Follow @buggedoutevents
        </a>
        <button
          type="button"
          className="success-dismiss"
          onClick={() => {
            setForm(EMPTY);
            setSent(false);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form-card hud-panel" onSubmit={handleSubmit} noValidate>
      <fieldset className="kind-switch">
        <legend>What brings you here?</legend>
        <div className="kind-opts">
          {KINDS.map((k) => (
            <label
              key={k.key}
              className={`kind-opt${kind === k.key ? " active" : ""}`}
            >
              <input
                type="radio"
                name="kind"
                value={k.key}
                checked={kind === k.key}
                onChange={() => setKind(k.key)}
              />
              <span className="kind-label">{k.label}</span>
              <span className="kind-hint">{k.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={set("email")}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-subject">{copy.subject}</label>
        <input
          id="cf-subject"
          type="text"
          placeholder={copy.subjectPlaceholder}
          maxLength={160}
          value={form.subject}
          onChange={set("subject")}
        />
      </div>

      <div className="field">
        <label htmlFor="cf-message">{copy.message}</label>
        <textarea
          id="cf-message"
          placeholder={copy.messagePlaceholder}
          maxLength={4000}
          value={form.message}
          onChange={set("message")}
          required
        />
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={submitting}
      >
        <span className="shimmer" />
        {submitting ? "Sending…" : copy.cta}
      </button>

      <p className="form-note">
        We only use your details to reply. Read the{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
