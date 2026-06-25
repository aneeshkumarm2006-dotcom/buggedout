"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="form-card hud-panel"
      id="contactForm"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-first">First Name</label>
          <input id="cf-first" type="text" placeholder="Davn" required />
        </div>
        <div className="field">
          <label htmlFor="cf-last">Last Name</label>
          <input id="cf-last" type="text" placeholder="Oot" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" type="email" placeholder="you@email.com" required />
      </div>
      <div className="field">
        <label htmlFor="cf-phone">Phone</label>
        <input id="cf-phone" type="tel" placeholder="+1 (555) 000-0000" />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" placeholder="What's on your mind?" required />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        style={sent ? { background: "var(--color-lime)" } : undefined}
        disabled={sent}
      >
        {sent ? (
          "Message Sent ✓"
        ) : (
          <>
            <span className="shimmer" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
