"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { IconClose } from "@/components/icons";
import { useScrollLock } from "@/lib/useScrollLock";

interface SignupContextValue {
  open: () => void;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function useSignup(): SignupContextValue {
  const ctx = useContext(SignupContext);
  if (!ctx) {
    throw new Error("useSignup must be used within a <SignupProvider>");
  }
  return ctx;
}

const EMPTY_FORM = { name: "", email: "", phone: "", referral: "" };

export default function SignupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
    setForm(EMPTY_FORM);
    setIsOpen(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };
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
  }, [form]);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocus.current?.focus();
  }, []);

  useScrollLock(isOpen);

  // Autofocus and trap focus while the modal is open.
  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => nameRef.current?.focus(), 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          "input,button,textarea,select,[tabindex]:not([tabindex='-1'])",
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <SignupContext.Provider value={{ open }}>
      {children}

      <div
        ref={overlayRef}
        className={`overlay${isOpen ? " open" : ""}`}
        id="signupOverlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="signupTitle"
        inert={!isOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="modal">
          <div className="checker-top" />
          <button className="modal-close" aria-label="Close" onClick={close}>
            <IconClose width={22} height={22} />
          </button>
          <div className="modal-body">
            <span className="eyebrow" style={{ display: "block", marginBottom: "var(--space-2)" }}>
              Launching Soon
            </span>
            <h2 id="signupTitle">We&apos;re Coming Soon</h2>
            <p className="sub">
              The arena isn&apos;t open just yet — but the sport that&apos;s about to
              change the game is almost here. Sign up for news, early access, and
              round alerts. And tell us how you heard about us.
            </p>
            {submitted ? (
              <p
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-display)",
                  textAlign: "center",
                  padding: "var(--space-4) 0",
                }}
              >
                You&apos;re on the list. We&apos;ll be in touch the moment the
                arena opens!
              </p>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!submitting) handleSubmit();
                }}
              >
                <div className="field">
                  <label htmlFor="su-name">Name</label>
                  <input
                    ref={nameRef}
                    id="su-name"
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="su-email">Email</label>
                  <input
                    id="su-email"
                    type="email"
                    placeholder="you@email.com"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="su-phone">Phone</label>
                  <input
                    id="su-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
                <div className="field">
                  <label htmlFor="su-referral">How did you hear about us?</label>
                  <select
                    id="su-referral"
                    required
                    value={form.referral}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, referral: e.target.value }))
                    }
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="search">Search engine</option>
                    <option value="social">Social media</option>
                    <option value="friend">Friend or family</option>
                    <option value="youtube">YouTube / streamer</option>
                    <option value="event">Event or expo</option>
                    <option value="ad">Advertisement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {error ? (
                  <p
                    role="alert"
                    style={{
                      color: "#ff5a5a",
                      fontSize: "0.85rem",
                      marginBottom: "var(--space-3)",
                    }}
                  >
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={submitting}
                >
                  <span className="shimmer" />
                  {submitting ? "Signing you up…" : "Keep Me Posted"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </SignupContext.Provider>
  );
}
