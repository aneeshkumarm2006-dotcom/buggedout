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
import {
  IconCheck,
  IconClose,
  IconInstagram,
  IconMail,
} from "@/components/icons";
import { useScrollLock } from "@/lib/useScrollLock";

const INSTAGRAM_URL = "https://www.instagram.com/buggedoutevents";

interface SignupContextValue {
  open: () => void;
  /** Show the big "Coming Soon" confirmation — used by the inline home-page form too. */
  showSuccess: () => void;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function useSignup(): SignupContextValue {
  const ctx = useContext(SignupContext);
  if (!ctx) {
    throw new Error("useSignup must be used within a <SignupProvider>");
  }
  return ctx;
}

const EMPTY_FORM = { name: "", email: "", phone: "" };

export default function SignupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setView("form");
    setSubmitting(false);
    setError(null);
    setForm(EMPTY_FORM);
    setIsOpen(true);
  }, []);

  // Jump straight to the confirmation — the inline home-page form submits on its
  // own, then hands off to this modal so both entry points celebrate the same way.
  const showSuccess = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setView("success");
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
      setView("success");
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
    const focusTimer = window.setTimeout(() => {
      if (view === "success") successRef.current?.focus();
      else nameRef.current?.focus();
    }, 50);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          "input,button,textarea,select,a[href],[tabindex]:not([tabindex='-1'])",
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
  }, [isOpen, view, close]);

  return (
    <SignupContext.Provider value={{ open, showSuccess }}>
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
        <div className={`modal${view === "success" ? " modal-success" : ""}`}>
          <div className="checker-top" />
          <button className="modal-close" aria-label="Close" onClick={close}>
            <IconClose width={22} height={22} />
          </button>
          {view === "success" ? (
            <div
              className="success-body"
              ref={successRef}
              tabIndex={-1}
            >
              <div className="success-check" aria-hidden="true">
                <IconCheck width={38} height={38} />
              </div>
              <span className="eyebrow">You&apos;re on the list</span>
              <h2 id="signupTitle" className="success-title">
                Coming Soon
              </h2>
              <p className="success-lead">
                The arena isn&apos;t open just yet, but you&apos;ll be among the
                first through the doors.
              </p>

              <div className="success-note">
                <IconMail width={22} height={22} />
                <p>
                  <strong>Watch your inbox.</strong> Every update, early-access
                  drop and launch date lands there first.
                </p>
              </div>

              <p className="success-follow">
                Want it sooner? We post everything to{" "}
                <strong>@buggedoutevents</strong> first.
              </p>
              <a
                className="btn btn-primary btn-block btn-lg success-ig"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="shimmer" />
                <IconInstagram width={20} height={20} />
                Follow on Instagram
              </a>

              <button type="button" className="success-dismiss" onClick={close}>
                Back to the site
              </button>
            </div>
          ) : (
            <div className="modal-body">
              <span
                className="eyebrow"
                style={{ display: "block", marginBottom: "var(--space-2)" }}
              >
                Launching Soon
              </span>
              <h2 id="signupTitle">We&apos;re Coming Soon</h2>
              <p className="sub">
                The arena isn&apos;t open just yet, but the sport that&apos;s
                about to change the game is almost here. Sign up for news, early
                access, and round alerts.
              </p>
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
            </div>
          )}
        </div>
      </div>
    </SignupContext.Provider>
  );
}
