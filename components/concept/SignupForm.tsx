"use client";

import { useRef, useState } from "react";

// Inline email signup with Privacy-Policy checkbox validation.
// Posts the email to /api/signup (name/phone/referral are collected by the modal).
export default function SignupForm() {
  const policyRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <p className="signup-success" role="status">
        You&apos;re on the list! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      className="email-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting) handleSubmit();
      }}
    >
      <div className="email-row">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "SIGNING UP…" : "SIGN UP"}
        </button>
      </div>

      {error ? (
        <p className="signup-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="policy-checkbox">
        <input
          type="checkbox"
          id="policy"
          required
          ref={policyRef}
          onInvalid={() =>
            policyRef.current?.setCustomValidity(
              "Please accept the Privacy Policy before signing up.",
            )
          }
          onChange={() => policyRef.current?.setCustomValidity("")}
        />
        <label htmlFor="policy">
          By signing up, I agree to the{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </label>
      </div>
    </form>
  );
}
