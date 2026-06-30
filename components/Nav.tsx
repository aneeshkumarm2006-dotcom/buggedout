"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENTS } from "@/lib/events";
import SignupButton from "@/components/SignupButton";
import { IconChevronDown, IconClose } from "@/components/icons";
import { useScrollLock } from "@/lib/useScrollLock";

type RouteKey = "home" | "events" | "gallery" | "contact";

function Wordmark() {
  return (
    <span className="brand">
      <span className="b1">BUGGED</span>
      <span className="b2">OUT</span>
      <span className="tag">.COM</span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const activeKey: RouteKey | null =
    pathname === "/"
      ? "home"
      : pathname.startsWith("/events")
        ? "events"
        : pathname === "/gallery"
          ? "gallery"
          : pathname === "/contact"
            ? "contact"
            : null;

  const linkClass = (key: RouteKey, extra = "") =>
    `nav-link${extra ? " " + extra : ""}${activeKey === key ? " active" : ""}`;

  // Translucent → solid nav after a little scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(drawerOpen);

  // Close the drawer whenever the route changes (render-phase reset).
  const [drawerPath, setDrawerPath] = useState(pathname);
  if (pathname !== drawerPath) {
    setDrawerPath(pathname);
    setDrawerOpen(false);
  }

  // While the drawer is open: focus it, trap Tab inside, Escape to close, and
  // restore focus to the trigger when it closes.
  useEffect(() => {
    if (!drawerOpen) return;
    const drawer = drawerRef.current;
    const focusables = drawer
      ? Array.from(drawer.querySelectorAll<HTMLElement>("a,button"))
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        return;
      }
      if (e.key === "Tab" && focusables.length) {
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
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      lastFocus.current?.focus();
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
        <div className="nav-inner">
          <Link href="/" className="logo" aria-label="BuggedOut.com — home">
            <Wordmark />
          </Link>
          <ul className="nav-links">
            <li>
              <Link href="/" className={linkClass("home")}>
                Home
              </Link>
            </li>
            <li className="nav-dd">
              <Link
                href="/events"
                className={linkClass("events", "nav-dd-trigger")}
                aria-haspopup="menu"
              >
                Events <span className="caret"><IconChevronDown width={13} height={13} /></span>
              </Link>
              <div className="nav-dd-menu" id="ddMenu" aria-label="All events">
                {EVENTS.map((g) => (
                  <Link key={g.slug} href={`/events/${g.slug}`}>
                    {g.name}
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link href="/gallery" className={linkClass("gallery")}>
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/contact" className={linkClass("contact")}>
                Contact
              </Link>
            </li>
          </ul>
          <div className="nav-right">
            <SignupButton className="nav-signup">Get Updates</SignupButton>
            <button
              className="nav-burger"
              id="burger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="drawer"
              onClick={() => {
                lastFocus.current = document.activeElement as HTMLElement | null;
                setDrawerOpen(true);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className={`drawer${drawerOpen ? " open" : ""}`}
        id="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!drawerOpen}
      >
        <button
          className="drawer-close"
          aria-label="Close menu"
          onClick={closeDrawer}
        >
          <IconClose width={26} height={26} />
        </button>
        <div className="drawer-links">
          <Link href="/" onClick={closeDrawer}>
            Home
          </Link>
          <Link href="/events" onClick={closeDrawer}>
            Events
          </Link>
          <Link href="/gallery" onClick={closeDrawer}>
            Gallery
          </Link>
          <Link href="/contact" onClick={closeDrawer}>
            Contact
          </Link>
          <SignupButton className="nav-signup" onBeforeOpen={closeDrawer}>
            Get Updates
          </SignupButton>
        </div>
      </div>
    </>
  );
}
