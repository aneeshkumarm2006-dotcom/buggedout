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

export default function SignupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setSubmitted(false);
    setIsOpen(true);
  }, []);

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
            ×
          </button>
          <div className="modal-body">
            <h2 id="signupTitle">Join The List</h2>
            <p className="sub">
              Drop your details for round alerts, early access, and trackside
              news straight from the crew.
            </p>
            {submitted ? (
              <p
                style={{
                  color: "var(--color-acid)",
                  fontFamily: "var(--font-display)",
                  textAlign: "center",
                  padding: "var(--space-4) 0",
                }}
              >
                You&apos;re in. See you trackside!
              </p>
            ) : (
              <form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
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
                  />
                </div>
                <div className="field">
                  <label htmlFor="su-email">Email</label>
                  <input
                    id="su-email"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="su-phone">Phone</label>
                  <input
                    id="su-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="field">
                  <label htmlFor="su-referral">Where did you hear about us?</label>
                  <select id="su-referral" defaultValue="">
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
                <button type="submit" className="btn btn-primary btn-block">
                  <span className="shimmer" />
                  Keep Me Posted
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </SignupContext.Provider>
  );
}
