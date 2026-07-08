"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Countdown target — September 2, 2026 00:00:00 (local). Matches live script.js.
const TARGET = new Date(2026, 8, 2, 0, 0, 0).getTime();

const pad = (n: number) => String(n).padStart(2, "0");

function calc() {
  const d = TARGET - Date.now();
  if (d <= 0) return { d: "00", h: "00", m: "00", s: "00" };
  return {
    d: pad(Math.floor(d / 86400000)),
    h: pad(Math.floor((d % 86400000) / 3600000)),
    m: pad(Math.floor((d % 3600000) / 60000)),
    s: pad(Math.floor((d % 60000) / 1000)),
  };
}

// Primary nav links (desktop bar + mobile drawer). Hash links are prefixed with
// "/" so they resolve to the home sections from any route.
const LINKS: [string, string][] = [
  ["/#about", "About"],
  ["/#features", "How It Works"],
  ["/#events", "Events"],
  ["/#trailer", "Trailer"],
];

export default function Nav() {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });
  const [open, setOpen] = useState(false);

  // Client-only ticking countdown (avoids SSR/CSR hydration mismatch).
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  // Lock scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header>
        <div className="navbar">
          <div className="navbar-top">
            <button
              className="menu-btn"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              ☰
            </button>

            <Link href="/" className="logo-link" aria-label="BuggedOut — home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/comingsoon.webp"
                alt="BuggedOut"
                className="nav-logo"
              />
            </Link>

            <nav className="desktop-nav">
              {LINKS.map(([href, label]) => (
                <a href={href} key={href}>
                  {label}
                </a>
              ))}
            </nav>

            <a href="/#signup" className="signup-btn">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/winuptosqr.webp"
                alt=""
                className="signup-btn-image"
              />
              <span>Sign Up</span>
            </a>
          </div>

          <div className="nav-countdown" suppressHydrationWarning>
            <span>{t.d}</span>d :<span>{t.h}</span>h :<span>{t.m}</span>m :
            <span>{t.s}</span>s
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? " active" : ""}`}>
        <button className="close-menu" aria-label="Close Menu" onClick={close}>
          ✕
        </button>
        {LINKS.map(([href, label]) => (
          <a href={href} key={href} onClick={close}>
            {label}
          </a>
        ))}
        <a href="/#signup" onClick={close}>
          Sign Up
        </a>
        <Link href="/privacy-policy" onClick={close}>
          Privacy Policy
        </Link>
      </div>
    </>
  );
}
