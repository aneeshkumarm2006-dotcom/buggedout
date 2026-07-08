"use client";

import { useRef } from "react";

// Inline email signup with Privacy-Policy checkbox validation (concept).
// No backend in the concept — kept inert (preventDefault) as-is.
export default function SignupForm() {
  const policyRef = useRef<HTMLInputElement>(null);

  return (
    <form className="email-form" onSubmit={(e) => e.preventDefault()}>
      <div className="email-row">
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">SIGN UP</button>
      </div>

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
